# 🐾 PetFlow – Pet Care & Adoption Hub

PetFlow is a web-based pet care and adoption management platform designed to connect people with pets available for adoption while simplifying pet management and adoption requests.

The platform provides an organized environment where users can browse available pets, view pet information, and submit adoption requests. Administrators can manage pet listings and monitor adoption requests through a centralized system.

## ✨ Features

### 👤 User Features
- Browse available pets.
- View detailed pet information.
- Explore pets available for adoption.
- Submit adoption requests.
- Register and log in to the platform.

### 🛠️ Administrator Features
- Add new pet listings.
- Update existing pet information.
- Remove pet listings.
- Manage adoption requests.
- Monitor adoption activity.

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and layouts |
| JavaScript | Frontend functionality |
| PHP | Backend development |
| MySQL | Database management |
| XAMPP | Local development environment |

## 📁 Project Structure

```text
PetFlow/
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── pages/
│
├── backend/
│
├── api/
│
├── config/
│
├── database/
│
├── .gitignore
└── README.md
```

*Note: The directory structure may evolve as development progresses.*

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <https://github.com/HimathKc/PetFlow>
```

### 2. Move the Project

Move the cloned `PetFlow` folder into your XAMPP `htdocs` directory.

### 3. Start XAMPP

Start the following services:
- Apache
- MySQL

### 4. Configure the Database

1. Open phpMyAdmin.
2. Create the required PetFlow database.
3. Import the SQL file from the `database/` directory.
4. Configure the database connection settings.

### 5. Configure Backend

Update the database configuration with your local credentials.

Keep sensitive credentials outside the public repository.

### 6. Run the Application

Open your browser and navigate to:

```text
http://localhost/PetFlow/
```

## 🔐 Security

- Passwords should be securely hashed.
- Database credentials should be stored outside version control.
- User input should be validated and sanitized.
- Backend endpoints should enforce appropriate authentication and authorization.

## 🚀 Project Goals

PetFlow aims to:
- Simplify the pet adoption process.
- Make pet information accessible.
- Improve adoption request management.
- Provide an organized platform for users and administrators.

## 👨‍💻 Development

This project is developed as an academic software development project.

Contributions, improvements, and suggestions are welcome.

---

**PetFlow – Connecting People with Pets. 🐾**
