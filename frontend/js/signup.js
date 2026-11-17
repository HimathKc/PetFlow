loadSession(function () {
  loadNavbar("");
  loadFooter();
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirm = document.getElementById("confirm");
  var ok = true;

  // 1) JS validation
  if (name.value.trim().length < 3) {
    showError(name, "Name must be at least 3 characters");
    ok = false;
  } else showError(name, "");
  if (!isEmail(email.value)) {
    showError(email, "Enter a valid email");
    ok = false;
  } else showError(email, "");
  if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    ok = false;
  } else showError(password, "");
  if (confirm.value !== password.value) {
    showError(confirm, "Passwords do not match");
    ok = false;
  } else showError(confirm, "");
  if (!ok) return;

  // 2) send to PHP (field names must match $_POST in register.php)
  var formData = new FormData();
  formData.append("name", name.value.trim());
  formData.append("email", email.value.trim());
  formData.append("password", password.value);
  formData.append("confirm", confirm.value);

  sendForm("../config/register.php", formData, function (data) {
    alert(data.message);
    if (data.success) {
      window.location.href = "login.html";
    }
  });
});
