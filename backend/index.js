import express, { request } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/bookRoute.js';

const app =express();

//Middleware for parsing request body
app.use(express.json());

//Middleware fro handling CORS policy
//option1 :Allow all origin with default of cors(*)
app.use(cors());
//Option 2:
app.use(
    cors({
        origin:'https://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
    })
);

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