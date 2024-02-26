import express, { request } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/bookRoute.js';

const app =express();

//Middleware for parsing request body
app.use(express.json());

app.get('/',(req,res) => {
    return res.status(234).send('welcome');
});

app.use('/books',bookRoute);



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