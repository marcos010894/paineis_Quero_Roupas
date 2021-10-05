const audio = document.querySelector('audio')

function pedidos(){
    document.getElementById('pedidos').innerHTML = '';
    var modelo;
    var tamanho;
    var products = "";
    var payament;
    var totaldesconto;
    var valorReal;
    var valorfinalEntrega;
    var valorfinalRetirada;
    var delivery;
    db.collection("shops").doc(id).collection("orders")
     .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {          
          if(doc.data().status == 0){                    
            audio.play()
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
              valorfinalEntrega = valorReal + doc.data().teleForFree
            }else{
             delivery = `
             <h4 style="color:green;">Retirar na loja</h4>
            `
            totaldesconto = doc.data().valueDiscount/100 * doc.data().valueReal;
            valorReal =  doc.data().valueReal - parseFloat(totaldesconto)
            }
            
            document.getElementById('pedidos').innerHTML += `
            <div class="col-sm">
            <div class="pedido">
                <div class="conteudo">
                ${delivery}
                  <h5>Pedido: ${doc.id}</h5>
                  <h5> Usúario: ${doc.data().userData['name']}</h5>
                  ${products}
                  <h6>Endereço: ${doc.data().userData['district']}</h6>
                  <h6>Referencia: ${doc.data().userData['reference']}, ${doc.data().userData['numberHome']}</h6>
                  <h6>Contato: ${doc.data().userData['phone']}</h6>
                  ${payament}
                  <h5 style="color:green">Valor total: R$ ${parseFloat(valorfinal.toFixed(2))}</h5>
                  <button class="btn btn-success" onclick="aceitar('${doc.id}')">Aceitar!</button>      
                  <button class="btn btn-danger" onclick="negar('${doc.id}')">Negar!</button>        
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
    status: 1
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

