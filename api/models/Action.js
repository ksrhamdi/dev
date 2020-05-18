const mongoose= require('mongoose');
const Schema = mongoose.Schema ;
const actionSchema = new Schema ({
  refAction:{
    type:  String,
    required : true
  },
  dateDebut:{
      type: Date,
      required : false

  },
  dateFin:{
      type:Date,
      required : true
  },
  description:{
 type : String,
 required : true
  },
  problemeConstat:{
      type:String,
      required : true
  },
 pilote : {
    type:mongoose.Types.ObjectId,
    require : true 
  },
  type: {
    type:mongoose.Types.ObjectId,
    require : true
  },
  statut: {
    type:mongoose.Types.ObjectId,
    require : true
  },
  theme: {
    type:mongoose.Types.ObjectId,
    require : true
  },
  pland: {
    type:mongoose.Types.ObjectId,
    require : true
  },
  visibilite: {
    type: Boolean,
    require : true
  },
  pieceJointe:{
    type:String,
    require:false
  }

})
module.exports = mongoose.model('Action',actionSchema);