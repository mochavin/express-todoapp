import { response } from 'express';
import connection from '../../db.js';
import { check, validationResult } from 'express-validator';

export const createTodoList = async (req, res) => {
  const { title, description, user_id } = req.body;
  const query = `INSERT INTO todolists (title, description, user_id) VALUES ('${title}', '${description}', '${user_id}')`;
  connection.query(query, (error, results) => {
    if (error) throw error;
  });
  res.send('Todo List added to the database!');
};

export const getsTodoList = async (req, res) => {
  connection.query('SELECT * FROM todolists', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
};

export const getsTodoListByUser = async (req, res) => {
  const { user_id } = req.params;
  connection.query(
    `SELECT * FROM todolists WHERE user_id = '${user_id}'`,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
};

export const getTodoList = async (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM todolists WHERE id = '${id}'`,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
};

export const updateTodoList = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todolist = connection.query(
    `SELECT * FROM todolists WHERE id = '${id}'`,
    (error, results) => {
      if (error) throw error;
    }
  );
  if (title) todolist.title = title;
  if (description) todolist.description = description;
  const query = `UPDATE todolists SET title = '${todolist.title}', description = '${todolist.description}' WHERE id = '${id}'
  `;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(`Todo List with the id ${id} has been updated.`);
  });
};

export const deleteTodoList = async (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM todolists WHERE id = '${id}'`,
    (error, results) => {
      if (error) throw error;
      if (results.length === 0) {
        res.send('Todo List not found');
        return;
      }
      const query = `DELETE FROM todolists WHERE id = '${id}'`;
      connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(`Todo List with the id ${id} has been deleted.`);
      });
    }
  );
};
