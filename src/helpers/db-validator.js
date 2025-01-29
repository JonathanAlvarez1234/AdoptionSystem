import Role from '../role/role.model.js';
import Usuario from '../users/user.model.js';

export const esRoleValido = async(role = '') => {

    const existeRol = await Role.findOne({ role});

    if(!existeRol){
        throw new Error(`El rol ${role} no existe en la base de datos.`);


    }

}

export const existenteEmail = async ({ role});

    if(!existeRol){
        throw new Error(`El rol ${role} no existe en la base de datos`);

        
    }
