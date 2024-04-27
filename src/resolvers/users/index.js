import { v4 as uuidv4 } from 'uuid';
import connection from '../../db.js';

export const createUser = (req, res) => {
  const user = req.body;
  const { username, nrp } = user;
  const uuid = uuidv4();
  const query = `INSERT INTO users (uuid, username, nrp) VALUES ('${uuid}', '${username}', ${nrp})`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log('User added to the database!');
  });

  res.send(`User with the username ${user.username} added to the database!`);
};

export const getsUser = (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
};

export const getUser = (req, res) => {
  const { uuid } = req.params;
  connection.query(
    `SELECT * FROM users WHERE uuid = '${uuid}'`,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
};

export const updateUser = (req, res) => {
  const { uuid } = req.params;
  const { username, nrp } = req.body;
  const user = connection.query(
    `SELECT * FROM users WHERE uuid = '${uuid}'`,
    (error, results) => {
      if (error) throw error;
    }
  );
  if (username) user.username = username;
  if (nrp) user.nrp = nrp;
  const query = `UPDATE users SET username = '${user.username}', nrp = ${user.nrp} WHERE uuid = '${uuid}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(`User with the uuid ${uuid} has been updated.`);
  });
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
