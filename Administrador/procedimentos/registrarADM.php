<?php   
    require_once '../classes/conexao.php';
    require_once '../classes/usuariosADM.php';

    $obj = new usuariosADM;

    $dados=array(
        $_POST['user'],
        $_POST['senha'],
        $_POST['nomeUser'],
        'adm'
    );

echo $obj->registrarUser($dados);