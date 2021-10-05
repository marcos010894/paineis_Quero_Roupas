var title = document.getElementById('titleOffer').value;
var descrption = document.getElementById('descriptionOffer').value
var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
dataAtual = dia + '/' + mes + '/' + ano;
var milisecunds;;

function infosOffer(){
    divsize.style.display = 'none';
    divbtnProduct.style.display = 'none';
    nextStage.style.display = 'none';
    divdescOffer.style.display = 'block';
    divproduct.style.display = 'none';
}

function imagesOffer(){
    divdescOffer.style.display = 'none';
    divimagesOffer.style.display = 'block'
}
function finalizeOffer(){
    document.getElementById('dateOffer').innerHTML = `<h4>${dataAtual}</h4>` 
    divInfosOffer.style.display = 'block'
    divimagesOffer.style.display = 'none'
}
//PEGAR VALOR EM TEMPO REAL
$('#valordesconto').keyup(function(){
   calculadesconto()
   //Aqui dentro você faz o que quer, manda pra um arquivo php com ajax
   //ou sla, vai depender do que você quer fazer

});

function calculadesconto(){
    var valorReal = document.getElementById('valorReal').value;
    var valorDesconto = document.getElementById('valordesconto').value;
    var dodesconto = valorDesconto / 100 * valorReal;
    var valorrealDesconto = valorReal - dodesconto;
    var valornoApp = valorrealDesconto;
    document.getElementById('valueApp').innerHTML = `<h3>R$: ${valornoApp}<h3>`
    offerDate = document.getElementById('offerDate').value;
    milisecunds = new Date(offerDate)
    console.log(milisecunds.getTime());
}
function registrar(){
    var valueReal  = document.getElementById('valorReal').value
    var valueDiscount = document.getElementById('valordesconto').value
    document.getElementById('btnFinalize').style.display = "none";
    document.getElementById('btnLoad').style.display = 'block';
    setTimeout(function(){
     db.collection("oferAnalitchs").add({
        category: category_select,
        credit_card: credit,
        credidCard: credit,
        dateOffer: Date.now(),
        debit_card : credit,
        idCity:idCity,
        idCategory:category_select_id,
        debitCard : credit,
        description: document.getElementById("descriptionOffer").value,
        shopId: id,
        images: images,
        shopImg: img_shop,
        isactive: isactive,
        city:cidade,
        offerDate: milisecunds.getTime(),
        products: porducts,
        shopAddress: shopAddress,
        shopName: shopName,
        title:document.getElementById("titleOffer").value,
        tele_for_free: parseInt(taxa),
        teleForFree: parseInt(taxa),
        value_discount: parseInt(valueDiscount),
        value_real: parseInt(valueReal),
        valueDiscount: parseInt(valueDiscount),
        valueReal: parseInt(valueReal),
        priority: parseInt(priority_Loja),
    }).then((docRef) =>{
        divInfosOffer.style.display = 'none'
        document.getElementById('FinalizeOffer').style.display = 'block';
        mensagesuccess()
        size_arraay = []
    }).catch((error) =>{
        console.log("ERROR", error);
    })
    }, 10000);
    db.collection("shops").doc(id).update({
        primaryOffer: false
    })
    calculadesconto()
    
}

function mensagesuccess(){
    setTimeout(function(){
        document.getElementById('menssagemFiline').style.display = 'none';
        document.getElementById('msgSuccess').style.display = 'block';
    }, 4000);
}