function avalia(){
db.collection("shops").doc(id).collection("evaluation")
.onSnapshot((querySnapshot) => {
   querySnapshot.forEach((doc) => {          
       document.getElementById('avalia').innerHTML += `
       <div class="col">
       <div class="avaliation">
                <div class="conteudo">
                <h5>Avaliação</h5>
                   <h6> ${doc.data().title}</h6>
                <img src="${doc.data().images[0]}" alt="" style="width:106px;border-radius: 50% ">
                <h5>Nome da oferta</h5>
                <h5> Usúario: ${doc.data().userData['name']}</h5>
                <h6>Entrega: ${doc.data().ratting['delivery']} <img src="img/R.png" alt="" style="width:20px;">
                </h6>
                <h6>Produto: ${doc.data().ratting['product']} <img src="img/R.png" alt="" style="width:26px;"></h6>
                <h6>Embalagens: ${doc.data().ratting['packing']} <img src="img/R.png" alt="" style="width:26px;"></h6>
                <h6>Prazo: ${doc.data().ratting['deadline']} <img src="img/R.png" alt="" style="width:26px;"></h6>
                <h6>Descrição: Descrição do produto: ${doc.data().comment}</h6>
                </div>
         </div>
       </div>`
       products = ""
        }
   );   
});
}
avalia()