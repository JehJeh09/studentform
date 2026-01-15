let students = [];

/* DOM ELEMENTS */
const studentId = document.getElementById("studentId");
const lname = document.getElementById("lname");
const fname = document.getElementById("fname");
const mname = document.getElementById("mname");
const birthdate = document.getElementById("birthdate");
const course = document.getElementById("course");
const year = document.getElementById("year");
const editIndex = document.getElementById("editIndex");
const btnSave = document.getElementById("btnSave");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");

/* EVENTS */
btnSave.addEventListener("click", saveStudent);
search.addEventListener("keyup", displayStudents);

/* CALCULATE AGE */
function calculateAge(date) {
    const today = new Date();
    const birth = new Date(date);
    let age = today.getFullYear() - birth.getFullYear();
    if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) age--;
    return age;
}

/* SAVE / UPDATE STUDENT */
function saveStudent() {

    // Validation
    if (
        !studentId.value ||
        !lname.value ||
        !fname.value ||
        !birthdate.value ||
        !course.value ||
        !year.value
    ) {
        alert("Please complete all required fields.");
        return;
    }

    // Check duplicate Student ID
    const duplicateId = students.some((s, i) =>
        s.id === studentId.value && i != editIndex.value
    );

    if (duplicateId) {
        alert("Student ID already exists.");
        return;
    }

    const student = {
        id: studentId.value,
        lname: lname.value,
        fname: fname.value,
        mname: mname.value,
        birthdate: birthdate.value,
        course: course.value,
        year: year.value
    };

    if (editIndex.value === "") {
        students.push(student);
    } else {
        students[editIndex.value] = student;
        btnSave.innerText = "Add Student";
        editIndex.value = "";
    }

    clearForm();
    displayStudents();
}

/* DISPLAY TABLE */
function displayStudents() {
    table.innerHTML = "";
    const keyword = search.value.toLowerCase();

    students.forEach((s, i) => {
        const fullName = `${s.lname}, ${s.fname} ${s.mname}`;
        if (!fullName.toLowerCase().includes(keyword)) return;

        const age = calculateAge(s.birthdate);
        const row = document.createElement("tr");
        if (age < 18) row.classList.add("minor");

        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${s.id}</td>
            <td>${fullName}</td>
            <td>${age}</td>
            <td>${s.course}</td>
            <td>${s.year}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${i})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${i})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });
}

/* EDIT */
function editStudent(index) {
    const s = students[index];
    studentId.value = s.id;
    lname.value = s.lname;
    fname.value = s.fname;
    mname.value = s.mname;
    birthdate.value = s.birthdate;
    course.value = s.course;
    year.value = s.year;
    editIndex.value = index;
    btnSave.innerText = "Update Student";
}

/* DELETE */
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        displayStudents();
    }
}

/* SORT */
function sortStudents() {
    students.sort((a, b) => a.lname.localeCompare(b.lname));
    displayStudents();
}

/* CLEAR FORM */
function clearForm() {
    studentId.value =
    lname.value =
    fname.value =
    mname.value =
    birthdate.value =
    course.value =
    year.value = "";
}
