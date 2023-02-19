const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const mysql = require('mysql');
var md5 = require('md5'); //for password encryption
const session = require('express-session');
const { request } = require('express');
const res = require('express/lib/response');
const { render } = require('express/lib/response');
require('dotenv').config()
const {Vonage} = require("@vonage/server-sdk");
const req = require('express/lib/request');

const port = process.env.PORT || 3000;
const IP = require('ip');
app.set('trust proxy', true)



a = [process.env.KEY1, process.env.KEY2];
const vonage = new Vonage({
    apiKey: a[0],
    apiSecret: a[1]
});

app.post('/text', async (req, res) => {
    console.log(req.ip)
    console.log(req.query);
    await sendSMS(req.query.message, req.query.number);
    res.send('ok');
})


async function sendSMS(input, number) {
    await vonage.sms.send({to:  number, from: "18334297736", text : input})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`));