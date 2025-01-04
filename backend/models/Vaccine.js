const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const Vaccine = sequelize.define('Vaccine', {
  v_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  v_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  v_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mfg_company: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'vaccine',
  timestamps: false
});

module.exports = Vaccine;
