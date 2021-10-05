<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>QueroApps| Dashboard</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="plugins/jqvmap/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="plugins/summernote/summernote-bs4.min.css">
  <link rel="stylesheet" href="dist/css/style.css">
  
  <script src="https://www.gstatic.com/firebasejs/6.3.5/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.3.5/firebase-firestore.js"></script>
  <style>
    body{
      font-family: TommySoftRegular,Arial,Helvetica,sans-serif!important;
    }
  </style>
  </head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">
  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="https://queroapps.com/QueroRoupas/lojista/img/Logo.png" alt="AdminLTELogo" height="180" width="180">
  </div>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
      <iframe src="silence.mp3" allow="autoplay" id="audio" style="display:none"></iframe>
        <audio>
          <source src="alert.mp3" type="audio/mp3">
        </audio>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a  class="nav-link" href="./procedimentos/logout.php" >Sair</a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-light-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
    <center>
    <img src="https://queroapps.com/QueroRoupas/lojista/img/Logo.png" alt="AdminLTE Logo" class="" style="width: 150px">
    </center>
    </a>
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
        </div>
        <div class="info">
          <a href="#" class="d-block"><div id="nameUser"></div></a>
          <span class="glyphicon glyphicon-off"></span> 

        </div>
      </div>
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <a href="index.php" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
            <li class="nav-item">
                <a href="index.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dados</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="avaliação.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Avaliações</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-chart-pie"></i>
              <p>
                Gerenciar
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="ofertas.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Ofertas</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="novospedidos.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Novos Pedidos</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="andamento.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Pedidos em Andamento</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="concluido.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Pedidos Concluidos</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-chart-pie"></i>
              <p>
                Financeiro
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="fatura.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Pagar Contas</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="boletospagos.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Contas pagas</p>
                </a>
              </li>
            </ul>
          </li>           
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Pedidos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="pedidosmodal">

        </div>
      </div>
      <div class="modal-footer">
        
      </div>
    </div>
  </div>
</div>