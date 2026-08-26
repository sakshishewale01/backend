import mongoose from "mongoose";

const userschema = new mongoose.Schema
    (
        {
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            },
            emailId: {
                type: String,
                required: true,
                lowercase: true,
            },
            password: {
                type: String,
                required: [true, 'password is mandatory']
            }
        },
        { timestamps: true }
    )

export const User = mongoose.model('User', userschema)