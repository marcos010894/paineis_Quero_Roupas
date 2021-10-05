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
    <h1 style="text-align:center;">Ofertas a serem aceitas</h1>
        <div class="row" id="miniOffer">
            
        </div>
    </div>
</div>
</div>


<div class="container">
 <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
      <table class="table" id="tableOffer">
        <thead>
            <tr>
              <th scope="col">Ofertas</th>
            </tr>
        </thead>
        <tbody id="bodyTable">

        </tbody>
        </table>
        </div>
      <div class="modal-footer" id="modalFooter">
      
      </div>
    </div>
  </div>
</div>

<?php include'footer.php' ?>
<script src="dist/js/classJS/uploadImagens.js"></script>
<script src="dist/js/classJS/offer.js"></script>

<?php
    }else{
        header("location:login.php");
    }
?>