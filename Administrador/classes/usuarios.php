<?php


	class usuarios{
		public function registrarUser($dados){
			$c = new conectar();
			$conexao=$c->conexao();

			$sql = "INSERT INTO lojista (user, senha, fatura, priority, shopName) VALUES ('$dados[0]', '$dados[1]','$dados[2]','$dados[3]', '$dados[4]')";

			return mysqli_query($conexao, $sql);

		}
	}