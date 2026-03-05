import express from 'express';
import controllers from './controllers';
import validationMiddleware from '../../middlewares/validator';
import { createBookValidationSchema } from './validations';

const router = express.Router();

router.post('/', validationMiddleware(createBookValidationSchema), controllers.createBook);
router.get('/', controllers.getAllBooks);
router.get('/:id', controllers.getBookById);
router.patch('/:id', validationMiddleware(createBookValidationSchema), controllers.updateBook);
router.delete('/hard/:id', controllers.hardDeleteBook);
router.patch('/soft/:id', controllers.softDeleteBook);

export default router;