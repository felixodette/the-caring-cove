<?php
/**
 * The Caring Cove inquiry handler (tcc-contact-handler.v1)
 *
 * Static-export companion. Secrets and mutable config live outside the
 * document root when present. This file never logs payloads.
 */

declare(strict_types=1);

const TCC_HANDLER_VERSION = "tcc-contact-handler.v1";
const TCC_CONTRACT_VERSION = "tcc-contact.v1";
const TCC_PRIVACY_NOTICE_VERSION = "2026-08-17.1";
const TCC_MAX_BODY_BYTES = 16384;
const TCC_RATE_LIMIT = 5;
const TCC_RATE_WINDOW_SECONDS = 3600;
const TCC_IDEM_TTL_SECONDS = 600;
const TCC_FALLBACK_PHONE = "+254 748 583 879";
const TCC_FALLBACK_TEL = "+254748583879";

const TCC_INTERESTS = [
    "Prefer not to say",
    "Alzheimer's / Dementia Care",
    "Palliative / End of Life",
    "Specialised Recovery",
    "Respite Stay (Short Term)",
    "24/7 Skilled Nursing",
    "General Inquiry",
];
const TCC_LOCATIONS = [
    "Nairobi (Karen/Lavington)",
    "Other parts of Kenya",
    "Diaspora (Europe/UK/Americas)",
];
const TCC_RELATIONSHIPS = [
    "Adult child / family member",
    "Spouse / partner",
    "Professional referral",
    "Myself",
    "Other",
];
const TCC_URGENCIES = [
    "Immediate (needed now)",
    "Within 2 weeks",
    "1-3 months",
    "Planning ahead",
];
const TCC_CHANNELS = ["WhatsApp", "Phone call", "Email"];
const TCC_TOUR_WINDOWS = [
    "Weekday morning",
    "Weekday afternoon",
    "Weekend",
    "Call me to arrange",
    "Prefer not to say",
];

function tcc_now(): int
{
    return time();
}

function tcc_json_response(int $status, array $payload): void
{
    http_response_code($status);
    header("Content-Type: application/json; charset=utf-8");
    header("X-TCC-Handler: " . TCC_HANDLER_VERSION);
    header("Cache-Control: no-store");
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
}

function tcc_fail(int $status, string $request_id, string $message): void
{
    tcc_json_response($status, [
        "ok" => false,
        "request_id" => $request_id,
        "message" => $message,
    ]);
    exit;
}

function tcc_has_crlf(string $value): bool
{
    return strpbrk($value, "\r\n") !== false;
}

function tcc_normalize(string $value): string
{
    $value = trim($value);
    if (class_exists("Normalizer")) {
        $normalized = Normalizer::normalize($value, Normalizer::FORM_C);
        if (is_string($normalized)) {
            $value = $normalized;
        }
    }
    return $value;
}

function tcc_clean_phone(string $phone): string
{
    return trim((string) preg_replace("/[^0-9+\\s\\-()]/", "", $phone));
}

function tcc_allowed_origins(): array
{
    return [
        "https://thecaringcove.co.ke",
        "https://www.thecaringcove.co.ke",
        "https://dev.thecaringcove.co.ke",
        "https://www.dev.thecaringcove.co.ke",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8787",
    ];
}

function tcc_allowed_hosts(): array
{
    $hosts = [];
    foreach (tcc_allowed_origins() as $origin) {
        $parts = parse_url($origin);
        if (!empty($parts["host"])) {
            $port = isset($parts["port"]) ? ":" . $parts["port"] : "";
            $hosts[] = $parts["host"] . $port;
        }
    }
    return array_values(array_unique($hosts));
}

