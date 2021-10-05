<?php 
session_start();
if(isset($_SESSION['usuario'])){
    $user = $_SESSION['usuario'];
?>
<?php include'menu.php' ?>
<style>
</style>
<div class="content-wrapper"> 
    <div class="container">
        <br>
        <div class="registro">
            <form id="frmRegistro">
                <div><label for="user">Login</label></div>
                <div>
                    <input type="text" name="user" id="user">
                </div>
                <div><label for="senha">Senha</label></div>
                <div>
                    <input type="password" name="senha" id="senha">
                </div>
                <div><label for="fatura">Vencimento Fatura</label></div>
                <div>
                    <input type="number" name="fatura" id="fatura">
                </div>
                <div><label for="priority">priority</label></div>
                <div>
                    <input type="number" name="priority" id="priority">
                </div>
                <div><label for="shopName">Nome da loja</label></div>
                <div>
                    <input type="text" name="shopName" id="shopName">
                </div>                                
            </form>
            <div>
                <br>
                <button id="btnRegistra" type="button" class="btn btn-primary" > Proximo -> </button>
            </div> 
            <div id="loading">
                Capturando Dados.
                <img src="https://img1.picmix.com/output/stamp/normal/8/5/2/9/509258_fb107.gif" alt="" style="width: 45px;;">        
            </div>
            <div id="frmRegistroFirebase">
                <div><label for="">CNPJ</label></div>
                <div>
                    <input type="text" name="CNPJ" id="CNPJ">
                </div>
                <div><label for="">City</label></div>
                <div>
                    <select id="city">
                    </select>
                </div>
                <div><label for="">Endereço</label></div>
                <div>
                    <input type="text"  id="address">
                </div>
                <div><label for="priority">taxa de entrega</label></div>
                <div>
                    <input type="number"  id="taxa">
                </div>
                <div><label for="">Telefone</label></div>
                <div>
                    <input type="text"  id="number">
                </div> <br>
                <button id="btnRegistra" type="button" onclick="registrar()" class="btn btn-primary" >Finalizar</button>


            </div>
            </div>
    </div>
</div>


<?php include'footer.php' ?>
<script src="dist/js/classJS/cidades.js"></script>
<script src="dist/js/registerLoja.js"></script>

<script >
        function validarFormVazio(formulario){
            dados=$('#' + formulario).serialize();
            d=dados.split('&');
            vazios=0
            for(var i=0;i<d.length;i++){
                controles=d[i].split("*");
                if(controles[i] == "A" || controles[i]==""){
                    vazios++;
                    console.log(controles[i])
                }
            }
            return vazios;
        }

        $(document).ready(function(){
            $('#btnRegistra').click(function(){
                vazios=validarFormVazio('frmRegistro');
                if(vazios > 0){
					alert("Preencha os campos!!");
					return false;
				}
                dados = $('#frmRegistro').serialize()
                console.log(dados)
                
                $('#btnRegistra').css('display', 'none')
                $('#loading').css('display', 'block')
                $.ajax(
                    {
                        type:"POST",
                        data:dados,
                        url:'./procedimentos/registraUser.php',
                        success:function(r){
                            console.log(r)
                            if(r==1){                                
                                $('#frmRegistro').css('display', 'none')
                                $('#frmRegistroFirebase').css('display', 'block')                                
                                $('#loading').css('display', 'none')
                            }else{                                
                                $('#frmRegistro').css('display', 'block')
                                alert("error, contate o desenvolvedor")
                            }
                        }
                        
                    }
                )
            })
        });
</script>
<?php
    }else{
        header("location:login.php");
    }
?>