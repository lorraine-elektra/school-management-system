# CJ SCHOOLS Management System

A static school management web app with separate HTML pages for each section. Built with HTML, Tailwind CSS, and vanilla JavaScript. Data is stored in the browser via localStorage.

##Live Demo

https://lorraine-elektra.github.io/school-management-system/

## Project Structure

```
school-management-pages/
├── index.html              # Login page (main entry point)
├── START.bat               # Double-click to open the app
├── login.html              # Redirects to index.html
├── dashboard.html          # Dashboard overview
├── students.html           # Student management
├── classes.html            # Class management
├── teachers.html           # Teachers directory
├── attendance.html         # Attendance tracking
├── css/
│   └── styles.css          # Shared styles
├── js/
│   ├── main.js               # Main app — connects everything
│   ├── auth.js               # Login check and logout
│   └── data.js               # Data storage and helpers
├── common-styles.html      # Style reference notes
└── README.md
```

## Pages

| Page | File | Description |
|------|------|-------------|
| Login | `login.html` | Sign in (any username/password works) |
| Dashboard | `dashboard.html` | Stats overview |
| Students | `students.html` | Add, search, delete students |
| Classes | `classes.html` | Add, search, delete classes |
| Teachers | `teachers.html` | View and search teachers |
| Attendance | `attendance.html` | Mark daily attendance |

## How It Connects

All pages load three scripts in order:

1. `js/data.js` — stores students, classes, teachers, attendance
2. `js/auth.js` — handles login protection and logout
3. `js/main.js` — **main file** that boots the app, routes pages, and ties everything together

`js/main.js` exposes the `SchoolApp` object:

| Method | Purpose |
|--------|---------|
| `SchoolApp.init()` | Auto-starts on every page |
| `SchoolApp.login()` | Authenticates and seeds data |
| `SchoolApp.logout()` | Signs out |
| `SchoolApp.data.students()` | Get all students |
| `SchoolApp.data.saveStudents()` | Save students |
| `SchoolApp.getStats()` | Dashboard statistics |
| `SchoolApp.renderDashboard()` | Updates dashboard cards |
| `SchoolApp.routeFromIndex()` | Routes from index to login or dashboard |

## Open the App

**Easiest way:** Double-click **`START.bat`** in the project folder.

Or double-click **`index.html`** — that is the login page.

### Sign in
- Use **any username and password** (both fields required)
- Click **Sign In** → you go to the Dashboard
- Use the sidebar to open Students, Classes, Teachers, Attendance

### If the page looks unstyled
You need an internet connection once — the app loads Tailwind CSS from a CDN on first open.

## Getting Started

1. Open `index.html` or `login.html` in a browser
2. Sign in with any username and password
3. Use the sidebar to navigate between pages

No server or build step is required.

## Technologies

- HTML5
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- Vanilla JavaScript
- localStorage for data persistence

## Default Sample Data

On first login, the app seeds:

- 5 students
- 4 classes
- 4 teachers

## Notes

- Static demo app — not for production without a real backend
- Clearing browser data resets all records
- Each page is a separate HTML file; shared logic lives in `css/` and `js/`

## License

Demo / educational project — free to use and modify.
