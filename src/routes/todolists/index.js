import express from 'express';
import {
  createTodoList,
  getTodoLists,
  getTodoListsByUser,
  getTodoList,
  updateTodoList,
  deleteTodoList,
} from '../../resolvers/todolists/index.js';

const router = express.Router();

router.post('/', createTodoList);
router.get('/', getTodoLists);
router.get('/user/:user_id', getTodoListsByUser);
router.get('/:id', getTodoList);
router.put('/:id', updateTodoList);
router.delete('/:id', deleteTodoList);

export default router;
