const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hiba_secret_key_fifa_2026');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide.' });
  }
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Accès interdit.' });
    }
    next();
  };
};