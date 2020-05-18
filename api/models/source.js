const mongoose= require('mongoose');
const Schema = mongoose.Schema ;

const SourceSchema = new Schema ({

  
    designationSource:{
    type:String,
    required : false
    },

  });


module.exports = mongoose.model('sources',SourceSchema);
