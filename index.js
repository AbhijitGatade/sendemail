var express = require("express");
var body_parser = require("body-parser");
const nodemailer = require("nodemailer");

var app = express();
app.use(body_parser.json({limit:'50mb'}));
app.use(body_parser.urlencoded({limit:'50mb', extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.post("/sendmail",function(req,res){
    let body = req.body;
    email = body.email;
    to = body.to;
    subject = body.subject;
    mailbody = body.body;
    console.log(to);
    sendmail(to, subject, mailbody);
    res.end("success");
})



function sendmail(to , subject, body){
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nileshgurav4021@gmail.com',
        pass: 'Nilesh#0106'
    }
    });

    var mailOptions = {
    from: 'nileshgurav4021@gmail.com',
    to: to,
    subject: subject,
    // text: 
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

const  PORT = process.env.PORT || 8081;




app.listen(PORT,function(){
    console.log("website is running...");
})