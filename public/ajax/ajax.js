// const axios = require("axios")
var getInput = document.querySelector("#artist-input")

$(".artist-search").on("click", function(){
    event.preventDefault()
    console.log("clicked");

var str = getInput.value;
str = str.replace(/ /g,'-');
console.log(str)

var queryURL = "https://api.artsy.net/api/artists/" + str ;

$.ajax({
    url: queryURL,
    type: "GET",
    headers: {
        'X-Xapp-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZTQ0OTg5MGFlY2I4MTAwMGRmYzg0OTgiLCJleHAiOjE1ODI3NjU2NzIsImlhdCI6MTU4MjE2MDg3MiwiYXVkIjoiNWU0NDk4OTBhZWNiODEwMDBkZmM4NDk4IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVlNGRkYmU4YmIyODczMDAxMmRkMThjMyJ9.1epVkcvCbmikP9QsYSGWvE79WA5tZ-6pl6ynF76mzjw'
    },
    success: function(result){
        console.log(result);
      }

})
.then(function(response){
    $("#name").text(response.name);
    $("#image").text(response.gender);
    $("#thumb").html(response._links.artworks.href);
    $("#thumb").append("<img src=response._links.thumbnail.href></img>");
});
});

