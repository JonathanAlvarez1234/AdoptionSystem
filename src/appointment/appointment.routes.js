import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { createAppointment, getAppointments } from './appointment.controller.js';

const router = Router();

router.get('/', getAppointments);

router.post(
    '/',
    [
        validarJWT,
        check('email', 'Este no es un correo válido').not().isEmpty(),
        validarCampos
    ],
    createAppointment
);


export default router;