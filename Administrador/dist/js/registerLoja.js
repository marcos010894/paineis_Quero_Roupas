function registrar(){
    let cnpj = $('#CNPJ').val()
    let city = $('#city').val()
    let active = "desativar"
    let address = $('#address').val()
    let cityId = $('#city').val()
    let credit = ["MasterCard", "Visa"]
    let diaVencimento = $('#fatura').val()
    let name = $('#shopName').val()
    let number = $('#number').val()
    let primaryOffer = true
    let priority = $('#priority').val()
    let taxa = $('#taxa').val()
    let user = $('#user').val()

    db.collection("shops").doc(user).set({
        CNPJ: cnpj,
        city: city,
        active: active,
        address: address,
        cityId: cityId,
        credit: credit,
        diaVencimento: diaVencimento,
        name: name,
        number: number,
        primaryOffer: primaryOffer,
        priority: priority,
        taxa: taxa,
        shopImg:"http://queroapps.com/shopimg.png",
    }).then((docRef) => {
        alert('adicionado com sucesso')
    }).catch(function(error){
        console.log(error)
    })
}