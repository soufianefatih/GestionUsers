const { Sequelize } = require("../config/config");

module.exports = (sequelize , Sequelize) => {

   const Departement = sequelize.define('departements',{

         title : {

            type : Sequelize.STRING
         },

         description : {

            type : Sequelize.STRING
         },


   });

return Departement;



}