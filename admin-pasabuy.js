




const tblItems = $('#tblItems');

function addRec(doc) {

    tblItems.append(`<tr id="${doc.id}">
        <td>${doc.id}</td>
        <td>${doc.data().name}</td>
        <td>${doc.data().address}</td>
        <td>${doc.data().contactNumber}</td> 
        <td>${doc.data().item}</td>  
        <td>${doc.data().qty}</td>  
        <td>${doc.data().amount}</td> 




        <td align="center"><button type="button" href="javascript:void(0)" id="${doc.id}" class="edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
        <td align="center"><button type="button" href="javascript:void(0)" id="${doc.id}" class="delete btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button></td>
    </tr>`);


    $('.edit').click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;

        db.collection('pasabuy').doc(id).get().then(doc => {
            $('#document').val(doc.id);

            $('#name').val(doc.data().name);
            $('#address').val(doc.data().address);
            $('#contactNumber').val(doc.data().contactNumber);
            $('#email').val(doc.data().email);
            
            $('#item').val(doc.data().item);
            $('#qty').val(doc.data().qty);
            $('#amount').val(doc.data().amount);

            $('#modeOfPayment').val(doc.data().modeOfPayment);
            $('#unit').val(doc.data().unit);

            $('#receiverName').val(doc.data().receiverName);
            $('#receiverAddress').val(doc.data().receiverAddress);
            $('#receiverContactNumber').val(doc.data().receiverContactNumber);

            $('#orderedDate').val(doc.data().orderedDate);
            $('#arrivalDate').val(doc.data().arrivalDate);
            $('#status').val(doc.data().status);

        })
    })

    $('.delete').click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;

        db.collection('pasabuy').doc(id).get().then(doc => {
            $('#document2').val(doc.id);
        })
    })
}


$('#update').on('click', () => {
    var id = $('#document').val();

    db.collection('pasabuy').doc(id).set({
        name: $('#name').val(),
        address: $('#address').val(),
        contactNumber: $('#contactNumber').val(),
        email: $('#email').val(),

        item: $('#item').val(),
        qty: $('#qty').val(),
        amount: $('#amount').val(),

        modeOfPayment: $('#modeOfPayment').val(),
        unit: $('#unit').val(),

        receiverName: $('#receiverName').val(),
        receiverAddress: $('#receiverAddress').val(),
        receiverContactNumber: $('#receiverContactNumber').val(), 

        orderedDate: $('#orderedDate').val(), 
        arrivalDate: $('#arrivalDate').val(), 
        status: $('#status').val(), 

    }, { merge: true })

    
    alert("Data successfully edited");

})

$('#delete').on('click', () => {
    var id = $('#document2').val();

    
    db.collection('pasabuy').doc(id).delete();

    $('#staticBackdrop').modal('hide');
    alert("Data successfully deleted");

})

db.collection('pasabuy').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            addRec(change.doc)
        }

        else if(change.type=="removed"){
            var id=change.doc.id;
            $('#'+id).remove();
        }

        else if(change.type=="modified"){
            var id=change.doc.id;
            $('#'+ id).remove();
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
function sendEmail(trackingID, name, address, contactNumber, email,
    item, qty, amount, modeOfPayment, unit,
    receiverName, receiverAddress, receiverContactNumber,
    orderedDate, arrivalDate, status) {

    Email.send({
        Host: "smtp.gmail.com",
        Username: "pasabuymeforwarder@gmail.com",
        Password: "jykcmjxtchvuhpbz",
        To: `${email}`,
        From: "pasabuymeforwarder@gmail.com",
        Subject: `Order Confirmation: ${trackingID} is your Order ID`,
        Body: `<center><h2>ORDER CONFIRMATION </h2>
        Hey, ${name}, thank you for your order! <br/> 
        We've received and accepted your order. For it to be processed, please settle the bill with your chosen mode of payment. <br/> 
        You can find your "pasabuy" information below.<br/><br/></center>

        <h2>Order ID: ${trackingID}</h2> 

        <h3>Customer Details </h3>
        Customer Name: ${name} <br/>
        Customer Address: ${address} <br/>
        Customer Contact Number: ${contactNumber} <br/>
        Customer Email: ${email} <br/>

        <br/>  <h3>Order Details </h3><br/>
        Item: ${item} <br/>
        Quantity: ${qty} <br/>
        Amount: ${amount} <br/>
        Mode of Payment: ${modeOfPayment} <br/>
        Unt: ${unit} <br/>

        <br/>  <h3>Shipping Details </h3><br/>
        Receiver Name: ${receiverName} <br/>
        Receiver Address: ${receiverAddress} <br/>
        Receiver Contact Number: ${receiverContactNumber} <br/>

        <br/>  <h3>Status </h3><br/>
        Ordered Date: ${orderedDate} </h3><br/>
        ETA: ${arrivalDate} <br/>
        Status: ${status} <br/>
        
        
        <br/><br/>

        <h2>Mode of Payments:</h2>
        Cash on Delivery: <i> Please indicate how much bill you have if don't have exact amount.</i> <br/>
        GCash: <b>0927-295-6993 -  Mhar Enriquez </b> <br/>
        Paymaya: <b>0961-766-1850 -  Sittie Manali </b> <br/><br/>



        You can use your Order ID for your reference <br/><br/>

        Once we successfully received the payment, we will contact you as soon as your order is shipped and/or arrived. <br/><br/>
        
        <center>If you need help with anything, please don't hesitate to drop us an email: pasabuymeforwarder@gmail.com</center>
        
        
        `,
    })
        .then((message) => alert("Email Sent Successfully"));
        $('#exampleModal').modal('hide');
}

$('#sendEmail').on('click', () => {
    var id = $('#document').val();

    var name = $('#name').val();
    var address = $('#address').val();
    var contactNumber = $('#contactNumber').val();
    var email = $('#email').val();

    var item = $('#item').val();
    var qty = $('#qty').val();
    var amount = $('#amount').val();
    var modeOfPayment = $('#modeOfPayment').val();
    var unit = $('#unit').val();

    var receiverName = $('#receiverName').val();
    var receiverAddress = $('#receiverAddress').val();
    var receiverContactNumber = $('#receiverContactNumber').val();

    var orderedDate = $('#orderedDate').val();
    var arrivalDate = $('#arrivalDate').val();
    var status = $('#status').val();



    sendEmail(id, name, address, contactNumber, email, 
        item, qty, amount, modeOfPayment, unit,
        receiverName, receiverAddress, receiverContactNumber,
        orderedDate, arrivalDate, status);

    //$('#exampleModal').modal('hide');
    //alert("Data successfully edited");

})