<?php
// Escapar datos para evitar XSS
function limpiar($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// Obtener valor de 'valor' y 'nombre' de forma segura
$valor = isset($_REQUEST['valor']) ? limpiar($_REQUEST['valor']) : '';
$nombre = isset($_REQUEST['nombre']) ? limpiar($_REQUEST['nombre']) : 'invitado';

// Determinar método y mensaje
if ($valor === 'POST') {
    $mensaje = "Hola $nombre, has pulsado el botón POST";
} else  if ($valor === 'GET'){
    $mensaje = "Hola $nombre, has pulsado el botón GET";
}

// Imprimir mensaje
echo $mensaje;
?>
