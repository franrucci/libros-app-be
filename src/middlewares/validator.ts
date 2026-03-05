import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationResult } from 'joi';

const validationMiddleware = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body, { abortEarly: false }); // comparo el schema contra el body de la ruta. abortEarly: false: Devuelve todos los errores juntos.
        if (error) {
            return res.status(400).json({
                message: 'Error de validación.',
                details: error.details.map((d) => d.message),
            });
        }
        next();
    };
};

export default validationMiddleware;