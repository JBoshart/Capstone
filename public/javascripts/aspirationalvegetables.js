$(document).ready(function() {
  console.log("ready to go!");

  var date = new Date().toISOString().slice(0,10)
  $('#date-control').attr('min', date)
});
