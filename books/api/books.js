const express= require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {useNewUrlParser: true, useUnifiedTopology: true});
console.log('database connected');

const bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


require("../model/book" );

const Book=mongoose.model("Book");

app.get('/books',(req,res)=>{

    Book.find().then((books)=>{

        res.json(books);

    }).catch((err)=> {
        if(err){
            throw err; 
        }
    })
})

app.get('/book/:id',(req,res)=>{
      
Book.findById(req.params.id).then((book)=>{
     if(book)
     res.json(book);

}).catch((err)=> {
    if(err){
        throw err; 
    }
})

})
app.post('/book',(req,res)=> {
 
    var newbook={

        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }
    var book=new Book(newbook)

    book.save().then(() => {
        console.log("new book created");
        res.json(req.body);

    }).catch((err)=> {
        if(err){
            throw err; 
        }
    })

})
app.listen(4545,()=>{
    console.log('this is book service');
})
module.exports = app
