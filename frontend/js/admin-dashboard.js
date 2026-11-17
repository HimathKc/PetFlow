loadSession(function () {
  if (!loadSidebar("Dashboard")) return;

  loadPets(function () {
    document.getElementById("totalPets").textContent = pets.length;

    loadRequests(function () {
      document.getElementById("totalReq").textContent = requests.length;

      var pending = requests.filter(function (r) {
        return r.status === "Pending";
      });
      document.getElementById("pendingReq").textContent = pending.length;

      // the 5 newest requests (get_requests.php already sorts newest first)
      var html = "";
      requests.slice(0, 5).forEach(function (r) {
        html += "<tr><td>" + r.id + "</td><td>" + r.pet + "</td><td>" + r.name + "</td><td>" + r.date +
          '</td><td><span class="badge-status st-' + r.status + '">' + r.status + "</span></td></tr>";
      });
      document.getElementById("recent").innerHTML = html || '<tr><td colspan="5" class="text-center">No requests yet</td></tr>';
    });
  });
});
