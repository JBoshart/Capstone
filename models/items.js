var app = require("../app");
var db = app.get("db");
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

Items.subtractItems = function (recipe_id, userData, callback) {
  unirest.get(advanced_url + recipe_id + advanced_rest)
  .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
  .end(function (result) {
    var ingredients = result.body.extendedIngredients
    var ingredients_condensed = []

    // Distill out only needed info:
    for (var i=0; i<ingredients.length; i++) {
      var ingredient = {
        name: ingredients[i].name,
        quantity: ingredients[i].amount,
        unit: ingredients[i].unit,
        inText: ingredients[i].originalString
      }
      ingredients_condensed.push(ingredient)
    }

    // remove items from db, one by one:
    // for (var i=0; i<ingredients_condensed.length; i++) {
    //   if (ingredients_condensed[i].unit === "")
    // }
    db.items.where("user_id=$1 AND name=$2", [userData.id, ingredients_condensed[i].name])

  });
}

module.exports = Items
