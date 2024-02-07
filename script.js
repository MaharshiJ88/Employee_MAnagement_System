let form = document.getElementById("form");
let recordContainer = document.getElementById("records_section");
let createButton = document.querySelector(".button");
let formState = "CREATE";

let autoGnrtId = 1000;
let employeesList = [];

const onSubmitForm = (event) => {
    event.preventDefault();
    let employee = {
        employeeId: ++autoGnrtId,
        name: form.name.value,
        salary: form.salary.value,
        team: form.team.value,
        role: form.role.value,
        companyName: form.companyName.value 
    }
    if (formState === "CREATE"){
        addNewEmployeeRecord(employee);
    }
    else if (formState === "UPDATE"){
        formState = "CREATE";
        createButtoninnerText = "Create Employee"; 
    }
    form.reset();
}

function deleteRecord (event) {
    if (formState === "UPDATE"){
        alert("Please update the record before deleting anything");
        return;
    }

    let deleteButton = event.target;
    let record = deleteButton.parentNode.parentNode;
    record.remove();

    let currentEmployeeId = parseInt(deleteButton.getAttribute("data-autoGnrtId"));

    for (let i = 0; i<employeesList.length; i++){
        if (employeesList[i].employeeId === currentEmployeeId){
            employeesList.splice(i, 1);
            break;
        }
    }
}

function fillFormWithData (employee) {
    for (let key in employee) {
        if (key !== "employeeId") {
            form[key].value = employee[key];
        }
    }
    createButton.innerText = "Update Employee";
    formState = "UPDATE";
}

function editRecord (event) {
    let editButton = event.target;
    let currentEmployeeId = parseInt(editButton.getAttribute("data-autoGnrtId"));
    
    for (let i = 0; i < employeesList.length; i++){
        if (currentEmployeeId === employeesList[i].employeeId){
            fillFormWithData(employeesList[i]);
            break;
        }
    }
}

function addNewEmployeeRecord (employee) {
    let record = document.createElement("tr");
    for (let key in employee) {
        let tableCell = document.createElement("td");
        tableCell.innerText = employee[key];
        record.appendChild(tableCell);
    }
    let optionsCell = document.createElement("td");

    let editIcon = document.createElement("span");
    editIcon.className = "material-icons icon";
    editIcon.innerText = "edit";
    editIcon.setAttribute("data-autoGnrtId", employee.employeeId);
    editIcon.addEventListener("click", editRecord);

    let deleteIcon = document.createElement("span");
    deleteIcon.className = "material-icons icon";
    deleteIcon.innerText = "delete";
    deleteIcon.setAttribute("data-autoGnrtId", employee.employeeId);
    deleteIcon.addEventListener("click", deleteRecord);
    
    optionsCell.append(editIcon, deleteIcon);
    record.appendChild(optionsCell);
    recordContainer.appendChild(record);

    employeesList.push(employee);
}
form.addEventListener("submit", onSubmitForm);

