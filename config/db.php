<?php
// let MySQL errors return false instead of crashing, so our "else" messages run
mysqli_report(MYSQLI_REPORT_OFF);

$conn = mysqli_connect("localhost", "root", "", "petflow");

if (!$conn) {
    
    header("Content-Type: application/json");
    echo json_encode(["success" => false, "message" => "Database connection failed: " . mysqli_connect_error()]);
    exit;
}

mysqli_set_charset($conn, "utf8mb4");
?>
