$(document).ready(function() {
  // Getting references to our form and inputs
  var customer_loginForm = $("form.customer_login");
  var customer_email = $("input#customer_email");
  var customer_password = $("input#customer_password");

  $.get("/apis/api/user_data").then(function(data) {
    $(".member_name").text(data.name);
  });

  // When the form is submitted, we validate there's an email and password entered
  customer_loginForm.on("submit", function(event) {
    event.preventDefault();
    var customerData = {
      email: customer_email.val().trim(),
      password: customer_password.val().trim()
    };

    if (!customerData.email || !customerData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    customer_loginUser(customerData.email, customerData.password);
    customer_email.val("");
    customer_password.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function customer_loginUser(email, password) {
    console.log(email + " " +password);
    $.post("/users/customer_login", {
      email: email,
      password: password
    }).then(function() {
      console.log("then");
        location.assign("/");
        // location.assign("/");
        // If there's an error, log the error
        //--------------------------
      })
      .catch(function(err) {
        console.log(err);
      });
  }

});
