var massive = require('massive');
var config = require("../config.js")

var db = massive.connectSync({connectionString : config.connectionString});

// setup is named such because the folder in db is called setup.
// setup is also a property of the db object
// created a namespace for these scripts
db.setup.schema([], function(err, res) {
  // if (err) {
  //   throw(new Error(err.message))
  // }
  console.log("Yay schema!")
  process.exit();
});
