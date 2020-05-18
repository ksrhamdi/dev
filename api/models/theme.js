// const mongoose= require('mongoose');
const { mongoose } = require('../config/mongoose');
const Schema = mongoose.Schema ;



const ThemeSchema = new Schema ({
  // designationTheme : String

  designationTheme: {
    type:String,
    require : true
  },
  pland: {
    type:mongoose.Types.ObjectId,
    require : true
  },

});

module.exports = mongoose.model('theme',ThemeSchema);
