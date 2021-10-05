<?php 
session_start();
if(isset($_SESSION['usuario'])){
	?>
<?php include'menu.php' ?>
<div class="content-wrapper"> 
  <div class="container">
      <table class="table" style="color: green;">
        <thead>
          <th>Dia</th>          
          <th>Mês</th>          
          <th>Ano</th>
        </thead>
        <tbody id="tablePag">
        </tbody>
      </table>
  </div>
</div>
<?php include'footer.php' ?>
<script src="dist/js/pedidos.js"></script>
<script src="dist/js/infosloja.js"></script>
<script src="dist/js/tablepago.js"></script>

<?php 
}else{
	header("location:login.php");
}
?>