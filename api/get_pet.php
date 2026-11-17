<?php
header("Content-Type: application/json");
require "../config/db.php";

// aliases (AS) rename the columns so the JS can use p.id, p.about, p.img
$result = mysqli_query($conn, "SELECT pet_id AS id, name, type, breed, age,
                               description AS about, image AS img, status
                               FROM pets ORDER BY pet_id");
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}
$pets = [];
while ($row = mysqli_fetch_assoc($result)) {
    $pets[] = $row;
}
echo json_encode($pets);
?>
