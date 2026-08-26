import mongoose from 'mongoose'

const subtodoSchema = new mongoose.schema
    (
        {
            content: {
                type: String,
                required: true,           
            },
            completed: {
                type: Boolean,
                default: false
            },
            createdBy: {
                type: mongoose.Schema.Type.ObjectId,
                ref: 'User'
            }
        },
        { timestamps: true }
    )

export const subTodo = mongoose.model('subTodo', subtodoSchema)