

//taha9o9 mn bayanat hokem (Arbitre)
exports.validateArbitre = (req, res, next) => {

  console.log("=== Data received in validateArbitre ===", req.body);

  const { nom, prenom, nationalite } = req.body;

  // t2aked mn khanat kinin kmlin 3amrin
  if (!nom || !prenom || !nationalite) {
    return res.status(400).json({ 
      error: "Tous les champs obligatoires (nom, prenom, nationalite) doivent être remplis." 
    });
  }

  // ila kan kolchi shih  doz kontor
  next();
};

// hata9o9 mn bayanat (Match)
exports.validateMatch = (req, res, next) => {
  console.log("=== Data received in validateMatch ===", req.body);
  
  const { dateMatch, heureMatch, stade } = req.body;

  if (!dateMatch || !heureMatch || !stade) {
    return res.status(400).json({ 
      error: "Tous les champs obligatoires (dateMatch, heureMatch, stade) doivent être remplis." 
    });
  }

  next();
};

// taha9o9 mn ta3yinat (Affectation)
exports.validateAffectation = (req, res, next) => {
  console.log("=== Data received in validateAffectation ===", req.body);
  
  const { arbitreId, matchId, role } = req.body;

  if (!arbitreId || !matchId || !role) {
    return res.status(400).json({ 
      error: "Tous les champs obligatoires (arbitreId, matchId, role) doivent être remplis." 
    });
  }

  next();
};