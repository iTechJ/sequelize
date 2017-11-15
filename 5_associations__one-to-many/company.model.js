import db from './db';
import Sequelize from 'sequelize';
import User from './user.model';

const Company = db.define('company', {
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
   address: {
     type: Sequelize.STRING,
     allowNull: false
   },
   website: Sequelize.STRING
},  {timestamps: false});

Company.hasMany(User, {foreignKey: 'company_id', sourceKey: 'id', as: 'employees'})

export default Company;
