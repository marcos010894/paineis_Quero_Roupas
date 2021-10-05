function pedidos(){
    document.getElementById('pedidos').innerHTML = '';
    var modelo;
    var tamanho;
    var products = "";
    var payament;
    var totaldesconto;
    var valorReal;
    var valorfinal;
    var delivery;
    var buttons;
    var buttonCancel ;
    db.collection("shops").doc(id).collection("orders")
     .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().status != 0 && doc.data().status != 4 && doc.data().status != 5 ){
            buttonCancel = ` <button class="btn btn-danger">Para cancelar entre em contato com o suporte.</button>        
    `;
            if (doc.data().status == 1) {
              buttons = `<button class="btn btn-success" onclick="aceitar('${doc.id}')">Mandar para entrega!</button>`
            }else if(doc.data().status == 2){
             buttons = `<button class="btn btn-success" onclick="avaliation('${doc.id}')">Mandar para Avaliação!</button>`
            }else{
              buttons = `<button class="btn" onclick="" style="font-size:20px;"><img src="https://queroapps.com/QueroRoupas/lojista/img/%87padomg.gif" style="width:30px">Aguardando avaliação!</button>`
              buttonCancel = `...`
            }
            if (doc.data().delivery == true) {
              delivery = `
               <h4 style="color:green;">Para Entrega</h4>
              `
            }else{
             delivery = `
             <h4 style="color:green;">Retirar na loja</h4>
            `
            }
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
            totaldesconto = doc.data().valueDiscount/100 * doc.data().valueReal;
            valorReal =  doc.data().valueReal - parseFloat(totaldesconto)
            valorfinal = valorReal + doc.data().teleForFree
            document.getElementById('pedidos').innerHTML += `
            <div class="col-sm">
            <div class="pedido" style="border:1px solid green">
                ${delivery}
                <div class="conteudo">
                  <h5>Pedido: ${doc.id}</h5>
                  <h5> Usúario: ${doc.data().userData['name']}</h5>
                  ${products}
                  <h6>Endereço: ${doc.data().userData['district']}</h6>
                  <h6>Referencia: ${doc.data().userData['reference']}</h6> 
                  <h6>Numero da casa: ${doc.data().userData['numberHome']}</h6>
                  <h6>Contato: ${doc.data().userData['phone']}</h6>
                  ${payament}
                  <h5 style="color:green">Valor total: R$ ${parseFloat(valorfinal.toFixed(2))}</h5>
                  ${buttons}  <br>   <br>    
                  <button class="btn btn-danger" onclick="cancelar('${doc.id}')">Cancelar Este pedido</button>"
                  </div>
              </div>
            </div>`
            products = ""
          }
        });       
    });
}
pedidos();

function aceitar(idPedido){
  db.collection("shops").doc(id).collection("orders").doc(idPedido).update({
    status: 2
  }).then(function (){
    alert(`Pedido ${idPedido} Aceito, para ver o pedido verifique a aba Pedidos em andamentos.`)
    pedidos()
  })
}
function cancelar(idPedido){
  db.collection("shops").doc(id).collection("orders").doc(idPedido).update({
    status: 5
  }).then(function (){
    alert(`Pedido ${idPedido} cancelado, para ver o pedido verifique a aba Pedidos em Concluidos.`)
    db.collection("shops").doc(id).collection("graphics").doc(idPedido).delete().then(function (){
      alert('removido do grafico!')
    })
    pedidos()
  })
}
function avaliation(idPedido){
  db.collection("shops").doc(id).collection("orders").doc(idPedido).update({
    status: 3
  }).then(function (){
    alert(`Pedido ${idPedido} Enviado para avaliação, Assim que o usuario avaliar ele ira para concluidos.`)
    pedidos()
  })

}