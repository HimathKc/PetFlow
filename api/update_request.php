<?php
session_start();
header("Content-Type: application/json");
require "../config/db.php";

// admin only
if (($_SESSION["role"] ?? "") !== "admin") {
    echo json_encode(["success" => false, "message" => "Admins only"]);
    exit;
}

$id = (int)($_POST["id"] ?? 0);
$status = $_POST["status"] ?? "";

if ($id <= 0 || ($status !== "Approved" && $status !== "Rejected")) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$stmt = mysqli_prepare($conn, "UPDATE adoption_requests SET status = ? WHERE id = ?");
mysqli_stmt_bind_param($stmt, "si", $status, $id);

if (!mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => false, "message" => "Could not update request"]);
    exit;
}

// approved -> the pet of that request becomes Adopted
if ($status === "Approved") {
    $pet = mysqli_prepare($conn, "UPDATE pets SET status = 'Adopted'
                                  WHERE pet_id = (SELECT pet_id FROM adoption_requests WHERE id = ?)");
    mysqli_stmt_bind_param($pet, "i", $id);
    mysqli_stmt_execute($pet);
}

echo json_encode(["success" => true, "message" => "Request " . strtolower($status)]);
?>
