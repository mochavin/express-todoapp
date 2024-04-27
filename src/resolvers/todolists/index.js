import connection from '../../db.js';

export const createTodoList = async (req, res) => {
  const { title, description, user_id } = req.body;
  connection.query(
    `SELECT * FROM users WHERE id = '${user_id}'`,
    (error, results) => {
      if (error) throw error;
      if (results.length === 0) {
        res.send('User not found');
        return;
      }
      const query = `INSERT INTO todolists (title, description, user_id) VALUES ('${title}', '${description}', '${user_id}')`;
      connection.query(query, (error) => {
        if (error) throw error;
        res.send('Todo List added to the database!');
      });
    }
  );
};

export const getTodoLists = async (req, res) => {
  connection.query('SELECT * FROM todolists', (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.send('No todo lists found');
      return;
    }
    res.send(results);
  });
};

export const getTodoListsByUser = async (req, res) => {
  const { user_id } = req.params;
  connection.query(
    `SELECT * FROM todolists WHERE user_id = '${user_id}'`,
    (error, results) => {
      if (error) throw error;
      if (results.length === 0) {
        res.send('No todo lists found');
        return;
      }
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
      if (results.length === 0) {
        res.send('Todo List not found');
        return;
      }
      res.send(results);
    }
  );
};

export const updateTodoList = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  connection.query(
    `SELECT * FROM todolists WHERE id = '${id}'`,
    (error, results) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length === 0) {
        res.send('Todo List not found');
        return;
      }
      const todolist = results[0];
      if (title) todolist.title = title;
      if (description) todolist.description = description;
      const query = `UPDATE todolists SET title = '${todolist.title}', description = '${todolist.description}' WHERE id = '${id}'`;
      connection.query(query, (error, results) => {
        if (error) {
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send(`Todo List with the id ${id} has been updated.`);
      });
    }
  );
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
