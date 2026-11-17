// ===== PetCare shared JS (data + helpers used by every page) =====

// Sample data (replace with PHP/MySQL JSON API later)
var pets = [
  { id: 1, name: "Buddy", type: "Dog", breed: "Golden Retriever", age: "3 months", gender: "Male", size: "Medium",
    temper: "Friendly, Playful, Gentle", short: "Friendly, playful, and loves everyone.",
    about: "Buddy is a happy and affectionate puppy who loves making new friends. He enjoys playtime, walks, and cuddling on the couch.",
    img: "https://loremflickr.com/500/400/puppy,golden?lock=1" },
  { id: 2, name: "Luna", type: "Cat", breed: "Domestic Shorthair", age: "1 year", gender: "Female", size: "Small",
    temper: "Sweet, Curious, Calm", short: "Sweet, curious, and enjoys cozy naps.",
    about: "Luna is a gentle cat who loves sunny windows and soft blankets. She gets along well with children.",
    img: "https://loremflickr.com/500/400/tabby,cat?lock=2" },
  { id: 3, name: "Snowball", type: "Others", breed: "Rabbit", age: "8 months", gender: "Female", size: "Small",
    temper: "Gentle, Calm", short: "Gentle, calm, and loves fresh greens.",
    about: "Snowball is a fluffy white rabbit who enjoys hopping around and munching on fresh vegetables.",
    img: "https://loremflickr.com/500/400/white,rabbit?lock=3" },
  { id: 4, name: "Chirpy", type: "Others", breed: "Cockatiel", age: "2 years", gender: "Male", size: "Small",
    temper: "Cheerful, Social", short: "Cheerful, social, and loves to whistle.",
    about: "Chirpy is a happy cockatiel who loves to sing and whistle along with his family.",
    img: "https://loremflickr.com/500/400/cockatiel?lock=4" },
  { id: 5, name: "Milo", type: "Dog", breed: "Beagle", age: "6 months", gender: "Male", size: "Medium",
    temper: "Energetic, Curious", short: "Energetic, curious, and always sniffing.",
    about: "Milo is an energetic beagle puppy who loves outdoor adventures and long walks.",
    img: "https://loremflickr.com/500/400/beagle,puppy?lock=5" },
  { id: 6, name: "Coco", type: "Cat", breed: "Persian", age: "2 years", gender: "Female", size: "Small",
    temper: "Quiet, Affectionate", short: "Quiet, fluffy, and very affectionate.",
    about: "Coco is a calm Persian cat who loves being brushed and sitting on laps.",
    img: "https://loremflickr.com/500/400/persian,cat?lock=6" }
];

var requests = [
  { id: "REQ-015", pet: "Buddy", name: "Sarah Johnson", date: "May 24, 2024", status: "Pending" },
  { id: "REQ-014", pet: "Luna", name: "Michael Brown", date: "May 23, 2024", status: "Pending" },
  { id: "REQ-013", pet: "Snowball", name: "Emily Davis", date: "May 22, 2024", status: "Pending" },
  { id: "REQ-012", pet: "Milo", name: "Jessica Wilson", date: "May 21, 2024", status: "Pending" }
];

var users = [
  { id: 1, name: "Sarah Johnson", email: "sarah@mail.com", role: "User", status: "Active" },
  { id: 2, name: "Michael Brown", email: "michael@mail.com", role: "User", status: "Active" },
  { id: 3, name: "Emily Davis", email: "emily@mail.com", role: "User", status: "Active" },
  { id: 4, name: "Jessica Wilson", email: "jessica@mail.com", role: "User", status: "Blocked" }
];

// ---- small helpers ----
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function findPet(id) {
  return pets.find(function (p) { return p.id == id; });
}

function isLoggedIn() {
  return localStorage.getItem("petcareUser") !== null;
}

// role is saved at login: "admin" or "user"
function getRole() {
  return localStorage.getItem("petcareRole");
}

function logout() {
  var role = getRole();
  localStorage.removeItem("petcareUser");
  localStorage.removeItem("petcareRole");
  window.location.href = (role === "admin") ? "login.html" : "index.html";
}

// only logged-in normal users can use pages like the adoption form
function requireUser() {
  if (getRole() !== "user") {
    alert("Please login with a user account to adopt a pet.");
    window.location.href = "login.html";
  }
}

