import Sequelize from 'sequelize';

const db = new Sequelize('nodejs_lab','tutor', '1234567', {
  dialect: 'mysql'
});

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db;
