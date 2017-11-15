import User from './user.model';
import {Op} from 'sequelize';

User.bulkCreate([
 { name: 'bulk1',  email: 'bulk1@test.com', password: 'bulk1234' },
 { name: 'bulk3',  email: 'bulk2@test.com', password: 'bulk1234' },
 { name: 'bulk3',  email: 'bulk3@test.com', password: 'bulk1234' }
]).then(created => {
  console.log(`created: ${created.length}`);
  User.update({
    password: 'bulk1234567'
  }, {
    where: {
      name: {
        [Op.like]: 'bulk%'
      }
    }
  }).spread((affectedCount, affectedRows) => {
    console.log(`updated: ${affectedCount}`);
    User.destroy({
      where : {
        name: {
          [Op.like]: 'bulk%'
        }
      }
    }).then(affectedRows => console.log(`deleted: ${affectedRows}`));
  })
});
