const frmData = $('#frmData');
const tblRecords = $('#tblRecords');


function addRec(doc) {

    tblRecords.append(`<tr id="${doc.id}">    
      <td>${doc.data().name}</td>
      <td>${doc.data().address}</td>
      <td>${doc.data().contactNumber}</td> 
      <td>${doc.data().email}</td> 
      <td>${doc.data().item}</td>  
      <td>${doc.data().qty}</td>  
      <td>${doc.data().amount}</td> 
      <td>${doc.data().modeOfPayment}</td>  
      <td>${doc.data().unit}</td> 
      <td>${doc.data().receiverName}</td> 
      <td>${doc.data().receiverAddress}</td>
      <td>${doc.data().receiverContactNumber}</td>  
      
      </tr>`)
}

frmData.on('submit', (e) => {
    e.preventDefault();

    db.collection('pasabuy').add({
        name: $('#name').val(),
        address: $('#address').val(),
        contactNumber: $('#contactNumber').val(),
        email:$('#email').val(),
        item: $('#item').val(),
        qty: $('#qty').val(),
        amount: $('#amount').val(),
        modeOfPayment: $('#modeOfPayment').val(),
        unit: $('#unit').val(),
        receiverName: $('#receiverName').val(),
        receiverAddress: $('#receiverAddress').val(),
        receiverContactNumber: $('#receiverContactNumber').val(),

        orderedDate:Date(),
        arrivalDate:'Not yet specified',
        status:'Pending',


    })

    $('#name').val('');
    $('#address').val('');
    $('#contactNumber').val('');
    $('#email').val('');
    $('#item').val('');
    $('#qty').val('');
    $('#amount').val('');
    $('#modeOfPayment').val('');
    $('#unit').val('');
    $('#receiverName').val('');
    $('#receiverAddress').val('');
    $('#receiverContactNumber').val('');

    alert("Your order has successfully placed. \n\nAn Email will be send shortly for the payment details to proceed your order. Thank You!");

})

db.collection('pasabuy').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            addRec(change.doc)
        }
    })
})

