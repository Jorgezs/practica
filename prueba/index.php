<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        include_once "endpoints/get_items.php";
        break;
    case 'PUT':
        include_once "endpoints/update_item.php";
        break;
    case 'POST':
        include_once "endpoints/add_item.php";
        break;
    case 'DELETE':
        include_once "endpoints/delete_item.php";
        break;
    case 'OPTIONS':
        // Responder con éxito a preflight requests
        http_response_code(200);
        exit();
    default:
        echo json_encode(["message" => "Método no soportado."]);
        break;
}
?>
