<?php
require_once "connection.php";





// Tomar el parámetro "perro" si existe
$id = isset($_GET['perro']) ? trim($_GET['perro']) : '';

// Inicializar la respuesta
$response = [
    "data" => [],
    "mensaje" => ""
];

// Preparar consulta con seguridad
try {
    if (!empty($id)) {
        $sql = "SELECT * FROM perros WHERE chip = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    } else {
        $sql = "SELECT * FROM perros";
        $stmt = $pdo->prepare($sql);
    }

    $stmt->execute();
    $response["data"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($response["data"])) {
        $response["mensaje"] = "No se encontraron registros.";
    }

} catch (PDOException $e) {
    $response["mensaje"] = "Error en la base de datos: " . $e->getMessage();
}

// Enviar JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);

// Cerrar conexión
$pdo = null;
exit();
