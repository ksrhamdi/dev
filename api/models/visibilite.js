const mongoose= require('mongoose');
const Schema = mongoose.Schema ;

const VisibiliteSchema = new Schema ({

  disignationVisibilite:{
    type:String,
    required : false
    },
    description:{
      type:String,
      required : false
      },
  });


module.exports = mongoose.model('visibilites',VisibiliteSchema);
