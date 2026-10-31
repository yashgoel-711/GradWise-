import mongoose from "mongoose";

const academicSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true
    },
    subjects: [{
        name: { type: String, required: true },
        grade: { type: String, required: true }, // O, A+, A, B+, B, C, D, F
        credits: { type: Number, required: true }
    }],
    sgpa: Number, // computed in the controller from the subjects
    totalCredits: Number,

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, { timestamps: true });

export const Academic = mongoose.model("Academic", academicSchema)
