// const mongoose= require('mongoose');
const { mongoose } = require('../config/mongoose');
const Schema = mongoose.Schema ;
var {User} = require('../models/User');



const ThemeSchema = new Schema ({
  designationTheme : String
});



const PactionSchema = new Schema ({

    typePlanAction : {
    type:mongoose.Types.ObjectId,
    required : false
    },

    planActionPilote : {
      type:mongoose.Types.ObjectId,
      required : false
    },

    planActionTitre : {
      type:  String, 
      required : true
    },
    source: {
    type:mongoose.Types.ObjectId,
    required : false
     },

    planActionDateDebut : {
        type:  Date, 
        required : true
      },
      planActionDateFin : {
        type:  Date, 
        required : true
      },
      pieceJointe : {
        type:  String, 
        required : false
      },
      
      planActionEquipe: {
        type: [Object],
        required : false
      },
      theme: {
      type : [ThemeSchema],
      ref: 'paction',
      required : false , 
      },
     statut : {
      type:mongoose.Types.ObjectId,
      required : false
      },

     refPlanAction : {
      type:  String, 
      required : false
    },
    planActionCreation : {
      type:  Date, 
      required : false
    },
    visibiliteId:{
    type:mongoose.Types.ObjectId,
    required : false
    },

  });


module.exports = mongoose.model('paction',PactionSchema);
