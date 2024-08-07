<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Get raw POST data
$rawData = file_get_contents("php://input");
error_log("Raw data received: " . $rawData); // Log raw data

// Decode JSON data
$data = json_decode($rawData);

// Check for JSON errors
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON error: " . json_last_error_msg()); // Log JSON errors
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON received"]);
    exit;
}

// Echo back the received data
echo json_encode(["received" => $data]);
?>
