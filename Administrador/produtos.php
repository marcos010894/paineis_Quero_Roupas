<?php 
session_start();
if(isset($_SESSION['usuario'])){
    $user = $_SESSION['usuario'];
?>
<?php include'menu.php' ?>
<style>
</style>
<div class="content-wrapper"> 
    <div class="container-fluid">
    <h1 style="text-align:center;">Produtos</h1>
        <div class="row">
            <div class="col-md-4">
            <div class="adicionar">
                <div class="form-group">
                    <label for="">Adicionar Produtos</label>
                    <input type="text" class="form-control" id="produto" aria-describedby="produtos"  placeholder="Digite o produto">
                </div>
                <div id="tamanhos0">
                    <div class="form-group">
                        <label for="">Tamanho 00</label>
                        <input type="number" class="form-control" id="produto_0" aria-describedby="produtos"  placeholder="Digite o Tamanho">
                    </div>
                    <div id="tamanhos1"></div>
                </div>
                <div class="form-group">
                    <button class="adicionar_tamanho" onclick="size()"><img src="dist/img/1270001.svg" style="width:30px;color:green;" alt=""></button>
                </div>
                <button type="submit" onclick="register_product()" class="btn btn-warning">Cadastrar</button>
            </div>                    
            </div>
            <div class="col-md-6" >
            <div class="get_table">
            <p>Produtos</p>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Produto</th>
                <th scope="col">Tamanhos</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
                </tr>
            </thead>
            <tbody id="tableProduct">
               
            </tbody>
            </table>
            </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Editar Produtos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <label for="">Editar Produto</label>
      <div id="input_editproduct"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-warning" onclick="finalizar_edit()" data-dismiss="modal">Salvar edição</button>
      </div>
    </div>
  </div>
</div>

<!--
    MODAL EXCLUIRRRRRRRRRRRRRRRRRRRRR
-->
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Tem certeza?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="delete_confirm"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">fechar</button>
        <button type="button" class="btn btn-danger" onclick="confirm_delete()"  data-dismiss="modal">Excluir</button>
      </div>
    </div>
  </div>
</div>
<?php include'footer.php' ?>
<script src="dist/js/classJS/produtos.js"></script>
<?php
    }else{
        header("location:login.php");
    }
?>