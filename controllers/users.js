var UsersController = {
  getLogin: function(request, response) {
    console.log("Hit the login function")
    var locals = {}
    response.render('login', locals)
  }
}

module.exports = UsersController
