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
        <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      .bg-primary{
        background-color: hsl(45deg 92% 51%)!important;
        border: 1px solid rgb(255, 0, 170)!important
      }
      .btn-primary:focus{
        border: 1px solid white!important;
        outline: 0!important;
        box-shadow: 0 0 0 0!important;
      }
        </style>
    <?php 
        $acess_tokken = "TEST-8873953312701636-031523-2cc33bfed8ef18ba1928c81452a53235-717640225";
        require_once 'vendor/autoload.php';

        MercadoPago\SDK::setAccessToken($acess_tokken);
        $preference = new MercadoPago\Preference();

        $item = new MercadoPago\Item();
        $item->title = 'Fatura Quero Roupas';
        $item->quantity = 1;
        $item->unit_price = (double)15.00;
        $preference->items= array($item);

        $preference->back_urls = array(
            "success" => 'http://queroapps.com/QueroRoupas/lojista/success.php',
            "failure" => 'http://queroapps.com/QueroRoupas/lojista/notification.php',
            "pending" => 'http://queroapps.com/QueroRoupas/lojista/pending.php'
        );
        $preference->notification_url = 'localhost/Quero_roupasLOJISTA/notification.php';
        $preference->external_reference = 56785;
        $preference->save();

        $link = $preference->init_point;
        
       
        ?>
    </div>
      <center>

      <div class="container my-5">
       <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1">Fatura com preço promocional.</h1>
        <p class="lead">.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
        </div>
      </div>
      <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg" >
          <div class="card mb-4 rounded-3 shadow-sm border-primary" >
          <div class="card-header py-3 text-white bg-primary border-primary" >
            <h4 class="my-0 fw-normal" >Fatura</h4>
          </div>
          <div class="card-body">
            <h1 class=" pricing-card-title" style="font-size:45px;">R$80</h1>
            <ul class="list-unstyled mt-3 mb-4"><br>
              <li>Lojas: Unica.</li>
              <li>Serviço: Quero roupas.</li>
              <li>Plano: Mensal</li>
            </ul>
            
            <button type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="w-100 btn btn-lg btn-success">Pagar agora.</button>
          </div>
        </div>
      </div>
    </div>
  </div>
      </center>
  </div>
</div>
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Fatura</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <iframe src="<?php  echo $link; ?>" frameborder="100" style="width:100%; height:600px;" ></iframe>
      </div>
    </div>
  </div>
</div>

<?php include'footer.php' ?>
<script src="dist/js/pedidoandamento.js"></script>

<?php 
}else{
	header("location:login.php");
}
?>