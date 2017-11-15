import db from './db';
import Sequelize from 'sequelize';

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
     set(val) {
      this.setDataValue('password', new Buffer(val).toString('base64'));
     },
     get() {
       const encodedPass = this.getDataValue('password');
       return new Buffer(encodedPass, 'base64').toString('ascii');
     }
   },
   email: {
     type: Sequelize.STRING,
     allowNull: false,
     validate: {
       isEmail: true
     }
   },
   dateOfBirth: {
     type: Sequelize.DATE,
     field: 'date_of_birth'
   }
},  {timestamps: false});

export default User;
