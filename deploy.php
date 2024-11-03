<?php
// El secreto compartido definido en el webhook de GitHub (opcional)
$secret = 'ejemplodeprueba';

// Obtén el payload JSON
$payload = file_get_contents('php://input');
$headers = getallheaders();

// Verifica la firma del webhook (opcional)
if (isset($headers['X-Hub-Signature-256'])) {
    $signature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    if (!hash_equals($signature, $headers['X-Hub-Signature-256'])) {
        // La firma no coincide, termina la ejecución
        http_response_code(403);
        exit('Invalid signature');
    }
}

// Decodifica el payload JSON
$data = json_decode($payload);

// Verifica que el evento sea un push a la rama principal
if ($data->ref === 'refs/heads/main') {
    // Ruta a tu repositorio en el servidor
    $repo_dir = '/home1/proye477/elianreyes.proyectosidgs.com/portafolio';

    // Comando para actualizar el repositorio
    $output = shell_exec("cd {$repo_dir} && git pull origin main 2>&1");

    // Log de salida (opcional)
    file_put_contents('deploy_log.txt', $output, FILE_APPEND);
}
?>
