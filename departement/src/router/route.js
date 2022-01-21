// const departementControler= require('../controller/departementControler')
// const router = require('express').Router()

module.exports = function (app){

  const departements = require('../controller/departementControler');

  const users = require('../controller/userController');

  // departement route

// create departement
  app.post('/api/departements',departements.createDepartement);

// get ALL departement
  app.get('/api/departements', departements.getAllDepartement); 

  
  
  
  // edit departement
  app.get('/api/departements/update/:departementId', departements.getOneDepartement);

  // app.post('/api/departements/update', departements. updateDepartement);
  app.post('/api/departements/update', departements.postEditDepartement);

  // delete departement
  app.get('/api/departements/delete/:departementId', departements.deleteDepartement);


  // user route
  app.post('/api/users',users.createUser);
  app.get('/api/users',users.getAllUsers);
  // departement user
  app.get('/', departements.AllDepartement);
  // delete user
  app.get('/api/users/delete/:userId',users.deleteUser);
 
  // edit user (get)
  app.get('/api/users/update/:userId',users.getOneUser);
  
  // update users (post)
  app.post('/api/users/update', users.postEditUser);
  

  
 



  // relation between user and departement
  app.get('/api/getDepartementUser/:departementId', departements.findOne);

  


  

}




// module.exports = router