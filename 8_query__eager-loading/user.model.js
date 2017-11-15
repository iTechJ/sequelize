import db from './db';
import Sequelize from 'sequelize';
import Role from './role.model';

const User = db.define('user', {
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
   password: {
     type: Sequelize.STRING,
     allowNull: false,
   },
   email: {
     type: Sequelize.STRING,
     allowNull: false
   },
   dateOfBirth: {
     type: Sequelize.DATE,
     field: 'date_of_birth'
   }
},  {timestamps: false});

User.belongsTo(Role, {foreignKey: 'role_id', targetKey: 'id', allowNull: false, default: 1});

export default User;
