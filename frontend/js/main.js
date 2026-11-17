// ---------- data that comes from PHP ----------
var currentUser = { loggedIn: false };
var pets = [];
var requests = [];

// asks session.php who is logged in, then runs the page code
function loadSession(callback) {
  fetch("../config/session.php")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      currentUser = data;
      callback();
    })
    .catch(function (err) {
      alert(
        "session.php problem: " +
          err.message +
          "\nOpen the site as http://localhost/PetFlow/",
      );
    });
}

// asks get_pet.php for all pets from the database
function loadPets(callback) {
  fetch("../api/get_pet.php")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      pets = data;
      callback();
    })
    .catch(function (err) {
      alert("get_pet.php problem: " + err.message);
    });
}

// asks get_requests.php for all adoption requests (admin only)
function loadRequests(callback) {
  fetch("../api/get_requests.php")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      requests = data;
      callback();
    })
    .catch(function (err) {
      alert("get_requests.php problem: " + err.message);
    });
}

// ---------- small helpers ----------
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function findPet(id) {
  return pets.find(function (p) {
    return p.id == id;
  });
}

function logout() {
  window.location.href = "../config/logout.php";
}

// only logged-in normal users can use the adoption form
function requireUser() {
  if (currentUser.role !== "user") {
    alert("Please login with a user account to adopt a pet.");
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// ---------- navbar (public pages) ----------
function loadNavbar(active) {
  var links = [
    ["index.html", "Home"],
    ["browse.html", "Browse Pets"],
    ["about.html", "About"],
    ["contact.html", "Contact"],
  ];
  var menu = "";
  links.forEach(function (l) {
    menu +=
      '<li class="nav-item"><a class="nav-link ' +
      (l[1] === active ? "active" : "") +
      '" href="' +
      l[0] +
      '">' +
      l[1] +
      "</a></li>";
  });

  var buttons;
  if (currentUser.loggedIn) {
    buttons =
      '<span class="me-2 fw-bold">Hi, <span id="userName"></span></span>';
    if (currentUser.role === "admin") {
      buttons +=
        '<a href="admin-dashboard.html" class="btn btn-main me-2">Dashboard</a>';
    }
    buttons +=
      '<button class="btn btn-light-main" onclick="logout()">Logout</button>';
  } else {
    buttons =
      '<a href="login.html" class="btn btn-light-main me-2">Login</a>' +
      '<a href="signup.html" class="btn btn-main">Sign Up</a>';
  }

  document.getElementById("navbar").innerHTML =
    '<nav class="navbar navbar-expand-lg"><div class="container">' +
    '<a class="brand" href="index.html">🐾 PetCare</a>' +
    '<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu"><span class="navbar-toggler-icon"></span></button>' +
    '<div class="collapse navbar-collapse" id="menu">' +
    '<ul class="navbar-nav me-auto ms-4">' +
    menu +
    "</ul>" +
    "<div>" +
    buttons +
    "</div></div></div></nav>";

  // textContent (not innerHTML) so a weird name can never run as code
  if (currentUser.loggedIn) {
    document.getElementById("userName").textContent = currentUser.name;
  }
}

// ---------- footer ----------
function loadFooter() {
  document.getElementById("footer").innerHTML =
    '<footer class="py-4 mt-5 text-center"><div class="container">' +
    '<a class="brand" href="index.html">🐾 PetCare</a>' +
    '<p class="mb-0 small mt-2">&copy; 2026 PetCare Adoption Center. All rights reserved.</p></div></footer>';
}

// ---------- admin sidebar ----------
// returns false (and redirects) when the person is not an admin
function loadSidebar(active) {
  if (currentUser.role !== "admin") {
    window.location.href = "login.html";
    return false;
  }
  var items = [
    ["admin-dashboard.html", "Dashboard"],
    ["admin-pets.html", "Pets"],
    ["admin-requests.html", "Adoption Requests"],
  ];
  var html =
    '<a class="brand d-block mb-4" href="admin-dashboard.html">🐾 PetCare</a>';
  items.forEach(function (i) {
    html +=
      '<a href="' +
      i[0] +
      '" class="' +
      (i[1] === active ? "active" : "") +
      '">' +
      i[1] +
      "</a>";
  });
  html += '<a href="index.html" class="mt-4">View Website</a>';
  html += '<a href="#" onclick="logout()">Logout</a>';
  document.getElementById("sidebar").innerHTML = html;
  return true;
}

// ---------- pet card used on home + browse ----------
function petCard(p) {
  var adopted = p.status !== "Available" ? " (Adopted)" : "";
  return (
    '<div class="col-6 col-md-4 col-lg-3"><div class="card pet-card h-100">' +
    '<img src="' +
    p.img +
    '" class="card-img-top" alt="' +
    p.name +
    '">' +
    '<div class="card-body">' +
    '<h5 class="mb-0">' +
    p.name +
    "</h5>" +
    '<small class="fw-bold">' +
    p.breed +
    "</small>" +
    '<p class="small my-2">' +
    p.type +
    " - " +
    p.age +
    adopted +
    "</p>" +
    '<a href="pet-details.html?id=' +
    p.id +
    '" class="btn btn-main btn-sm w-100">View Details</a>' +
    "</div></div></div>"
  );
}

// ---------- form validation helpers ----------
// shows red error text under a field (empty message = clear it)
function showError(input, message) {
  var box = input.parentElement.querySelector(".error-msg");
  if (!box) {
    box = document.createElement("div");
    box.className = "error-msg text-danger small mt-1";
    input.parentElement.appendChild(box);
  }
  box.textContent = message;
  input.classList.toggle("is-invalid", message !== "");
}

function isEmail(text) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
}

// sends a FormData to a PHP file and gives back the JSON reply
function sendForm(url, formData, callback) {
  fetch(url, { method: "POST", body: formData })
    .then(function (res) {
      return res.json();
    })
    .then(callback)
    .catch(function (err) {
      alert("Problem talking to " + url + ": " + err.message);
    });
}
