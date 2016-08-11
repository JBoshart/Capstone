var IndexController = {
  getIndex: function(request, response) {
    if(request.user) {
      response.render('profile', {user: request.user})
    } else {
      response.render('index')
    }
  }
}

module.exports = IndexController
