<?php 
    session_start();
    require_once "../classes/conexao.php";
    require_once "../classes/usuario.php";

    $obj = new usuario();


    $dados=array(
        $_POST['email'],
        $_POST['senha']
    );

    echo $obj->login($dados);
    
    ?>
