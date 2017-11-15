import Sequelize from 'sequelize';
import cls from 'continuation-local-storage';

const nmsp = cls.createNamespace('itechart-nodejs-lab');
Sequelize.useCLS(nmsp);

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
