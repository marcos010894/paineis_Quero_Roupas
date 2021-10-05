<?php 
session_start();
if(isset($_SESSION['usuario'])){
	?>
<?php include'menu.php' ?>
<script>
    id = `<?php echo $_SESSION['usuario'];?>`
  </script>
<div class="content-wrapper"> 
    <div class="container">
    <div id="avalia" class="row">

    </div>      
</div>
</div>
</div>
<?php include'footer.php' ?>
<script src="dist/js/avaliation.js"></script>
<?php 
}else{
	header("location:login.php");
}
?>