class city{

    constructor(cidade, estado){
        this.cidade = cidade
        this.estado = estado 
    }

    register(){
        db.collection("cities").add({
            id_city: "",
            title: this.cidade,
            uf: this.estado
        }).then((docRef) =>{
            console.log("Sucesso")
        }).catch((error) =>{
            console.log("ERROR", error)
        })
    } 

    get_category(){
        db.collection("cities").get().then(querySnapshot => {            
            querySnapshot.forEach(function(doc){
                console.log(doc.data().name)
                table_City.innerHTML += `                
                <tr >
                <td>${doc.data().title}</td>
                <td>${doc.data().uf}</td>
                <td><button class="btn btn-warning"
                data-toggle="modal" data-target="#exampleModalCenter"
                onclick="editar('${doc.id}', '${doc.data().title}', '${doc.data().uf}')">Editar</button></td>
                <td><button class="btn btn-danger"onclick="deleta('${doc.id}',  '${doc.data().title}')"
                data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                </tr> 
                ` 
           });
        })
    }
    delete(id){
        db.collection("cities").doc(id).delete().then(function(){
            console.log("Deletado")
            puxar()
        }).catch(function (error) {
            console.log("error " + error) 
        })
    }
    edit(id, title, uf){        //Edita
        db.collection("cities").doc(id).set({
            title: title,
            uf: uf
        }).then((docRef) =>{
            console.log("Adicionado com sucesso")
            puxar()
        }).catch((error) =>{
            alert(`Erro ${error}, por favor, caso o erro persista, contate o desenvolvedor para manutenção` )
        })
    }

}

let cities = new city()
cities.get_category();

function register_city() {
    let cities = new city(document.getElementById('cidade').value, document.getElementById('estado').value)
    cities.register();
    puxar();
}


/*#######################DELETE*/
function deleta(id, name) {    
   id_deleteCity = id;
   document.getElementById('delete_confirm').innerHTML = `
    <h5 style="color:;">Tem certeza que deseja exluir a Cidade ${name}?</h5>
   `
}
async function confirm_delete_city() {
   await cities.delete(id_deleteCity)
}
/*#######################DELETE*/


/*#######################EDITA*/
function editar(id, name, uf){
    id_city = id
    document.getElementById('input_editcat').innerHTML = 
    `<input type="text" class="form-control" id="edit_city" aria-describedby="categoria"  value="${name}"> <br>
    <input type="text" class="form-control" id="edit_uf" aria-describedby="categoria"  value="${uf}">
    ` 
}

async function finalize_edit_city(id) {
    cities.edit(id_city, document.querySelector("#edit_city").value, document.querySelector("#edit_uf").value)
}
/*#######################EDITA*/

function  puxar(params) {
    table_City.innerHTML = ""
    cities.get_category();
}

function buscaCidades(e){
    document.querySelector("#cidade").innerHTML = '';
    var cidade_select = document.querySelector("#cidade");

    var num_estados = json_cidades.estados.length;
    var j_index = -1;

    // aqui eu pego o index do Estado dentro do JSON
    for(var x=0;x<num_estados;x++){
        if(json_cidades.estados[x].sigla == e){
          j_index = x;
        }
    }

    if(j_index != -1){    
        // aqui eu percorro todas as cidades e crio os OPTIONS
        json_cidades.estados[j_index].cidades.forEach(function(cidade){
          var cid_opts = document.createElement('option');
          cid_opts.setAttribute('value',cidade)
          cid_opts.innerHTML = cidade;
          cidade_select.appendChild(cid_opts);
        });
    }else{
        document.querySelector("#cidade").innerHTML = '';
    }
  }

  db.collection("cities").get().then(querySnapshot => {            
    querySnapshot.forEach(function(doc){
       let select = document.getElementById('city')
       select.innerHTML += `<option value="${doc.id}">${doc.data().title} || ${doc.data().uf}</option>`
    });
  })