var app = require("../app");
var db = app.get("db");

var Fridge = function() {}

Fridge.findOrMakeFridge = function(userID, callback) {
  db.fridge.findOne({user_id: userID}, function(error, fridge) {
    if (error) {
      callback(error, undefined);
    } else if (!fridge) {
      db.fridge.save({user_id: userID}, function(error, newFridge) {
        if (error || !newFridge) {
          callback(error, undefined)
        } else {
          callback(null, newFridge)
        }
      })
    } else {
      db.items.find({fridge_id: fridge.id}, function(error, items) {
        if (error) {
          callback(error, undefined)
        } else {
          let stuff = {
            user_id: fridge.user_id,
            fridge_id: fridge.id,
            items: items
          }
          callback(null, stuff)
        }
      })
    }
  })
}

module.exports = Fridge
