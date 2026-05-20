const DEFAULT_STUDENTS = [
    { id: 1, name: 'John Doe', studentId: 'STU001', grade: '10', email: 'john@school.com', phone: '123-456-7890', status: 'Active' },
    { id: 2, name: 'Jane Smith', studentId: 'STU002', grade: '11', email: 'jane@school.com', phone: '123-456-7891', status: 'Active' },
    { id: 3, name: 'Mike Johnson', studentId: 'STU003', grade: '10', email: 'mike@school.com', phone: '123-456-7892', status: 'Active' },
    { id: 4, name: 'Emily Brown', studentId: 'STU004', grade: '12', email: 'emily@school.com', phone: '123-456-7893', status: 'Active' },
    { id: 5, name: 'David Lee', studentId: 'STU005', grade: '9', email: 'david@school.com', phone: '123-456-7894', status: 'Active' },
];

const DEFAULT_CLASSES = [
    { id: 1, className: 'Mathematics 101', subject: 'Mathematics', teacher: 'Mr. Smith', grade: '10', schedule: 'Mon-Wed 9:00 AM', students: 25 },
    { id: 2, className: 'Physics 201', subject: 'Physics', teacher: 'Dr. Johnson', grade: '11', schedule: 'Tue-Thu 10:00 AM', students: 20 },
    { id: 3, className: 'English Literature', subject: 'English', teacher: 'Ms. Davis', grade: '12', schedule: 'Mon-Wed 2:00 PM', students: 30 },
    { id: 4, className: 'Chemistry 101', subject: 'Chemistry', teacher: 'Dr. Wilson', grade: '10', schedule: 'Tue-Thu 1:00 PM', students: 22 },
];

const DEFAULT_TEACHERS = [
    { id: 1, name: 'Mr. Smith', teacherId: 'TCH001', subject: 'Mathematics', email: 'smith@school.com', phone: '123-456-8001' },
    { id: 2, name: 'Dr. Johnson', teacherId: 'TCH002', subject: 'Physics', email: 'johnson@school.com', phone: '123-456-8002' },
    { id: 3, name: 'Ms. Davis', teacherId: 'TCH003', subject: 'English', email: 'davis@school.com', phone: '123-456-8003' },
    { id: 4, name: 'Dr. Wilson', teacherId: 'TCH004', subject: 'Chemistry', email: 'wilson@school.com', phone: '123-456-8004' },
];

function initAppData() {
    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify(DEFAULT_STUDENTS));
    }
    if (!localStorage.getItem('classes')) {
        localStorage.setItem('classes', JSON.stringify(DEFAULT_CLASSES));
    }
    if (!localStorage.getItem('teachers')) {
        localStorage.setItem('teachers', JSON.stringify(DEFAULT_TEACHERS));
    }
}

function getStudents() {
    return JSON.parse(localStorage.getItem('students')) || DEFAULT_STUDENTS;
}

function getClasses() {
    return JSON.parse(localStorage.getItem('classes')) || DEFAULT_CLASSES;
}

function getTeachers() {
    return JSON.parse(localStorage.getItem('teachers')) || DEFAULT_TEACHERS;
}

function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

function saveClasses(classes) {
    localStorage.setItem('classes', JSON.stringify(classes));
}

function saveTeachers(teachers) {
    localStorage.setItem('teachers', JSON.stringify(teachers));
}

function getAttendanceRecords() {
    return JSON.parse(localStorage.getItem('attendanceRecords')) || {};
}

function saveAttendanceForDate(date, attendance) {
    const records = getAttendanceRecords();
    records[date] = attendance;
    localStorage.setItem('attendanceRecords', JSON.stringify(records));
}

function getAttendanceForDate(date) {
    const records = getAttendanceRecords();
    return records[date] || {};
}

function getNextId(items) {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}
