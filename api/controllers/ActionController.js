const Action= require('../models/Action');
const paction= require('../models/Paction');
const User= require('../models/User');
const theme= require('../models/theme');

const { mongoose } = require('../config/mongoose');
const ObjectId = mongoose.Types.ObjectId;

var db = mongoose.connection;

module.exports = {
  // creations des actions
    create :(req, res) => {
      // let newAction = new Action({
      //   dateDebut:req.body.dateDebut,
      //   refAction:req.body.refAction,
      //   dateFin:req.body.dateFin,
      //   type:req.body.type,
      //   pilote:req.body.pilote,
      //   problemeConstat:req.body.problemeConstat,
      //   visibilite:req.body.visibilite,
      //   description:req.body.description,
      //   statut:req.body.statut,
      //   theme:req.params.id

      // });
        let newAction = new Action({
          dateDebut:req.body.action.dateDebut,
          refAction:req.body.action.refAction,
          dateFin:req.body.action.dateFin,
          type:req.body.action.type,
          pilote:req.body.action.pilote,
          problemeConstat:req.body.action.problemeConstat,
          visibilite:req.body.action.visibilite,
          description:req.body.action.description,
          statut:req.body.action.statut,
          theme:req.params.id,
          pland:req.params.idpland
        });
     
        newAction.save()
        .then(result => {
            
            res.json({ success : true , result : result });

        })
        .catch(err => {
            res.json({success : false , result : err });
        });
    
    },
    

 getByID:(req, res) => {
    Action.findOne({
        _id: req.params.id
    }).then((action) => {
      res.send(action)
        
    })
     },
     // chercher les actions sous un pland
     findActionByIdPland:(req,res)=>{
      Action.find({
        pland: req.params.id
    }).then((actions) => {
        res.send(actions);
        
    })
    },
   
  
     // affichage d'un action en utilisant la jointure avec table types et user to get pilote et type
     get:(req, res) => {  
     

         db.collection('actions').aggregate([
           { $match : { _id: ObjectId(req.params.id) } } ,
         
            {
              $lookup: {
                from: 'users',
                localField: 'pilote',
                foreignField: '_id',
                as: 'pilote'
              }
            },
    {   $unwind:"$pilote" },     // $unwind used for getting data in object or for one record only

    // Join with utype table
    {
        $lookup:{
          from: 'types',
          localField: 'type',
          foreignField: '_id',
          as: 'type'
        }
    },
    {   $unwind:"$type" },
    {   
      $project:{
          _id : 1,
          dateDebut : 1,
          refAction : 1,
          dateFin : 1,
          problemeConstat : 1,
          visibilite : 1,
          description : 1,
          pland : 1,
          piloteid : "$pilote._id",
          piloteName : "$pilote.firstName",
          piloteLastName : "$pilote.lastName",
          type : "$type.designationType",
          typeID : "$type._id",
      } 
  }
           
          ]).toArray(function (err, resh) {
    
            if (err)
    
                throw err;
   
           res.send(JSON.stringify(resh));
    
    
        });
     },
     // delete action
     delete:(req,res)=>{
      Action.deleteOne({ _id: req.params.id }, function (err) {
        if(err){
          res.sendStatus(404);
        }else{
          res.sendStatus(200);
        }
      
      });
     },
     // modifier un action
     update:(req,res)=>{
       console.log(req.body)
       console.log(req.body.info)
      Action.findOneAndUpdate({
        _id: req.params.id,
    }, {
            $set: req.body.info
        }
    ).then(() => {
        res.send({ message: 'Updated successfully.' })
    }).catch(err => {
      res.sendStatus(404);
  });
     },

     //supprimer multiple
     deleteMany:(req,res)=>{
       var test ;
      for (var i = 0 ; i < req.query.array.length ; i++){
        Action.deleteOne({ _id: req.query.array[i] }, function (err) {
          if(err){
            test=false;
          }else{
           
            test = true
          }
        
        });
      }
      if(test){
        res.status(200).json({ message: 'ok' });
      }else{
        res.sendStatus(404);

      }
     
     },
  //    
  // });
   //get tous les actions   
   getActions:(req, res) => {
    Action.find({}).then((pland) => {
        res.send(pland);
        
    })},

    //get action Par theme : 
    getAct:(req, res) => {  
      Action.find({
        theme: req.params.id
    }).then((actions) => {
        res.send(actions);
        
    })

    },  
    getTheme:(req,res)=>{
      theme.findOne({
        _id:req.params.id
      }).then((theme)=>{
        res.send(theme);
      })
    },

      
     // affichage d'un action By theme
     getActByThm:(req, res) => {  
      db.collection('actions').aggregate([
        { $match : { theme: ObjectId(req.params.id) } } ,
      
         {
           $lookup: {
             from: 'users',
             localField: 'pilote',
             foreignField: '_id',
             as: 'pilote'
           }
         },
 {   $unwind:"$pilote" },     // $unwind used for getting data in object or for one record only
   // Join with utype table
   {
    $lookup:{
      from: 'types',
      localField: 'type',
      foreignField: '_id',
      as: 'type'
    }
},
{   $unwind:"$type" },

// Join with status table
 {
     $lookup:{
       from: 'status',
       localField: 'statut',
       foreignField: '_id',
       as: 'statut'
     }
 },
 {   $unwind:"$statut" },

  // Join with themes table
  {
    $lookup:{
      from: 'themes',
      localField: 'theme',
      foreignField: '_id',
      as: 'theme'
    }
  },
  {   $unwind:"$theme" },

 {   
   $project:{
       _id : 1,
       dateDebut : 1,
       refAction : 1,
       dateFin : 1,
       problemeConstat : 1,
       visibilite : 1,
       description : 1,
       pland : 1,
       piloteid : "$pilote._id",
       piloteName : "$pilote.firstName",
       piloteLastName : "$pilote.lastName",
       statut : "$statut.refStaut",
       statutID : "$statut._id",
       type : "$type.designationType",
       typeID : "$type._id",
       theme : "$theme.designationTheme",
       themeID : "$theme._id",
   } 
}
        
       ]).toArray(function (err, resh) {
 
         if (err)
 
             throw err;

        res.send(JSON.stringify(resh));
 
 
     });
  },


}
  