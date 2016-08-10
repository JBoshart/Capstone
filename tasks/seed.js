var massive = require('massive')
var connectionString = "postgres://localhost/AspirationalVegetables"
var db = massive.connectSync({connectionString : connectionString})

// var video_data = require("../db/seeds/videos.json")
// var cust_data = require("../db/seeds/customers.json")
// var rental_data = require("../db/seeds/rentals.json")
//
// var video_records = video_data.length
// var cust_records = cust_data.length
// var rental_records = rental_data.length
//
// var make = function(){
//   for (var record of video_data) {
//     db.videos.save(record, function(err, res) {
//       console.log("saved: ", JSON.stringify(res))
//       video_records--
//       if ((video_records <= 0) && (cust_records <= 0) && (rental_records <= 0)) {
//         process.exit()
//       }
//     })
//   }
//
//   for (var cust_record of cust_data) {
//     db.customers.save(cust_record, function(err, res) {
//       console.log("saved: ", JSON.stringify(res))
//       cust_records--
//       if ((video_records <= 0) && (cust_records <= 0) && (rental_records <= 0)) {
//         process.exit()
//       }
//     })
//   }
//
//   for (var record of rental_data) {
//     db.rentals.save(record, function(err, res) {
//       console.log("saved: ", JSON.stringify(res))
//       rental_records--
//       if ((video_records <= 0) && (cust_records <= 0) && (rental_records <= 0)) {
//         process.exit()
//       }
//     })
//   }
// }
//
// make()
process.exit()
