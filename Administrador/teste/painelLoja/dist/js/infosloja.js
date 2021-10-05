const audio = document.querySelector('audio')
var cidade;
var uf ; 
var id ;
var credit;
var active;
var data = new Date();
var dia1 = String(data.getDate()).padStart(2, '0');
var mes1 = String(data.getMonth() + 1).padStart(2, '0');
var ano1 = data.getFullYear();
dataAtual1 = dia1 + '/' + mes1 + '/' + ano1;
var valorDia = 0;
var somadia = 0
var valormes = 0;
var somames = 0
var valorano = 0;
var somaano = 0
var mes01 = 0 ;  
var mes2 = 0; 
var mes3 = 0; 
var mes4 = 0; 
var mes5 = 0; 
var mes6 = 0;
var  mes7 = 0;
 var mes8 = 0; 
 var mes9 = 0; 
 var mes10 = 0; 
 var mes11 = 0; 
 var mes12 = 0;
 var cartoes = [
  'Visa','MasterCard','Diners',
  'Amex','Hipercard','Elo','Aura',
  'Discover', 'Good Card','VR Benefícios',
  'Banescard', 'Sorocard', 'Policard',
  'Valecard','Agicard','JCB', 'CredSystem',
  'Cabal','Green Card','Verocheque','Avista',
  ]

