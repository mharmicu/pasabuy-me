




const tblItems = $('#tblItems');

function addRec(doc) {

    tblItems.append(`<tr id="${doc.id}">
        <td>${doc.id}</td>
        <td>${doc.data().shipperName}</td>
        


        <td>${doc.data().itemDesc}</td>
        <td>${doc.data().itemQty}</td>
        <td>${doc.data().itemWeight}</td>
        
        <td>${doc.data().shippingAddress}</td>

        <td>${doc.data().arrivalDate}</td>
        <td>${doc.data().status}</td>
        <td align="center"><button type="button" href="javascript:void(0)" id="${doc.id}" class="edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
        <td align="center" ><button type="button" href="javascript:void(0)" id="${doc.id}" class="delete btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button></td>
        
    </tr>`);

    


    $('.edit').click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;

        db.collection('shipments').doc(id).get().then(doc => {
            $('#document').val(doc.id);

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


    $('.delete').click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;

        db.collection('shipments').doc(id).get().then(doc => {
            $('#document2').val(doc.id);
        })
    })




}

$('#update').on('click', () => {
    var id = $('#document').val();

    db.collection('shipments').doc(id).set({
        shipperName: $('#customerName').val(),
        shipperAddress: $('#address').val(),
        shipperContactNum: $('#contactnum').val(),
        shipperEmail: $('#email').val(),

        itemDesc: $('#itemDesc').val(),
        itemQty: $('#itemQty').val(),
        itemWeight: $('#itemWeight').val(),

        shippingName: $('#shippingName').val(),
        shippingAddress: $('#shippingAddress').val(),
        shippingContactNum: $('#shippingContactNum').val(),
        shippingEmail: $('#shippingEmail').val(),

        orderedDate: $('#orderedDate').val(),
        arrivalDate: $('#arrivalDate').val(),
        status: $('#status').val(),
    }, { merge: true })


    alert("Data successfully edited");

})

$('#delete').on('click', () => {
    var id = $('#document2').val();


    db.collection('shipments').doc(id).delete();

    $('#staticBackdrop').modal('hide');
    alert("Data successfully deleted");

})





db.collection('shipments').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            addRec(change.doc)
        }

        else if (change.type == "removed") {
            var id = change.doc.id;
            $('#' + id).remove();
        }

        else if (change.type == "modified") {
            var id = change.doc.id;
            $('#' + id).remove();
            addRec(change.doc);
        }
    })
})



var uid = null;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        uid = user.uid;
    } else {
        // redirect to login page
        uid = null;
        window.location.replace("login.html");
    }
});

function logOut() {
    firebase.auth().signOut();
}

// Send Email Function
function sendEmail(trackingID, shipperName, shipperAddress, shipperContactNum, shipperEmail,
    itemDesc, itemQty, itemWeight,
    shippingName, shippingAddress, shippingContactNum, shippingEmail,
    orderedDate, arrivalDate, status) {

    Email.send({
        Host: "smtp.gmail.com",
        Username: "pasabuymeforwarder@gmail.com",
        Password: "jykcmjxtchvuhpbz",
        To: `${shipperEmail}`,
        From: "pasabuymeforwarder@gmail.com",
        Subject: `Order Confirmation: ${trackingID} is your tracking ID`,
        Body: `<center><h2>ORDER CONFIRMATION </h2>
        Hey, ${shipperName}, thank you for your order! <br/> 
        We've received your order and will call you for verification of picking-up your package in your doors. <br/> 
        You can find your "padala" information below.<br/><br/></center>

        <h2>Tracker ID: ${trackingID}</h2>

        <h3>Shipper Details </h3>
        Shipper Name: ${shipperName} <br/>
        Shipper Address: ${shipperAddress} <br/>
        Shipper Contact Number: ${shipperContactNum} <br/>
        Shipper Email: ${shipperEmail} <br/>

        <br/>  <h3>Package Details </h3><br/>
        Package Description: ${itemDesc} <br/>
        Quantity: ${itemQty} <br/>
        Weight: ${itemWeight} <br/>

        <br/>  <h3>Shipping Details </h3><br/>
        Shipping Name: ${shippingName} <br/>
        Shipping Address: ${shippingAddress} <br/>
        Shipping Contact Number: ${shippingContactNum} <br/>
        Shipping Email: ${shippingEmail} <br/>

        <br/>  <h3>Status </h3><br/>
        Ordered Date: ${orderedDate} </h3><br/>
        ETA: <b> ${arrivalDate}</b> <br/>
        Status: <b> ${status} <b> <br/>
        
        
        <br/><br/>


        You can use your tracking ID to track your package through our website. Just go to Tracker page and enter the tracking ID of your Package. <br/><br/>

        Once we successfully picked-up your package, we will contact you as soon as your package is shipped and/or arrived. <br/><br/>
        
        <center>If you need help with anything, please don't hesitate to drop us an email: pasabuymeforwarder@gmail.com</center>
        
        
        `,
    })
        .then((message) => alert("Email Sent Successfully"));
    $('#exampleModal').modal('hide');
}

$('#sendEmail').on('click', () => {
    var id = $('#document').val();

    var shipperName = $('#customerName').val();
    var shipperAddress = $('#address').val();
    var shipperContactNum = $('#contactnum').val();
    var shipperEmail = $('#email').val();

    var itemDesc = $('#itemDesc').val();
    var itemQty = $('#itemQty').val();
    var itemWeight = $('#itemWeight').val();

    var shippingName = $('#shippingName').val();
    var shippingAddress = $('#shippingAddress').val();
    var shippingContactNum = $('#shippingContactNum').val();
    var shippingEmail = $('#shippingEmail').val();

    var orderedDate = $('#orderedDate').val();
    var arrivalDate = $('#arrivalDate').val();
    var status = $('#status').val();



    sendEmail(id, shipperName, shipperAddress, shipperContactNum, shipperEmail,
        itemDesc, itemQty, itemWeight,
        shippingName, shippingAddress, shippingContactNum, shippingEmail,
        orderedDate, arrivalDate, status);

    //$('#exampleModal').modal('hide');
    //alert("Data successfully edited");

})