function tcc_load_config(): array
{
    $defaults = [
        "handler_enabled" => true,
        "recipient" => "info@thecaringcove.co.ke",
        "from_address" => "no-reply@thecaringcove.co.ke",
        "hmac_secret" => "",
        "trusted_proxies" => [],
        "log_dir" => "",
        "state_dir" => "",
    ];
    $path = getenv("TCC_CONTACT_CONFIG") ?: "";
    if ($path === "") {
        $doc = $_SERVER["DOCUMENT_ROOT"] ?? "";
        $candidates = [];
        if ($doc !== "") {
            $candidates[] = dirname($doc) . "/tcc-private/contact.json";
        }
        $candidates[] = dirname(__DIR__) . "/tcc-private/contact.json";
        foreach ($candidates as $candidate) {
            if (is_readable($candidate)) {
                $path = $candidate;
                break;
            }
        }
    }
    if ($path === "" || !is_readable($path)) {
        return $defaults;
    }
    $decoded = json_decode((string) file_get_contents($path), true);
    if (!is_array($decoded)) {
        return $defaults;
    }
    return array_merge($defaults, $decoded);
}

function tcc_state_dir(array $config): string
{
    if (!empty($config["state_dir"]) && is_dir($config["state_dir"]) && is_writable($config["state_dir"])) {
        return rtrim($config["state_dir"], "/");
    }
    $tmp = rtrim(sys_get_temp_dir(), "/") . "/tcc-contact-state";
    if (!is_dir($tmp)) {
        @mkdir($tmp, 0700, true);
    }
    return $tmp;
}

function tcc_hmac_secret(array $config): string
{
    if (!empty($config["hmac_secret"]) && is_string($config["hmac_secret"])) {
        return $config["hmac_secret"];
    }
    $path = tcc_state_dir($config) . "/hmac-secret";
    if (is_readable($path)) {
        $existing = trim((string) file_get_contents($path));
        if ($existing !== "") {
            return $existing;
        }
    }
    $generated = bin2hex(random_bytes(32));
    @file_put_contents($path, $generated, LOCK_EX);
    @chmod($path, 0600);
    return $generated;
}

function tcc_client_ip(array $config): string
{
    $remote = $_SERVER["REMOTE_ADDR"] ?? "0.0.0.0";
    $trusted = $config["trusted_proxies"] ?? [];
    if (!is_array($trusted) || !in_array($remote, $trusted, true)) {
        return $remote;
    }
    $forwarded = $_SERVER["HTTP_X_FORWARDED_FOR"] ?? "";
    if ($forwarded === "") {
        return $remote;
    }
    $first = trim(explode(",", $forwarded)[0]);
    return filter_var($first, FILTER_VALIDATE_IP) ? $first : $remote;
}

function tcc_abuse_key(array $config): string
{
    $hour = gmdate("YmdH");
    $material = $hour . "|" . tcc_client_ip($config);
    return hash_hmac("sha256", $material, tcc_hmac_secret($config));
}

function tcc_with_lock(string $path, callable $fn)
{
    $fh = fopen($path, "c+");
    if ($fh === false) {
        return $fn(null);
    }
    flock($fh, LOCK_EX);
    $result = $fn($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    return $result;
}

function tcc_rate_limited(array $config): bool
{
    $dir = tcc_state_dir($config);
    if (!is_dir($dir) || !is_writable($dir)) {
        return false;
    }
    $path = $dir . "/rate-" . tcc_abuse_key($config);
    $now = tcc_now();
    return (bool) tcc_with_lock($path, function ($fh) use ($now) {
        if ($fh === null) {
            return false;
        }
        $raw = stream_get_contents($fh);
        $count = 0;
        $start = $now;
        if (is_string($raw) && $raw !== "") {
            $data = json_decode($raw, true);
            if (is_array($data) && isset($data["start"], $data["count"])) {
                $start = (int) $data["start"];
                $count = (int) $data["count"];
                if ($now - $start >= TCC_RATE_WINDOW_SECONDS) {
                    $start = $now;
                    $count = 0;
                }
            }
        }
        $count += 1;
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode(["start" => $start, "count" => $count]));
        return $count > TCC_RATE_LIMIT;
    });
}

