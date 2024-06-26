document.addEventListener('DOMContentLoaded', () => {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentFormContainer = document.getElementById('studentFormContainer');
    const studentForm = document.getElementById('studentForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const studentTableBody = document.querySelector('#studentTable tbody');

    addStudentBtn.addEventListener('click', () => {
        studentFormContainer.style.display = 'block';
    });

    cancelBtn.addEventListener('click', () => {
        studentFormContainer.style.display = 'none';
    });

    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const major = document.getElementById('major').value;

        fetch('http://localhost:7777/student/addStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, major })
        })
        .then(response => response.json())
        .then(data => {
            addStudentToTable(data.student);
            studentFormContainer.style.display = 'none';
            studentForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    function addStudentToTable(student) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${student.name}</td><td>${student.age}</td><td>${student.major}</td>`;
        studentTableBody.appendChild(row);
    }

    function loadStudents() {
        fetch('http://localhost:7777/student')
        .then(response => response.json())
        .then(data => {
            data.students.forEach(student => addStudentToTable(student));
        })
        .catch(error => console.error('Error:', error));
    }

    loadStudents();
});