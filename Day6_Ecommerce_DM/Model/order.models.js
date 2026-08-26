import mongoose, { mongo } from 'mongoose'

const orderItemSchema = new mongoose
    (
        {
            orderId: {
                type: mongoose.Schema.Type.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    )

const orderSchema = new mongoose.Schema
    (
        {
            orderPrice: {
                type: Number,
                required: true
            },
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            orderItems: {
                type: [orderItemSchema]
            },
            address: {
                type: String,
                required: true
            },
            status: {
                type: String,
                enum: [INTRANSIT, COMPLETED, CANCELLED],
                default: 'INTRANSIT'
            }
        },
        { timestamps: true }
    )

export const Order = mongoose.model('Order', orderSchema) 