var div = document.getElementById('category')
var divproduct =  document.getElementById('product')
var divinfosProduct = document.querySelector('#infoProduct')
var divsize =  document.getElementById('sizes')
var divmodel =  document.getElementById('model')
var divbtnProduct = document.querySelector('#adcProduct');
var nextStage = document.querySelector('#nextStage')
var divdescOffer = document.getElementById('informationsOffer')
var modalfooter = document.getElementById('modalfooter')
var divimagesOffer = document.getElementById('imagesOffer')
var divInfosOffer = document.getElementById('infosoffer')
var quantityModelsSelect = 0;
var quantityCheckBoxSelect = 0;
var descriptionProduct = document.getElementById('descriptionProduct')
/*VALORES PARA O BANCO DE DADOS*/
    var models = [];
    var category_select;
    var category_select_id;
    var product_select = "";
    var porducts = [];
    var product_id = "";
    var sizes_select = [];
    var quant_available = [];
    var valorReal = 0;
    var valorDesconto = 0;
    var offerDate = offerDate;
/*VALORES PARA O BANCO DE DADOS*/
    


    db.collection("categories").get().then(querySnapshot => {            
        querySnapshot.forEach(function(doc){
            categoriesArray.push(doc.id)
            div.innerHTML += `
            <div class="form-check form-check-inline">
            <input class="form-check-input inp" type="radio" name="inlineRadioOptions"  onclick="activeCategory('${doc.id}', '${doc.data().name}')" id="${doc.id}" value="${doc.data().name}" >
            <label class="form-check-label lab" id="${doc.id}" for="${doc.id}"><b>${doc.data().name}</b></label>
          </div>
            `
        });
    })

var matriz_products = [];
function activeCategory(uid, name){
    category_select = name;
    category_select_id = uid;
    selectProduct()
}


function selectProduct(){
    div.style.display = 'none';
    divproduct.style.display = 'block';
    db.collection("products").get().then(querySnapshot => {            
        querySnapshot.forEach(function(doc){
            console.log(doc.data().name)
            divproduct.innerHTML += `
            <script>
            </script>
            <div class="form-check form-check-inline">
            <input class="form-check-input inp" type="radio" name="inlineRadioOptions"  id="${doc.id}" value="${doc.data().name}" >
            <label class="form-check-label lab" onclick="info_products('${doc.data().sizes}', '${doc.id}', '${doc.data().name}')" id="${doc.data().name}" for="${doc.id}"><b>${doc.data().name}</b></label>
          </div> `
       });
    })
}
function info_products(size, uid, name){
    divproduct.style.display = 'none';
    divinfosProduct.style.display= 'block'
    modalfooter.innerHTML = `
    <button type="button" id="nextscreen" class="btn btn-success" onclick="modelsfunction('${size}', '${uid}','${name}')">Proximo</button>` 
}
function modelsfunction(size, uid, name){
    if (descriptionProduct.value == "") {
        alert('Error, preencha os campos')
    }else{
        document.getElementById('nextscreen').style.display = 'none'
        product_select = name;
        product_id = uid
        divinfosProduct.style.display = 'none';
        divmodel.style.display = 'block';
        divmodel.innerHTML = `
           <h5> Quantos modelos você gostartia de adicionar ? </h5>
           <div class="row">
           <button type="button" onclick="size('${size}', '${uid}', 1)" class="  btn_0 col-md-3">01</button>
           <button type="button" onclick="size('${size}', '${uid}', 2)" class="  btn_0 col-md-3">02</button>
           <button type="button" onclick="size('${size}', '${uid}', 3)" class="  btn_0 col-md-3">03</button>
           <button type="button" onclick="size('${size}', '${uid}', 4)" class="  btn_0 col-md-3">04</button>
           </div>
        `
    }
   
}
function size(id, uid, number){
    divsize.style.display = 'block';
    divmodel.style.display = 'none';
    divsize.style.display = 'block';
    divbtnProduct.style.display = 'block';
    nextStage.style.display = 'block';
    var size_split = id.split(',');
    for(var i=0;i<number;i++){//primeiro for criar o input para os modelos e o segundo o checkBox dos tamanhos
        divsize.innerHTML += `        
        <center>
        <h3>Modelo ${i + 1}</h3>
        <br><br>
        </center>
        <div class="row">
        <div class="col-md-6">
            <label for="inputEmail4"><h4> Nome do modelo Nº ${0 + i + 1} </h4></label> 
            <input type="text" class="form-control modelo_input" id="modelo${i}" placeholder="Ex: Azul">
        </div>        
        <div id="tamanhos${i}" class="col-md-6">
        </div>
        </div>        
        <hr>
        `;
        for(var x = 0;x<size_split.length;x++){
            document.getElementById(`tamanhos${i}`).innerHTML += `
               <div class="field-checkbox1 col-md-12">
                    <input type="checkbox" class="field" id="check${i}${x}" value="${size_split[x]}"/>
                    <label for="check${i}${x}" class="description">Tamanho Nº ${size_split[x]}</label>
                    <div class="form-group">
                    <label for="inputEmail4">Quantidade Disponivel Nº ${size_split[x]} </label>
                    <input type="number" class="modelo_input form-control" id="input${i+x}" value="1">
                </div>
            `             
            quantityCheckBoxSelect = x + 1;
        }    
        quantityModelsSelect = number;
    }
}
//var models = [{'name': modelName, sizes}]
var sizes = []
function adcModels(){
    if(porducts.length < 3){
    for(i=0;i<quantityModelsSelect;i++){
       for(x=0;x<quantityCheckBoxSelect;x++){
           if(document.getElementById(`check${i}${x}`).checked){
                
                sizes.push(
                    {
                        'name': document.getElementById(`check${i}${x}`).value,
                        'quantity': Number(document.getElementById(`input${i+x}`).value)
                    }                    
                )
           }           
        }
        models.push({'name': document.getElementById(`modelo${i}`).value, sizes})
        sizes = []
    }
    porducts.push({'description': document.getElementById('descriptionProduct').value, 'id_product': product_id, 'models': models, 'product': product_select})
    models = []
    return porducts;
    }else{        
        divsize.style.display = 'none';  
        divbtnProduct.style.display = 'none';
        nextStage.style.display = 'none';    
        divsize.innerHTML = '';          
        divproduct.innerHTML = '';      
        divproduct.style.display = 'none';
        
        alert("Atenção, você só pode adicionar 4 produtos!");
        infosOffer();
    }
}


function producspush(){
    sizes = []
    models = []
    adcModels()        
    divsize.style.display = 'none';
    divproduct.style.display = 'block';    
    divbtnProduct.style.display = 'none';
    nextStage.style.display = 'none';    
    divsize.innerHTML = ''
}





  