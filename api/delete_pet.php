<?php
session_start();
header("Content-Type: application/json");
require "../config/db.php";

// admin only
if (($_SESSION["role"] ?? "") !== "admin") {
    echo json_encode(["success" => false, "message" => "Admins only"]);
    exit;
}

$pet_id = (int)($_POST["pet_id"] ?? 0);
if ($pet_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid pet"]);
    exit;
}

// its adoption requests are removed automatically (ON DELETE CASCADE)
$stmt = mysqli_prepare($conn, "DELETE FROM pets WHERE pet_id = ?");
mysqli_stmt_bind_param($stmt, "i", $pet_id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Pet deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Could not delete pet"]);
}
?>
