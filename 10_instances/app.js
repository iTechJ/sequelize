import User from './user.model';

const save = () =>
  User.build({
    name: 'instance test',
    email: 'instance@test.com',
    password: '1234'
  }).save()
    .then(userInstance => userInstance.dataValues);

const reload = (id) =>
  User.findById(id).then(userInstance => {
    console.log(userInstance.name);
    userInstance.name = 'reload test';
    userInstance.reload().then(newUserInstance => console.log(newUserInstance.name));
  });

const update1 = (id) =>
  User.findById(id).then(userInstance => {
    userInstance.name = 'update test one';
    userInstance.email = 'new_instance@test.com';
    userInstance.save({
      fields : [`name`]
    }).then(updatedInstance =>
      console.log({name : updatedInstance.name, email: updatedInstance.email}));
  });

const update2 = (id) =>
  User.findById(id).then(userInstance =>
    userInstance.update({
      name: 'update test two'
    }).then(updatedInstance => console.log(updatedInstance.name))
  );

const destroy = (id) =>
  User.findById(id)
  .then(userInstance => userInstance.destroy())

save().then(user => {
  reload(user.id);
  update1(user.id);
  update2(user.id);
  destroy(user.id);
})
