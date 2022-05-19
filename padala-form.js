const frmData=$('#frmData');
const tblItems=$('#tblItems');

function addRec(doc){

    tblItems.append(`<tr id="${doc.id}">
        <td>${doc.data().shipperName}</td>
        <td>${doc.data().shipperAddress}</td>
        <td>${doc.data().shipperContactNum}</td>
        <td>${doc.data().shipperEmail}</td>
        <td>${doc.data().itemDesc}</td>
        <td>${doc.data().itemQty}</td>
        <td>${doc.data().itemWeight}</td>
        <td>${doc.data().orderedDate}</td>
        <td>${doc.data().shippingName}</td>
        <td>${doc.data().shippingAddress}</td>
        <td>${doc.data().shippingContactNum}</td>
        <td>${doc.data().shippingEmail}</td>
        <td>${doc.data().arrivalDate}</td>
        <td>${doc.data().status}</td>
    </tr>`)
}

frmData.on('submit',(e)=>{
    e.preventDefault();

    db.collection('shipments').add({
        shipperName:$('#customerName').val(),
        shipperAddress:$('#address').val(),
        shipperContactNum:$('#contactnum').val(),
        shipperEmail:$('#email').val(),
        itemDesc:$('#itemDesc').val(),
        itemQty:$('#itemQty').val(),
        itemWeight:$('#itemWeight').val(),
        orderedDate:Date(),
        shippingName:$('#shippingName').val(),
        shippingAddress:$('#shippingAddress').val() + ", " + $('#city').val() + ", " + $('#province').val() + ", " + $('#zipCode').val(),
        shippingContactNum:$('#shippingContactNum').val(),
        shippingEmail:$('#shippingEmail').val(),
        arrivalDate:'Not yet specified',
        status:'Pending',
    })

    alert("Your Padala was Successfully Recorderd \n\nPlease wait for our email for the confirmation and status of your package.");

    $('#customerName').val('');
    $('#address').val('');
    $('#contactnum').val('');
    $('#email').val('');
    $('#itemDesc').val('');
    $('#itemQty').val('');
    $('#itemWeight').val('');
    $('#shippingName').val('');

    $('#shippingAddress').val('');
    $('#city').val('');
    $('#province').val('');
    $('#zipCode').val('');

    $('#shippingContactNum').val('');
    $('#shippingEmail').val('');

    
})



db.collection('shipments').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=="added"){
            addRec(change.doc)
        }
    })
})