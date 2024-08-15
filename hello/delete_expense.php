<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // End the preflight request
}

include 'connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$expense_id = $data['id'];

if ($expense_id) {
    try {
        $sql = "DELETE FROM expenses WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $expense_id, PDO::PARAM_INT);
        $stmt->execute();
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No ID provided']);
}
?>
