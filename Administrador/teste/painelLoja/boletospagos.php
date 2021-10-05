<?php 
session_start();
if(isset($_SESSION['usuario'])){
	?>
<?php include'menu.php' ?>
<div class="content-wrapper"> 
  <div class="container">
  <div class="container">
  <div class="row" id="pedidos">

  </div>
</div>
      
  </div>
</div>
<?php include'footer.php' ?>
<script src="dist/js/pedidos.js"></script>

<script src="dist/js/infosloja.js"></script>

<?php 
}else{
	header("location:login.php");
}
?>