//Selecionar pelo id chamar a função
var docRefCategory = db.collection("categories")
var docRefAnalitchs = db.collection("oferAnalitchs")
var categoriesArray = []
var categoriesIdArray = []
var docRefMiniOffer = db.collection("oferAnalitchs")
var docVar
var imagesPHP = []
/*var models = []
var lengthProducts
var productsName=[]
var productsDesc=[]*/
docRefCategory.get().then(querySnapshot => {            
    querySnapshot.forEach(function(doc){
        categoriesArray.push(doc.data().name)
        categoriesIdArray.push(doc.id)
    });
})
var images = [] ;
function moreInfo(id){
let table = document.getElementById('bodyTable')
    table.innerHTML = ''
            var status;
            docRefAnalitchs.get().then(querySnapshot =>{
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
                    if(doc.id == id){
                        table.innerHTML = `
                        <td>
                        <div class="row">
                        <div class="col">
                        <h4> Nome da oferta:  
                        <input type="text" value="${doc.data().title}" id="name" class="inputEditFastModal">
                        </h4>
                        <h6> Categoria: 
                            <select class="inputEditFastModal" id="editCategory">  
                            <option value="${doc.data().idCategory}"> ${doc.data().category} </option>
                            </select>
                        </h6>
                        <h6>Preço:
                        <input type="number" value=${doc.data().valueReal} id="price" class="inputEditFastModal">
                       </h6>
                        <h6>Desconto %:
                        <input type="number" value=${doc.data().valueDiscount} id="discount" class="inputEditFastModal"></h6>
                        <h6>
                        <h6>descrição</h6>
                        <input type="text" id="desc" value=" ${doc.data().description}" type="text" class="inputEditFastModal"></h6>
                        <!-- <div id="divproduct">
                            <h4>Produtos</h4>
                            </div> -->
                        </div> 
                        <div class="col">                                
                        <div class="row" class="divImage" id="divImg">
                        </div>
                        </div>
                      </div>
                      </td>
                      <div id="imagesOffer">
                      <center>
                           <div id="drop-area">
                            <form enctype="multipart/form-data" method="POST" class="my-form">
                              <p>Façã o upload das fotos.<p>
                              <p style="color:red;">Atenção, ao upar novas imagens as antigas serão substituidas.</p>
                              <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
                              <label class="button"  for="fileElem">Selecione os arquivos.</label>
                             <br> <progress  id="progress-bar" max=100 value=0></progress>
                            </form>
                            <div id="gallery"></div>
                          </div>
                          </center>
                      </div>
                      `    
                      $('#modalFooter').html(`
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" onclick="finishAlterOffer('${doc.id}', '${doc.data().idCity}', '${doc.data().idCategory}', '${doc.data()}')">Finalizar</button>
                      `)
                        console.log(doc.data())

                        /* for(i=0;i<doc.data().products.length;i++){
                                $('#divproduct').append(`
                                <input type="text" id="nameProduct${i}" value=" ${doc.data().products[i].product}" type="text" class="inputEditFastModal"></h6>
                                <input type="text" id="descProduct${i}" value=" ${doc.data().products[i].description}" type="txt" class="inputEditFastModal"></h6>
                                `)
                                lengthProducts = i
                                models.push(doc.data().products[i].models)
                                productsName.push(doc.data().products[i].product)
                                productsDesc.push(doc.data().products[i].description)
                         }*/

                         for(i=0;i<categoriesArray.length;i++){
                            $('#editCategory').append(`<option value="${categoriesIdArray[i]}"> ${categoriesArray[i]} </option>`)
                         }
                        for(i=0;i<doc.data().images.length;i++){
                            $('#divImg').append(`
                            <div class="col"> 
                                <img src="${doc.data().images[i]}"  class="imge"/>
                            </div>`
                            )                            
                            imagesPHP.push(doc.data().images[i])
                        }
                    }
                });
            })
        }
        var estructProducts = []
        $('#valordesconto').keyup(function(){
            calculadesconto()
            //Aqui dentro você faz o que quer, manda pra um arquivo php com ajax
            //ou sla, vai depender do que você quer fazer
           /* for(i=0;i<lengthProducts;i++){
                estructProducts.push({'product': productsName[i], 'description': productDesc[i], 'models': models[i] })
            }*/         
         });
        function finishAlterOffer(id, idCity, idCategory, document){
            console.log(document)
            var name = $('#name').val()
            var category = $('#editCategory').val()
            var price = $('#price').val()
            var discount = $('#discount').val()
            var description = $('#desc').val()
            docRefMiniOffer.doc(id).get().then((doc) =>{
               docVar = doc.data()
               })
            if(images.length == 0){
                docRefAnalitchs.doc(id).update({
                    //images: images,                    
                    title: name,
                    category:category,
                    valueReal:parseInt(price),
                    valueDiscount:parseInt(discount),
                    description:description,
                    idCategory: category
                   // products: estructProducts
                }).then(function () {
                    setOffer(id, idCity, category)
                })
            }else{
                docRefAnalitchs.doc(id).update({
                    images: images,                    
                    title: name,
                    category:category,
                    valueReal:parseInt(price),
                    valueDiscount:parseInt(discount),
                    description:description,
                    idCategory: category
                   // products: estructProducts
                }).then(function () {
                    setOffer(id, idCity, category)
                })
            }
        }



       docRefMiniOffer.get().then(querySnapshot =>{
           querySnapshot.forEach((doc) =>{
               $("#miniOffer").append(`
               <div class="col">
               <div class="offersAnalitchs">
                   <h4>${doc.data().shopName}</h4>
                    <h4> ${doc.data().title}</h4>
                   <img src="${doc.data().images[0]}" width="105px" alt=""><br>
                   <br>
                   <h5></h5>${doc.data().description}</h5>
                   <br><br>
                   <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="moreInfo('${doc.id}')">Aprovar Oferta</button>
                   <button class="btn btn-danger" onclick="denyOffer('${doc.id}')">Negar Oferta.</button>
               </div>
           </div>
               `)
           })
       })

        function setOffer(id, idCity, idCategory){
            docRefMiniOffer.doc(id).get().then((doc) =>{
                docVar = doc.data()
                })
                db.collection("cities").doc(idCity).collection("category")
                .doc(idCategory).collection('offers').doc(id).set(
                    docVar
            ).then((docRef) =>{
                alert("sucesso")
                docRefMiniOffer.doc(id).delete().then(function(){
                    console.log("Sucesso")
                    window.location.reload(1);
                })
            }).catch((error) =>{
                console.log("ERROR", error);
            })
        }

        function denyOffer(id){
            var resultado = confirm("Tem certeza que deseja Negar a oferta ?")
            if(resultado == true){
                docRefMiniOffer.doc(id).delete().then(function(){               
                    console.log("Sucesso")
                     window.location.reload(1);
                 })
            }else{
                //...Cmando 
            }
        }
        function downloadIMG(){

        }