// ---- navbar (public pages) ----
function loadNavbar(active) {
  // admins cannot use the customer site
  if (getRole() === "admin") {
    window.location.href = "admin-dashboard.html";
    return;
  }
  var links = [["index.html", "Home"], ["browse.html", "Browse Pets"], ["about.html", "About"], ["contact.html", "Contact"]];
  var menu = "";
  links.forEach(function (l) {
    menu += '<li class="nav-item"><a class="nav-link ' + (l[1] === active ? "active" : "") + '" href="' + l[0] + '">' + l[1] + "</a></li>";
  });

  var buttons;
  if (isLoggedIn()) {
    buttons = '<span class="me-2 fw-bold">Hi, ' + localStorage.getItem("petcareUser") + '</span>' +
              '<button class="btn btn-light-main" onclick="logout()">Logout</button>';
  } else {
    buttons = '<a href="login.html" class="btn btn-light-main me-2">Login</a>' +
              '<a href="signup.html" class="btn btn-main">Sign Up</a>';
  }

  document.getElementById("navbar").innerHTML =
    '<nav class="navbar navbar-expand-lg"><div class="container">' +
    '<a class="brand" href="index.html">🐾 PetCare</a>' +
    '<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu"><span class="navbar-toggler-icon"></span></button>' +
    '<div class="collapse navbar-collapse" id="menu">' +
    '<ul class="navbar-nav me-auto ms-4">' + menu + "</ul><div>" + buttons + "</div></div></div></nav>";
}

// ---- footer ----
function loadFooter() {
  document.getElementById("footer").innerHTML =
    '<footer class="py-4 mt-5 text-center"><div class="container">' +
    '<a class="brand" href="index.html">🐾 PetCare</a>' +
    '<p class="mb-0 small mt-2">&copy; 2026 PetCare Adoption Center. All rights reserved.</p></div></footer>';
}

// ---- admin sidebar ----
function loadSidebar(active) {
  // only admins can open admin pages
  if (getRole() !== "admin") {
    window.location.href = "login.html";
    return;
  }
  var items = [
    ["admin-dashboard.html", "Dashboard", "bi-house"],
    ["admin-pets.html", "Pets", "paw"],
    ["admin-requests.html", "Adoption Requests", "bi-search-heart"],
    ["admin-users.html", "Users", "bi-people"],
    ["admin-settings.html", "Settings", "bi-gear"]
  ];
  var html = '<a class="brand d-block mb-4" href="admin-dashboard.html">🐾 PetCare</a>';
  items.forEach(function (i) {
    // bootstrap icons has no paw icon, so Pets uses the paw emoji
    var icon = (i[2] === "paw")
      ? '<span class="me-2" style="filter: grayscale(1)">🐾</span>'
      : '<i class="bi ' + i[2] + ' me-2"></i>';
    html += '<a href="' + i[0] + '" class="' + (i[1] === active ? "active" : "") + '">' + icon + i[1] + "</a>";
  });
  html += '<a href="#" onclick="logout()" class="mt-5"><i class="bi bi-box-arrow-left me-2"></i>Logout</a>';
  document.getElementById("sidebar").innerHTML = html;
}

// ---- pet card used on home + browse ----
function petCard(p) {
  return '<div class="col-6 col-md-4 col-lg-3"><div class="card pet-card h-100">' +
    '<img src="' + p.img + '" class="card-img-top" alt="' + p.name + '">' +
    '<div class="card-body">' +
    '<i class="bi bi-heart fav" onclick="toggleFav(this)"></i>' +
    '<h5 class="mb-0">' + p.name + '</h5><small class="fw-bold">' + p.breed + '</small>' +
    '<p class="small my-2">' + p.short + '</p>' +
    '<a href="pet-details.html?id=' + p.id + '" class="btn btn-main btn-sm w-100">View Details</a>' +
    '</div></div></div>';
}

function toggleFav(icon) {
  icon.classList.toggle("bi-heart");
  icon.classList.toggle("bi-heart-fill");
}

// ---- form validation helper ----
// shows red error text under a field. returns true when form is valid
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

function showToast(message) {
  var t = document.createElement("div");
  t.className = "alert alert-success position-fixed top-0 end-0 m-3 shadow";
  t.style.zIndex = 2000;
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 2500);
}