function tcc_idempotent_hit(array $config, string $request_id): bool
{
    $dir = tcc_state_dir($config);
    if (!is_dir($dir) || !is_writable($dir)) {
        return false;
    }
    $path = $dir . "/id-" . hash("sha256", $request_id);
    $now = tcc_now();
    return (bool) tcc_with_lock($path, function ($fh) use ($now) {
        if ($fh === null) {
            return false;
        }
        $raw = stream_get_contents($fh);
        if (is_string($raw) && $raw !== "") {
            $data = json_decode($raw, true);
            if (is_array($data) && isset($data["at"]) && $now - (int) $data["at"] < TCC_IDEM_TTL_SECONDS) {
                return true;
            }
        }
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode(["at" => $now]));
        return false;
    });
}

function tcc_safe_log(array $config, string $request_id, string $state, string $outcome): void
{
    $dir = $config["log_dir"] ?: tcc_state_dir($config);
    if (!is_dir($dir) || !is_writable($dir)) {
        return;
    }
    $line = json_encode([
        "ts" => gmdate("c"),
        "handler" => TCC_HANDLER_VERSION,
        "request_id" => $request_id,
        "state" => $state,
        "outcome" => $outcome,
    ]) . "\n";
    @file_put_contents($dir . "/handler.log", $line, FILE_APPEND | LOCK_EX);
}

function tcc_dump_contract(): array
{
    return [
        "version" => TCC_CONTRACT_VERSION,
        "privacy_notice_version" => TCC_PRIVACY_NOTICE_VERSION,
        "handler_version" => TCC_HANDLER_VERSION,
        "max_body_bytes" => TCC_MAX_BODY_BYTES,
        "enums" => [
            "interests" => TCC_INTERESTS,
            "locations" => TCC_LOCATIONS,
            "relationships" => TCC_RELATIONSHIPS,
            "urgencies" => TCC_URGENCIES,
            "channels" => TCC_CHANNELS,
            "tour_windows" => TCC_TOUR_WINDOWS,
        ],
    ];
}

function tcc_score(array $inquiry): array
{
    $score = 0;
    $reasons = [];
    $urgency = [
        "Immediate (needed now)" => 40,
        "Within 2 weeks" => 30,
        "1-3 months" => 15,
        "Planning ahead" => 5,
    ];
    $relationship = [
        "Spouse / partner" => 20,
        "Adult child / family member" => 15,
        "Professional referral" => 12,
        "Myself" => 10,
        "Other" => 5,
    ];
    $location = [
        "Nairobi (Karen/Lavington)" => 15,
        "Other parts of Kenya" => 10,
        "Diaspora (Europe/UK/Americas)" => 18,
    ];
    $score += $urgency[$inquiry["urgency"]] ?? 0;
    $reasons[] = "Urgency: " . $inquiry["urgency"];
    $score += $relationship[$inquiry["relationship"]] ?? 0;
    $score += $location[$inquiry["location_context"]] ?? 0;
    if ($inquiry["interest"] !== "Prefer not to say" && $inquiry["interest"] !== "General Inquiry") {
        $score += 10;
        $reasons[] = "Specific care need named";
    }
    if ($inquiry["tour_window"] !== "Prefer not to say" && $inquiry["tour_window"] !== "Call me to arrange") {
        $score += 10;
        $reasons[] = "Tour window chosen";
    }
    if ($inquiry["preferred_channel"] === "WhatsApp" || $inquiry["preferred_channel"] === "Phone call") {
        $score += 5;
    }
    if ($score >= 70) {
        $band = "hot";
        $next = "Call or WhatsApp within 15 minutes. Offer a same-day or next-day private tour.";
    } elseif ($score >= 45) {
        $band = "warm";
        $next = "Respond within 2 hours. Confirm a tour window this week.";
    } else {
        $band = "nurture";
        $next = "Respond within 2 hours. Send the admissions path and offer a no-pressure conversation.";
    }
    return ["score" => $score, "band" => $band, "reasons" => $reasons, "nextAction" => $next];
}

