function showTable() {
  var html = "";
  pets.forEach(function (p) {
    html += '<tr><td><img src="' + p.img + '" width="55" height="45" class="rounded" style="object-fit:cover"></td>' +
      "<td>" + p.name + "</td><td>" + p.type + "</td><td>" + p.breed + "</td><td>" + p.age + "</td>" +
      '<td><span class="badge-status st-' + p.status + '">' + p.status + "</span></td><td>" +
      '<a href="admin-pet-form.html?id=' + p.id + '" class="btn btn-sm btn-main me-1"><i class="bi bi-pencil"></i></a>' +
      '<button class="btn btn-sm btn-danger" onclick="deletePet(' + p.id + ')"><i class="bi bi-trash"></i></button></td></tr>';
  });
  document.getElementById("petTable").innerHTML = html || '<tr><td colspan="7" class="text-center">No pets yet</td></tr>';
}

function deletePet(id) {
  if (!confirm("Are you sure you want to delete this pet?")) return;

  var formData = new FormData();
  formData.append("pet_id", id);

  sendForm("../api/delete_pet.php", formData, function (data) {
    alert(data.message);
    loadPets(showTable); // reload the list from the database
  });
}

loadSession(function () {
  if (!loadSidebar("Pets")) return;
  loadPets(showTable);
});
