<?php
include "headers.php";

function insertSalesItem($sales_itemId, $sales_cashtendered, $sales_change) {
    include "connection.php";
    try {
        $sql = "INSERT INTO tbl_sales_item (sales_itemId, sales_cashtendered, sales_change) VALUES (:sales_itemId, :sales_cashtendered, :sales_change)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":sales_itemId", $sales_itemId);
        $stmt->bindParam(":sales_cashtendered", $sales_cashtendered);
        $stmt->bindParam(":sales_change", $sales_change);
        $stmt->execute();
        return json_encode(["status" => "success"]);
    } catch (PDOException $e) {
        return json_encode(["error" => $e->getMessage()]);
    }
}

$operation = isset($_POST["operation"]) ? $_POST["operation"] : '';

if ($operation === 'insertSalesItem') {
    $sales_itemId = isset($_POST["sales_itemId"]) ? $_POST["sales_itemId"] : '';
    $sales_cashtendered = isset($_POST["sales_cashtendered"]) ? $_POST["sales_cashtendered"] : '';
    $sales_change = isset($_POST["sales_change"]) ? $_POST["sales_change"] : '';
    echo insertSalesItem($sales_itemId, $sales_cashtendered, $sales_change);
} else {
    echo json_encode(['error' => 'Invalid operation']);
}
?>
