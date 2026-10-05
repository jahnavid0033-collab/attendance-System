/* ================= DATA ================= */

let students =
    JSON.parse(localStorage.getItem("students")) || [];

let subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];

let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];


/* ================= LOGIN ================= */

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const role =
        document.getElementById("role").value;


    if (username === "" || password === "") {

        alert("Please enter username and password.");

        return;
    }


    document.getElementById("loginPage").style.display =
        "none";

    document.getElementById("app").style.display =
        "block";


    if (role === "student") {

        document.getElementById("studentDashboard")
            .style.display = "block";

        document.getElementById("facultyDashboard")
            .style.display = "none";

        loadStudentDashboard();

        loadOtherStudents();

    } else {

        document.getElementById("studentDashboard")
            .style.display = "none";

        document.getElementById("facultyDashboard")
            .style.display = "block";

        loadFacultyData();
    }
}


/* ================= LOGOUT ================= */

function logout() {

    document.getElementById("app").style.display =
        "none";

    document.getElementById("loginPage").style.display =
        "flex";

    document.getElementById("username").value = "";

    document.getElementById("password").value = "";
}


/* ================= ADD STUDENT ================= */

function addStudent() {

    const name =
        document.getElementById("studentName")
            .value.trim();

    const roll =
        document.getElementById("rollNumber")
            .value.trim();

    const branch =
        document.getElementById("branch")
            .value.trim();

    const section =
        document.getElementById("section")
            .value.trim();


    if (name === "" || roll === "") {

        alert(
            "Please enter student name and roll number."
        );

        return;
    }


    const student = {

        id: Date.now(),

        name: name,

        roll: roll,

        branch: branch,

        section: section
    };


    students.push(student);


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    document.getElementById("studentName").value = "";

    document.getElementById("rollNumber").value = "";

    document.getElementById("branch").value = "";

    document.getElementById("section").value = "";


    loadFacultyData();


    alert("Student added successfully.");
}


/* ================= DELETE STUDENT ================= */

function deleteStudent(id) {

    if (!confirm("Delete this student?")) {
        return;
    }


    students =
        students.filter(
            student => student.id != id
        );


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    loadFacultyData();
}


/* ================= ADD SUBJECT ================= */

function addSubject() {

    const name =
        document.getElementById("subjectName")
            .value.trim();

    const code =
        document.getElementById("subjectCode")
            .value.trim();

    const type =
        document.getElementById("subjectType")
            .value;

    const periods =
        document.getElementById("periods")
            .value;


    if (name === "") {

        alert("Please enter subject name.");

        return;
    }


    const subject = {

        id: Date.now(),

        name: name,

        code: code,

        type: type,

        periods: periods
    };


    subjects.push(subject);


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    document.getElementById("subjectName").value = "";

    document.getElementById("subjectCode").value = "";

    document.getElementById("periods").value = "";


    loadFacultyData();


    alert("Subject added successfully.");
}


/* ================= DELETE SUBJECT ================= */

function deleteSubject(id) {

    if (!confirm("Delete this subject?")) {
        return;
    }


    subjects =
        subjects.filter(
            subject => subject.id != id
        );


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    loadFacultyData();
}


/* ================= FACULTY DATA ================= */

function loadFacultyData() {

    loadStudents();

    loadSubjects();

    loadAttendanceOptions();

    loadAttendanceTable();
}


/* ================= STUDENT TABLE ================= */

