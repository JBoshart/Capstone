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
          db.users.update({id: userID, fridge_id: newFridge.id}, function(error, user) {
            if (error) {
              callback(error, undefined)
            } else {
              let locals = {
                user_id: userID,
                fridge_id: newFridge.id,
                items: []
              }
              callback(null, locals)
            }
          })
        }
      })
    } else {
      db.items.where("fridge_id=$1 ORDER BY expiration", [fridge.id], function(error, items) {
        if (error) {
          callback(error, undefined)
        } else {
          for (var i=0; i<items.length; i++) {
            if (items[i].quantity_unit === "cup(s)") {
              items[i].quantity = (items[i].quantity/8)
            } else if (items[i].quantity_unit === "pint(s)") {
              items[i].quantity = (items[i].quantity/16)
            } else if (items[i].quantity_unit === "quart(s)") {
              items[i].quantity = (items[i].quantity/32)
            } else if (items[i].quantity_unit === "gallon(s)") {
              items[i].quantity = (items[i].quantity/128)
            }
          }

          let locals = {
            user_id: fridge.user_id,
            fridge_id: fridge.id,
            items_quantity: fridge.items_quantity,
            items: items
          }
          callback(null, locals)
        }
      })
    }
  })
}

module.exports = Fridge
