import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, deletePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { existeUsuarioById } from "../helpers/db-validator.js";
 
const router = Router();
 
router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es correo valido').not().isEmpty(),
        validarCampos
    ],
    savePet
)

router.get('/', getPets)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.delete(
    '/:id',
    [
        tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    deletePet
)

export default router;