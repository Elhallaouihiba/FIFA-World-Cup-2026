const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  التسجيل (Register)
exports.register = async (req, res, next) => {
  try {
    const { nom, email, password, role } = req.body;

    //  تشفير الموت دو باس قبل الحفظ
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nom,
      email,
      password: hashedPassword,
      role
    });

    // حجب الموت دو باس من الاستجابة
    newUser.password = undefined;

    res.status(201).json({
      message: "Utilisateur créé avec succès! 🎉",
      user: newUser
    });
  } catch (error) {
    next(error);
  }
};

//  تسجيل الدخول (Login)
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect! ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect! ❌" });
    }

    //  توليد التوكن الـ JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Connexion réussie! 🔓",
      token: "Bearer " + token
    });
  } catch (error) {
    next(error);
  }
};

// البروفايل (Get Me)
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};