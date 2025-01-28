import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    role: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});

export default mongoose.model('Role', RoleSchema);