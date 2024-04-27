import { v4 as uuidv4 } from 'uuid';
import connection from '../../db.js';

export const createUser = (req, res) => {
  const user = req.body;
  const { username, nrp } = user;
  const uuid = uuidv4();
  if (nrp.length < 10) {
    res.status(400).send('NRP must be at least 10 characters long');
    return;
  }
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.status(400).send('Username already exists');
      return;
    }
    const insertQuery = `INSERT INTO users (uuid, username, nrp) VALUES ('${uuid}', '${username}', ${nrp})`;
    connection.query(insertQuery, (error, results) => {
      if (error) throw error;
      console.log('User added to the database!');
    });
    res.send(`User with the username ${user.username} added to the database!`);
  });
};

export const getUsers = (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.send('No users found');
      return;
    }
    res.send(results);
  });
};

export const getUser = (req, res) => {
  const { uuid } = req.params;
  connection.query(
    `SELECT * FROM users WHERE uuid = '${uuid}'`,
    (error, results) => {
      if (error) throw error;
      if (results.length === 0) {
        res.status(404).send('User not found');
        return;
      }
      res.send(results);
    }
  );
};

export const updateUser = (req, res) => {
  const { uuid } = req.params;
  const { username, nrp } = req.body;
  connection.query(
    `SELECT * FROM users WHERE uuid = '${uuid}'`,
    (error, results) => {
      if (error) throw error;
      if (results.length === 0) {
        res.status(404).send('User not found');
        return;
      }
      const user = results[0];
      if (username) user.username = username;
      if (nrp) {
        if (nrp.length < 10) {
          res.status(400).send('NRP must be at least 10 characters long');
          return;
        }
        user.nrp = nrp;
      }
      const query = `UPDATE users SET username = '${user.username}', nrp = ${user.nrp} WHERE uuid = '${uuid}'`;
      connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(`User with the uuid ${uuid} has been updated.`);
      });
    }
  );
};

export const deleteUser = (req, res) => {
  const { uuid } = req.params;
  connection.query(
    `SELECT * FROM users WHERE uuid = '${uuid}'`,
    (error, results) => {
      if (error) throw error;
      if (results.length === 0) {
        res.send('User not found');
        return;
      }
      const query = `DELETE FROM users WHERE uuid = '${uuid}'`;
      connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(`User with the uuid ${uuid} has been deleted.`);
      });
    }
  );
};
