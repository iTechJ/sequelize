import User from './user.model';

User.all({include: 'role'})
  .then(users => users.forEach(user => {
    const {id, name, dateOfBirth, role} = user.dataValues;
    console.log({id, name, dateOfBirth, role: role.dataValues});
  }))
  .catch(err => console.log(err));
