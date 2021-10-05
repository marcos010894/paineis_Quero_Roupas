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
    <h1 style="text-align:center;">Categorias</h1>
        <div class="row">
            <div class="col-md-4">
            <div class="adicionar">
                <div class="form-group">
                    <label for="">Adicionar Categoria</label>
                    <input type="text" class="form-control" id="categoria" aria-describedby="categoria"  placeholder="digite a categoria">
                </div>
                <button type="submit" onclick="register_category()" class="btn btn-warning">Cadastrar</button>
            </div>                    
            </div>
            <div class="col-md-6" >
            <div class="get_table">
            <p>Categorias</p>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Categoria</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
                </tr>
            </thead>
            <tbody id="tableCategory">
               
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
        <h5 class="modal-title" id="exampleModalLongTitle">Editar Categoria</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <label for="">Adicionar Categoria</label>
      <div id="input_editcat"></div>
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
<script src="dist/js/classJS/categorias.js"></script>
<?php
    }else{
        header("location:login.php");
    }
?>