import { Schema, model } from "mongoose";

const PetSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    older: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Pet', PetSchema);