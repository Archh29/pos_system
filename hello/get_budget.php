<?php
include "connection.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$sql = "SELECT amount FROM budget WHERE id = 1";
$stmt = $conn->prepare($sql);
$stmt->execute();

$budget = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($budget);
?>
