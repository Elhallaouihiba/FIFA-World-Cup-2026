
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'fifa-world', 
  'hiba',       
  'hiba123',    
  {
    host: 'localhost',
    port: 5431, 
    dialect: 'postgres',//new3 data bez li atrjem
    logging: false //سكت كاع الميساجات الزايدين
  }
);

module.exports = sequelize;













//"هاد الكود كيكريي الاتصال (Connexion) بين Node.js و PostgreSQL باستعمال Sequelize، ومحدد فيه اسم القاعدة، المستخدم، الموت دو باس، والبورت 5431 لي شغال عليه Docker."