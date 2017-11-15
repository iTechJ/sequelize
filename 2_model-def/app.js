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

const User = connection.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  date_of_birth: Sequelize.DATE
},  {timestamps: false});

User.all()
  .then(users => users.forEach(user => console.log(user.dataValues)))
  .catch(err => console.log(err));
