# PetFlow - Pet Care & Adoption Hub

Users browse pets and send adoption requests. An admin manages pets and approves or rejects requests.

**Stack:** HTML + CSS (Bootstrap 5) + vanilla JS + PHP (mysqli) + MySQL (XAMPP)

## Run it
1. Copy this folder to `C:\xampp\htdocs\PetFlow\`
2. Start Apache + MySQL in XAMPP
3. In phpMyAdmin open the SQL tab and run `database/petflow.sql`
4. Open **http://localhost/PetFlow/frontend/index.html**

Admin login: `admin@petflow.com` / `admin123`  (users can sign up on the Sign Up page)

## Folders
- `*.html` - pages (HTML only, no PHP inside)
- `js/` - one JS file per page + `main.js` (shared helpers)
- `config/` - database connection, register, login, logout, session
- `api/` - pets CRUD, adoption requests (all reply with JSON)
- `database/` - full schema + sample pets + admin account

## How the pieces talk
Page (HTML) -> JS `fetch()` -> PHP file -> MySQL -> PHP replies with JSON -> JS updates the page.
