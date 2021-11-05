import express from "express";
import request from "request";

const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const API_TOKEN = 'vAmatmR3gM8Mfqrpd7WTeroJDyf4fmqllHzxtK3XFk55SnAYnzIPVW6OVceu'
const PHONE = '09155553377'
const MSG = 'Welcome to DevCenter Innovations'
const SMS_API_URL = `https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=${API_TOKEN}&from=BulkSMSNG&to=${PHONE}&body=${MSG}`

function middleware(req, res, next) {
  console.log(req.body, req.params);
  next()
}
app.get("/", (req, res) => {
  res.send("Hi, the server is healthy")
})

app.post("/call", (req, res) => {
  let result = ''
  request(SMS_API_URL, {
    json: true
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    result = JSON.stringify(res)
    // console.log(`resp: ${JSON.stringify(res)}`);
  });
  res.send('Message sent')
  res.sendStatus(200)
})


app.listen(port, () => console.log(`App is running on http://locahost:${port}`))