module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: "Cet arbitre est déjà affecté à ce match avec ce rôle." });
  }

  res.status(500).json({ error: "Une erreur interne du serveur est survenue." });
};