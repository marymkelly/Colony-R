const { text } = require('express');
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Here");
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/", (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: "colonyr123@outlook.com",
            pass: "Mypassword123"
        }
    });

    const mailOptions = {
        from: "colonyr123@outlook.com",
        to: req.body.email,
        model: `${req.body.model}`,
        text: "colony-R thanks you for reaching out to inquire about our models. One of our repersentative will be reaching out to you within an hour."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            console.log("email sent" + info.response);
        };
    });


});

app.listen(3000)