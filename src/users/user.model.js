import {Schema, model} from "mongoose";

const UserSchema = Schema({
    name:{
        type: String,
        require: [true, 'Name in required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    
    surname: {
        type: String,
        require: [true, 'Surname in required'],
        maxLength: [25, 'Cant be overcome 25 characters'] 
    },
    email: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria'],
        minLength: 8
    },
    profilePicture: {
        type: String,
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },

}
    {
        timestamps: true, //Agregar el createAT y updateAT
        versionkey: false // No agrega el campo __v
    }
);

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('User', UserSchema);