function loadStudents() {

    const table =
        document.getElementById("studentTable");


    table.innerHTML = "";


    students.forEach(student => {

        table.innerHTML += `

            <tr>

                <td>${student.name}</td>

                <td>${student.roll}</td>

                <td>${student.branch}</td>

                <td>${student.section}</td>

                <td>

                    <button
                        class="delete"
                        onclick="deleteStudent(${student.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


/* ================= SUBJECT TABLE ================= */

function loadSubjects() {

    const table =
        document.getElementById("subjectTable");


    table.innerHTML = "";


    subjects.forEach(subject => {

        table.innerHTML += `

            <tr>

                <td>${subject.name}</td>

                <td>${subject.code}</td>

                <td>${subject.type}</td>

                <td>${subject.periods}</td>

                <td>

                    <button
                        class="delete"
                        onclick="deleteSubject(${subject.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


/* ================= ATTENDANCE OPTIONS ================= */

function loadAttendanceOptions() {

    const studentSelect =
        document.getElementById(
            "attendanceStudent"
        );

    const subjectSelect =
        document.getElementById(
            "attendanceSubject"
        );


    studentSelect.innerHTML =
        `<option value="">Select Student</option>`;


    subjectSelect.innerHTML =
        `<option value="">Select Subject</option>`;


    students.forEach(student => {

        studentSelect.innerHTML += `

            <option value="${student.id}">

                ${student.name} - ${student.roll}

            </option>
        `;
    });


    subjects.forEach(subject => {

        subjectSelect.innerHTML += `

            <option value="${subject.id}">

                ${subject.name}

            </option>
        `;
    });
}


/* ================= MARK ATTENDANCE ================= */

function markAttendance() {

    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    const studentId =
        document.getElementById(
            "attendanceStudent"
        ).value;


    const subjectId =
        document.getElementById(
            "attendanceSubject"
        ).value;


    const period =
        document.getElementById(
            "attendancePeriod"
        ).value;


    const status =
        document.getElementById(
            "attendanceStatus"
        ).value;


    if (
        date === "" ||
        studentId === "" ||
        subjectId === ""
    ) {

        alert(
            "Please select all attendance details."
        );

        return;
    }


    const record = {

        id: Date.now(),

        date: date,

        studentId: studentId,

        subjectId: subjectId,

        period: period,

        status: status
    };


    attendance.push(record);


    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );


    loadAttendanceTable();


    alert("Attendance saved successfully.");
}


/* ================= ATTENDANCE TABLE ================= */

function loadAttendanceTable() {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    table.innerHTML = "";


    attendance.forEach(record => {

        const student =
            students.find(
                student =>
                    student.id == record.studentId
            );


        const subject =
            subjects.find(
                subject =>
                    subject.id == record.subjectId
            );


        if (!student || !subject) {
            return;
        }


        table.innerHTML += `

            <tr>

                <td>${record.date}</td>

                <td>${student.name}</td>

                <td>${subject.name}</td>

                <td>${record.period}</td>

                <td class="${
                    record.status === "Present"
                        ? "present"
                        : "absent"
                }">

                    ${record.status}

                </td>

            </tr>
        `;
    });
}


/* ================= STUDENT DASHBOARD ================= */

function loadStudentDashboard() {

    const table =
        document.getElementById(
            "studentSubjectTable"
        );


    table.innerHTML = "";


    let theoryTotal = 0;

    let theoryPresent = 0;

    let labTotal = 0;

    let labPresent = 0;


    subjects.forEach(subject => {

        const subjectRecords =
            attendance.filter(
                record =>
                    record.subjectId == subject.id
            );


        const total =
            subjectRecords.length;


        const present =
            subjectRecords.filter(
                record =>
                    record.status === "Present"
            ).length;


        const percentage =
            total === 0
                ? 0
                : ((present / total) * 100)
                    .toFixed(2);


        if (subject.type === "Theory") {

            theoryTotal += total;

            theoryPresent += present;

        } else {

            labTotal += total;

            labPresent += present;
        }


        table.innerHTML += `

            <tr>

                <td>${subject.name}</td>

                <td>${subject.type}</td>

                <td>${present}</td>

                <td>${total}</td>

                <td>${percentage}%</td>

            </tr>
        `;
    });


    const theoryPercentage =
        theoryTotal === 0
            ? 0
            : ((theoryPresent / theoryTotal) * 100)
                .toFixed(2);


    const labPercentage =
        labTotal === 0
            ? 0
            : ((labPresent / labTotal) * 100)
                .toFixed(2);


    const totalAttendance =
        theoryTotal + labTotal;


    const totalPresent =
        theoryPresent + labPresent;


    const overallPercentage =
        totalAttendance === 0
            ? 0
            : ((totalPresent / totalAttendance) * 100)
                .toFixed(2);


    document.getElementById("overall")
        .innerText =
        overallPercentage + "%";


    document.getElementById("theory")
        .innerText =
        theoryPercentage + "%";


    document.getElementById("lab")
        .innerText =
        labPercentage + "%";
}


/* ================= OTHER STUDENTS ================= */

function loadOtherStudents() {

    const select =
        document.getElementById(
            "otherStudent"
        );


    select.innerHTML =
        `<option value="">Select Student</option>`;


    students.forEach(student => {

        select.innerHTML += `

            <option value="${student.id}">

                ${student.name} - ${student.roll}

            </option>
        `;
    });
}


/* ================= VIEW OTHER STUDENT ================= */

function viewOtherStudent() {

    const studentId =
        document.getElementById(
            "otherStudent"
        ).value;


    const result =
        document.getElementById(
            "otherStudentResult"
        );


    if (studentId === "") {

        result.innerHTML = "";

        return;
    }


    const student =
        students.find(
            student =>
                student.id == studentId
        );


    if (!student) {
        return;
    }


    const records =
        attendance.filter(
            record =>
                record.studentId == studentId
        );


    const total =
        records.length;


    const present =
        records.filter(
            record =>
                record.status === "Present"
        ).length;


    const percentage =
        total === 0
            ? 0
            : ((present / total) * 100)
                .toFixed(2);


    result.innerHTML = `

        <div class="card other-result">

            <h3>${student.name}</h3>

            <p>Roll Number: ${student.roll}</p>

            <p>Branch: ${student.branch}</p>

            <p>Section: ${student.section}</p>

            <br>

            <h3>
                Attendance: ${percentage}%
            </h3>

            <p>
                Present: ${present} / ${total}
            </p>

        </div>
    `;
}


/* ================= PAGE LOAD ================= */

window.onload = function () {

    loadStudents();

    loadSubjects();

    loadOtherStudents();
};