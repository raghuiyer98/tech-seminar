const express= require('express');
const app=express();
const mongoose=require('mongoose');
const axios=require('axios');

mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {useNewUrlParser: true, useUnifiedTopology: true});
console.log('database connected');

const bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

require("../model/order" );

const Order=mongoose.model("Order");

app.get('/orders',(req,res)=>{

    Order.find().then((orders)=>{

        res.json(orders);

    }).catch((err)=> {
        if(err){
            throw err; 
        }
    })
})

app.get('/order/:id',(req,res)=>{
      
Order.findById(req.params.id).then((order)=>{
     if(order)
    {
        axios.get("http://localhost:5545/customer/" + order.CustomerID).then((response)=> {
var orderobject={customerName:response.data.name,Customerage:response.data.age,bookTite:'',Author:''}

axios.get("http://localhost:4545/book/" + order.BookID).then((response)=> {
    orderobject.bookTite=response.data.title
    orderobject.Author=response.data.author
    res.json(orderobject)



        })

})
    }
else {
    res.send('invalid order')
}

}).catch((err)=> {
    if(err){
        throw err; 
    }
})

})
app.post('/order',(req,res)=> {
 
    var neworder={

        CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
       
    }
    var order=new Order(neworder)

    order.save().then(() => {
        console.log("new order created");
        res.json(req.body);

    }).catch((err)=> {
        if(err){
            throw err; 
        }
    })

})
app.listen(6545,()=>{
    console.log('this is order service');
})

module.exports=app;