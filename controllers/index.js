var IndexController = {
  getIndex: function(request, response) {
    console.log("Hit the index function")
    var locals = {}
    response.render('index', locals)
  }
}

module.exports = IndexController
