<?php
include "headers.php";

function getProductByCode($code) {
    include "connection.php";
    $sql = "SELECT * FROM tblproducts WHERE product_code = :code";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":code", $code);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    return $product ? json_encode($product) : json_encode(['error' => 'Product not found']);
}

$operation = isset($_POST["operation"]) ? $_POST["operation"] : '';

if ($operation === 'getProductByCode') {
    $code = isset($_POST["code"]) ? $_POST["code"] : '';
    echo getProductByCode($code);
} else {
    echo json_encode(['error' => 'Invalid operation']);
}
?>
