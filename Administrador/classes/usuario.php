<?php 
    class usuario{
        public function login($dados){
                $c = new conectar();
            $conexao = $c->conexao();

             $senha = $dados[1]; //discriptografar depois


             $_SESSION['iduser'] = self::trazerId($dados);

             $sql = "SELECT * from adm where user = '$dados[0]' and senha = '$senha'";
             $result = mysqli_query($conexao, $sql);
             if(mysqli_num_rows($result) > 0){
                $_SESSION['usuario'] = $dados[0];
                 return 1;
                }else{
                    return 0;
                }
        }
        public function trazerId($dados){
            $c = new conectar();
            $conexao= $c->conexao();
            $sql = "SELECT id from adm where user='$dados[0]' and senha = '$dados[1]' ";
            $result=mysqli_query($conexao, $sql);
            return mysqli_fetch_row($result)[0];
        }
        public function trazerPermission($dados){
            $c = new conectar();
            $conexao= $c->conexao();
            $sql = "SELECT permisao from adm where user='$dados[0]' and senha = '$dados[1]' ";
            $result=mysqli_query($conexao, $sql);
            return mysqli_fetch_row($result)[0];
        }
    }