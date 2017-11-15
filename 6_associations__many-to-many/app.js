import Project from './project.model';

Project.all({include: 'users'})
  .then(projects => projects.forEach(project => {
    const {id, name, dueDate} = project.dataValues;
    const employees = project.users.map(user => user.dataValues);
    console.log({id, name, dueDate, employees})
  }))
  .catch(err => console.log(err));
