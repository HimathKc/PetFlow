<?php
session_start();
header("Content-Type: application/json");
require "../config/db.php";

// normal users only
if (($_SESSION["role"] ?? "") !== "user") {
    echo json_encode(["success" => false, "message" => "Please login with a user account"]);
    exit;
}

$user_id = $_SESSION["user_id"];
$pet_id = (int)($_POST["pet_id"] ?? 0);
$message = trim($_POST["message"] ?? "");

if ($pet_id <= 0 || strlen($message) < 10) {
    echo json_encode(["success" => false, "message" => "Write at least 10 characters"]);
    exit;
}

// the pet must exist and still be Available
$check = mysqli_prepare($conn, "SELECT status FROM pets WHERE pet_id = ?");
mysqli_stmt_bind_param($check, "i", $pet_id);
mysqli_stmt_execute($check);
$pet = mysqli_fetch_assoc(mysqli_stmt_get_result($check));

if (!$pet || $pet["status"] !== "Available") {
    echo json_encode(["success" => false, "message" => "This pet is not available"]);
    exit;
}

// no second pending request for the same pet
$dup = mysqli_prepare($conn, "SELECT id FROM adoption_requests WHERE user_id = ? AND pet_id = ? AND status = 'Pending'");
mysqli_stmt_bind_param($dup, "ii", $user_id, $pet_id);
mysqli_stmt_execute($dup);
mysqli_stmt_store_result($dup);
if (mysqli_stmt_num_rows($dup) > 0) {
    echo json_encode(["success" => false, "message" => "You already requested this pet"]);
    exit;
}

$stmt = mysqli_prepare($conn, "INSERT INTO adoption_requests (user_id, pet_id, message) VALUES (?, ?, ?)");
mysqli_stmt_bind_param($stmt, "iis", $user_id, $pet_id, $message);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Request sent! We will contact you soon."]);
} else {
    echo json_encode(["success" => false, "message" => "Could not send request"]);
}
?>
