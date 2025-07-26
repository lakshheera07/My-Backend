import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path: './dotenv'
})

connectDB()



/*
( async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error)=>{
            console.error("ERRR", error)
            throw error
            
        })

        app.listen(process.env.PORT , () =>{
            console.log(`Running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Connection to database failed:", error);
    }
})
    */
