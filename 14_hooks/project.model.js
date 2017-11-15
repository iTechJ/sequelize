import db from './db';
import Sequelize from 'sequelize';
import User from './user.model';

const Project = db.define('project', {
  id: {
     type: Sequelize.INTEGER,
     allowNull: false,
     unique: true,
     autoIncrement: true,
     primaryKey: true
   },
   name: {
     type: Sequelize.STRING,
     allowNull: false
   },
   dueDate: {
     type: Sequelize.DATE,
     allowNull: false,
     field: 'due_date'
   }
},  { underscore: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const Task = db.define('task', {
    id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       unique: true,
       autoIncrement: true,
       primaryKey: true
     },
    status: Sequelize.STRING,
    description: Sequelize.STRING
}, {timestamps: false});

Task.beforeBulkCreate(tasks => {
  tasks.forEach(task => {
    if (!task.status) {
      task.status = 'NEW';
    }
  })

})

Project.belongsToMany(User, {through: Task, foreignKey: 'project_id', otherKey: 'user_id', hooks: true});

export default Project;
