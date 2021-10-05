<?php 
session_start();
if(isset($_SESSION['usuario'])){
    
    $user = $_SESSION['usuario'];
?>
<?php 
    include 'menu.php';
?>
<div class="content-wrapper">
    <div class="container">
        <h1 style="text-align:center;">Lojas</h1>
        <h5>Pesquisar Lojas</h5>
        <select class="form-control" name="" onchange="pesquisar(this)" id="pesquisa">
        </select>
        <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Prioridade</th>
                    <th>Dia de vencimetno</th>
                    <th>CNPJ</th>
                    <th>Ativar</th>
                    <th>Veja mais</th>
                    <th>Alterar</th>
                    <th>Pagamento</th>
                </tr>
            </thead>
            <tbody id="tablesShops">
            </tbody>
        </table>
        </div>
    </div>    
</div>
<?php 
    include 'footer.php';
?>
<script src="dist/js/classJS/shopsTable.js"></script>
<?php
    }else{
        header("location:login.php");
    }
?>