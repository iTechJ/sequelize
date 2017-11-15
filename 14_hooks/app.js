import User from './user.model';
import Project from './project.model';
import db from './db';

const transactionTest = () =>
 db.transaction().then(t =>
   User.bulkCreate([
    { name: 'bulk1',  email: 'bulk1@test.com', password: 'bulk1234' },
    { name: 'bulk3',  email: 'bulk2@test.com', password: 'bulk1234' },
    { name: 'bulk3',  email: 'bulk3@test.com', password: 'bulk1234' }
  ], {transaction: t})
  .then(users =>
     Project.create({
      name: 'Itechart Nodejs Lab', dueDate: new Date('2018-01-01')
    }, {
      transaction: t,
      include: [{
        model: User,
        as: 'users'
      }]
    })
    .then(project =>
       project.addUsers(users) // this would never fail because of Task hooks
    )
  )
  .then(() => t.commit())
  .catch(() => t.rollback())
);

transactionTest();
