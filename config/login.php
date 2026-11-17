<?php
session_start();
header("Content-Type: application/json");
require "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Please enter your email and password"]);
    exit;
}

$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result);

if ($user && password_verify($password, $user["password"])) {
    session_regenerate_id(true);
    $_SESSION["user_id"] = $user["user_id"];
    $_SESSION["name"] = $user["name"];
    $_SESSION["role"] = $user["role"];

    $redirect = ($user["role"] === "admin") ? "admin-dashboard.html" : "index.html";
    echo json_encode(["success" => true, "message" => "Login successful", "role" => $user["role"], "redirect" => $redirect]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
}
?>
