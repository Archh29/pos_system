<?php
include "connection.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $description = $data["description"];
    $amount = $data["amount"];

    $sql = "INSERT INTO expenses (description, amount) VALUES (:description, :amount)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":amount", $amount);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
