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
        <h1 style="text-align:center;">Usuarios</h1>
        <div id="numberUser"></div>
        <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>telefone</th>
                    <th>cidade</th>
                    <th>Excluir</th>                    
                </tr>
            </thead>
            <tbody id="tableUsers">

            </tbody>
        </table>
        </div>
    </div>    
</div>
<?php 
    include 'footer.php';
?>
<script src="dist/js/classJS/user.js"></script>
<?php
    }else{
        header("location:login.php");
    }
?>