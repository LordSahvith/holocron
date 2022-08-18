var data = ''; // JSON data will be stored here
myurl = 'data.json';
index = 0;

$(document).ready(function () {
  $.getJSON(myurl, function (JSON) {
    data = JSON;
  });
});
