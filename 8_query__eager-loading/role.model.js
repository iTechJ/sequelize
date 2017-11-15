import db from './db';
import Sequelize from 'sequelize';

const Role = db.define('role', {
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
    }
}, {timestamps: false});

export default Role;
