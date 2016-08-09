var IndexController = {
  getIndex: function(request, response) {
    var locals = {}
    response.render('index', locals)
  }
}

module.exports = IndexController
