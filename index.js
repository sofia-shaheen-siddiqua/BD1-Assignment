const express = require('express');
const { resolve } = require('path');
let cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate =2;

app.get("/cart-total", (req,res)=>{
    let newItemPrice = parseFloat(req.query.newItemPrice);
    let cartTotal = parseFloat(req.query.cartTotal);

    let finalPrice = newItemPrice + cartTotal;
    res.send(finalPrice.toString());
});

app.get("/membership-discount",(req,res)=>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember == "true";
  let finalPrice;
  if(isMember){
    finalPrice = cartTotal- ((discountPercentage/100)*cartTotal);
  }
  else{
    finalPrice = cartTotal;
  }
   res.send(finalPrice.toString());
});

app.get("/calculate-tax",(req,res)=>{
      let cartTotal = parseFloat(req.query.cartTotal);
      let tax = ((taxRate/100)*cartTotal);
      res.send(tax.toString());
});

app.get("/estimate-delivery",(req,res)=>{
      let distance = parseFloat(req.query.distance);
      let shippingMethod = req.query.shippingMethod;
      let deliveryTime;

      if(shippingMethod == "Standard"){
        deliveryTime = distance/50;
      }
      else{
        deliveryTime = distance/100;
      }
      res.send(deliveryTime.toString());
});

app.get("/shipping-cost", (req,res)=>{
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight*distance*0.1;
  res.send(shippingCost.toString());
});

app.get("/loyalty-points",(req,res)=>{
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = ((loyaltyRate/100)*purchaseAmount);
  res.send(loyaltyPoints.toString());
});








app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
