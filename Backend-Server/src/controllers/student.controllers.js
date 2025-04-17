import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import {
  uploadOnCloudinary,
  deleteUploadOnCloudinary,
} from "../services/cloudinary/cloudinary.services.js";
import { Student } from "../models/Student.model.js";

const registerStudent = asyncAwaitHandler(async (req, res) => {
  const { name, email, password, college, branch, year, contact } = req.body;
  if (
    [name, email, password, college, branch].some((field) => {
      return field?.trim() === "";
    }) ||
    !year ||
    !contact
  ) {
    throw new apiError(400, "Must Pass Student Details");
  }

  const registeredStudents = await Student.findOne({
    $or: [{ email }, { contact }],
  });
  if (registeredStudents) {
    throw new apiError(409, "student already registered");
  }
  const AvatarLocalPath = req.files?.Avatar[0]?.path;
  let AvatarResponse;
  if (AvatarLocalPath) {
    AvatarResponse = await uploadOnCloudinary(AvatarLocalPath);
  }
  if (AvatarResponse === null) {
    throw new apiError(500, "Error while uploading File");
  }

  const createdStudent = await Student.create({
    name,
    email,
    password,
    college,
    branch,
    avatar: AvatarResponse ? AvatarResponse : "avatar.jpeg",
    contact,
    year
  });
  if (!createdStudent) {
    throw new apiError(500, "error while registering Student");
  }

  const registeredStudent = await Student.findOne({
    _id: createdStudent._id,
  }).select("-password");

  if (!registeredStudent) {
    throw new apiError(
      500,
      "once try login manually.. if can't then try for register again"
    );
  }

  return res.status(200).json(new apiResponse(200, registeredStudent));
});

const loginStudent = asyncAwaitHandler(async(req,res)=>{
  const {email,contact,password} = req.body
  if((!contact || !email) && !password){
    throw new apiError(400,"must pass credentials to login")
  }
  const student = await Student.findOne({$or:[{email},{contact}]})
  if(!student){
    throw new apiError(400,"wrong credentials")
  }

const verifiedStudent = await student.isPasswordCorrect(password);

if (!verifiedStudent) {
  throw new apiError(400, "wrong credentials");
}
const token = await student.generateToken();

const loggedInStudent = await Student.findOne({ _id: student._id }).select(
  "-password"
);

if (!loggedInStudent) {
  throw new apiError(500, "cant login...internal server error");
}

const options = {
  httpOnly: true,
  secure: true,
};

return res
  .status(200)
  .cookie("Token", token, options)
  .json(
    new apiResponse(
      201,
      {
        buyer: loggedInStudent,
        Token: token,
      },
      "successfully logged In"
    )
  );
})
const logoutStudent = asyncAwaitHandler(async (req,res)=>{
  const student = req.student
  if(!student){
    throw new apiError(400,"you must be logged IN")
  }

  const options = {
    httpOnly: true,
    secure: true,
  };
    return res
      .status(200)
      .clearCookie("Token", options)
      .json(new apiResponse(200, {}, "student Logged Out"));
});




export { registerStudent , loginStudent , logoutStudent};
