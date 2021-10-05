<?php 

session_start();


$dados = $_POST['logista'];

$_SESSION['usuario'] = $dados;

echo 1;
?>