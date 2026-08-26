import mongoose from "mongoose";

const todoSchema = new mongoose.schema
    (
        {
            content: {
                type: String,
                required: true,
            },
            complete: {
                type: Boolean,
                default: false
            },
            createdBy: {
                type: mongoose.Schema.Type.ObjectId,
                ref: 'User'
            },
            subTodo: [
                {
                    type: mongoose.Schema.Type.ObjectId,
                    ref: 'subTodo'
                }// array of subtodos
            ]
        },
        { timestamps: true }
    )

    export const Todo = mongoose.model('Todo', todoSchema)