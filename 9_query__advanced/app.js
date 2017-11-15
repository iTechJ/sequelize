import User from './user.model';
import Role from './role.model';
import {Op} from 'sequelize';

const complexQuery = () =>
User.all({
  include: ['role'],
  where: {
    [Op.or]: [
      {
        id: {
          [Op.or]: [
            [1,2],
            { [Op.gt]: 10 }
          ]
        }
      },
      {
        dateOfBirth: {
          [Op.gt]: new Date('1990-10-10')
        }
      }
    ]
  }
}).then(users => users.forEach(user => {
    const {id, name, dateOfBirth, role} = user.dataValues;
    console.log({id, name, dateOfBirth, role: role.dataValues});
  }))
  .catch(err => console.log(err));

const findAdmins = () =>
  User.findAll({
    include: [{
      model: Role,
      where: {
        name: 'ADMIN'
      }
    }],
    attributes: ['id','name', 'email', 'dateOfBirth']
  }).then(users => users.forEach(user => {
      const {id, name, dateOfBirth, role} = user.dataValues;
      console.log({id, name, dateOfBirth, role: role.dataValues});
    }))
    .catch(err => console.log(err));

const theOldest = () =>
  User.min('dateOfBirth')
    .then(min => console.log(min));

const ordered = () =>
  User.findAll({
    attributes: ['name', 'email', 'dateOfBirth'],
    order: ['name', ['dateOfBirth', 'DESC']]
  })
  .then(users => console.log(users.map(user => user.dataValues)));

const pagination = () =>
  User.findAll({
    limit: 5,
    offset: 2
  })
  .then(users => console.log(users.map(user => user.dataValues)));

//complexQuery();
findAdmins();
//theOldest();
//ordered();
//pagination();
