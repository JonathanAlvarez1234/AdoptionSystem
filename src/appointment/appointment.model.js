import { Schema, model } from "mongoose";

const AppointmentSchema = Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    older: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
});


export default model('Appointment', AppointmentSchema);