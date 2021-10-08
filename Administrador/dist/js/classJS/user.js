let users = db.collection("users");
let cities = db.collection("cities");
let usersNumber = 0;
let table = document.getElementById("tableUsers")
let numberUser = document.getElementById("numberUser")
var cidade = "teste";
db.collection("cities").get().then(querySnapshot => {            
  querySnapshot.forEach((doc)=>{      
      document.getElementById('pesquisa').innerHTML += `  
      <option value="${doc.id}">${doc.data().title}</option>`
 });
})

 users.get().then((querySpanshot) => {
    querySpanshot.forEach (doc => {
        usersNumber ++;
        cities.get().then((querySpanshot) =>{
          querySpanshot.forEach (docCitie => {
            if(docCitie.id == doc.data().city_id){
              cidade = docCitie.data().title;
              console.log(cidade)
            }
          })
        }).then(() => {
          table.innerHTML += `
          <tr>
            <td> ${doc.data().name} </td>
            <td> ${doc.data().phone} </td>
            <td> ${cidade} </td>
            <td> <button onclick="deletar('${doc.id}')" class="btn btn-danger" > Deletar </button> </td>
          </tr>
        `
        })
    });
    numberUser.innerHTML =   ` <h5>Total de usúarios: ${usersNumber}</h5> ` 
 })

 db.collection("oferAnalitchs").onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      alert(`Atençao Voce tem uma nova oferta da loja ${doc.data().shopName}`)
  });       
});

function deletar(id){
  
 const confirma = window.confirm("Tem certeza que deseja deletar ?")
 if(confirma == true){
   users.doc(id).delete().then(()=>{
     alert("deletado com sucesso !");
     window.location.href = "users.php";
   })
  }
 }


 function pesquisar(param){       
  table.innerHTML = "";
  usersNumber = 0;
  users.get().then((querySpanshot) => {
    querySpanshot.forEach (doc => {
      if(doc.data().city_id == param.value){
        usersNumber ++;
        cities.get().then((querySpanshot) =>{
          querySpanshot.forEach (docCitie => {
            if(docCitie.id == doc.data().city_id){
              cidade = docCitie.data().title;
              console.log(cidade)
            }
          })
        }).then(() => {
          table.innerHTML += `
          <tr>
            <td> ${doc.data().name} </td>
            <td> ${doc.data().phone} </td>
            <td> ${cidade} </td>
            <td> <button onclick="deletar('${doc.id}')" class="btn btn-danger" > Deletar </button> </td>
          </tr>
        `
        })
      }
    });
    numberUser.innerHTML =   ` <h5>Total de usúarios: ${usersNumber}</h5> ` 
 })
  
  }
