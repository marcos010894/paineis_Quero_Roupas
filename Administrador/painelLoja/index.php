<?php 
session_start();
if(isset($_SESSION['usuario'])){
  $user = $_SESSION['usuario'];
	?>
<?php include 'menu.php' ?>
<style>
  .grapchsDay{
    width:100%;
    height:150px;
    background-color: #ffad01;
    padding: 10%;
    border-radius:20px;
    box-shadow: 5px 10px #eeeeee;
    color:white;
    font-size:25px;
    text-align:center;
  }
  .grapchsMes{
    width:100%;
    height:150px;
    background-color: #ffc100;
    padding:10%;
    border-radius:20px;
    box-shadow: 5px #eeeeee  ;
    color:white;
    font-size:25px;
    text-align:center;
  }
  .grapchsYer{
    width:100%;
    height:150px;
    background-color: #fed74e;
    padding:10%;
    border-radius:20px;
    box-shadow: 5px 10px #e4e4e4   ;
    color:white;
    font-size:25px;
    text-align:center;
  }
  .valorgrap{
    font-size:35px;
  }
</style>
  <script>
    id = `<?php echo $user;?>`
  </script>
    <!-- Main content --><br>
    <section class="content-wrapper" id="main">
      <div class="container"> 
        <div class="row"> 
            <DIV class="col-md">
              <div class="grapchsDay">
                Vendido Hoje.
                <div class="valorgrap" id="day">
                R$ 00
                </div>
              </div>
            </DIV>
            <DIV class="col-md">
            <div class="grapchsMes">Vendido esse mês.
              <div class="valorgrap" id="mes">R$ 00</div>
            </div>
            </DIV>
            <DIV class="col-md">
              <div class="grapchsYer">Vendido esse ano.
                <div class="valorgrap" id="ano">R$ 00</div>
              </div>
            </DIV>
          </div><br><br>

        <div class="row">
            <div class="col">             
              <br><br>
                <div id="chart"></div>
            </div>
            <div class="col">
              <div class="global">
                <div class="form-group" id="personalize"></div>
                <div id="cards"></div>
                <div style="text-align:center">
                <button class="btn btn-warning" onclick="atualizarcardsandtaxa()">Finalizar</button>
                </div>
                </div>
            </div>
        </div>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        
        google.charts.load('current', { packages: [ 'corechart' ] })
      setTimeout(() => {
        google.charts.setOnLoadCallback(drawChart)

      }, 5500);
        function drawChart() {
            var container = document.querySelector('#chart')
            var datagraphics = new google.visualization.arrayToDataTable([
                [ 'Character', 'Valor' ],
                [ 'Jan', parseFloat(mes01) ],
                [ 'Fev', parseFloat(mes2) ],
                [ 'Mar', parseFloat(mes3) ],
                [ 'Abr', parseFloat(mes4) ],
                [ 'Maio', parseFloat(mes5) ],
                [ 'Jun', parseFloat(mes6) ],
                [ 'Jul', parseFloat(mes7) ],
                [ 'Agot', parseFloat(mes8) ],
                [ 'Set', parseFloat(mes9) ],
                [ 'Out', parseFloat(mes10) ],
                [ 'Nov', parseFloat(mes11) ],
                [ 'Dez', parseFloat(mes12) ],
            ])
            var options = {
                title: 'Vendas No ano',
                height: 400,
                width: 650
            }

            // var chart = new google.visualization.ColumnChart(container)
            // var chart = new google.visualization.BarChart(container)
            // var chart = new google.visualization.LineChart(container)
            var chart = new google.visualization.LineChart(container)

            chart.draw(datagraphics, options)
            
        }
    </script>
      </div> 
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.1.0
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->
<?php include 'footer.php' ?>
<?php 
}else{
	header("location:login.php");
}
?>