loadSession(function () {
  loadNavbar("Browse Pets");
  loadFooter();

  loadPets(function () {
    var pet = findPet(getParam("id"));
    if (!pet) {
      alert("Pet not found");
      window.location.href = "browse.html";
      return;
    }

    document.getElementById("pName").textContent = pet.name;
    document.getElementById("pName2").textContent = pet.name;
    document.getElementById("pType").textContent = pet.type;
    document.getElementById("pBreed").textContent = pet.breed;
    document.getElementById("pAge").textContent = pet.age;
    document.getElementById("pStatus").textContent = pet.status;
    document.getElementById("pAbout").textContent = pet.about;
    document.getElementById("mainImg").src = pet.img;

    var btn = document.getElementById("adoptBtn");
    if (pet.status === "Available") {
      btn.href = "adopt.html?id=" + pet.id;
    } else {
      // already adopted: the button is turned off
      btn.textContent = "Already Adopted";
      btn.classList.add("disabled");
    }
  });
});
