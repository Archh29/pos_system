<?php
include "connection.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $budget = $data["budget"];

    $sql = "UPDATE budget SET amount = :budget WHERE id = 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":budget", $budget);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
