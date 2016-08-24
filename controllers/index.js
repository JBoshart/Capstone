var IndexController = {
  getIndex: function(request, response) {
    if(request.user) {
      response.redirect('/profile')
    } else {
      response.render('index')
    }
  }
}

module.exports = IndexController
