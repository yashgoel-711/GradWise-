import {connectDb} from "./db/index.js"
import { app } from "./app.js";

connectDb()
.then(()=>{
    app.on('error', (err) => {
        console.error('APP CANNOT CONNECT TO DB :', err);        
    });
    app.listen(process.env.PORT,()=>{
        console.log("App is listening on :",process.env.PORT)
    })
})
.catch((err)=>{console.log("DB CONNECTION ERROR : ",err)})