import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path: './dotenv'
})

connectDB()
.then(
    app.on("error" , (error) =>{
        console.log("ERR:",error)
        throw error
    }),
    app.listen(process.env.PORT , () =>{
        console.log(`App running on port ${process.env.PORT}`)
    })
)
.catch((err) => { 
    console.log("Mongo DB Connection failed", err);
    
})
