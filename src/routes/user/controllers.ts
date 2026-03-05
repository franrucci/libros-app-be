import { Request, Response } from 'express';
import User from '../../models/User';

const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, name, lastName, firebaseUid } = req.body;

        if (!firebaseUid) {
            return res.status(400).json({ message: "firebaseUid es requerido" });
        }

        const existingUser = await User.findOne({ firebaseUid });

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe en la DB" });
        }

        const user = new User({
            name,
            lastName,
            email,
            firebaseUid
        });

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al guardar usuario en la DB", error });
    }
};

export default {
    registerUser
};