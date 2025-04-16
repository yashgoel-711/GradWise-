import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    avatar : {
        type:String,
        default:"avatar.jpeg"
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password : {
        type:String,
        required:true
    },
    contact : {
        type:Number,
        required:true
    },
    college : {
        type:String,
        required:true
    },
    year : {
        type : Number,
        required:true
    },
    branch : {
        type:String,
        required:true
    },
    skills : [String],
    
    domain : String,

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

},{timestamps:true})


studentSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password , 10)    
    next()
})

studentSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

studentSchema.methods.generateToken = async function(){
    return jwt.sign(
        {
            _id : this._id ,
            email : this.email,
            name : this.name
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn : process.env.TOKEN_EXPIRY
        }
    )
}

export const Student = mongoose.model("Student",studentSchema)