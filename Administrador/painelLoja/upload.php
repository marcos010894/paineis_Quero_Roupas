<?php
     header('Access-Control-Allow-Origin: *'); 
     header('Content-Type: application/json; charset=utf-8');
      class upload 
      {
        private $novo_nome;
        private $diretorio;
        private $extensao;
        private $retorno;
        public function uploadimg()

        {
            $this->extensao = strtolower(substr($_FILES['arquivo']['name'], -5)); //subsstring
            //md5(time()) .
            $this->novo_nome = md5(time()) .  $this->extensao;
            $this->diretorio = "upload/";

            move_uploaded_file($_FILES['arquivo']['tmp_name'], $this->diretorio.$this->novo_nome);

        }
        public function retorno(){
                  $this->retorno =  array(
                   'url' => 'https://eaglesoftware.com.br/api2.0/upload/'.$this->novo_nome
                  );
                  return 'http://queroapps.com/QueroRoupas/lojista/upload/'.$this->novo_nome;
        }
      }

      $comando = new upload;
      $comando->uploadimg();
      echo $comando->retorno();
?>
