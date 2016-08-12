var app = require("../app");
var db = app.get("db");

var Items = function() {}

Items.addItems = function(formData, userData, callback) {
  var today = new Date().toJSON().slice(0,10);
  db.items.find({name: formData.item}, function(error, item) {
    if (error) {
      callback(error, undefined)
    } else if (!item) {
      db.items.save({user_id: userData.id, fridge_id: userData.fridge_id, name: formData.item, quantity: formData.quantity, quantity_unit: formData.unit, purchase_date: today }, function(error, item) {
        if (error) {
          callback(error, undefined)
        } else {
          callback(null, item)
        }
      })
    } else {
      callback(null, item)
    }
  })
}

module.exports = Fridge
