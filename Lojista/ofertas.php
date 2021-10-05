<?php 
session_start();
if(isset($_SESSION['usuario'])){
	?>
<?php include'menu.php' ?>
<script>
    id = `<?php echo $_SESSION['usuario'];?>`
  </script>

<div class="content-wrapper" id="primaryOFfer" style="display:block"> 
    <div class="container">
        <div class="ofertas">
          <h1><b>OPS!</b> Parece que ainda não há nada aqui.</h1>
          <h3>Que tal começar a vender agora ?</h3>
          <h3>Para criar uma oferta é muito simples, basta clicar </h3>
          <h3> no botão criar oferta logo abaxo e seguir o passo a passo.</h3>
          <button class="button_adc" data-toggle="modal" data-target=".bd-example-modal-lg"><img src="https://cdn.pixabay.com/photo/2014/03/25/17/00/plus-297823_1280.png
          " style="width:35px;color:green; " alt=""> Criar oferta</button>
        </div>
    </div>
</div>
<div class="content-wrapper" id="primaryOFfer"> 
<div class="container" ><br>
<button class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">
  <img src="https://th.bing.com/th/id/R.35a962744a9e8d3329b99e7b4d2785b1?rik=zD%2bh1Z43UP6tHA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ffree-png-plus-sign-add-button-with-plus-sign-in-a-circle-comments-980.png&ehk=yHg6zUDUdHjW9%2bQ3Ihl2r3vJKzZWys88pGoabr7V4E0%3d&risl=&pid=ImgRaw
          " style="width:35px;color:black; " alt=""> Criar oferta</button>

<table class="table" id="tableOffer" style="display:none">
  <thead>
    <tr>
      <th scope="col">Ofertas</th>
    </tr>
  </thead>
  <tbody id="bodyTable">

  </tbody>
</table>

</div>
</div>
<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <button type="button" class="btn btn-danger" onclick="deleteCategory()"  data-dismiss="modal">Excluir</button>
      </div>
    </div>
  </div>
</div>
<!--Fim modal Excluir-->
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Adicionar oferta.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="text-align:center;">
        <div class="container">
          <div id="category">
            <h4>Para começar, por favor selecione o a categoria da oferta</h4><br>
          </div>
  
          <div id="product" style="display:none">
            <h4>Agora selecione o produto que vai adicionar</h4><br>
          </div>          
  
          <div id="model" style="display:none">
            <h4>Digite o modelo do produto</h4><br>
          </div>
            
          <div  style="display:none" id="infoProduct">
            <h4>Agora  uma descrição para esté produto:</h4><br>
            <label for="">Descrição deste produto.</label>
            <textarea name="" class="modelo_input form-control" id="descriptionProduct" value=""></textarea>
          </div>

          <div id="sizes" class="row" style="display:none">
            <h4>Quais tamanhos você tem disponivel pra esse produto ?</h4><br>
          </div>
          

          <!--Info dos produtos-->
          <div id="informationsOffer" class="" style="display:none">
            <h4>Digite as informações da oferta.</h4><br>
            <label for="">Nome:</label>
            <input type="text" id="titleOffer" class="modelo_input form-control" placeholder="ex: Oferta relampago">
            <label for="">Descrição da oferta.</label>
            <textarea name=""class="modelo_input form-control" id="descriptionOffer" ></textarea>
            <center><button  type="button"  class="btn btn-success  "  onclick="imagesOffer()">Proximo</button></center>
          </div>

          <div id="imagesOffer" style="display:none;">
          <center>
          <div id="drop-area">
                <form enctype="multipart/form-data" method="POST" class="my-form">
                  <p>Façã o upload das fotos.<p>
                  <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
                  <label class="button"  for="fileElem">Selecione os arquivos.</label>
                 <br> <progress  id="progress-bar" max=100 value=0></progress>
                </form>
                <div id="gallery"></div>
              </div>
              <button type="button"  class="btn btn-success" onclick="finalizeOffer()">Proximo</button>
              </center>
          </div>
          <div id="infosoffer" style="display:none;">
            <div class="row">
              <div class="col">
                <label for="">Qual a data de encerramento da oferta?</label>
                <input type="date" id="offerDate" class="form-control modelo_input">              </div>
              <div class="col">
              <label for="">Data de postagem</label>
                <div id="dateOffer"></div>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <label for="">Valor da oferta</label>
              <input type="number" id="valorReal"  class="modelo_input form-control">
              </div>
              <div class="col">
              <label for="">Porcentagem de desconto</label>
                <select name="" id="valordesconto" onchange="calculadesconto()" class="modelo_input form-control">
                 <option value=30>Selecione o desconto</option>
                  <option value=30>30%</option>
                  <option value=35>35%</option>
                  <option value=40>40%</option>
                  <option value=45>45%</option>
                  <option value=50>50%</option>
                  <option value=55>55%</option>
                  <option value=60>60%</option>
                  <option value=65>65%</option>
                  <option value=70>70%</option>
                  <option value=75>75%</option>
                  <option value=80>80%</option>
                  <option value=85>85%</option>
                  <option value=90>90%</option>
                  <option value=95>95%</option>
                  <option value=100>100%</option>
                </select>
              </div>
              <div class="col">
                <div class="">Valor no aplicativo:<br>
                  <div id="valueApp"></div>
              </div>
              </div>
            </div>
            <center><button onclick="registrar()" id="btnFinalize" style="display:block" class="btn btn-success">Finalizar</button>
            <div id="btnLoad" style="display:none;"><img src="https://queroapps.com/QueroRoupas/lojista/img/%87padomg.gif" style="width: 55px;;" alt=""></div></center>
          </div>


          
          <div id="FinalizeOffer" style="display:none;">
              <div id="menssagemFiline">
                  <img src="./dist/img/check.gif" class="img-fluid" alt="">
              </div>
              <div id="msgSuccess" style="display:none"> 
                <img src="dist/img/check.png" alt="">
                <h4>A sua oferta foi enviada para analise!</h4>
                <h6>Por favor, atualize a pagina.</h6>
              </div>
          </div>

        </div>        
      </div>


  <div class="modal-footer">
      <div id="modalfooter">      
    </div>
        <button type="button" style="display: none;"  class="btn btn-secondary " id="adcProduct" onclick="producspush()">Adicionar mais um produto</button>
        <button type="button" style="display: none;" class="btn btn-success  " id="nextStage" onclick="adcModels(), infosOffer()">Proxima etapa</button>
        
        <button type="button" style="display:none;" class="btn btn-secondary finalizar" data-dismiss="modal">Close</button>
        <button type="button" style="display:none;" class="btn btn-success finalizar salvar">Save changes</button>
    </div>
    </div>
  </div>
</div>
<?php include'footer.php' ?>

<script src="dist/js/getOffer.js"></script>
<!-- jQuery UI 1.11.4 -->

<script src="dist/js/functionproducts.js"></script>
<?php 
}else{
	header("location:login.php");
}
?>