function tcc_validate(array $input): array
{
    $errors = [];
    $name = tcc_normalize((string) ($input["sender_name"] ?? ""));
    $email = tcc_normalize((string) ($input["sender_email"] ?? ""));
    $phone = tcc_clean_phone((string) ($input["sender_phone"] ?? ""));
    $interest = tcc_normalize((string) ($input["interest"] ?? ""));
    $location = tcc_normalize((string) ($input["location_context"] ?? ""));
    $relationship = tcc_normalize((string) ($input["relationship"] ?? ""));
    $urgency = tcc_normalize((string) ($input["urgency"] ?? ""));
    $channel = tcc_normalize((string) ($input["preferred_channel"] ?? ""));
    $tour = tcc_normalize((string) ($input["tour_window"] ?? "Call me to arrange"));
    $resident = tcc_normalize((string) ($input["resident_first_name"] ?? ""));
    $policy = tcc_normalize((string) ($input["policy_version"] ?? ""));
    $request_id = tcc_normalize((string) ($input["request_id"] ?? ""));
    $consent_raw = $input["consent"] ?? "";
    $consent = in_array($consent_raw, [true, "true", "1", "on", "yes"], true);

    $scan = [$name, $email, $phone, $interest, $location, $relationship, $urgency, $channel, $tour, $resident, $policy, $request_id];
    foreach ($scan as $field) {
        if (tcc_has_crlf($field)) {
            return ["ok" => false, "errors" => ["sender_name" => "Please remove line breaks and try again."]];
        }
    }

    if (strlen($name) < 2) {
        $errors["sender_name"] = "Please enter your full name (at least 2 characters).";
    } elseif (strlen($name) > 100) {
        $errors["sender_name"] = "Name is too long.";
    }
    if ($email === "") {
        $errors["sender_email"] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
        $errors["sender_email"] = "Please enter a valid email address.";
    }
    if (strlen($phone) < 9) {
        $errors["sender_phone"] = "Please enter a valid phone number.";
    } elseif (strlen($phone) > 20) {
        $errors["sender_phone"] = "Phone number is too long.";
    }
    if (!in_array($interest, TCC_INTERESTS, true)) {
        $errors["interest"] = "Please choose a care need from the list.";
    }
    if (!in_array($location, TCC_LOCATIONS, true)) {
        $errors["location_context"] = "Please choose where you are based.";
    }
    if (!in_array($relationship, TCC_RELATIONSHIPS, true)) {
        $errors["relationship"] = "Please tell us who this inquiry is for.";
    }
    if (!in_array($urgency, TCC_URGENCIES, true)) {
        $errors["urgency"] = "Please choose how soon care is needed.";
    }
    if (!in_array($channel, TCC_CHANNELS, true)) {
        $errors["preferred_channel"] = "Please choose how we should reach you.";
    }
    if ($tour === "") {
        $tour = "Call me to arrange";
    }
    if (!in_array($tour, TCC_TOUR_WINDOWS, true)) {
        $errors["tour_window"] = "Please choose a tour window.";
    }
    if (strlen($resident) > 40) {
        $errors["resident_first_name"] = "First name is too long.";
    }
    if (!$consent) {
        $errors["consent"] = "Please confirm you want us to use these details to follow up.";
    }
    if ($policy !== TCC_PRIVACY_NOTICE_VERSION) {
        $errors["policy_version"] = "Please refresh the page and submit again.";
    }
    if (!preg_match("/^tcc_inq_[a-f0-9]{26}$/", $request_id)) {
        $errors["request_id"] = "Please refresh the page and submit again.";
    }

    if ($errors) {
        return ["ok" => false, "errors" => $errors];
    }

    return [
        "ok" => true,
        "value" => [
            "sender_name" => $name,
            "sender_email" => $email,
            "sender_phone" => $phone,
            "interest" => $interest,
            "location_context" => $location,
            "relationship" => $relationship,
            "urgency" => $urgency,
            "preferred_channel" => $channel,
            "tour_window" => $tour,
            "resident_first_name" => $resident,
            "consent" => true,
            "policy_version" => $policy,
            "request_id" => $request_id,
        ],
    ];
}

