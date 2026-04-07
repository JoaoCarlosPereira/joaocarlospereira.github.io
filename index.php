<?php
// Verifica se HTTPS está habilitado
if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
    $uri = 'https://';
} else {
    $uri = 'http://';
}

// Adiciona o hostname
$uri .= $_SERVER['HTTP_HOST'];

// Redireciona diretamente para o index.html
header('Location: '.$uri.'/index.html');
exit;
?>
