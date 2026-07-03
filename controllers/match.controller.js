const { Match } = require('../models');

// ayzid match jdid
exports.createMatch = async (req, res, next) => {
  try {
    // code li ayzid match fi data biz ki nkon hna
    res.status(201).json({ message: "createMatch functions successfully" });
  } catch (error) {
    next(error);
  }
};

//jib hokam dyl fich match
exports.getMatchArbitres = async (req, res, next) => {
  try {
    res.status(200).json({ message: "getMatchArbitres functions successfully" });
  } catch (error) {
    next(error);
  }
};