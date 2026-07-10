
const jwt = require('jsonwebtoken');

// 🛡️ 1. حارس التأكد من الهوية (Authentication)
exports.authenticate = (req, res, next) => {
  // كنجيبو السطر د Authorization من الهيدر د Postman
  const authHeader = req.headers['authorization'];
  
  // كنقطعو الكلمة باش ناخدو التوكن بوحدو لي كيكون ورا كلمة Bearer
  const token = authHeader && authHeader.split(' ')[1];

  // 🚫 إذا ما صيفطش التوكن، كنعطيوه 401 Unauthorized
  if (!token) {
    return res.status(401).json({ error: "Access refusé! Token manquant. 🔒" });
  }

  try {
    // 🔑 كنفتحو التوكن بالساروت السري لي ف الـ .env وكنتأكدو واش حقيقي
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // كنلصقو بياناتو (id و role) ف الـ req.user باش يستعملوهم الـ Routes والكنترولرز لي جايين
    req.user = decoded;
    
    next(); // كلشي ناضي؟ دوز للحارس الموالي
  } catch (error) {
    // ❌ إذا كان التوكن مزور أو سالات الصلاحية ديالو
    return res.status(401).json({ error: "Token invalide ou expiré! ⛔" });
  }
};

// 👥 2. حارس التأكد من الدور (Authorization - RBAC)
exports.authorize = (...rolesAutorises) => {
  return (req, res, next) => {
    // كنشوفو واش الدور ديال هاد المستخدم كاين ف لستة د الأدوار لي مسموح ليها تدخل
    if (!rolesAutorises.includes(req.user.role)) {
      // 🚫 إذا ما عندوش الحق، كنعطيوه 403 Forbidden
      return res.status(403).json({ error: "Action interdite! Rôle insuffisant. 🚷" });
    }
    next(); // عندك الصلاحية؟ دوز للكنترولر ديريكت
  };
};