import mongoose from 'mongoose'

const patientSchema = mongoose.Schema(
    {
        name : 
        {
            type: String,
            required :true,
        },

        diagnosed_with :
        {
            type : String,
            required: true
        },

        address :
        {
            type: String,
            required : true,

        },
        age :
        {
            type: Number,
            required: true
        },

        bloodGroup :
        {
            type: Sticker,
            required :true
        },

        gender :
        {
            type: String,
            enum : ["Female","Male","other"],
            required: true
        },

        admitted_in :[
            {
            type: mongoose.Schema.Type.ObjectId,
            ref: 'Hospital'
        },
        ],
    },
    {
        timestamps: true
    }
);

export const Patient = mongoose.model('Patient',patientSchema);
