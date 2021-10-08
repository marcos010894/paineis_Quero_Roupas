var docRefShops = db.collection("shops")
var data  = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();

function shops(){    
    docRefShops.get().then(querySnapshot =>{
        querySnapshot.forEach((doc) =>{
        document.getElementById('tablesShops').innerHTML += `
            <tr>
                <td>${doc.data().name}</td>
                <td><input type="text" value="${doc.data().priority}" id="${doc.id}prioridade"></td>     
                <td><input type="text" value="${doc.data().diaVencimento}" id="${doc.id}dia"></td>              
                <td>${doc.data().CNPJ}</td>
                <td><button class="btn btn-primary" onclick="statusShop('${doc.id}', '${doc.data().active}', '${doc.data().cityId}')">${doc.data().active}</button></td>
                <td><button class="btn btn-warning" onclick="lojista('${doc.id}')">Veja mais</button></td>
                <td><button class="btn btn-success" onclick="atualizainfosLoja('${doc.id}', '${doc.data().priority}', '${doc.data().diaVencimento}')">Alterar</button></td>
                <td id="${doc.id}"><button class="btn btn-primary" onclick="darbaixa('${doc.id}', '${dia}', '${mes}', '${ano}')" >Dar baixa.</button></td>
            </tr>
            `       
            docRefShops.doc(doc.id).collection('payaments').get().then(querySnapshot => {
                querySnapshot.forEach((docP) => {
                    console.log(docP.data())
                    if(docP.data().ano == ano){     
                        switch (docP.data().mes){
                            case mes:
                                document.getElementById(doc.id).innerHTML = `<button class="btn btn-success" >TudoCerto.</button>`;
                                break;
                        }
                    }
                })
            })
        })
    })
}
shops()

db.collection("cities").get().then(querySnapshot => {            
    querySnapshot.forEach((doc)=>{      
        document.getElementById('pesquisa').innerHTML += `  
        <option value="${doc.id}">${doc.data().title}</option>`
   });
})

function pesquisar(param){    
    document.getElementById('tablesShops').innerHTML = ''
    docRefShops.get().then(querySnapshot =>{
        querySnapshot.forEach((doc) =>{
        if(doc.data().cityId == param.value) {
           document.getElementById('tablesShops').innerHTML += `
            <tr>
                <td>${doc.data().name}</td>
                <td><input type="text" value="${doc.data().priority}" id="${doc.id}prioridade"></td>     
                <td><input type="text" value="${doc.data().diaVencimento}" id="${doc.id}dia"></td>              
                <td>${doc.data().CNPJ}</td>
                <td><button class="btn btn-primary" onclick="statusShop('${doc.id}', '${doc.data().active}', '${doc.data().cityId}')">${doc.data().active}</button></td>
                <td><button class="btn btn-warning" onclick="lojista('${doc.id}')">Veja mais</button></td>
                <td><button class="btn btn-success" onclick="atualizainfosLoja('${doc.id}', '${doc.data().priority}', '${doc.data().diaVencimento}')">Alterar</button></td>
                <td id="${doc.id}"><button class="btn btn-primary" onclick="darbaixa('${doc.id}', '${dia}', '${mes}', '${ano}')" >Dar baixa.</button></td>
            </tr>
            `       
            docRefShops.doc(doc.id).collection('payaments').get().then(querySnapshot => {
                querySnapshot.forEach((docP) => {
                    console.log(docP.data())
                    if(mes > docP.data().mes  & docP.data().ano == ano){                    
                        document.getElementById(doc.id).innerHTML = `<button class="btn btn-primary" onclick="darbaixa('${doc.id}', '${dia}', '${mes}', '${ano}')" >Dar baixa.</button>`
                        console.log("teste")
                    }else{                    
                        document.getElementById(doc.id).innerHTML = `<button class="btn btn-success" >TudoCerto.</button>`
                    }
                })
            })
            }else {
                console.log(param.value)
            }
        })
    
        
    })
    
    }

function statusShop(id, active, idCity){  
    if(active == "Desativar"){
        docRefShops.doc(id).update({
            active: "Ativar"
        }).then(function(){
           desstivarOffer(id, active, idCity)
        })  
    }else{
        docRefShops.doc(id).update({
            active: "Desativar"
        }).then(function (){
            reativar(id, active, idCity)
        })
    }
}

async function desstivarOffer(id, active, idCity){
    var category ;
await  db.collection("cities").doc(idCity).collection("category").get().then(querySnapshot =>{
        querySnapshot.forEach((doc) => {
            category = doc.id
            db.collection("cities").doc(idCity).collection("category").doc(category).collection('offers').get().then(querySnapshot =>{
                querySnapshot.forEach((doc) => {
                    if(id == doc.data().shopId){       
                        db.collection("cities").doc(idCity).collection("category").doc(category).collection('offers')
                        .doc(doc.id).update({
                            isactive: false
                        }).then(function (){
                            document.location.reload(true);
                        }).catch(() =>{                            
                            //caso de erro verificar aqui
                            document.location.reload(true);
                        })                     
                        console.log(doc.data().isactive)
                    }
                })
            })
        })
    }).then(()=>{
        //caso de erro verificar aqui
        document.location.reload(true);
    })
}

function reativar(id, active, idCity){
    var category ;
    db.collection("cities").doc(idCity).collection("category").get().then(querySnapshot =>{
        querySnapshot.forEach((doc) => {
            category = doc.id
            db.collection("cities").doc(idCity).collection("category").doc(category).collection('offers').get().then(querySnapshot =>{
                querySnapshot.forEach((doc) => {
                    if(id == doc.data().shopId){       
                        db.collection("cities").doc(idCity).collection("category").doc(category).collection('offers')
                        .doc(doc.id).update({
                            isactive: true
                        })  .then(function (){
                            document.location.reload(true);
                        })                   
                        console.log(doc.data().isactive)
                    }
                })
            })
        })
    }).then(()=>{
        //caso de erro verificar aqui
        document.location.reload(true);
    })
}

function lojista(idLojista){
    lojistaId = idLojista
    $.ajax({
        type:"POST",
        data:'logista=' + idLojista,
        url:"painelLoja/receberId.php",
        success:function(r){            //alert(r);
            if(r==1){
                window.open('painelLoja/index.php', '_blank');
            }else{
                alert("Acesso Negado!!");
            }
        }
    });
}

function atualizainfosLoja(id, priorityParm, vencimetnoParm){
    var vencimento = $('#' + id + "dia").val()
    var priority = $('#' + id+  "prioridade").val()
    db.collection('shops').doc(id).update({
        priority: parseFloat(priority),
        diaVencimento: parseFloat(vencimento)
    }).then(()=>{
        alert('Alterado com sucesso!')
    }).catch((error)=>{
        console,log("erro " + error)
        alert("Erro ao alterar, contate um desenvolvedor.")
    })
}


function darbaixa(id, dia, mes, ano){
    docRefShops.doc(id).collection('payaments').add({
        dia: dia,
        mes:mes,
        ano:ano
    }).then(()=>{
        alert("treste")
    })
}

  db.collection("oferAnalitchs").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        alert(`Atençao Voce tem uma nova oferta da loja ${doc.data().shopName}`)
    });       
  });
