import User from '../users/user.model.js'
import Pet from './pet.model.js'
 
export const createPet = async (req,res) =>{
    try {
        const data = req.body;
        const user = await User.findOne({email: data.email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Propietario no encontrado'
            })
        }
        const pet = new Pet({
            ...data,
            older: user._id
        });
        await pet.save();
        res.status(200).json({
            success: true,
            pet
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al guardar mascota',
            error
        })
    }
}
 
export const getPets = async (req, res) =>{
    const {limite = 10, desde = 0} = req.query;
    const query = { state : true};
 
    try{
        const pets = await Pet.find(query)
            .skip(Number(desde))
            .limit(Number(limite));
       
        const petWithOwnerNames = await Promise.all(pets.map(async (pet) =>{
            const owner = await User.findById(pet.older);
            return {
                ...pet.toObject(),
                older: owner ? owner.name : "propietario no encontrado"
            }
        }))
        const total = await Pet.countDocuments(query);
        res.status(200).json({
            success: true,
            total,
            pets: petWithOwnerNames
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al obtener mascotas',
            error
        })
    }
}

export const searchPet = async (req, res) => {
    const { id } = req.params;

    try {
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({
                success: false,
                message: 'Mascota no encontrada'
            })
        }
        const owner = await User.findById(pet.older);
        res.status(200).json({
            success: true,
            pet: {
                ...pet.toObject(),
                older: owner ? owner.nombre : "Propietario no encontrado"
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar mascota',
            error
        })
    }
}

export const deletePet = async (req, res) => {
    const { id } = req.params;
    
    try {
        await Pet.findByIdAndUpdate(id, { state: false});
        res.status(200).json({
            success: true,
            msg: 'Pet eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar mascota',
            error
        })
    }
}

export const updatePet = async (req, res = response) => {
    try {
 
        const { id } = req.params;
        const { _id,  ...data } = req.body;
        let { email } = req.body;
        if(email) {
            const user = await User.findOne({ email });
 
            if (!user) {
                return res.status(400).json({
                    success: false,
                    msg: 'Usuario con ese correo electrónico no encontrado',
                });
            }
            data.older = user._id;
        }
        const pet = await Pet.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            success: true,
            msg: 'Mascota Actualizada',
            pet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar mascota',
            error
        })  
    }
}