
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'fifa-world', 
  'hiba',       
  'hiba123',    
  {
    host: 'localhost',
    port: 5431, 
    dialect: 'postgres',
    logging: false 
  }
);

module.exports = sequelize;