import Joi from "joi";

export const createBookValidationSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.base": "El título debe ser un texto.",
            "string.empty": "El título no puede estar vacío.",
            "string.min": "El título debe tener al menos 3 caracteres.",
            "string.max": "El título no puede superar los 255 caracteres.",
            "any.required": "El título es obligatorio.",
        }),

    author: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.base": "El autor debe ser un texto.",
            "string.empty": "El autor no puede estar vacío.",
            "string.min": "El autor debe tener al menos 3 caracteres.",
            "string.max": "El autor no puede superar los 255 caracteres.",
            "any.required": "El autor es obligatorio.",
        }),

    description: Joi.string()
        .allow("")
        .optional()
        .messages({
            "string.base": "La descripción debe ser un texto.",
        }),

    publishedDate: Joi.date()
        .optional()
        .messages({
            "date.base": "La fecha de publicación debe ser una fecha válida.",
        }),

    coverImage: Joi.string()
        .uri()
        .allow("")
        .optional()
        .messages({
            "string.uri": "La imagen de portada debe ser una URL válida.",
        }),

    firebaseUid: Joi.string()
        .required()
        .messages({
            "string.base": "El usuario debe ser un texto.",
            "any.required": "El usuario es obligatorio.",
        }),

});
