const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
      designationType: {
      type: String,
  }
});

module.exports = mongoose.model('Type',TypeSchema);