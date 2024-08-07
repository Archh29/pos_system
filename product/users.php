<?php
include "headers.php";
include "connection.php"; // Ensure this file initializes $conn

class User
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function login($json)
    {
        $data = json_decode($json, true);
        $sql = "SELECT * FROM users WHERE username = :username AND BINARY password = :password";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":username", $data["username"]);
        $stmt->bindParam(":password", $data["password"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? json_encode($stmt->fetch(PDO::FETCH_ASSOC)) : json_encode(['error' => 'Invalid username or password']);
    }

    public function adminLogin($json)
    {
        $data = json_decode($json, true);
        $sql = "SELECT * FROM users WHERE username = :username AND BINARY password = :password AND role = 'admin'";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":username", $data["username"]);
        $stmt->bindParam(":password", $data["password"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? json_encode(['isAuthenticated' => true]) : json_encode(['isAuthenticated' => false]);
    }
}

function recordExists($value, $table, $column, $conn)
{
    $sql = "SELECT COUNT(*) FROM $table WHERE $column = :value";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":value", $value);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    return $count > 0;
}

header('Content-Type: application/json');

$json = isset($_POST["json"]) ? $_POST["json"] : "0";
$operation = isset($_POST["operation"]) ? $_POST["operation"] : "0";

$user = new User($conn);

switch ($operation) {
    case "login":
        echo $user->login($json);
        break;
    case "adminLogin":
        echo $user->adminLogin($json);
        break;
    default:
        echo json_encode(['error' => 'Invalid operation']);
        break;
}
?>
