<?php
header("Content-Type: application/json");
include_once __DIR__ . '/../config/database.php';
include_once __DIR__ . '/../helpers/jwt_helper.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $query = "SELECT id, username, password, role FROM users WHERE username = :username";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":username", $data->username);
    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar la contraseña
        if (hash('sha256', $data->password) === $user['password']) {
            $token = JwtHelper::generateToken([
                "id" => $user['id'],
                "username" => $user['username'],
                "role" => $user['role']
            ]);

            echo json_encode([
                "message" => "Inicio de sesión exitoso.",
                "token" => $token
            ]);
        } else {
            echo json_encode(["message" => "Contraseña incorrecta."]);
        }
    } else {
        echo json_encode(["message" => "Usuario no encontrado."]);
    }
} else {
    echo json_encode(["message" => "Datos incompletos."]);
}
