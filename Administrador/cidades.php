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
    <h1 style="text-align:center;">Cidades</h1>
        <div class="row">
            <div class="col-md-4">
            <div class="adicionar">
                <div class="form-group">
                    <label for="">Adicionar Cidades</label>               
                        <select id="estado" class="form-control"name="estado" onchange="buscaCidades(this.value)">
                            <option value="">Selecione um estado</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                            <option value="EX">Estrangeiro</option>
                        </select><br>
                        <select id="cidade" class="form-control" >
                            <option class="form-control">Por favor, selecione um estado</option>
                        </select>
            </div>
                <button type="submit" onclick="register_city()" class="btn btn-warning">Registrar Cidade</button>
            </div>                    
            </div>
            <div class="col-md-6" >
            <div class="get_table">
            <p>Cidades Registradas</p>
            <table class="table">
            <thead>
                <tr>
                <th scope="rol">UF</th>
                <th scope="col">Cidade</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
                </tr>
            </thead>
            <tbody id="tableCity">
               
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
      <label for="">Editar Cidade</label>
      <div id="input_editcat"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-warning" onclick="finalize_edit_city()" data-dismiss="modal">Salvar edição</button>
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
        <button type="button" class="btn btn-danger" onclick="confirm_delete_city()"  data-dismiss="modal">Excluir</button>
      </div>
    </div>
  </div>
</div>


<?php include'footer.php' ?>
<script src="dist/js/classJS/cidades.js"></script>
<?php
    }else{
        header("location:login.php");
    }
?>