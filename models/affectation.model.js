const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Affectation = sequelize.define('Affectation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { 
    type: DataTypes.ENUM('central', 'assistant', 'VAR', 'AVAR', '4e'), 
    allowNull: false 
  }
}, { 
  tableName: 'affectations', 
  timestamps: false,
  indexes: [
    { fields: ['arbitreId'] },
    { fields: ['matchId'] },
    {
      unique: true,
      fields: ['arbitreId', 'matchId', 'role'],
      name: 'unique_affectation_role'
    }
  ]
});

module.exports = Affectation;