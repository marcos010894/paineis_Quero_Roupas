<?php 
    class usuario{
        public function login($dados){
                $c = new conectar();
            $conexao = $c->conexao();

             $senha = $dados[1]; //discriptografar depois

             $_SESSION['usuario'] = $dados[0];
             $_SESSION['iduser'] = self::trazerId($dados);

             $sql = "SELECT * from lojista where user = '$dados[0]' and senha = '$senha'";
             $result = mysqli_query($conexao, $sql);
             if(mysqli_num_rows($result) > 0){
                 return 1;
                }else{
                    return 0;
                }
        }
        public function trazerId($dados){
            $c = new conectar();
            $conexao= $c->conexao();
            $sql = "SELECT id from lojista where user='$dados[0]' and senha = '$dados[1]' ";
            $result=mysqli_query($conexao, $sql);
            return mysqli_fetch_row($result)[0];
        }
    }