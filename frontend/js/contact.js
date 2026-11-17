loadSession(function () {
  loadNavbar("Contact");
  loadFooter();
});

// this form only checks the fields (front-end validation, nothing is stored)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var message = document.getElementById("message");
  var ok = true;

  if (name.value.trim() === "") { showError(name, "Name is required"); ok = false; } else showError(name, "");
  if (!isEmail(email.value)) { showError(email, "Enter a valid email"); ok = false; } else showError(email, "");
  if (message.value.trim().length < 10) { showError(message, "Write at least 10 characters"); ok = false; } else showError(message, "");

  if (ok) {
    alert("Message sent. Thank you!");
    this.reset();
  }
});
