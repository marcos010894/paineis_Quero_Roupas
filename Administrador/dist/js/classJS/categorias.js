class category{

    constructor(categoria){
        this.categoria = categoria 
    }

    register(){
        db.collection("categories").add({
            name: this.categoria
        }).then((docRef) =>{
            db.collection("cities").get().then(querySnapshot => {            
                querySnapshot.forEach(function(doc){
                    console.log(doc.id)
                    db.collection('cities').doc(doc.id).collection('category').doc(docRef.id).set({
                        name: "categoria"
                    })
               });
            })
        }).catch((error) =>{
            console.log("ERROR", error)
        })
    } 

    get_category(){
        db.collection("categories").get().then(querySnapshot => {            
            querySnapshot.forEach(function(doc){
                console.log(doc.data().name)
                table_category.innerHTML += `                
                <tr>
                <td>${doc.data().name}</td>
                <td><button class="btn btn-warning"
                data-toggle="modal" data-target="#exampleModalCenter"
                onclick="editar('${doc.id}', '${doc.data().name}')">Editar</button></td>
                <td><button class="btn btn-danger"onclick="deleta('${doc.id}',  '${doc.data().name}')"
                data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                </tr> 
                ` 
           });
        })
    }
    delete(id){
        db.collection("categories").doc(id).delete().then(function(){
            console.log("Deletado")
            puxar()
        }).catch(function (error) {
            console.log("error " + error) 
        })
    }
    edit(id, name){        //Edita
        db.collection("categories").doc(id).set({
            name: name
        }).then((docRef) =>{
            console.log("Adicionado com sucesso")
            puxar()
        }).catch((error) =>{
            alert(`Erro ${error}, por favor, caso o erro persista, contate o desenvolvedor para manutenção` )
        })
    }

}

let categorys = new category()
categorys.get_category();

function register_category() {
    let categorys = new category(document.getElementById('categoria').value)
    categorys.register();        
    table_category.innerHTML = ""
    puxar();
}
function deleta(id, name) {    
   id_delete = id;
   document.getElementById('delete_confirm').innerHTML = `
    <h5 style="color:;">Tem certeza que deseja exluir a categoria ${name}?</h5>
   `
}
async function confirm_delete() {
   await categorys.delete(id_delete)
}
function editar(id, name){
    id_category = id
    document.getElementById('input_editcat').innerHTML = 
    `<input type="text" class="form-control" id="edit_cat" aria-describedby="categoria"  value="${name}">` 
}
async function finalizar_edit(id) {
    categorys.edit(id_category, document.getElementById('edit_cat').value)
}
function  puxar(params) {
    table_category.innerHTML = ""
    categorys.get_category();
}