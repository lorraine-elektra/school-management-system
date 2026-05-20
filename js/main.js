/**
 * CJ SCHOOLS Management System — Main Application File
 * Connects auth, data, navigation, and all pages into one system.
 */
const SchoolApp = {
    name: 'CJ SCHOOLS Management System',
    tagline: 'Modern Montessori Education Centre',

    pages: {
        login:      { file: 'index.html',      label: 'Login',      auth: false },
        dashboard:  { file: 'dashboard.html',  label: 'Dashboard',  auth: true },
        students:   { file: 'students.html',   label: 'Students',   auth: true },
        classes:    { file: 'classes.html',    label: 'Classes',    auth: true },
        teachers:   { file: 'teachers.html',   label: 'Teachers',   auth: true },
        attendance: { file: 'attendance.html', label: 'Attendance', auth: true },
    },

    /* ── Bootstrap ─────────────────────────────────────────── */

    init() {
        const page = this.detectCurrentPage();

        if (page === 'login') {
            this.initLogin();
        } else if (page) {
            this.initPage(page);
        }
        return this;
    },

    initPage(pageId) {
        const page = this.pages[pageId];
        if (!page || !page.auth) return;

        initAppData();
        requireAuth();
        this.setupNavigation(pageId);
    },

    initLogin() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        this.bindLoginForm();
    },

    detectCurrentPage() {
        const href = window.location.href.toLowerCase();
        const file = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0].toLowerCase();

        if (file === 'login.html') return 'login';
        if (file === 'index.html' || file === '' || href.endsWith('/')) return 'login';

        for (const [id, page] of Object.entries(this.pages)) {
            if (page.file.toLowerCase() === file) return id;
        }
        return null;
    },

    /* ── Authentication ────────────────────────────────────── */

    login(username, password) {
        if (!username || !password) {
            alert('Please enter both username and password');
            return false;
        }
        initAppData();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = this.pages.dashboard.file;
        return true;
    },

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = this.pages.login.file;
    },

    isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    bindLoginForm() {
        const form = document.getElementById('loginForm');
        if (!form || form.dataset.bound === 'true') return;

        form.dataset.bound = 'true';
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.login(
                document.getElementById('username').value.trim(),
                document.getElementById('password').value
            );
        });
    },

    /* ── Navigation ────────────────────────────────────────── */

    setupNavigation(activePageId) {
        const activeFile = this.pages[activePageId]?.file;
        if (!activeFile) return;

        document.querySelectorAll('nav a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href === activeFile) {
                link.classList.add('nav-active');
                link.classList.remove('hover:bg-gray-100', 'text-gray-700');
            } else if (href && href.endsWith('.html') && href !== 'login.html' && href !== 'index.html') {
                link.classList.remove('nav-active');
                link.classList.add('hover:bg-gray-100', 'text-gray-700');
            }
        });
    },

    goTo(pageId) {
        const page = this.pages[pageId];
        if (page) window.location.href = page.file;
    },

    /* ── Data Access ───────────────────────────────────────── */

    data: {
        students:   () => getStudents(),
        classes:    () => getClasses(),
        teachers:   () => getTeachers(),
        attendance: () => getAttendanceRecords(),

        saveStudents:   (items) => saveStudents(items),
        saveClasses:    (items) => saveClasses(items),
        saveTeachers:   (items) => saveTeachers(items),
        saveAttendance: (date, records) => saveAttendanceForDate(date, records),
        getAttendance:  (date) => getAttendanceForDate(date),

        nextId: (items) => getNextId(items),
    },

    /* ── Dashboard Stats ───────────────────────────────────── */

    getStats() {
        const students = getStudents();
        const classes = getClasses();
        const teachers = getTeachers();
        const attendance = getAttendanceRecords();
        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = attendance[today] || {};

        return {
            totalStudents: students.length,
            totalClasses: classes.length,
            totalTeachers: teachers.length,
            activeClasses: classes.length,
            activeStudents: students.filter(s => s.status === 'Active').length,
            todayPresent: Object.values(todayAttendance).filter(s => s === 'Present').length,
            todayAbsent: Object.values(todayAttendance).filter(s => s === 'Absent').length,
            todayLate: Object.values(todayAttendance).filter(s => s === 'Late').length,
        };
    },

    renderDashboard() {
        initAppData();
        const stats = this.getStats();
        const fields = {
            totalStudents: stats.totalStudents,
            totalClasses: stats.totalClasses,
            totalTeachers: stats.totalTeachers,
            activeClasses: stats.activeClasses,
        };
        for (const [id, value] of Object.entries(fields)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }
    },
};

function bootSchoolApp() {
    SchoolApp.init();

    if (document.getElementById('totalStudents')) {
        SchoolApp.renderDashboard();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSchoolApp);
} else {
    bootSchoolApp();
}
