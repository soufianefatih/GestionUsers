const { departements } = require('../config/config');
const db = require('../config/config');
// const env = require('../config/database');


// creat Model 
 const Departement = db.departements;
 const User = db.users;


//  creat departement 

 exports.createDepartement = (req, res) => {

 Departement.create({

    title: req.body.title,
    description: req.body.description,

 }).then(departement => {
//    res.send(departement);
    res.redirect('/api/departements');
    

 });


};


// get ALL departements 


exports.getAllDepartement = (req ,res ) => {

Departement.findAll().then(departements => {

    res.render('departements',{
           
        Alldepartements : departements
    })
    // res.send(departements);
});

};



// seelct  departement user option
exports.AllDepartement = (req ,res ) => {

    Departement.findAll().then(departements => {
    
    
        res.render('index',{
               
             departements,
        })
    });
    
    };

   

// get oneDepartement by id

exports.getOneDepartement = (req , res) => {

    Departement.findByPk(req.params.departementId).then(departement =>{
    //   res.send(departement);
    res.render('updatedepartements',{
        
        departement,
    })
  })

};


// update departement

// methode 1

exports.updateDepartement = (req,res) =>{

   const id = req.params.departementId;
   Departement.update(

       {title: req.body.title, 
       description: req.body.description},
       {where: {id: req.params.departementId}}
       
       ).then(()=>{

   //    res.status(200).send({message: 'update successfully a departement id '+ id});
    res.redirect('/api/departements')

    })

}

// methode 2
exports.postEditDepartement = async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    try {
      let departement = await Departement.findByPk(id);
      departement.title = title;
      departement.description = description;
      await departement.save();
      res.redirect('/api/departements');
    } catch (error) {
      res.redirect('/');
      console.error('Error updating departement', error);
    }
  };
  

// delete departement
exports.deleteDepartement = (req,res) => {
   
    const id = req.params.departementId;
    Departement.destroy({

     where: {id: id}


    }).then(()=>{

        // res.status(200).send({message: 'destroy departement by id'+id});
        res.redirect('/api/departements')
    })


}



// connect one to many relation Product and Reviews

// methode Rest API
exports.getDepartementUser =  async (req, res) => {

    const id = req.params.departementId;

    const data = await Departement.findOne({
        include: [{
            model: User,
            as: 'users'
        }],
        where: {id: id}
    })

    // res.status(200).send(data)
    res.render('DepartementUsers',{
        
        DepartementUsers,
    })
    

}

// Methode 2

exports.findOne =  async (req, res) => {
    const id = req.params.departementId
    try {
        const departement = await Departement.findOne({
            where: { id },
            include: 'users'
        })
        return res.render('DepartementUsers', { departement: departement })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
};



