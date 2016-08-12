var app = require("../app");
var db = app.get("db");

var Items = function() {}

Items.addOrMakeItems = function(formData, userData, callback) {
  var today = new Date().toJSON().slice(0,10);
  db.items.where("user_id=$1 AND name=$2 AND quantity_unit=$3", [userData.id, formData.item, formData.unit], function(error, item) {
    if (error) {
      callback(error, undefined)
    } else if (item.length === 0) {
      db.items.save({user_id: userData.id, fridge_id: userData.fridge_id, name: formData.item, quantity: formData.quantity, quantity_unit: formData.unit, purchase_date: today }, function(error, item) {
        if (error) {
          console.log('make error')
          callback(error, undefined)
        } else {
          console.log('make else')
          callback(null, item)
        }
      })
    } else {
      var newQuantity = (Number(formData.quantity) + Number(item[0].quantity))
      db.items.update({id: item[0].id, quantity: newQuantity}, function(error, item) {
        if (error) {
          callback(error, undefined)
        } else {
          console.log(item)
          callback(null, item)
        }
      })
    }
  })
}

module.exports = Items