function tcc_mail_headers(array $config, string $reply_email, string $reply_name): string
{
    $from = $config["from_address"];
    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=utf-8",
        "From: The Caring Cove <" . $from . ">",
        "X-Mailer: " . TCC_HANDLER_VERSION,
        "X-Priority: 1",
    ];
    if ($reply_email !== "" && filter_var($reply_email, FILTER_VALIDATE_EMAIL) && !tcc_has_crlf($reply_email) && !tcc_has_crlf($reply_name)) {
        $safe_name = str_replace(["<", ">", '"'], "", $reply_name);
        $headers[] = "Reply-To: " . $safe_name . " <" . $reply_email . ">";
    }
    return implode("\r\n", $headers);
}

function tcc_staff_body(array $inquiry, array $score): string
{
    $band = strtoupper($score["band"]);
    $phone_digits = preg_replace("/\\D/", "", $inquiry["sender_phone"]);
    $wa = "https://wa.me/" . $phone_digits;
    $tel = "tel:" . $phone_digits;
    $mail = "mailto:" . $inquiry["sender_email"];
    $lines = [
        "The Caring Cove inquiry (" . $band . " · score " . $score["score"] . ")",
        str_repeat("=", 52),
        "",
        "NEXT ACTION: " . $score["nextAction"],
        "",
        "Name: " . $inquiry["sender_name"],
        "Email: " . $inquiry["sender_email"] . "  " . $mail,
        "Phone: " . $inquiry["sender_phone"] . "  " . $tel,
        "WhatsApp: " . $wa,
        "Preferred channel: " . $inquiry["preferred_channel"],
        "Relationship: " . $inquiry["relationship"],
        "Urgency: " . $inquiry["urgency"],
        "Care need: " . $inquiry["interest"],
        "Location: " . $inquiry["location_context"],
        "Tour window: " . $inquiry["tour_window"],
        "Resident first name: " . ($inquiry["resident_first_name"] ?: "(not given)"),
        "Consent: yes",
        "Privacy notice: " . $inquiry["policy_version"],
        "Request ID: " . $inquiry["request_id"],
        "",
        "Conversion path: inquiry -> conversation -> private tour -> assessment -> offer -> admission.",
        "If we are not the right fit, say so and offer a referral conversation.",
        "",
        "Do not reply-all to this system address. Use the family's preferred channel.",
    ];
    return implode("\n", $lines);
}

function tcc_family_body(array $inquiry): string
{
    return implode("\n", [
        "Dear " . $inquiry["sender_name"] . ",",
        "",
        "Thank you for writing to The Caring Cove. We received your request for a private tour.",
        "Your reference is " . $inquiry["request_id"] . ".",
        "",
        "What happens next:",
        "1. A team member contacts you on " . $inquiry["preferred_channel"] . " within 2 hours during business hours.",
        "2. We arrange a private tour of the Karen residence.",
        "3. If the home may be a fit, we plan a clinical assessment with the information you choose to share.",
        "4. You receive a clear offer, or an honest explanation if we are not the right home.",
        "",
        "If you need us sooner, call " . TCC_FALLBACK_PHONE . " or WhatsApp the same number.",
        "",
        "The Caring Cove",
        "Karen, Nairobi",
    ]);
}

function tcc_send_mail(string $to, string $subject, string $body, string $headers): bool
{
    return @mail($to, $subject, $body, $headers);
}

