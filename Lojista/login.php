<?php
	require_once "classes/conexao.php";
	$obj = new conectar();
	$conexao = $obj->conexao();

	$sql = "SELECT * from lojista where user='admin'";
	$result = mysqli_query($conexao, $sql);

	$validar = 0;
	if(mysqli_num_rows($result) > 0){
		$validar = 1;
	}

?>
<head lang="pt-br">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Pagina de login</title>
    <link rel="stylesheet" href="./assets/css/bootstrap.css">    
    <style>
        .main-content{
	width: 50%;
	border-radius: 20px;
	box-shadow: 0 5px 5px rgba(0,0,0,.4);
	margin: 6em auto;
	display: flex;
}
@media screen and (max-device-width: 900px) {
    .main-content{
        width: 50%;
        border-radius: 20px;
        box-shadow: 0 5px 5px rgba(0,0,0,.4);
        margin: 5em auto;
        display: flex;
        
    }
    
}
.company__info{
	background-color:#FCE33D;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: #fff;
}
.fa-android{
	font-size:3em;
}
@media screen and (max-width: 640px) {
	.main-content{width: 90%;}
	.company__info{
		display: none;
	}
	.login_form{
		border-top-left-radius:20px;
		border-bottom-left-radius:20px;
	}
}
@media screen and (min-width: 642px) and (max-width:800px){
	.main-content{width: 70%;}
}
.row > h2{
	color:hsl(45deg 92% 51%);
}
.login_form{
	background-color: #fff;
	border-top-right-radius:20px;
	border-bottom-right-radius:20px;
	border-top:1px solid #ccc;
	border-right:1px solid #ccc;
}
form{
	padding: 0 2em;
}
.form__input{
	width: 70%;
	border:0px solid transparent;
	border-radius: 0;
	border-bottom: 1px solid #aaa;
	padding: 1em .5em .5em;
	padding-left: 2em;
	outline:none;
	margin:1.5em auto;
	transition: all .5s ease;
}
.form__input:focus{
	border-bottom-color:hsl(45deg 92% 51%);
	box-shadow: 0 0 5px rgba(67, 0, 80, 0.4); 
	border-radius: 4px;
}
.btn{
	transition: all .5s ease;
	width: 50%;
	border-radius: 30px;
	color:hsl(45deg 92% 51%);
	font-weight: 600;
	background-color: #fff;
	border: 1px solidhsl(45deg 92% 51%);
	margin-top: 1.5em;
	margin-bottom: 1em;
}
.btn:hover, .btn:focus{
	background-color:hsl(45deg 92% 51%);
	color:#fff;
}
</style>
<script src="lib/jquery-3.2.1.min.js"></script>
<script src="js/funcoes.js"></script>
</head>
<body>
	<!-- Main Content -->
	<div class="container-fluid">
		<div class="row main-content text-center">
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
					<div class="row">
						<h2>Logar</h2>
					</div>
					<div class="row">
						<form id="frmLogin" class="form-group">
							<div class="row">
								<input type="text" name="email" id="email" class="form__input" placeholder="Username">
                                 
							</div>
							<div class="row">
								<!-- <span class="fa fa-lock"></span> -->
								<input type="password"  id="senha" name="senha" class="form__input" placeholder="Password">
							</div>
							<div class="container-fluid text-center footer">
							<span class="btn btn-primary btn-sm" id="entrarSistema">Entrar</span>
							</div>
						</form>
					</div>
					<div class="row">
					</div>
				</div>
			</div>
            <div class="col-md-4 text-center company__info">
				<img src="https://queroapps.com/QueroRoupas/lojista/img/Logo.png" alt="" srcset="">
			</div>
		</div>
	</div>
	<!-- Footer -->
	<div class="container-fluid text-center footer">
		
	</div>
</body>
<script type="text/javascript">
	$(document).ready(function(){
		$('#entrarSistema').click(function(){

		vazios=validarFormVazio('frmLogin');

			if(vazios > 0){
				alert("Preencha os campos!!");
				return false;
			}

		dados=$('#frmLogin').serialize();
		$.ajax({
			type:"POST",
			data:dados,
			url:"procedimentos/login.php",
			success:function(r){
				//alert(r);
				if(r==1){
					window.location="index.php";
				}else{
					alert("Acesso Negado!!");
				}
			}
		});
	});
	});
</script>