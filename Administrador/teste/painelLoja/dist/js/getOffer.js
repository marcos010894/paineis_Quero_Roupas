var table = document.getElementById('bodyTable')
var categoriesArray = []
var primaryOffer = false;
var idCity;
var idDeleta;
var categoryDeleta;
var mudar = true;
var statusOffer;
var color;
var statusbtn;
function verifyOffer(parm){
    if(parm == false){
        document.getElementById('primaryOFfer').style.display = 'none';
        document.getElementById('tableOffer').style.display = 'block';
    }else{
        //oferta aqui
    }
}
function categoryfunc(){
    table.innerHTML = ''
    setTimeout(function (){
        for(var x=0;x<categoriesArray.length;x++){
            let categoryId = categoriesArray[x]
            var status;
            db.collection("cities")
            .doc(idCity).collection('category')
            .doc(categoryId).collection("offers").get().then(querySnapshot =>{
                querySnapshot.forEach((doc) => {
                    switch(doc.data().isactive){
                        case true:
                            status = "Ativa"
                            statusbtn = "Desativar"
                            color = "green"
                            break;
                        case false:
                            status = "inativa"
                            statusbtn = "Ativar"
                            color = "red"
                            break;
                    }
                    var data = new Date(doc.data().offerDate);
                    var dia = String(data.getDate()).padStart(2, '0');
                    var mes = String(data.getMonth() + 1).padStart(2, '0');
                    var ano = data.getFullYear();
                    dataAtual = dia + '/' + mes + '/' + ano;
                    if(id == doc.data().shopId){
                        table.innerHTML += `
                        <td >
                        <div class="row">
                        <div class="col">
                        <h4> Nome da oferta: ${doc.data().title}</h4>
                        <h6> Categoria: ${doc.data().category} </h6>
                        <h6>Preço:${doc.data().valueReal}</h6>
                        <h6>Desconto: ${doc.data().valueDiscount}%</h6>
                        <h4 style="color:${color}">${status}</h4>
                        <h4 style="color:red">Em breve configurações de estoque</h4>
                        <input type="date" id="dateatt" class="form-control modelo_input" onchange="editadata('${doc.id}', '${categoryId}')" value="${ano}-${mes}-${dia}">
                        <button class="btn btn-warning" onclick="editStatus('${doc.id}', '${categoryId}', '${status}')">${statusbtn}</button>
                        <button class="btn btn-danger" onclick="modalDelete('${doc.id}', '${categoryId}', '${doc.data().title}')"
                        data-toggle="modal" data-target="#exampleModal1">Excluir</button>
                        </div>
                        <div class="col">
                        <img src="${doc.data().images[0]}" class="img-fluid"/>
                        </div>
                      </div>
                      </td>`
                    }
                });
            })
        }
    }),50000    
}
function editadata(iddata, categoryId){
    var milisecunds1 = new Date(document.getElementById('dateatt').value)
    db.collection("cities")
            .doc(idCity).collection('category')
            .doc(categoryId).collection("offers").doc(iddata).update({
                offerDate: milisecunds1.getTime()
            })
}
function modalDelete(id,categoryId,name){
    document.getElementById('delete_confirm').innerHTML = `
    <h4> 
        tem Certeza que deseja excluir a oferta  ${name} ?
    </h4>
        `
    idDeleta = id
    categoryDeleta = categoryId
}
function deleteCategory(){
    db.collection("cities")
            .doc(idCity).collection('category')
            .doc(categoryDeleta).collection("offers").doc(idDeleta).delete().then(function (){
            alert("Excluido com sucesso")
            categoryfunc()
    }).catcth(function(error){
        alert(error)
    })
}
function editStatus(id,categoryId, isactive ){
    var status = isactive
    if (status === "Ativa") {
        db.collection("cities")
        .doc(idCity).collection("category")
        .doc(categoryId).collection("offers").doc(id).update({
            isactive: false
        }).then((doc)=>{
            categoryfunc()
            console.log(categoryId)
        }).catch((error)=>{
            alert("Erro! Contate um administrador!" + " Erro type " + categoryfunc() )
        })
    }else{
        db.collection("cities")
        .doc(idCity).collection("category")
        .doc(categoryId).collection("offers").doc(id).update({
            isactive: true
        }).then((doc)=>{
            categoryfunc()
            console.log(categoryId)
        }).catch((error)=>{
            alert("Erro! Contate um administrador!" + " Erro type " + categoryfunc() )
        })
    }    
}