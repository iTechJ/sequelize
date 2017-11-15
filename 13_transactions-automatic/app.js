import User from './user.model';
import Project from './project.model';
import db from './db';

const transactionTest = () =>
  db.transaction(t => // all the operations will be executed within single transaction
   User.bulkCreate([
    { name: 'bulk1',  email: 'bulk1@test.com', password: 'bulk1234' },
    { name: 'bulk3',  email: 'bulk2@test.com', password: 'bulk1234' },
    { name: 'bulk3',  email: 'bulk3@test.com', password: 'bulk1234' }
  ])
  .then(users =>
     Project.create({
      name: 'Itechart Nodejs Lab', dueDate: new Date('2018-01-01')
    }, {
      include: [{
        model: User,
        as: 'users'
      }]
    })
    .then(project =>
       project.addUsers(users,  { through: { status: 'NEW' } })
    //   project.addUsers(users) // uncomment to check failed transaction

    )
  )
);


transactionTest();
