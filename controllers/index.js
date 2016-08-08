var IndexController = {
  getIndex: function(request, response) {
    var locals = {}
    locals.athing = JSON.stringify('a thing')
    response.render('index', locals)
  }
}

module.exports = IndexController
