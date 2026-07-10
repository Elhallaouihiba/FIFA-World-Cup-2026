// controllers/affectation.controller.js
const { Affectation, Arbitre, Match } = require('../models'); // كنجيبو الموديلز كاملين

// 1. تعيين حكم ف ماتش جديد (Affecter un arbitre)
exports.createAffectation = async (req, res, next) => {
  try {
    const { arbitreId, matchId, role } = req.body;

    // تأكدي واش الحَكَم والماتش كاينيين أصلاً ف الداتابيز قبل ما نربطوهم
    const arbitreExists = await Arbitre.findByPk(arbitreId);
    const matchExists = await Match.findByPk(matchId);

    if (!arbitreExists || !matchExists) {
      return res.status(404).json({ error: "Hakam awla l'Match makaynich f database!" });
    }

    // تسجيل التعيين
    const newAffectation = await Affectation.create({ arbitreId, matchId, role });
    
    res.status(201).json({
      message: "Arbitre affecté au match avec succès! ",
      data: newAffectation
    });
  } catch (error) {
    next(error);
  }
};

// 2. جيب كاع التعيينات لي كاينين ف البطولة
exports.getAllAffectations = async (req, res, next) => {
  try {
    const affectations = await Affectation.findAll();
    res.status(200).json(affectations);
  } catch (error) {
    next(error);
  }
};

// 3. إلغاء تعيين حكم من ماتش (Delete)
exports.deleteAffectation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectation = await Affectation.findByPk(id);

    if (!affectation) {
      return res.status(404).json({ message: "Had l'affectation makaynach!" });
    }

    await affectation.destroy();
    res.status(200).json({ message: "Affectation annulée avec succès!" });
  } catch (error) {
    next(error);
  }
};