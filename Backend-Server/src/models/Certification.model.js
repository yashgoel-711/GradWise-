import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issuer: {
        type: String,
        required: true
    },
    issueDate: Date,
    credentialUrl: String,

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, { timestamps: true });

export const Certification = mongoose.model("Certification", certificationSchema)