function tcc_capabilities(): array
{
    return [
        "php" => PHP_VERSION,
        "json" => function_exists("json_encode"),
        "mail" => function_exists("mail"),
        "hash_hmac" => function_exists("hash_hmac"),
        "random_bytes" => function_exists("random_bytes"),
        "mbstring" => extension_loaded("mbstring"),
        "openssl" => extension_loaded("openssl"),
    ];
}

function tcc_self_test(): int
{
    $failed = 0;
    $assert = function (bool $ok, string $label) use (&$failed): void {
        echo ($ok ? "ok  " : "FAIL  ") . $label . "\n";
        if (!$ok) {
            $failed++;
        }
    };

    $assert(tcc_has_crlf("Jane\r\nBcc: x"), "crlf detected");
    $assert(!tcc_has_crlf("Jane Doe"), "clean name");

    $valid = [
        "sender_name" => "Synthetic Family Member",
        "sender_email" => "synthetic.family@example.test",
        "sender_phone" => "+254700000000",
        "interest" => "General Inquiry",
        "location_context" => "Nairobi (Karen/Lavington)",
        "relationship" => "Adult child / family member",
        "urgency" => "Within 2 weeks",
        "preferred_channel" => "WhatsApp",
        "tour_window" => "Weekday morning",
        "resident_first_name" => "Alex",
        "consent" => "true",
        "policy_version" => TCC_PRIVACY_NOTICE_VERSION,
        "request_id" => "tcc_inq_0123456789abcdef0123456789",
    ];
    $parsed = tcc_validate($valid);
    $assert($parsed["ok"] === true, "valid payload accepted");

    $inject = $valid;
    $inject["sender_name"] = "Synthetic\r\nBcc: attacker@example.test";
    $assert(tcc_validate($inject)["ok"] === false, "header injection rejected");

    $no_consent = $valid;
    $no_consent["consent"] = "";
    $assert(tcc_validate($no_consent)["ok"] === false, "missing consent rejected");

    $bad_enum = $valid;
    $bad_enum["interest"] = "Exact diagnosis text";
    $assert(tcc_validate($bad_enum)["ok"] === false, "unknown interest rejected");

    $score = tcc_score($parsed["value"]);
    $assert($score["band"] === "hot" || $score["band"] === "warm" || $score["band"] === "nurture", "score band assigned");
    $assert($score["score"] === 75, "warm/hot fixture score 75");

    $caps = tcc_capabilities();
    $assert($caps["json"] && $caps["hash_hmac"] && $caps["random_bytes"], "required PHP capabilities");

    echo json_encode(["ok" => $failed === 0, "failed" => $failed, "contract" => tcc_dump_contract()], JSON_PRETTY_PRINT) . "\n";
    return $failed === 0 ? 0 : 1;
}

if (PHP_SAPI === "cli") {
    $argv = $argv ?? [];
    if (in_array("--self-test", $argv, true)) {
        exit(tcc_self_test());
    }
    if (in_array("--dump-contract", $argv, true)) {
        echo json_encode(tcc_dump_contract(), JSON_PRETTY_PRINT) . "\n";
        exit(0);
    }
    if (in_array("--capabilities", $argv, true)) {
        echo json_encode(tcc_capabilities(), JSON_PRETTY_PRINT) . "\n";
        exit(0);
    }
    $score_flag = array_search("--score-json", $argv, true);
    if ($score_flag !== false && isset($argv[$score_flag + 1])) {
        $payload = json_decode($argv[$score_flag + 1], true);
        if (!is_array($payload)) {
            fwrite(STDERR, "invalid json\n");
            exit(1);
        }
        $parsed = tcc_validate($payload);
        if (!$parsed["ok"]) {
            echo json_encode($parsed) . "\n";
            exit(1);
        }
        echo json_encode(tcc_score($parsed["value"])) . "\n";
        exit(0);
    }
    fwrite(STDERR, "Usage: php contact-handler.php --self-test|--dump-contract|--capabilities|--score-json '{...}'\n");
    exit(2);
}

