import express from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../../resolvers/users/index.js';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:uuid', getUser);
userRouter.put('/:uuid', updateUser);
userRouter.delete('/:uuid', deleteUser);

export default userRouter;
