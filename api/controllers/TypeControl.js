const Type = require('../models/typeAction');

module.exports = {
    // get liste des types
    get:(req, res) => {
       
        Type.find({
        }).then((pland) => {
            res.send(pland);
            
        })
        },

        getTypeById:(req, res) => {
            console.log(req.body);
            Type.find({
              _id: req.params.id
          }).then((actions) => {
              res.send(actions);
              
          });
          }
  
}