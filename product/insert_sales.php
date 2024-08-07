<?php
include "headers.php";

function insertSales($sales_userId, $sales_product, $sales_qty, $sales_totalAmount) {
    include "connection.php";
    try {
        $sql = "INSERT INTO tbl_sales (sales_userId, sales_product, sales_qty, sales_totalAmount) VALUES (:sales_userId, :sales_product, :sales_qty, :sales_totalAmount)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":sales_userId", $sales_userId);
        $stmt->bindParam(":sales_product", $sales_product);
        $stmt->bindParam(":sales_qty", $sales_qty);
        $stmt->bindParam(":sales_totalAmount", $sales_totalAmount);
        $stmt->execute();
        return json_encode(["sales_id" => $conn->lastInsertId()]);
    } catch (PDOException $e) {
        return json_encode(["error" => $e->getMessage()]);
    }
}

$operation = isset($_POST["operation"]) ? $_POST["operation"] : '';

if ($operation === 'insertSales') {
    $sales_userId = isset($_POST["sales_userId"]) ? $_POST["sales_userId"] : '';
    $sales_product = isset($_POST["sales_product"]) ? $_POST["sales_product"] : '';
    $sales_qty = isset($_POST["sales_qty"]) ? $_POST["sales_qty"] : '';
    $sales_totalAmount = isset($_POST["sales_totalAmount"]) ? $_POST["sales_totalAmount"] : '';
    echo insertSales($sales_userId, $sales_product, $sales_qty, $sales_totalAmount);
} else {
    echo json_encode(['error' => 'Invalid operation']);
}
?>
