loadSession(function () {
  loadNavbar("Home");
  loadFooter();
  loadPets(function () {
    // show the first 4 pets
    var html = "";
    pets.slice(0, 4).forEach(function (p) {
      html += petCard(p);
    });
    document.getElementById("featured").innerHTML = html;
  });
});
