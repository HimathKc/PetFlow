<?php
session_start();
header("Content-Type: application/json");
require "../config/db.php";

// admin only
if (($_SESSION["role"] ?? "") !== "admin") {
    echo json_encode([]);
    exit;
}

// JOIN connects the request with the pet and the user (the foreign keys)
$result = mysqli_query($conn, "SELECT r.id, p.name AS pet, u.name AS name, r.message,
                               DATE(r.created_at) AS date, r.status
                               FROM adoption_requests r
                               JOIN pets p ON r.pet_id = p.pet_id
                               JOIN users u ON r.user_id = u.user_id
                               ORDER BY r.id DESC");
if (!$result) {
    http_response_code(500);
    echo json_encode([]);
    exit;
}
$requests = [];
while ($row = mysqli_fetch_assoc($result)) {
    $requests[] = $row;
}
echo json_encode($requests);
?>
