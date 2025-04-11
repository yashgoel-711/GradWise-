import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    avatar : {
        type:String,
        default:""
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

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

},{timestamps:true})

export const Student = mongoose.model("Student",studentSchema)