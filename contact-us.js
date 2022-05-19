// Send Email Function
function sendMessage(fname, lname, email, subject, message) {

    Email.send({
        Host: "smtp.gmail.com",
        Username: "pasabuymeforwarder@gmail.com",
        Password: "jykcmjxtchvuhpbz",
        To: "pasabuymeforwarder@gmail.com",
        From: `${email}` ,
        Subject: `${subject}`,
        Body: `
        First Name: <b> ${fname} </b> <br/>
        Last Name: <b> ${lname} </b> <br/>
        Email Address: <b> ${email} </b> <br/><br/>

        Subject: <b> ${subject} </b> <br/><br/>
        <b>Message:</b> <p>${message}</p>  <br/>
        
        <center><i>End of message..</i></center>
        
        `,
    })
        .then((message) => alert("Message Sent Successfully. Thank you!!!"));
        
}



$('#sendMessage').on('click', () => {
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();

    sendMessage(fname, lname, email, subject, message);

    $('#fname').val('');
    $('#lname').val('');
    $('#email').val('');
    $('#subject').val('');
    $('#message').val('');

})