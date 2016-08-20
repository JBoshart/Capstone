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

  if (formData.unit === "cups") {
    conversion = (formData.quantity * 8)
  } else if (formData.unit === "pint") {
    conversion = (formData.quantity * 16)
  } else if (formData.unit === "quart") {
    conversion = (formData.quantity * 32)
  } else if (formData.unit === "gallon") {
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

Items.removeItems = function (recipe_id, userData, callback) {
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

    // remove items from db, one by one:
    for (var i=0; i<condensed.length; i++) {
      (function(i) {
        var promise = new Promise(function(resolve, reject) {
          db.items.where("user_id=$1 AND name=$2", [userData.id, condensed[i].name], function(error, result) {
            if (error || (result.length === 0)) {
              sad_data.push(condensed[i])
              resolve()
            } else {
              console.log(result)
              console.log(result.quantity - condensed[i].quantity)
              db.items.save({id: result.id, quantity: (result.quantity - condensed[i].quantity)}, function(error, saved) {
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
        callback(null, sad_data)
      },
      function(error) {
        callback(error, undefined)
      }
    )
  })
}

module.exports = Items