$config = tcc_load_config();
$request_id = "tcc_inq_" . bin2hex(random_bytes(13));
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
$host = $_SERVER["HTTP_HOST"] ?? "";

if ($origin !== "") {
    if (!in_array($origin, tcc_allowed_origins(), true)) {
        tcc_safe_log($config, $request_id, "origin", "forbidden");
        tcc_fail(403, $request_id, "This form can only be submitted from The Caring Cove website.");
    }
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
} elseif (!in_array($host, tcc_allowed_hosts(), true)) {
    tcc_safe_log($config, $request_id, "origin", "forbidden-host");
    tcc_fail(403, $request_id, "This form can only be submitted from The Caring Cove website.");
}

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    tcc_fail(405, $request_id, "Method not allowed");
}

if (empty($config["handler_enabled"])) {
    tcc_safe_log($config, $request_id, "kill_switch", "disabled");
    tcc_fail(503, $request_id, "The online form is unavailable. Please call " . TCC_FALLBACK_PHONE . ".");
}

$length = (int) ($_SERVER["CONTENT_LENGTH"] ?? 0);
if ($length > TCC_MAX_BODY_BYTES) {
    tcc_fail(413, $request_id, "Please shorten your answers and try again.");
}

$content_type = $_SERVER["CONTENT_TYPE"] ?? $_SERVER["HTTP_CONTENT_TYPE"] ?? "";
if (!preg_match("/^multipart\\/form-data\\s*;\\s*boundary=.+/i", $content_type)) {
    tcc_fail(415, $request_id, "Please submit the form from the website.");
}

$honeypot = tcc_normalize((string) ($_POST["website"] ?? ""));
if ($honeypot !== "") {
    tcc_safe_log($config, $request_id, "honeypot", "dropped");
    tcc_json_response(200, ["ok" => true, "request_id" => $request_id, "message" => "Success"]);
    exit;
}

if (tcc_rate_limited($config)) {
    tcc_safe_log($config, $request_id, "rate_limit", "rejected");
    tcc_fail(429, $request_id, "Please wait a little, then try again, or call " . TCC_FALLBACK_PHONE . ".");
}

$parsed = tcc_validate($_POST);
if (!$parsed["ok"]) {
    $message = implode(" ", array_values($parsed["errors"]));
    tcc_safe_log($config, $request_id, "validate", "rejected");
    tcc_fail(400, $request_id, $message);
}

$inquiry = $parsed["value"];
$request_id = $inquiry["request_id"];

if (tcc_idempotent_hit($config, $request_id)) {
    tcc_safe_log($config, $request_id, "idempotent", "replay");
    tcc_json_response(200, [
        "ok" => true,
        "request_id" => $request_id,
        "message" => "Success",
    ]);
    exit;
}

$score = tcc_score($inquiry);
$subject = "[" . strtoupper($score["band"]) . "] Tour inquiry: " . $inquiry["urgency"] . " – " . $inquiry["sender_name"];
$staff_headers = tcc_mail_headers($config, $inquiry["sender_email"], $inquiry["sender_name"]);
$staff_sent = tcc_send_mail($config["recipient"], $subject, tcc_staff_body($inquiry, $score), $staff_headers);

if (!$staff_sent) {
    tcc_safe_log($config, $request_id, "transport", "staff_failed");
    tcc_fail(500, $request_id, "Unable to send. Please call " . TCC_FALLBACK_PHONE . ".");
}

$family_headers = tcc_mail_headers($config, "", "");
$family_sent = tcc_send_mail(
    $inquiry["sender_email"],
    "We received your tour request — The Caring Cove",
    tcc_family_body($inquiry),
    $family_headers,
);

tcc_safe_log($config, $request_id, "transport", $family_sent ? "staff_and_ack" : "staff_only");
tcc_json_response(200, [
    "ok" => true,
    "request_id" => $request_id,
    "message" => "Success",
]);
