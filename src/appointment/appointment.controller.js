import User from "../users/user.model.js";
import Pet from "../pet/pet.model.js";
import Appointment from "./appointment.model.js"

export const createAppointment = async (req, res) => {
    try{

        const data = req.body;
        const user = await User.findOne({ email: data.email});
        const pet = await Pet.findOne({ name: data.name});
        if(!user ){
            return res.status(404).json({
                success: false,
                msg: "Propietario no encontrado"
            })
        }
        if(!pet){
            return res.status(404).json({
                success: false,
                msg: "Mascota no encontrada"
            })
        }

        const appointment = new Appointment({
            ...data,
            older: user._id, 
            pet: pet._id
            
        });

        await appointment.save();

        res.status(200).json({
            success: true,
            msg: "Cita guardada exitosamente",
            appointment
        })

    } catch(error){
        res.status(500).json({
            success: false,
            msg: "Error al guardar la cita",
            error
        })
    }
}

export const getAppointments = async (req, res) => {

    try {
        const { limit = 10, desde = 0 } = req.query;
        const [total, appointments] = await Promise.all([
            Appointment.countDocuments(),
            Appointment.find()
                .skip(Number(desde))
                .limit(Number(limit))
        ])

        res.status(200).json({
            success: true, 
            total, 
            appointments 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            msg: "Error al obtener appointments",
            error 
        });
    }
};




