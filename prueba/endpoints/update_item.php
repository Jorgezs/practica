<?php
header("Content-Type: application/json");
include_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

// Log para verificar los datos recibidos
file_put_contents("log.txt", json_encode($data) . PHP_EOL, FILE_APPEND);

if (isset($data["id"], $data["nombre"], $data["descripcion"])) {
    $query = "UPDATE items SET nombre = :nombre, descripcion = :descripcion WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $data["id"], PDO::PARAM_INT);
    $stmt->bindParam(":nombre", $data["nombre"], PDO::PARAM_STR);
    $stmt->bindParam(":descripcion", $data["descripcion"], PDO::PARAM_STR);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Elemento actualizado correctamente."]);
    } else {
        echo json_encode(["message" => "No se pudo actualizar el elemento."]);
    }
} else {
    echo json_encode(["message" => "Datos incompletos."]);
}
?>
