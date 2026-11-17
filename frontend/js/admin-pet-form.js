var editPet = null; // stays null when we are adding a new pet

loadSession(function () {
  if (!loadSidebar("Pets")) return;

  loadPets(function () {
    // edit mode: ?id= is in the url, so fill the form with that pet
    editPet = findPet(getParam("id"));
    if (editPet) {
      document.getElementById("title").textContent = "Edit Pet - " + editPet.name;
      document.getElementById("name").value = editPet.name;
      document.getElementById("type").value = editPet.type;
      document.getElementById("breed").value = editPet.breed;
      document.getElementById("age").value = editPet.age;
      document.getElementById("about").value = editPet.about;
      document.getElementById("preview").src = editPet.img;
      document.getElementById("preview").classList.remove("d-none");
    }
  });
});

// image preview when a file is chosen
document.getElementById("photo").addEventListener("change", function () {
  if (this.files.length === 0) return;
  var img = document.getElementById("preview");
  img.src = URL.createObjectURL(this.files[0]);
  img.classList.remove("d-none");
});

document.getElementById("petForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var ok = true;

  // JS validation: these fields cannot be empty
  ["name", "type", "breed", "age"].forEach(function (f) {
    var input = document.getElementById(f);
    if (input.value.trim() === "") { showError(input, "This field is required"); ok = false; } else showError(input, "");
  });
  var about = document.getElementById("about");
  if (about.value.trim().length < 10) { showError(about, "Write at least 10 characters"); ok = false; } else showError(about, "");

  // a new pet needs a photo, an edited pet can keep its old one
  var photo = document.getElementById("photo");
  if (!editPet && photo.files.length === 0) { showError(photo, "Please choose a photo"); ok = false; } else showError(photo, "");
  if (!ok) return;

  // send to PHP (field names must match $_POST / $_FILES in save_pet.php)
  var formData = new FormData();
  if (editPet) formData.append("pet_id", editPet.id);
  formData.append("name", document.getElementById("name").value.trim());
  formData.append("type", document.getElementById("type").value);
  formData.append("breed", document.getElementById("breed").value.trim());
  formData.append("age", document.getElementById("age").value.trim());
  formData.append("description", about.value.trim());
  if (photo.files.length > 0) formData.append("photo", photo.files[0]);

  sendForm("../api/save_pet.php", formData, function (data) {
    alert(data.message);
    if (data.success) {
      window.location.href = "admin-pets.html";
    }
  });
});
