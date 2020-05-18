const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var {User} = require('../models/User');

router.get('/', (req, res) => {
  User.find((err, docs) => {
        if(!err) {res.send(docs); }
        else {console.log('Error in data ' + JSON.stringify(err,undefined,2)); }
      });    
});

//get by id

router.get('/:id',(req,res) => {
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id:' ${req.params.id}`);
  
  User.findById(req.params.id, (err,doc) =>{
    if(!err) {res.send(doc);} 
    else {console.log('error in user update ' + JSON.stringify(err,undefined,2)); }
  } );
});

//post
router.post('/', (req,res) => {
   var usr = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName:req.body.lastName,
    userLogin:req.body.userLogin ,
    password: req.body.password,
   });
   usr.save((err,doc) => {
     if(!err) {res.send(doc);} 
     else {console.log('error in user save ' + JSON.stringify(err,undefined,2)); }
   });
});


//update
// router.put('/:id',(req,res) =>{
//   if(!ObjectId.isValid(req.params.id))
//   return res.status(400).send(`No record with given id:' ${req.params.id}`);

//   var usr = {
//     email: req.body.email,
//     firstName: req.body.firstName,
//     lastName:req.body.lastName,
//     userLogin:req.body.userLogin ,
//     password: req.body.password,
//   };
//   User.findOneAndUpdate(req.params.id, {$set:usr}, {new : true} ,(err,doc) =>{
//     if(!err) {res.send(doc);} 
//     else {console.log('error in user update ' + JSON.stringify(err,undefined,2)); }
//   } );
// });



module.exports = router;