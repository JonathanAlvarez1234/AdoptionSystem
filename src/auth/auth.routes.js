import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteEmail,  } from "../helpers/db-validator.js";

const router = Router();

router.post(
    '/login',
    [
        check('correo', 'Este no es un correo valido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmail(),
        validarCampos
    ],
    login
)

router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').not.isEmail(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
        check('correo', 'Este no es un correo válido').isEmail(),

    ]
)

export default router;