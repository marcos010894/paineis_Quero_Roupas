<?php 
session_start();
if(isset($_SESSION['usuario'])){
	?>
<?php
   $acess_tokken = "APP_USR-2719353644455280-072316-b0a7bdc4395fd4ff4b98ced1f45deda4-220390360";

   if(isset($_REQUEST['collection_id'])){
       $collectionId = $_REQUEST['collection_id'];
   }
   $curl = curl_init();
?>
<?php include'menu.php' ?>
<script>
    id = `<?php echo $_SESSION['usuario'];?>`
</script>
    

<div class="content-wrapper"> 
    <div class="container">
<?php

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://api.mercadopago.com/v1/payments/'.$collectionId,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array (
        'Authorization: Bearer '.$acess_tokken
    ),

));
$payament_info = json_decode(curl_exec($curl), true);
curl_close($curl);
//echo '<prev/>';
//var_dump($payament_info);
?>
    <h1>Atenção em brave daremos baixa ao seu pagamento.</h1> 
</div>
</div>
<?php include'footer.php' ?>

<?php 
}else{
	header("location:login.php");
}
?>