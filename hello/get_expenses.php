<?php
include "connection.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$sql = "SELECT * FROM expenses";
$stmt = $conn->prepare($sql);
$stmt->execute();

$expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($expenses);
?>
