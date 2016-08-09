var UsersController = {
  getLogin: function(request, response) {
    var locals = {}
    response.render('login', locals)
  }
}

module.exports = UsersController
