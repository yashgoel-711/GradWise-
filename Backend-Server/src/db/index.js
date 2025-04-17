import mongoose from "mongoose"

export const connectDb = async ()=>{
    try {
        const DB_connection = await mongoose.connect(`${process.env.MONGODB_URI}/GRADWISE`)
        console.log("MONGO DB Conected : DB HOST :",DB_connection.connection.host )
    } catch (error) {
        console.log("mongoDB connection error : ",error)        
        throw(error)
    }
}

