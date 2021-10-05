let users = db.collection("users");
let usersNumber = 0;
let table = document.getElementById("tableUsers")
let numberUser = document.getElementById("numberUser")



 users.get().then((querySpanshot) => {
    querySpanshot.forEach (doc => {
        console.log(doc.data())
        usersNumber ++;
        table.innerHTML += `
          <tr>
            <td> ${doc.data().name} </td>
            <td> ${doc.data().phone} </td>
            <td> ${doc.data().city_id} </td>
            <td> <button onclick="delete()" class="btn btn-danger" > Deletar </button> </td>
          </tr>
        `
    });
    numberUser.innerHTML =   ` <h5>Total de usúarios: ${usersNumber}</h5> ` 
 })