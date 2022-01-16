const { Sequelize } = require("../config/config");

module.exports = (sequelize , Sequelize) => {

   const User = sequelize.define('users',{

         name : {

            type : Sequelize.STRING
         },

         email : {

            type : Sequelize.STRING
         },

         passowrd : {

            type : Sequelize.STRING
         },


   });

return User;



}