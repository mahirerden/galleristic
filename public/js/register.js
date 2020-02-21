$(document).ready(function() {
  // Getting references to our form and input
  var register = $("form.customer_register");
  var register_name = $("#register_name");
  var register_email = $("#register_email");
  var register_password = $("#register_password");
  var register_password2 = $("#register_password2");

  var artist_register = $("form.artist_register");
  var artist_name = $("#artist_name");
  var artist_email = $("#artist_email");
  var artist_password = $("#artist_password");
  var artist_password2 = $("#artist_password2");

  // When the signup button is clicked, we validate the email and password are not blank
  register.on("submit", function(event) {
    event.preventDefault();
    var customerData = {
      name: register_name.val().trim(),
      email: register_email.val().trim(),
      password: register_password.val().trim(),
      password2: register_password2.val().trim()
    };
    if (!customerData.name || !customerData.email || !customerData.password || !customerData.password2) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    customer_signUpUser(customerData.name, customerData.email, customerData.password);
    $("#register_name").val("");
    $("#register_email").val("");
    $("#register_password").val("");
    $("#register_password2").val("");
  });

    // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function customer_signUpUser(name, email, password) {
    $.post("/users/customer_register", {
      name: name,
      email: email,
      password: password,
    }).then(function(data) {
       location.assign("/users/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  } 

  artist_register.on("submit", function(event) {
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
    artist_signUpUser(artistData.name, artistData.email, artistData.password);
    $("#artist_name").val("");
    $("#artist_email").val("");
    $("#artist_password").val("");
    $("#artist_password2").val("");
  });

    // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function artist_signUpUser(name, email, password) {
    $.post("/users/artist_register", {
      name: name,
      email: email,
      password: password,
      islocal: 1
    }).then(function(data) {
       location.assign("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  } 

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
