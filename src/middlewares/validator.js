import { body } from 'express-validator';
import { validarCampos } from './validar-campos';
import { existsEmail } from '../helpers/db-validator';

export const registerValidator = {
    body('name', "The name is  required").not().isEmpty(),
    body('surname', "The surname is required").not().isEmpty(),
    body('surname', "You must enter a valid email")isEmail(),
    body("email").custom(existsEmail),
    body("password", "Password must be at leat 6 characters").isLength({min: 6}),
    validarCampos

}

export const loginValidator = {
    body("email").optional().isEmail().withMessage("Enter a valid email address"),
    body("username").optional().isEmail().isString().withMessage("Enter a valid username"),
    body("password", "Password must be at least 6 characters").isLength({min: 8}),
    validarCampos
}