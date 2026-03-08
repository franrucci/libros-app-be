import express from 'express';
import controllers from './controllers';
import validationMiddleware from '../../middlewares/validator';
import { createBookValidationSchema, updateBookValidationSchema } from './validations';
import { authenticateFirebase } from '../../middlewares/authenticateFirebase';

const router = express.Router();

router.post('/', authenticateFirebase, validationMiddleware(createBookValidationSchema), controllers.createBook);
router.get('/', controllers.getAllBooks);
router.get('/admin', controllers.getAllBooksAdmin);
router.get('/:id', controllers.getBookById);
router.patch('/:id', validationMiddleware(updateBookValidationSchema), controllers.updateBook);
router.delete('/hard/:id', controllers.hardDeleteBook);
router.patch('/soft/:id', controllers.softDeleteBook);
router.patch('/activate/:id', controllers.activateBook);

export default router;