const { users } = require('../config/config');

const db = require('../config/config');
const env = require('../config/env');


const User = db.users;
const Departement = db.departements;

//  create user

exports.createUser = (req, res) => {

    User.create({
   
       name: req.body.name,
       email: req.body.email,
       passowrd : req.body. passowrd,
       departement_id: req.body.departement_id,

    
    }).then(user => {
    
    //    res.send(user);
      res.redirect('/');
      
   
    });
   
    
   };


   // get ALL Users 


exports.getAllUsers = (req ,res ) => {
   
    User.findAll().then(users => {
    
        // res.send(users)
        res.render('users',{
           
            Allusers : users,
        })
    });
    
    };



    // delete User


    exports.deleteUser = (req,res) => {
   
        const id = req.params.userId;
        User.destroy({
    
         where: {id: id}
    
    
        }).then(()=>{
    
            // res.status(200).send({message: 'destroy users by id'+id});
            res.redirect('/api/users')
        })
    
    
    }



    // get oneUser by id

exports.getOneUser = (req , res) => {

    User.findByPk(req.params.userId).then(user =>{
    //   res.send(departement);
    res.render('updateUser',{
        
        user,
    })
  })

};



// update user

exports.postEditUser = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const  passowrd = req.body.passowrd;
    try {
      let user = await User.findByPk(id);
      user.name = name;
      user.email = email;
      user.passowrd = passowrd;
      await user.save();
      res.redirect('/api/users');
    } catch (error) {
      res.redirect('/');
      console.error('Error updating users', error);
    }
  };
  
    
    