loadSession(function () {
  if (!requireUser()) return; // only logged-in users can adopt

  loadNavbar("Browse Pets");
  loadFooter();

  loadPets(function () {
    var pet = findPet(getParam("id"));
    if (!pet || pet.status !== "Available") {
      alert("This pet is not available");
      window.location.href = "browse.html";
      return;
    }
    document.getElementById("petName").textContent = pet.name;
    document.getElementById("backLink").href = "pet-details.html?id=" + pet.id;

    document.getElementById("adoptForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var message = document.getElementById("message");

      // JS validation
      if (message.value.trim().length < 10) {
        showError(message, "Write at least 10 characters");
        return;
      }
      showError(message, "");

      // send to PHP
      var formData = new FormData();
      formData.append("pet_id", pet.id);
      formData.append("message", message.value.trim());

      sendForm("../api/add_request.php", formData, function (data) {
        alert(data.message);
        if (data.success) {
          window.location.href = "browse.html";
        }
      });
    });
  });
});
