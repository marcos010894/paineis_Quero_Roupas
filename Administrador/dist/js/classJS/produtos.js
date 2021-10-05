class product{

    constructor(product, tamanhos){
        this.product = product,
        this.size = tamanhos
    }

    register(){
        db.collection("products").add({
            name: this.product,
            sizes: this.size
        }).then((docRef) =>{
            console.log("Sucesso")
            size_arraay = [];
        }).catch((error) =>{
            console.log("ERROR", error)
        })
    } 
    get_product(){
        db.collection("products").get().then(querySnapshot => {            
            querySnapshot.forEach(function(doc){
               sizes = ""
                for(var i=0;i<doc.data().sizes.length;i++){
                    sizes += `
                         Nº  ${doc.data().sizes[i]} <br>
                       `
                   }
                table_product.innerHTML += `                
                <tr >
                <td>${doc.data().name}</td>
                <td>${sizes}</td>
                <td><button class="btn btn-warning"
                data-toggle="modal" data-target="#exampleModalCenter"
                onclick="editar('${doc.id}', '${doc.data().name}', '${doc.data().sizes}')">Editar</button></td>
                <td><button class="btn btn-danger"onclick="deleta('${doc.id}',  '${doc.data().name}')"
                data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                </tr> 
                ` 
           });
        })
    }
    delete(id){
        db.collection("products").doc(id).delete().then(function(){
            console.log("Deletado")
            puxar()
        }).catch(function (error) {
            console.log("error " + error) 
        })
    }
    edit(id, name, size_array){        //Edita
        db.collection("products").doc(id).update({
            name: name,
            sizes: size_array
        }).then((docRef) =>{
            console.log("Adicionado com sucesso")
            size_arraay_edit = [];            
            size_edit_number = 0;
            puxar()
        }).catch((error) =>{
            alert(`Erro ${error}, por favor, caso o erro persista, contate o desenvolvedor para manutenção` )
        })
    }

}

let products = new product()
products.get_product();

function register_product() {
    for(x=0;x<=number_size;x++){
        size_arraay.push(document.getElementById(`produto_${x}`).value)
    }
    let products = new product(document.getElementById('produto').value, size_arraay)
    products.register();       
    puxar();
}

function deleta(id, name) {    
   id_deleteProduct = id;
   document.getElementById('delete_confirm').innerHTML = `
    <h5 style="color:;">Tem certeza que deseja exluir a categoria ${name}?</h5>
   `
}
async function confirm_delete() {
   await products.delete(id_deleteProduct)
}

function editar(id, name, doc){
    id_category = id    
    var size_split = doc.split(',');
    document.getElementById('input_editproduct').innerHTML = 
    `<input type="text" class="form-control" id="edit_cat" aria-describedby="categoria"  value="${name}">
    <div id="tamanhos_for"></div> <br>
    `
      for(var x=0;x<size_split.length;x++){
      /*  document.querySelector("#input_editproduct").innerHTML += 
        `
        <input type="number" class="form-control" 
        id="size${x}" aria-describedby="tamanho"  
        value="${size_split[x]}"
        `*/
        document.getElementById('tamanhos_for').innerHTML += `
        <div class="form-group">
        <label>Tamanho ${x}</label>
        <input type="number" class="form-control" id='size_split_${x}'
        value='${size_split[x]}'>
        </div>
        `
        size_edit_number = size_edit_number + 1 ;
      }
   }

function finalizar_edit(id) {
    for(var x=0;x<size_edit_number;x++){        
        size_arraay_edit.push(document.getElementById(`size_split_${x}`).value)
    }
    products.edit(id_category, document.getElementById('edit_cat').value, size_arraay_edit )
}

function  puxar(params) {
    table_product.innerHTML = "";
    products.get_product();
}