<?php
// authenticate.php
header('Content-Type: application/json');

// Simulated database of users
$users = [
    [
        'username' => 'admin',
        'password' => 'password', // In a real scenario, use hashed passwords
        'role' => 'admin',
    ],
    [
        'username' => 'supervisor',
        'password' => 'password123', // In a real scenario, use hashed passwords
        'role' => 'supervisor',
    ]
];

// Get the POST data
$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'];
$password = $input['password'];

// Authenticate user
foreach ($users as $user) {
    if ($user['username'] === $username && $user['password'] === $password) {
        echo json_encode(['success' => true, 'role' => $user['role']]);
        exit;
    }
}

// If authentication fails
echo json_encode(['success' => false]);
?>
