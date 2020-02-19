$(document).ready(function() {
  // Getting references to our form and input
  var register = $("form.customer_register");
  var register_name = $("#register_name");
  var register_email = $("#register_email");
  var register_password = $("#register_password");
  var register_password2 = $("#register_password2");

  // $.get("/login/api/user_data").then(function(data) {
  //   console.log(data);
  //   $(".member-name").text(data.name);
  // });

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
    signUpUser(customerData.name, customerData.email, customerData.password);
    $("#register_name").val("");
    $("#register_email").val("");
    $("#register_password").val("");
    $("#register_password2").val("");
  });

    // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    $.post("/register/register", {
      name: name,
      email: email,
      password: password,
    }).then(function(data) {
       location.assign("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  } 

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
