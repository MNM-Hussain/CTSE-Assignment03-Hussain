const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

let { paymentData } = require("./paymentData");

app.get('/', (req, res) => {
  res.send(paymentData);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



app.get("/payment/:id", (req,res) => {
  let id = +req.params.id;
  let payment = paymentData.find((prod) => prod.id === id);
  if(payment)
      res.send(payment);
  else
      res.status(404).send("No Payment Found");
})

app.post("/payment/create", async (req,res) => {
  let body = await req.body;
  console.log(body);
  let maxid = paymentData.reduce((acc , curr) => (curr.id >= acc ? curr.id : acc), 0);
  let newid = maxid + 1;
  let newPayment = { id: newid, ...body };
  paymentData.push(newPayment);
  res.send(newPayment);
});

app.delete("/payment/delete/:id", (req, res) => {
  let id = +req.params.id;
  let index = productData.findIndex((prod) => prod.id === id);
  if(index >= 0) {
      let deletedPayment = paymentData.splice(index, 1);
      res.send(deletedPayment);
  }else res.status(404).send("No Payment Found")
})

