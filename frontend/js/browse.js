var currentType = "All";

function showPets() {
  var text = document.getElementById("search").value.toLowerCase();
  var html = "";
  pets.forEach(function (p) {
    var matchType = currentType === "All" || p.type === currentType;
    var matchText = (p.name + p.breed + p.about).toLowerCase().includes(text);
    if (matchType && matchText) html += petCard(p);
  });
  document.getElementById("petList").innerHTML = html;
  document.getElementById("noResult").classList.toggle("d-none", html !== "");
}

function setFilter(type, btn) {
  currentType = type;
  document.querySelectorAll(".chip").forEach(function (c) {
    c.classList.remove("active");
  });
  btn.classList.add("active");
  showPets();
}

loadSession(function () {
  loadNavbar("Browse Pets");
  loadFooter();
  loadPets(showPets);
});

document.getElementById("search").addEventListener("keyup", showPets);
