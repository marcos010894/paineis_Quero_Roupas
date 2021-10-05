<?php   
    require_once '../classes/conexao.php';
    require_once '../classes/usuarios.php';

    $obj = new usuarios;

    $dados=array(
        $_POST['user'],
        $_POST['senha'],
        $_POST['fatura'],
        $_POST['priority'],
        $_POST['shopName']
    );

echo $obj->registrarUser($dados);