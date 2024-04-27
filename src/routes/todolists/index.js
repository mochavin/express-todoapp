import express from 'express';
import {
  createTodoList,
  getsTodoList,
  getsTodoListByUser,
  getTodoList,
  updateTodoList,
  deleteTodoList,
} from '../../resolvers/todolists/index.js';

const router = express.Router();

router.post('/', createTodoList);
router.get('/', getsTodoList);
router.get('/user/:user_id', getsTodoListByUser);
router.get('/:id', getTodoList);
router.put('/:id', updateTodoList);
router.delete('/:id', deleteTodoList);

export default router;
