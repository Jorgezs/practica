<?php
require_once __DIR__ . '/../vendor/autoload.php';
use \Firebase\JWT\JWT;

class JwtHelper {
    private static $key = "clave_secreta_para_jwt"; // Cambia esto por una clave secreta segura

    public static function generateToken($data) {
        $payload = [
            "iat" => time(),
            "exp" => time() + (60 * 60), // Token válido por 1 hora
            "data" => $data
        ];
        return JWT::encode($payload, self::$key, 'HS256');
    }

    public static function validateToken($token) {
        try {
            return JWT::decode($token, self::$key, ['HS256']);
        } catch (Exception $e) {
            return null;
        }
    }
}
