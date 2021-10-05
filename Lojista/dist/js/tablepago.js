db.collection('shops').doc(id).collection('payaments').onSnapshot((querySnapshot) =>{
    querySnapshot.forEach ((doc) => {
        document.getElementById('tablePag').innerHTML += `
            <tr>
                <td>${doc.data().dia}</td>
                <td>${doc.data().mes}</td>
                <td>${doc.data().ano}</td>
            </tr>
        `
      
    })
  })