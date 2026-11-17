loadSession(function () {
  loadNavbar("");
  loadFooter();
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop the normal page reload

  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var ok = true;

  // 1) JS validation
  if (!isEmail(email.value)) {
    showError(email, "Enter a valid email");
    ok = false;
  } else showError(email, "");
  if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    ok = false;
  } else showError(password, "");
  if (!ok) return;

  // 2) send to PHP (field names must match $_POST in login.php)
  var formData = new FormData();
  formData.append("email", email.value.trim());
  formData.append("password", password.value);

  sendForm("../config/login.php", formData, function (data) {
    if (data.success) {
      window.location.href = data.redirect; // index.html or admin-dashboard.html
    } else {
      alert(data.message);
    }
  });
});
