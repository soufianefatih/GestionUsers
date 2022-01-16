const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password,{

    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
   
    pool: {
      max: env.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }

} );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models tables
db.departements = require('../model/departementmodel.js')(sequelize, Sequelize);
db.users = require('../model/usermodel.js')(sequelize,Sequelize);



// 1 to Many Relation

db.departements.hasMany(db.users, {
  foreignKey: 'departement_id',
  as: 'users'
})

db.users.belongsTo(db.departements, {
  foreignKey: 'departement_id',
  as: 'departements'
}) 




module.exports = db;


