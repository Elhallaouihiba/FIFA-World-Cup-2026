// controllers/arbitre.controller.js
const Arbitre = require('../models/arbitre.model.js'); 

// 1. زيادة حكم جديد ف الداتابيز بصح
exports.createArbitre = async (req, res, next) => {
  try {
    const newArbitre = await Arbitre.create(req.body); 
    res.status(201).json({
      message: "Arbitre créé avec succès",
      data: newArbitre
    });
  } catch (error) {
    next(error);
  }
};

// 2. جيب كاع الحكام لي مسجلين
exports.getAllArbitres = async (req, res, next) => {
  try {
    const arbitres = await Arbitre.findAll(); 
    res.status(200).json(arbitres);
  } catch (error) {
    next(error);
  }
};

// 3. جيب حكم واحد بـ الـ ID ديالو
exports.getArbitreById = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id); 
    
    if (!arbitre) {
      return res.status(404).json({ message: "Hakam makaynach b had l'ID!" });
    }
    
    res.status(200).json(arbitre);
  } catch (error) {
    next(error);
  }
};

// 4. تعديل معلومات حكم (Update)
exports.updateArbitre = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id);
    
    if (!arbitre) {
      return res.status(404).json({ message: "Hakam makaynach b had l'ID!" });
    }

    await arbitre.update(req.body); 
    res.status(200).json({ message: "Arbitre modifié avec succès!", arbitre });
  } catch (error) {
    next(error);
  }
};

// 5. مسح حكم بـ الـ ID (Delete)
exports.deleteArbitre = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id);
    
    if (!arbitre) {
      return res.status(404).json({ message: "Hakam makaynach b had l'ID!" });
    }

    await arbitre.destroy(); 
    res.status(200).json({ message: "Arbitre supprimé avec succès!" });
  } catch (error) {
    next(error);
  }
};

// 6. جيب الماتشات ديال الحكم
exports.getArbitreMatchs = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id, {
      include: 'Matches' 
    });
    
    if (!arbitre) {
      return res.status(404).json({ message: "Hakam makaynach!" });
    }
    
    res.status(200).json(arbitre.Matches || { message: "had l'arbitre ba9i mat3yin f talxi match" });
  } catch (error) {
    next(error);
  }
};