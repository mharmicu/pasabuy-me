const frmData=$('#frmData');
const tblItems=$('#tblItems');


$('#search').on('click', ()=>{
    //Reference the first text box
    var txtTyped = $("#trackingID");

    var txtDisplay = $("#document");
    txtDisplay.val(txtTyped.val());

    var id = $('#document').val();

    db.collection('shipments').doc(id).get().then(doc=>{

        $('#customerName').val(doc.data().shipperName);
        $('#address').val(doc.data().shipperAddress);
        $('#contactnum').val(doc.data().shipperContactNum);
        $('#email').val(doc.data().shipperEmail);

        $('#itemDesc').val(doc.data().itemDesc);
        $('#itemQty').val(doc.data().itemQty);
        $('#itemWeight').val(doc.data().itemWeight);

        $('#shippingName').val(doc.data().shippingName);
        $('#shippingAddress').val(doc.data().shippingAddress);
        $('#shippingContactNum').val(doc.data().shippingContactNum);
        $('#shippingEmail').val(doc.data().shippingEmail);

        $('#orderedDate').val(doc.data().orderedDate);
        $('#arrivalDate').val(doc.data().arrivalDate);
        $('#status').val(doc.data().status);
    })
})

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

db.collection('shipments').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=="added"){
            addRec(change.doc)
        }
    })
})