import User from './user.model';
import {Op} from 'sequelize';

const findById = () =>
  User.findById(1)
  .then(user => {
    console.log('---- Find by id ----');
    if (user) {
      console.log(user.dataValues);
    } else {
      console.log('User not found');
    }
  })    .catch(err => console.log(err));

// Find one user. Equivalent to User.findOne
const find = () =>
  User.findOne()
    .then(user => {
      console.log('---- Find one ----');
      if (user) {
        console.log(user.dataValues);
      } else {
        console.log('User not found');
      }
    })
    .catch(err => console.log(err));

const findOrCreate = () =>
  User.findOrCreate({where: {email: 'help@test.com'}, defaults: {name: 'Help Desk', password: '1234567'}})
    .spread((user, created) => {
        console.log('---- Find or create ----')
        console.log(user.get({
          plain: true
        }))
        console.log(created);  //First call will return true, second and others - false
      });

const findAndCountAll = () =>
  User.findAndCountAll({
    where: {
      email: {
        [Op.like]: '%test%'
      }
    }})
    .then(result => {
      console.log('---- Find and count all ----');
      console.log(result.count);
      console.log(result.rows.map(row => row.dataValues));
    });

const findAll = () =>
  User.findAll({attributes: ['name']})
    .then(users => {
      console.log('---- Find all ----');
      console.log(users.map(user => user.dataValues));
    })
    .catch(err => console.log(err));

findById();
find();
findOrCreate();
findAndCountAll();
findAll();
