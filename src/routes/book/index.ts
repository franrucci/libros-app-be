import express from 'express';
import controllers from './controllers';

const router = express.Router();

router.post('/', controllers.createBook);
router.get('/', controllers.getAllBooks);
router.get('/:id', controllers.getBookById);
router.patch('/:id', controllers.updateBook);
router.delete('/hard/:id', controllers.hardDeleteBook);
router.patch('/soft/:id', controllers.softDeleteBook);

export default router;