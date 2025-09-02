// Employee Database Management System (Frontend only)
// Data yahan hardcoded hai, fetch ki zarurat nahi
let employees = [
    {
        id: 1001,
        imageUrl: "gfg.png",
        firstName: "Thomas",
        lastName: "Leannon",
        email: "Thomas.Leannon@gfg.com",
        contactNumber: "4121091095",
        age: 43,
        dob: "1979-08-26",
        salary: 1,
        address: "Address1"
    },
    {
        id: 1002,
        imageUrl: "gfg.png",
        firstName: "Faye",
        lastName: "Sauer",
        email: "Faye.Sauer@gfg.com",
        contactNumber: "4914696673",
        age: 60,
        dob: "1962-06-28",
        salary: 2,
        address: "Address2"
    },
    {
        id: 1003,
        imageUrl: "gfg.png",
        firstName: "Deven",
        lastName: "Halvorson",
        email: "Deven.Halvorson@gfg.com",
        contactNumber: "4479795571",
        age: 29,
        dob: "1993-01-06",
        salary: 3,
        address: "Address3"
    },
    // ...baaki employees bhi isi tarah add kar lo
];

let selectedEmployeeId = employees[0].id;
let selectedEmployee = employees[0];

// DOM elements
const employeeList = document.querySelector(".employees__names--list");
const employeeInfo = document.querySelector(".employees__single--info");

// ---------------- Add Employee Logic ----------------
const createEmployee = document.querySelector(".createEmployee");
const addEmployeeModal = document.querySelector(".addEmployee");
const addEmployeeForm = document.querySelector(".addEmployee_create");

createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
});

addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
        addEmployeeModal.style.display = "none";
    }
});

// Restrict DOB input → Minimum 18 years old
const dobInput = document.querySelector(".addEmployee_create--dob");
dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;

addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((val) => {
        empData[val[0]] = val[1];
    });

    empData.id = employees[employees.length - 1].id + 1;
    empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl = empData.imageUrl || "gfg.png";

    employees.push(empData);

    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
});

// ---------------- Select & Delete Employee ----------------
employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
        selectedEmployeeId = e.target.id;
        renderEmployees();
        renderSingleEmployee();
    }

    if (e.target.tagName === "I") {
        employees = employees.filter((emp) => String(emp.id) !== e.target.parentNode.id);

        if (String(selectedEmployeeId) === e.target.parentNode.id) {
            selectedEmployeeId = employees[0]?.id || -1;
            selectedEmployee = employees[0] || {};
            renderSingleEmployee();
        }

        renderEmployees();
    }
});

// ---------------- Render All Employees ----------------
const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
        const employee = document.createElement("span");
        employee.classList.add("employees__names--item");

        if (parseInt(selectedEmployeeId, 10) === emp.id) {
            employee.classList.add("selected");
            selectedEmployee = emp;
        }

        employee.setAttribute("id", emp.id);
        employee.innerHTML = `${emp.firstName} ${emp.lastName} 
            <i class="employeeDelete">&#10060;</i>`;
        employeeList.append(employee);
    });
};

// ---------------- Render Single Employee ----------------
const renderSingleEmployee = () => {
    if (selectedEmployeeId === -1) {
        employeeInfo.innerHTML = "";
        return;
    }

    employeeInfo.innerHTML = `
    <img src="${selectedEmployee.imageUrl}" />
    <span class="employees__single--heading">
    ${selectedEmployee.firstName} ${selectedEmployee.lastName} 
        (${selectedEmployee.age})
    </span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>Mobile - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob}</span>
  `;
};

// Initial render
renderEmployees();
if (selectedEmployee) renderSingleEmployee();
