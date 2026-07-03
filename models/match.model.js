const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  equipe1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  equipe2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateMatch: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'matchs',
  timestamps: false
});

module.exports = Match;