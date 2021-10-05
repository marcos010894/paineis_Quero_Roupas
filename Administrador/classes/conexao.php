<?php 

    class conectar{
        private $servidor = "queroapps.com";//endereço do Mysql
        private $usuario = "quer9106_lojista";//login Para acessar o Mysql
        private $senha = "Mito010894@";//senha do Mysql
        private $bd = "quer9106_painel";//nome do banco para realizar a conexão

        public function conexao(){
            $conexao = mysqli_connect($this->servidor, $this->usuario, $this->senha, $this->bd);
            return $conexao;
        }
    }
?>