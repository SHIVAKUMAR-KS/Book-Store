import express from 'express'
import { Book } from '../models/bookModel.js';

const router=express.Router();




//Route for save a new Book
router.post('/books',async(req,res) => {
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
router.get('/books',async (req,res) =>{
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
router.get('/books/:id',async (req,res) =>{
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
router.put('/books/:id',async (req,res)=>{
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

//Route for Delete a book
router.delete('/books/:id',async (req,res)=>{
    try{
        const {id}=request.params;

        const result=await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(400).json({message:'Book not found'});

        }
        return res.status(200).send({message:'Book deleted successfully'});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})