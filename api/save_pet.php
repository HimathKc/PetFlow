<?php
session_start();
header("Content-Type: application/json");
require "../config/db.php";

// admin only
if (($_SESSION["role"] ?? "") !== "admin") {
    echo json_encode(["success" => false, "message" => "Admins only"]);
    exit;
}
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$pet_id = (int)($_POST["pet_id"] ?? 0);   // 0 = new pet, otherwise edit
$name = trim($_POST["name"] ?? "");
$type = trim($_POST["type"] ?? "");
$breed = trim($_POST["breed"] ?? "");
$age = trim($_POST["age"] ?? "");
$description = trim($_POST["description"] ?? "");

if ($name == "" || $type == "" || $breed == "" || $age == "" || $description == "") {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

// photo upload (optional when editing)
$image = "";
if (isset($_FILES["photo"]) && $_FILES["photo"]["error"] === UPLOAD_ERR_OK) {
    $ext = strtolower(pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION));
    if (!in_array($ext, ["jpg", "jpeg", "png", "webp"])) {
        echo json_encode(["success" => false, "message" => "Photo must be jpg, png or webp"]);
        exit;
    }
    $fileName = "pet_" . uniqid() . "." . $ext;
    $folder = __DIR__ . "/../frontend/photos/";
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }
    if (!move_uploaded_file($_FILES["photo"]["tmp_name"], $folder . $fileName)) {
        echo json_encode(["success" => false, "message" => "Could not save the photo (check folder permissions)"]);
        exit;
    }
    // path stored in the DB is relative to the pages in /frontend
    $image = "photos/" . $fileName;
}

if ($pet_id == 0) {
    // CREATE
    if ($image == "") {
        echo json_encode(["success" => false, "message" => "Please choose a photo"]);
        exit;
    }
    $stmt = mysqli_prepare($conn, "INSERT INTO pets (name, type, breed, age, description, image) VALUES (?, ?, ?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, "ssssss", $name, $type, $breed, $age, $description, $image);
    $done = mysqli_stmt_execute($stmt);
    $message = "Pet added";
} else {
    // UPDATE
    if ($image == "") {
        $stmt = mysqli_prepare($conn, "UPDATE pets SET name=?, type=?, breed=?, age=?, description=? WHERE pet_id=?");
        mysqli_stmt_bind_param($stmt, "sssssi", $name, $type, $breed, $age, $description, $pet_id);
    } else {
        $stmt = mysqli_prepare($conn, "UPDATE pets SET name=?, type=?, breed=?, age=?, description=?, image=? WHERE pet_id=?");
        mysqli_stmt_bind_param($stmt, "ssssssi", $name, $type, $breed, $age, $description, $image, $pet_id);
    }
    $done = mysqli_stmt_execute($stmt);
    $message = "Pet updated";
}

if ($done) {
    echo json_encode(["success" => true, "message" => $message]);
} else {
    echo json_encode(["success" => false, "message" => "Database error, pet not saved"]);
}
?>
