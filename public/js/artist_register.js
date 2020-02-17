$(document).ready(function() {
  // Getting references to our form and input
  var register = $("form.artist_register");
  var artist_name = $("#artist_name");
  var artist_email = $("#artist_email");
  var artist_password = $("#artist_password");
  var artist_password2 = $("#artist_password2");

  // $.get("/login/api/user_data").then(function(data) {
  //   console.log(data);
  //   $(".member-name").text(data.name);
  // });

  // When the signup button is clicked, we validate the email and password are not blank
  register.on("submit", function(event) {
    event.preventDefault();
    var artistData = {
      name: artist_name.val().trim(),
      email: artist_email.val().trim(),
      password: artist_password.val().trim(),
      password2: artist_password2.val().trim()
    };
    if (!artistData.name || !artistData.email || !artistData.password || !artistData.password2) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(artistData.name, artistData.email, artistData.password);
    $("#artist_name").val("");
    $("#artist_email").val("");
    $("#artist_password").val("");
    $("#artist_password2").val("");
  });

    // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    $.post("/artist_register/artist_register", {
      name: name,
      email: email,
      password: password,
      islocal: 1
    }).then(function(data) {
       location.assign("/artist_login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  } 

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});