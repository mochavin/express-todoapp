import express from 'express';
import morgan from 'morgan';
import userRouter from './src/routes/users/index.js';
import todolistRouter from './src/routes/todolists/index.js';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 7000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 7000}`
  );
});

app.use('/users', userRouter);
app.use('/todolists', todolistRouter);

export default app;
