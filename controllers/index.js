var IndexController = {
  getIndex: function(request, response) {
    var locals = {user: request.user || 0}
    response.render('index', locals)
  }
}

module.exports = IndexController
