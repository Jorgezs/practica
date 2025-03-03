<?php
header("Content-Type: application/json");
include_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->nombre) && !empty($data->descripcion)) {
    $query = "INSERT INTO items (nombre, descripcion) VALUES (:nombre, :descripcion)";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":nombre", $data->nombre);
    $stmt->bindParam(":descripcion", $data->descripcion);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Elemento creado correctamente."]);
    } else {
        echo json_encode(["message" => "No se pudo crear el elemento."]);
    }
} else {
    echo json_encode(["message" => "Datos incompletos."]);
}
