var filter = "All";

function showRequests() {
  var html = "";
  requests.forEach(function (r) {
    if (filter === "All" || r.status === filter) {
      // buttons only for requests that are still waiting
      var buttons = "-";
      if (r.status === "Pending") {
        buttons = '<button class="btn btn-sm btn-success me-1" onclick="setStatus(' + r.id + ', \'Approved\')">Approve</button>' +
          '<button class="btn btn-sm btn-danger" onclick="setStatus(' + r.id + ', \'Rejected\')">Reject</button>';
      }
      html += "<tr><td>" + r.id + "</td><td>" + r.pet + "</td><td>" + r.name + "</td><td>" + r.message + "</td><td>" + r.date +
        '</td><td><span class="badge-status st-' + r.status + '">' + r.status + "</span></td><td>" + buttons + "</td></tr>";
    }
  });
  document.getElementById("reqTable").innerHTML = html || '<tr><td colspan="7" class="text-center">No requests</td></tr>';
}

function setStatus(id, status) {
  var formData = new FormData();
  formData.append("id", id);
  formData.append("status", status);

  sendForm("../api/update_request.php", formData, function (data) {
    alert(data.message);
    loadRequests(showRequests); // reload from the database
  });
}

function setFilter(status, btn) {
  filter = status;
  document.querySelectorAll(".chip").forEach(function (c) {
    c.classList.remove("active");
  });
  btn.classList.add("active");
  showRequests();
}

loadSession(function () {
  if (!loadSidebar("Adoption Requests")) return;
  loadRequests(showRequests);
});
