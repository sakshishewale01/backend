import mongoose from 'mongoose'

const hospitalSchema = new mongoose.schema(
    {
        name :
        {
            type: String,
            required : true
        },

        adressLine1:
        {
            type :String,
            required: true
        },

        adressLine2: 
        {
            type: String,
            required: true
        },

        pincode:
        {
            type: String,
            required: true
        },

        Specilaized_in : [
            {
                type :String,
            },
        ],
    },
    {
        timestamps: true
    }
);

export const Hosptial = mongoose.model('Hospital',hospitalSchema);