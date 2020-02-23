$(document).ready(function() {
  // Getting references to our form and inputs
  var artist_loginForm = $("form.artist_login");
  var artist_email = $("input#artist_email");
  var artist_password = $("input#artist_password");

  $.get("/apis/api/user_data").then(function(data) {
    $(".member_name").text(data.name);
  });

  // When the form is submitted, we validate there's an email and password entered
  artist_loginForm.on("submit", function(event) {
    event.preventDefault();
    var artistData = {
      email: artist_email.val().trim(),
      password: artist_password.val().trim()
    };

    if (!artistData.email || !artistData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    artist_loginUser(artistData.email, artistData.password);
    artist_email.val("");
    artist_password.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function artist_loginUser(email, password) {
    console.log(email + " " +password);
    $.post("/users/artist_login", {
      email: email,
      password: password
    }).then(function() {
      sessionStorage.setItem("user", "artist");
      location.assign("/");
        // If there's an error, log the error
        //------------------------------------
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
