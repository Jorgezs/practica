<?php
header("Content-Type: application/json");
include_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));


if (!empty($data->id)) {
    $query = "DELETE FROM items WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $data->id);

    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Elemento eliminado correctamente."]);
    } else {
        echo json_encode(["message" => "No se pudo eliminar el elemento."]);
    }
} else {
    echo json_encode(["message" => "ID no proporcionado."]);
}
