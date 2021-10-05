function pedidos(){
    document.getElementById('pedidos').innerHTML = '';
    var modelo;
    var tamanho;
    var products = "";
    var payament;
    var totaldesconto;
    var valorReal;
    var valorfinal;
    var status = `
            <h4 style="color:Green;"> Pedidos Finalizado </h4>
        `;
    db.collection("shops").doc(id).collection("orders")
     .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          document.getElementById('pedidos').innerHTML += ''
          if(doc.data().status != 0 & doc.data().status != 1 & doc.data().status != 2 & doc.data().status != 3){
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
            if (doc.data().status == 5) {
                var status = `
                   <h4 style="color:red;"> Pedido Cancelado </h4>
                `
            }else{
                var status = `
                   <h4 style="color:green;"> Pedido Finalizado </h4>
                `
            }
            totaldesconto = doc.data().valueDiscount/100 * doc.data().valueReal;
            valorReal =  doc.data().valueReal - parseFloat(totaldesconto)
            valorfinal = valorReal + doc.data().teleForFree
            document.getElementById('pedidos').innerHTML += `
            <div class="col-sm">
            <div class="pedido" style="border:1px solid green">
                  ${status}
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

function negar(idPedido){
  db.collection("shops").doc(id).collection("orders").doc(idPedido).update({
    status: 5
  }).then(function (){
    alert(`Pedido ${idPedido} cancelado, para ver o pedido verifique a aba Pedidos em Concluidos.`)
    pedidos()
  })
}