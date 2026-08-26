import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema(
    {
        name :
        {
            type : String,
            required: true,
            unique: true,
            lowercase: true
        },
        age: 
        {
            type :Number,
            required: true
        },

        salary: 
        {
            type: Number,
            require: true
        },

        gender :
        {
            type :String,
            enum: ['F','M','O'],
            required : true
        },

        adress :
        {
            type: String,
            required :true

        },
        experienced_year :
        {
            type: Number,
            default: 0
        },

        Work_in_Hospitals:
        {
            type: mongoose.Schema.Type.ObjectId,
            ref: 'Hospital'

        },
        },
         {
        timestamps: true
        }
     
        );

export const doctor = mongoose.model('Doctor',doctorSchema);