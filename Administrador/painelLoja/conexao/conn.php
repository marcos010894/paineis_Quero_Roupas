<?php 



	 $servidor = "queroapps.com";//endereço do Mysql
	 $usuario = "quer9106_lojista";//login Para acessar o Mysql
	 $senha = "Mito010894@";//senha do Mysql
	 $bd = "quer9106_painel";//nome do banco para realizar a conexão

	 $mysqli = new mysqli($servidor, $usuario, $senha, $bd);
		// Check connection
		if (!$mysqli) {
			die("Connection failed: " . mysqli_connect_error());
		}


?>
