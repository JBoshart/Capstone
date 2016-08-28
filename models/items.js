var app = require("../app");
var db = app.get("db");
var unirest = require('unirest')
var dotenv = require('dotenv').config()
var Promise = require('bluebird')
var advanced_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"
var advanced_rest = "/information?includeNutrition=false"

var Items = function() {}

Items.addOrMakeItems = function(formData, userData, callback) {
  var today = new Date().toISOString().slice(0,10);
  var conversion = formData.quantity

  if (formData.unit === "cup(s)") {
    conversion = (formData.quantity * 8)
  } else if (formData.unit === "pint(s)") {
    conversion = (formData.quantity * 16)
  } else if (formData.unit === "quart(s)") {
    conversion = (formData.quantity * 32)
  } else if (formData.unit === "gallon(s)") {
    conversion = (formData.quantity * 128)
  }

  db.items.save({user_id: userData.id, fridge_id: userData.fridge_id, name: formData.item, quantity: conversion, quantity_unit: formData.unit, purchase_date: today, expiration: formData.expiration }, function(error, item) {
    if (error) {
      callback(error, undefined)
    } else {
      callback(null, item)
    }
  })
}

Items.removeItems = function (recipe_id, recipe_score, userData, callback) {
  unirest.get(advanced_url + recipe_id + advanced_rest)
  .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
  .end(function (result) {
    var ingredients = result.body.extendedIngredients
    var condensed = []
    var sad_data = []

    // Distill out only needed info:
    for (var i=0; i<ingredients.length; i++) {
      var ingredient = {
        name: ingredients[i].name,
        text: ingredients[i].originalString,
        quantity: ingredients[i].amount,
        unit: ingredients[i].unit,
      }
      condensed.push(ingredient)
    }

    for (var i=0; i<condensed.length; i++) {
      if (condensed[i].unit === "ounce" || condensed[i].unit === "ounces" || condensed[i].unit === "oz") {
        condensed[i].unit = "ounce(s)"
      } else if (condensed[i].unit === "cup" || condensed[i].unit === "cups") {
        condensed[i].quantity = (condensed[i].quantity * 8)
      } else if (condensed[i].unit === "pint" || condensed[i].unit === "pints") {
        condensed[i].quantity = (condensed[i].quantity * 16)
      } else if (condensed[i].unit === "quart" || condensed[i].unit === "quarts") {
        condensed[i].quantity = (condensed[i].quantity * 32)
      } else if (condensed[i].unit === "gallon" || condensed[i].unit === "gallons") {
        condensed[i].quantity = (condensed[i].quantity * 128)
      } else if (condensed[i].unit === "teaspoon" || condensed[i].unit === "teaspoons"){
        condensed[i].quantity = (condensed[i].quantity * .166667)
      } else if (condensed[i].unit === "tablespoon" || condensed[i].unit === "tablespoons") {
        condensed[i].quantity = (condensed[i].quantity * .5)
      } else {
        sad_data.push(condensed[i])
        condensed.splice(i, 1)
        i--
      }
    }

    var promises = []

    // add score to users account
      var promise = new Promise(function(resolve, reject) {
        db.users.findOne({id: userData.id}, function(error, result) {
          if (error) {
            reject()
          } else {
            db.users.save({id: result.id, score: (result.score + Number(recipe_score))}, function(error, result) {
              if (error) {
                reject()
              } else {
                resolve()
              }
            })
          }
        })
      })
      promises.push(promise)

    // remove items from db, one by one:
    for (var i=0; i<condensed.length; i++) {
      (function(i) {
        var promise = new Promise(function(resolve, reject) {
          db.items.where("user_id=$1 AND name=$2", [userData.id, condensed[i].name], function(error, result) {
            if (error || (result.length === 0)) {
              sad_data.push(condensed[i])
              resolve()
            } else {
              if ((result[0].quantity - condensed[i].quantity) > 0) {
                db.items.save({id: result[0].id, quantity: (result[0].quantity - condensed[i].quantity)}, function(error, saved) {
                  if (error) {
                    reject(error)
                  } else {
                    resolve()
                  }
                })
              } else {
                db.items.destroy({id: result[0].id}, function(error, destroyed) {
                  if (error) {
                    reject(error)
                  } else {
                    resolve()
                  }
                })
              }
            }
          })
        })
        promises.push(promise)
      })(i)
    }
    Promise.all(promises).then(
      function() {
        if (sad_data.length !== 0) {
          db.items.find({user_id: userData.id}, function(error, result) {
            if (error) {
              callback(error, undefined)
            } else {
              var final = {
                user: userData.name,
                score: userData.score,
                fridge: result,
                update: sad_data
              }
              callback(null, final)
            }
          })
        } else {
          var final = null
          callback(null, final)
        }
      },
      function(error) {
        callback(error, undefined)
      }
    )
  })
}

Items.removeManual = function(form, user, callback) {
  for (var x=0; x<form.item.length; x++) {
    if (form.item[x] === "none") {
      form.item.splice(x, 1)
      form.unit.splice(x, 1)
      form.quantity.splice(x, 1)
      x--
    }
  }

  var promises = []
  for (var i=0; i<form.item.length; i++) {
    (function(i) {
      var promise = new Promise(function(resolve, reject) {
        if (form.unit[i] === "cup(s)") {
          form.quantity[i] = (Number(form.quantity[i]) * 8)
        } else if (form.unit[i] === "pint(s)") {
          form.quantity[i] = (Number(form.quantity[i]) * 16)
        } else if (form.unit[i] === "quart(s)") {
          form.quantity[i] = (Number(form.quantity[i]) * 32)
        } else if (form.unit[i] === "gallon(s)") {
          form.quantity[i] = (Number(form.quantity[i]) * 128)
        }

        db.items.findOne({id: Number(form.item[i])}, function(error, item) {
          if (error) {
            reject(error)
          } else {
            db.items.save({id: item.id, quantity: (item.quantity - form.quantity[i])}, function(error, saved) {
              if (error) {
                reject(error)
              } else {
                resolve()
              }
            })
          }
        })
      })
      promises.push(promise)
    })(i)
  }
  Promise.all(promises).then(
    function() {
      callback(null, undefined)
    },
    function(error) {
      callback(error, undefined)
    }
  )
}

module.exports = Items
