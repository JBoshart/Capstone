var app = require("../app");
var db = app.get("db");

var Items = function() {}

Items.addOrMakeItems = function(formData, userData, callback) {
  var today = new Date().toISOString().slice(0,10);

  db.items.save({user_id: userData.id, fridge_id: userData.fridge_id, name: formData.item, quantity: formData.quantity, quantity_unit: formData.unit, purchase_date: today, expiration: formData.expiration }, function(error, item) {
    if (error) {
      callback(error, undefined)
    } else {
      callback(null, item)
    }
  })
}

module.exports = Items
