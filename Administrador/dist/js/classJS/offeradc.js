db.collection("cities").doc(idCity).collection("category")
        .doc(category_select_id).collection('offers').add({
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
        tele_for_free: taxa,
        teleForFree: taxa,
        value_discount: parseInt(document.getElementById('valordesconto').value),
        value_real: parseInt(document.getElementById('valorReal').value),
        valueDiscount: parseInt(document.getElementById('valordesconto').value),
        valueReal: parseInt(document.getElementById('valorReal').value),
        priority: parseInt(priority_Loja),
    }).then((docRef) =>{
        divInfosOffer.style.display = 'none'
        document.getElementById('FinalizeOffer').style.display = 'block';
        mensagesuccess()
        size_arraay = []
    }).catch((error) =>{
        console.log("ERROR", error);
    })