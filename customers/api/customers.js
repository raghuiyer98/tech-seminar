const express= require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {useNewUrlParser: true, useUnifiedTopology: true});
console.log('database customer connected');

const bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//exporting model
require("../model/customer" );

const Customer=mongoose.model("Customer");

app.get('/customers',(req,res)=>{

    Customer.find().then((customers)=>{

        res.json(customers);

    }).catch((err)=> {
        if(err){
            throw err; 
        }
    })
})

app.get('/customer/:id',(req,res)=>{
      
Customer.findById(req.params.id).then((customer)=>{
     if(customer)
     res.json(customer);

}).catch((err)=> {
    if(err){
        throw err; 
    }
})

})
app.post('/customer',(req,res)=> {
 
    var newcustomer={

        name:req.body.name,
        age:req.body.age,
        address:req.body.address
       
    }
    var customer=new Customer(newcustomer)

    customer.save().then(() => {
        console.log("new customer created");
       res.json(req.body);

    }).catch((err)=> {
        if(err){
            throw err; 
        }
    })

})
app.listen(5545,()=>{
    console.log('this is customer service');
})
