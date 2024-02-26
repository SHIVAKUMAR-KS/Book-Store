import express, { request } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app =express();

//Middleware for parsing request body
app.use(express.json());

app.get('/',(req,res) => {
    return res.status(234).send('welcome');
});

//Route for save a new Book
app.post('/books',async(req,res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all required fields:title,author,publishYear',
            });
        }
        const newBook = {
            title:request.body,title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book=await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message });
  
    }
});

//Routes for get all books from database
app.get('/books',async (req,res) =>{
    try{
        const books=await Book.find({});

        return res.status(200).json({
            count:books.length,
            data:books
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

//Route for get One Book from database by Id
app.get('/books/:id',async (req,res) =>{
    try{
        const {id}=req.params;
        const book=await Book.findById(id);

        return res.status(200).json(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//Route fro update a Book
app.put('/books/:id',async (req,res)=>{
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'send all required fields:title,author,publisher',
            });
        }
        const {id} =req.params;

        const result =await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App is listening to DATABASE');
    app.listen(PORT,() =>{
    console.log(`App is listening to port:${PORT}`);
})
})
.catch((error) => {
    console.log(error);
})