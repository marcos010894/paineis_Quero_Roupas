<?php


	class usuariosADM{
		public function registrarUser($dados){
			$c = new conectar();
			$conexao=$c->conexao();

			$sql = "INSERT INTO adm (user, senha, nomeUser, permisao) VALUES ('$dados[0]', '$dados[1]','$dados[2]','$dados[3]')";

			return mysqli_query($conexao, $sql);

		}
	}