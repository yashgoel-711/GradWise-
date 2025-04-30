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
    }],
    Roadmap: [{
        type:String,
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
studentSchema.statics.UpdateRoadmap = async function(studentId, taskArray) {
    if (!studentId || !taskArray) {
      throw new Error('Student ID and Task Array are required');
    }
  
    // Find the student document first
    const student = await this.findById(studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }
  
    // Update the roadmap
    student.Roadmap = taskArray;
  
    // Save the updated document
    await student.save();
  
    return student.Roadmap;
  };
  studentSchema.statics.UpdateSkills = async function(studentId, skillsArray) {
    if (!studentId || !skillsArray) {
      throw new Error('Student ID and Skills Array are required');
    }
  
    // Find the student document first
    const student = await this.findById(studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }
  
    // Update the skills
    student.skills = skillsArray;
  
    // Save the updated document
    await student.save();
  
    return student.skills;
  };


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