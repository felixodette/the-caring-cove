<?php
/**
 * Contact Form Mail Bridge for The Caring Cove
 * Deploy this file to your cPanel document root (same level as index.html).
 * Works with static Next.js export - no Node.js required.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

$name = isset($_POST["sender_name"]) ? strip_tags(trim($_POST["sender_name"])) : "";
$email = isset($_POST["sender_email"]) ? filter_var(trim($_POST["sender_email"]), FILTER_SANITIZE_EMAIL) : "";
$phone = isset($_POST["sender_phone"]) ? strip_tags(trim($_POST["sender_phone"])) : "";
$interest = isset($_POST["interest"]) ? strip_tags(trim($_POST["interest"])) : "";
$context = isset($_POST["location_context"]) ? strip_tags(trim($_POST["location_context"])) : "";

if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
}

$recipient = "info@thecaringcove.co.ke";
$subject = "NEW INQUIRY: $interest from $name";

$email_content = "New inquiry from The Caring Cove website\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n";
$email_content .= "Service Needed: $interest\n";
$email_content .= "Location Context: $context\n";
$email_content .= "\n---\nSubmitted: " . date("Y-m-d H:i:s") . " UTC";

$email_headers = "From: The Caring Cove Web <no-reply@thecaringcove.co.ke>\r\n";
$email_headers .= "Reply-To: $email\r\n";
$email_headers .= "X-Mailer: PHP/" . phpversion();

if (mail($recipient, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo json_encode(["message" => "Success"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Server Error"]);
}
