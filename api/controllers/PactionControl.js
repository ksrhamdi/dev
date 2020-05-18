const PactionModel = require('../models/Paction');
const ThemeModel = require('../models/theme');
const UserModel = require('../models/User');
const source = require('../models/source');
const visibilite = require('../models/visibilite');
const { mongoose } = require('../config/mongoose');
const ObjectId = mongoose.Types.ObjectId
var db = mongoose.connection;
module.exports = {


    gett:(req, res) => {
        PactionModel.find({
        }).then((pland) => {
            res.send(pland);
            
        })

    },
    get:(req, res) => {
        console.log(req.params.id);
        PactionModel.findOne({
            _id: req.params.id
        }).then((pland) => {
            res.send(pland);
            
        })

    },

    getTitle:(req, res) => {
        console.log(req.params.id);
        PactionModel.findOne({
            planActionTitre: req.params.id
        }).then((pland) => {
            res.send(pland);
            
        })

    },

    getAll: (req,res) => {
        
        db.collection('pactions').aggregate([
            // { $match : { statut: req.params.id } } ,
    
            // Join with utype table
    {
        $lookup:{
          from: 'typPactions',
          localField: 'typePlanAction',
          foreignField: '_id',
          as: 'type'
        }
    },
    {   $unwind:"$type" },
             // Join with utype table
    {
        $lookup:{
          from: 'typPactions',
          localField: 'typePlanAction',
          foreignField: '_id',
          as: 'type'
        }
    },
    {   $unwind:"$type" },
    {   
        $project:{
            _id : 1,
            planActionTitre : 1, 
            source : 1,
            planActionDateDebut : 1,
            planActionDateFin : 1,
            pieceJointe : 1,
            visibiliteId: 1,
            planActionEquipe : 1,
            statut : 1,
            refPlanAction : 1,
            planActionPilote : 1,
            planActionCreation: 1,
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


    getSource:(req, res) => {
        source.find({}).then((pland) => {
            res.send(pland);
            
        })

    },

    getVisibilite:(req, res) => {
        visibilite.find({}).then((pland) => {
            res.send(pland);
            
        })

    },
    // ajouter un membre de l'equipe dans plan action 
    ajoutMembre :(req, res) => {
        console.log("pilotttt"+ req.body.idPilote)
        PactionModel.updateOne(
            { _id: req.params.id},
            //{ "$push": {"planActionEquipe": "test" } },
            { $push: {"planActionEquipe.0.id_Pilote": req.body.idPilote}},
            function (err, managerparent) {
                if (err) throw err;
                console.log(managerparent);
            }
        );
 },

    //  createTheme :(req, res) => {
    //         console.log(req.body);
    //         console.log ('alo api');
    //         PactionModel.findOne({
    //             _id: req.params.id
    //         }).then(function(record){
    //             record.theme.push({designationTheme : req.body.designationTheme});
    //             record.save();
    //             res.json({ success : true , result : record });
    //         });       
    //  },

 
     createTheme :(req, res) => {
            PactionModel.findOne({
                _id: req.params.id
            }).then(function(record){
                record.theme.push({designationTheme : req.body.designationTheme});
                record.save();
                res.json({ success : true , result : record });
            });       
     },
    

    getTheme:(req, res) => {
        console.log(req.params.id);
        PactionModel.findOne({
            _id: req.params.id
        }).then(function(record){
            res.send(record.theme);

    });

},



//theme version 2 : 

createThm :(req, res) => {
      let newThm = new ThemeModel({
        designationTheme:req.body.designationTheme,
        pland:req.params.idpland
      });
    
      newThm.save()
      .then(result => {
          
          res.json({ success : true , result : result });

      })
      .catch(err => {
          res.json({success : false , result : err });
      });
  
  },

       // modifier un theme
       updateThm:(req,res)=>{
        ThemeModel.findOneAndUpdate({
          _id: req.params.id,
      }, {
              $set: req.body
          }
      ).then(() => {
          res.send({ message: 'Updated theme successfully.' })
      }).catch(err => {
        res.sendStatus(404);
    });
       },

        // delete theme
        deleteThm:(req,res)=>{
        ThemeModel.deleteOne({ _id: req.params.id }, function (err) {
          if(err){
            res.sendStatus(404);
          }else{
            res.sendStatus(200);
          }
        
        });
       },

       //supprimer multiple themes 
       deleteThmMany:(req,res)=>{
       var test ;
       for (var i = 0 ; i < req.query.array.length ; i++){
        ThemeModel.deleteOne({ _id: req.query.array[i] }, function (err) {
           if(err){
             test=false;
           }else{
            
             test = true
           }
         
         });
       }
       if(test){
         res.status(200).json({ message: 'supprime multiple des themes reussi ! ' });
       }else{
         res.sendStatus(404);
 
       }
      
      },
       

     //get Theme  
    getThemee:(req, res) => {
    ThemeModel.find({
        pland: req.params.id
    }).then((pland) => {
        res.send(pland);
        
    })

},





    // modifier un theme
    // updateTheme:(req,res)=>{
    //     ThemeModel.findOne(
    //         {_id: req.params.idd}, 
    //         // {_id: 0, theme: {$elemMatch: {_id: ObjectId(req.params.idd)}}
    // //   } 
    // //   ,{
    // //     $set: req.body
    // //    }
    //   ).then(record => {
    //     res.send(record)
    //   }).catch(err => {
    //     res.sendStatus(404);
    // });
    // },

   
    // modifier un theme
    updateTheme:(req,res)=>{
        ThemeModel.findOne(
            {_id: req.params.idd}, 
            // {_id: 0, theme: {$elemMatch: {_id: ObjectId(req.params.idd)}}
    //   } 
    //   ,{
    //     $set: req.body
    //    }
      ).then(record => {
        res.send(record)
      }).catch(err => {
        res.sendStatus(404);
    });
    },

//     updateThemee:(req, res) => {
//         // PactionModel.findOneAndUpdate({ "_id": req.params.id }, { "$set": { "theme": theme}})
//         await PactionModel.findOneAndUpdate({}, { $set: { disignationTheme: 'Test2' } });

            
// },





    // updateThemee: async (req,res)=>{
    //         try {
    //         const Upiece = await PactionModel.findByIdAndUpdate({_id: req.params.id },req.body)
    //             .then(function(){
    //                 PactionModel.findOne({_id : req.params.id}).then(function(){
    //                     res.send(Upiece)
    //                 })
    //         })
          
    //     } catch (error) {
    //         res.json({message : error})
    
    //     }
    // },



// get actions old : 

// getAct:(req, res) => {
//     PactionModel.find(
//         {_id: req.params.id}, 
//         {_id: 0, theme: {$elemMatch: {_id: ObjectId(req.params.idd)}}})
//         .then(function(record){
//         console.log(record[0].theme[0].disignationTheme);   
//         console.log(record[0].theme[0].action);   
//         res.json({ success : true , result : record[0].theme[0].action });

// });
// },
 

    createPaction : (req, res) => {
        let pa = new PactionModel({
            planActionTitre : req.body.planActionTitre, 
            source : req.body.source,
            planActionDateDebut : req.body.planActionDateDebut,
            planActionDateFin : req.body.planActionDateFin,
            pieceJointe : req.body.pieceJointe,
            visibiliteId: req.body.visibiliteId,
            planActionEquipe : req.body.planActionEquipe,
            statut : req.body.statut,
            refPlanAction : req.body.refPlanAction,
            typePlanAction : req.body.typePlanAction,
            planActionPilote : req.body.planActionPilote,
            planActionCreation: req.body.planActionCreation,
            });
            pa.save()
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.json({success : false , result : err });
            });

    },

 //      createTheme :(req, res) => {
//         let pa = new PactionModel({
//             title : req.body.title, 
//             source : req.body.source,
//             dateDeb : req.body.dateDeb,
//             dateFin : req.body.dateFin,
//             pieceJointe : req.body.pieceJointe,    
//             theme : req.body.theme   
//         });
//         console.log(req.params.title);
//         pa.save()
//         .then(function(){
//             PactionModel.findOne({title: req.body.title}).then(function(record){
//                 record.theme.push({disignationTheme : 'testttttttttt '})
//                 record.save();
//             });       
// });
//      },



        
    // getwithjoin:(req, res) => {  
     

    //     db.collection('pactions').aggregate([
    //       { $match : { _id: ObjectId(req.params.id) } } ,
        
    //        {
    //          $lookup: {
    //            localField: "Userr",
    //            from: "users", //the collection name, (bad)before i had Phrase as the model
    //            foreignField: "_id",
    //            as: "equipe"
    //          }
    //        }
          
    //      ]).toArray(function (err, resh) {
   
    //        if (err)
   
    //            throw err;
  
    //       res.send(JSON.stringify(resh));
   
   
    //    });
    // },


//      createTheme :(req, res) => {
//         let pa = new PactionModel({
//             title : req.body.title, 
//             source : req.body.source,
//             dateDeb : req.body.dateDeb,
//             dateFin : req.body.dateFin,
//             pieceJointe : req.body.pieceJointe,    
//             theme : req.body.theme   
//         });
//         console.log(req.params.title);
//         pa.save()
//         .then(function(){
//             PactionModel.findOne({title: req.body.title}).then(function(record){
//                 record.theme.push({disignationTheme : 'testttttttttt '})
//                 record.save();
//             });       
// });
//      },

   //    old create
    // create : (req, res) => {
    //     let pa = new PactionModel({
    //         title : req.body.title, 
    //         source : req.body.source,
    //         dateDeb : req.body.dateDeb,
    //         dateFin : req.body.dateFin,
    //         pieceJointe : req.body.pieceJointe,
    //         theme : req.body.theme          
    //     });
    //     pa.save()
    //     .then(result => {
    //         res.json({ success : true , result : result });
    //     })
    //     .catch(err => {
    //         res.json({success : false , result : err });
    //     });
       
        
    // },

    // get:(req, res) => {  
      
    //     db.collection('actions').aggregate([
    //       { $match : { _id: ObjectId(req.params.id) } } ,
        
    //        {
    //          $lookup: {
    //            localField: "Userr",
    //            from: "users", //the collection name, (bad)before i had Phrase as the model
    //            foreignField: "_id",
    //            as: "User"
    //          }
    //        }
          
    //      ]).toArray(function (err, resh) {
   
    //        if (err)
   
    //            throw err;
  
    //       res.send(JSON.stringify(resh));
   
   
    //    });
    // },




    }
  














