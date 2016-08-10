var IndexController = {
  getIndex: function(request, response) {
    var locals = {user: request.session.passport || 0}
    response.render('index', locals)
  }
}

module.exports = IndexController
