import User from './user.model';

User.all()
  .then(users => users.forEach(user => console.log(user.dataValues)))
  .catch(err => console.log(err));
