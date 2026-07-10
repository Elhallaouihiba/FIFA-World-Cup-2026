const sequelize = require('../config/database');
const Arbitre = require('./arbitre.model');
const Match = require('./match.model');
const Affectation = require('./affectation.model');
const User = require('./user.model');

Arbitre.belongsToMany(Match, { through: Affectation, foreignKey: 'arbitreId' });
Match.belongsToMany(Arbitre, { through: Affectation, foreignKey: 'matchId' });

Affectation.belongsTo(Arbitre, { foreignKey: 'arbitreId' });
Affectation.belongsTo(Match, { foreignKey: 'matchId' });
Arbitre.hasMany(Affectation, { foreignKey: 'arbitreId' });
Match.hasMany(Affectation, { foreignKey: 'matchId' });

module.exports = { sequelize, Arbitre, Match, Affectation, User };