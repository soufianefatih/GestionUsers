const dtabase = require('./database');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dtabase.database, dtabase.username, dtabase.password,{

    host: dtabase.host,
    dialect: dtabase.dialect,
    operatorsAliases: false,
   
    pool: {
      max: dtabase.max,
      min: dtabase.pool.min,
      acquire: dtabase.pool.acquire,
      idle: dtabase.pool.idle
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