db.collection("shops").doc(id).collection("graphics")
.onSnapshot((querySnapshot) => {
   querySnapshot.forEach((doc) => {    
     if(doc.data().mes == '01'){
      mes1 +=somames +  doc.data().price
     }
     if(doc.data().mes== '02'){
     mes2 +=somames +  doc.data().price
     }    
     if(doc.data().mes== '03'){
      mes3 +=somames +  doc.data().price
      }    
      if(doc.data().mes== '04'){
        mes4 +=somames +  doc.data().price
        }    
        if(doc.data().mes== '05'){
          mes5 +=somames +  doc.data().price
          }    
          if(doc.data().mes== '06'){
            mes6 +=somames +  doc.data().price
            }    
            if(doc.data().mes== '07'){
              mes7 +=somames +  doc.data().price
              }    
              if(doc.data().mes== '08'){
                mes8 +=somames +  doc.data().price
                }    
                if(doc.data().mes== '09'){
                  mes9 +=somames +  doc.data().price
                  }    
                  if(doc.data().mes== '10'){
                    mes10 +=somames +  doc.data().price
                    }    
                    if(doc.data().mes== '11'){
                      mes11 +=somames +  doc.data().price
                      }    
                      if(doc.data().mes== '12'){
                        mes12 += somames +  doc.data().price
                        }    
  
      if (doc.data().dia == dia1) {
          valorDia += somadia + doc.data().price
          document.getElementById('day').innerHTML = `R$ ${parseFloat(valorDia).toFixed(2)}`
      }
      if (doc.data().mes == mes1) {
        valormes += somames + doc.data().price
        document.getElementById('mes').innerHTML = `R$ ${parseFloat(valormes).toFixed(2)}`
    }
    if (doc.data().ano == ano1) {
      valorano += somaano + doc.data().price
      document.getElementById('ano').innerHTML = `R$ ${parseFloat(valorano).toFixed(2)}`
  }
   });       
});
db.collection("shops").onSnapshot((querySnapshot) =>{
  querySnapshot.forEach((doc) =>{
    if(doc.id == id){
      document.getElementById('personalize').innerHTML += `
      <label for="exampleInputEmail1">Valor da Taxa de entrega.</label>
      <input type="number" class="form-control" id="taxa" value="${doc.data().taxa}">
      <label for="exampleInputEmail1">Cartões aceitos.</label>
      `
      console.log(doc.data().credit.length)
      for(var i=0;i<cartoes.length;i++){
        document.getElementById('cards').innerHTML += `
        <div class="row">
          <div class="col">
        <div class="form-check">
        <input class="form-check-input" type="checkbox" name="teste[]" id="${cartoes[i]}" value="${cartoes[i]}">
        <label class="form-check-label" for="${cartoes[i]}">
        ${cartoes[i]}
        </label>
        </div>
        </div>          
        </div>
        `
        for(var x=0;x<doc.data().credit.length;x++){
        if(document.getElementById(cartoes[i]).value == doc.data().credit[x]){
          truecheck.push(document.getElementById(cartoes[i]).value);
          console.log(truecheck)
        }        
      }
      for(y=0;y<truecheck.length;y++){
      document.getElementById(`${truecheck[y]}`).checked = true;
      }
      }
     
    }
  })
} )
var truecheck = []
var shopAddress = ""
var img_shop = "http://mxserv.com.br/wp-content/uploads/2021/03/loja-virtual.png";
var shopName = "nome da loja"
var taxa = 10
var priority_Loja = 0
var isactive = true
var products = "";
var payament;
var totaldesconto;
var valorReal;
var valorfinal;
var delivery;
db.collection("shops").doc(id).collection("orders")
.onSnapshot((querySnapshot) => {
   querySnapshot.forEach((doc) => {
     if(doc.data().status == 0){
         $("#exampleModal").modal()
         doc.data().products.forEach((e)=>{
            products += `<hr>
            <h4> ${e['product']}  </h4>
            <h6>Modelo: <span>${e['models'][e['model']]['name']}</span></h6>
            <h6>Tamanho: <span>${e['models'][e['model']]['sizes'][e['size']]['name']}</span></h6>
            <hr>
            `})
            if (doc.data().formPayment['title'] == "Dinheiro") {
              payament = `
              <h6> Forma de pagamento: ${doc.data().formPayment['title']}</h6>
              <h6> troco para: R$ ${doc.data().formPayment['thing']}</h6>`
            }else{
              payament = `
              <h6> Forma de pagamento: ${doc.data().formPayment['title']}</h6>
              <h6> Tipo do cartão:${doc.data().formPayment['value']}</h6>`
            }
            if (doc.data().delivery == true) {
              delivery = `
               <h4 style="color:green;">Para Entrega</h4>
              `
              totaldesconto = doc.data().valueDiscount/100 * doc.data().valueReal;
              valorReal =  doc.data().valueReal - parseFloat(totaldesconto)
              valorfinal = valorReal + doc.data().teleForFree
            }else{
             delivery = `
             <h4 style="color:green;">Retirar na loja</h4>
            `
            totaldesconto = doc.data().valueDiscount/100 * doc.data().valueReal;
            valorfinal =  doc.data().valueReal - parseFloat(totaldesconto)
            }
            document.getElementById('pedidosmodal').innerHTML += `
            <div class="col-sm">
            <div class="pedidomodal" style="border:1px solid green">
                <div class="conteudo" style="width:100!important">
                  ${delivery}
                  <h5>Pedido: ${doc.id}</h5>
                  <h5> Usúario: ${doc.data().userData['name']}</h5>
                  ${products}
                  <h6>Endereço: ${doc.data().userData['district']}</h6>
                  <h6>Referencia: ${doc.data().userData['reference']}</h6> 
                  <h6>Numero da casa: ${doc.data().userData['numberHome']}</h6>
                  <h6>Contato: ${doc.data().userData['phone']}</h6>
                  ${payament}
                  <h5 style="color:green">Valor total: R$ ${parseFloat(valorfinal.toFixed(2))}</h5>
                  <button class="btn btn-success" onclick="aceitarMo('${doc.id}', '${valorfinal.toFixed(2)}')">Aceitar!</button>  <br>   <br>    
                  <button class="btn btn-danger" onclick="negarMo('${doc.id}')">Negar</button>        
                </div>
              </div>
            </div>`
            products = ""
         audio.play();
     }
   });
});
function aceitarMo(idPedido, price){
    var total = parseFloat(price)
    db.collection("shops").doc(id).collection("orders").doc(idPedido).update({
      status: 1
    }).then(function (){
      alert(`Pedido ${idPedido} Aceito, para ver o pedido verifique a aba Pedidos em andamentos.`)
      db.collection("shops").doc(id).collection("graphics").add({
          price: total,
          data: dataAtual1,
          ano: ano1,
          mes:mes1,
          dia: dia1
      })
      window.location.reload(1);
      pedidos()
    })
  }
  function atualizarcardsandtaxa(){
    var checados = [];//Salvar
    $.each($("input[name='teste[]']:checked"), function(){            
        checados.push($(this).val());
    });
    console.log(checados);
    db.collection("shops").doc(id).update({
      credit: checados,
      taxa: document.getElementById('taxa').value
    }).then(function (){
      alert("Atualizado com sucesso")
      location.reload();
    })
  }
  function negarMo(idPedido){
    db.collection("shops").doc(id).collection("orders").doc(idPedido).update({
      status: 5
    }).then(function (){
      alert(`Pedido ${idPedido} Cancelado, para ver o pedido verifique a aba Pedidos em Concluidos.`)
      window.location.reload(1);      
    })
  }
db.collection("shops").doc(id)
        .onSnapshot((doc) => {
            active = doc.data().active
            cidade = doc.data().City
            uf = doc.data().UF
            idCity = doc.data().cityId
            priority_Loja = doc.data().priority
            taxa = doc.data().taxa
            shopAddress = doc.data().address
            img_shop = doc.data().img
            shopName = doc.data().name
            credit = doc.data().credit
            document.getElementById('nameUser').innerHTML = `${shopName}`
            verifiActive()
            verifyOffer(doc.data().primaryOffer)
            categoryfunc()            
            console.log(doc.data().img)
        });

        function  verifiActive(){
          if(active == "Ativar"){
            alert("atenção, esta Loja Esta desativada. Entre em contato com um administrador para saber mais!")
            window.location="desativado.html"
          }
        }