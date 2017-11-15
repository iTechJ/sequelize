import Sequelize from 'sequelize';

const connection = new Sequelize('nodejs_lab','tutor', '1234567', {
  dialect: 'mysql'
});

connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
