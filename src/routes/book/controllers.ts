import { Request, Response } from 'express';
import User from '../../models/User';
import Book from '../../models/Book';

const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, description, publishedDate, coverImage } = req.body;
        const firebaseUid = req.body.firebaseUid; // recibimos UID de Firebase desde el front

        // Busca el usuario en Mongo por firebaseUid
        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado en la BD" });
        }

        // Crea el libro con ObjectId del usuario
        const book = new Book({
            title,
            author,
            description,
            publishedDate,
            coverImage,
            user: user._id, // usa el ObjectId de Mongo
        });

        await book.save();

        res.status(201).json({
            message: "Libro creado exitosamente.",
            data: book,
            error: false,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creando el libro.", error: true });
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find({ isActive: true })
            .populate("user", "name lastName") // trae solo name y lastname del usuario
            .sort({ createdAt: -1 }); // más nuevos primero

        res.status(200).json({
            message: "Libros obtenidos exitosamente.",
            data: books,
            error: false,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener libros.",
            error: true,
        });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id)
            .populate("user", "name email");

        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el libro.", error });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, author, description, publishedDate, coverImage } = req.body;

        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, description, publishedDate, coverImage },
            { new: true }
        )
            .populate("user", "name lastName");

        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error al modificar el libro.", error });
    }
};

export const hardDeleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado." });
        }

        res.status(200).json({ message: "Libro eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el libro", error });
    }
};

export const softDeleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        res.status(200).json({ message: "Libro desactivado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al desactivar el libro", error });
    }
};

export default { createBook, getAllBooks, getBookById, updateBook, hardDeleteBook, softDeleteBook };