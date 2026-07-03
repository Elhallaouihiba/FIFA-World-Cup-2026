const express = require('express');
const { sequelize } = require('./models');
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());


app.use(loggerMiddleware);

const arbitreRoutes = require('./routes/arbitre.routes');
const matchRoutes = require('./routes/match.routes');
const affectationRoutes = require('./routes/affectation.routes');

app.use('/api/arbitres', arbitreRoutes);
app.use('/api/matchs', matchRoutes);
app.use('/api/affectations', affectationRoutes);

app.use(errorMiddleware);

const PORT = 3000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('PostgreSQL est synchronisée avec succès.');
    app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
  })
  .catch(err => console.error('Erreur de connexion à la base de données:', err));