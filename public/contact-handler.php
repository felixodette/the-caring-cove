<?php
/**
 * Contact Form Mail Bridge for The Caring Cove
 * cPanel deployment: Place in document root (public_html or domain folder).
 * Requires: PHP 7.4+, mail() enabled (default on cPanel).
 */

// CORS - allow your domain in production; * for dev
$allowed_origins = [
    "https://thecaringcove.co.ke",
    "https://www.thecaringcove.co.ke",
    "https://dev.thecaringcove.co.ke",
    "https://www.dev.thecaringcove.co.ke",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
];
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

// Honeypot - bots often fill hidden fields
$honeypot = isset($_POST["website"]) ? trim($_POST["website"]) : "";
if (!empty($honeypot)) {
    http_response_code(200);
    echo json_encode(["message" => "Success"]);
    exit;
}

// Sanitize inputs
$name = isset($_POST["sender_name"]) ? strip_tags(trim($_POST["sender_name"])) : "";
$email = isset($_POST["sender_email"]) ? trim($_POST["sender_email"]) : "";
$phone = isset($_POST["sender_phone"]) ? preg_replace("/[^0-9+\s\-()]/", "", trim($_POST["sender_phone"])) : "";
$interest = isset($_POST["interest"]) ? strip_tags(trim($_POST["interest"])) : "";
$context = isset($_POST["location_context"]) ? strip_tags(trim($_POST["location_context"])) : "";

// Validation
$errors = [];

if (strlen($name) < 2) {
    $errors[] = "Name must be at least 2 characters.";
}
if (strlen($name) > 100) {
    $errors[] = "Name is too long.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address.";
}
if (strlen($email) > 254) {
    $errors[] = "Email is too long.";
}

if (strlen($phone) < 9) {
    $errors[] = "Please enter a valid phone number.";
}
if (strlen($phone) > 20) {
    $errors[] = "Phone number is too long.";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["message" => implode(" ", $errors)]);
    exit;
}

// Build email
$recipient = "info@thecaringcove.co.ke";
$subject = "Tour Inquiry: " . ($interest ?: "General") . " – " . $name;

$email_body = "New inquiry from The Caring Cove website\n";
$email_body .= str_repeat("=", 50) . "\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Phone: " . $phone . "\n";
$email_body .= "Primary Interest: " . ($interest ?: "Not specified") . "\n";
$email_body .= "Location: " . ($context ?: "Not specified") . "\n";
$email_body .= "\n" . str_repeat("-", 50) . "\n";
$email_body .= "Submitted: " . date("Y-m-d H:i:s") . " (server time)\n";
$email_body .= "IP: " . ($_SERVER["REMOTE_ADDR"] ?? "unknown") . "\n";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=utf-8";
$headers[] = "From: The Caring Cove <no-reply@thecaringcove.co.ke>";
$headers[] = "Reply-To: " . $name . " <" . $email . ">";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "X-Priority: 1";

$headers_str = implode("\r\n", $headers);

$sent = @mail($recipient, $subject, $email_body, $headers_str);

if ($sent) {
    http_response_code(200);
    echo json_encode(["message" => "Success"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Unable to send. Please call +254 143 292 223."]);
}
