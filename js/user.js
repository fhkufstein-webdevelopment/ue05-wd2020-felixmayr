let userListBody;
let form;
let input;
let feedDiv;
let valid = false; // Form Valid State
let delButtonPress = false; // Delete Button Confirmation Press State

let users = []; // User Array

document.addEventListener("DOMContentLoaded", () => {
    userListBody = document.querySelector('.userList tbody');
    form = document.querySelector('.needs-validation');
    input = form.querySelector('input');
    feedDiv = form.querySelector('.invalid-feedback');


    form.addEventListener('submit', e => {
        e.preventDefault();
        inputCheck(true);
        addUser();
    });

    input.addEventListener('focus', () => {
        inputCheck(false);
    });

    input.addEventListener('keyup', () => {
        feedDiv.innerHTML = "Benutzername darf nicht leer sein!";
        inputCheck(false);
        form.classList.add('was-validated');
    });

    input.addEventListener('focusout', () => {
        form.classList.remove('was-validated'); // Set Form unvalidated
        input.setCustomValidity(""); // Set Input Element valid
    });
});

const inputCheck = (submit) => {
    let inputText = input.value;
    if (submit) {
        if (inputText.length === 0) {
            feedDiv.innerHTML = "Benutzername darf nicht leer sein!"; // Set Error Div Text
            form.classList.add('was-validated'); // Set Form validated
            input.setCustomValidity("Username empty"); // Set Input Element invalid
            valid = false;
        }
    } else {
        if (checkUser(inputText) === false) {
            feedDiv.innerHTML = "Benutzername \"" + inputText + "\" ist bereits vergeben!"; // Set Error Div Text
            form.classList.add('was-validated'); // Set Form validated
            input.setCustomValidity("Username taken"); // Set Input Element invalid
            valid = false;
        } else if (inputText.length > 0 && checkUser(input.value)) {
            input.setCustomValidity(""); // Set Input Element valid
            valid = true;
        }
    }
};

const checkUser = (user) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i] === user) {
            return false;
        }
    }
    return true;
};

const addUser = () => {
    if (valid) {
        users.push(input.value); // Add User to Array
        generateTr(); // Rerender Table
        input.value = ""; // Reset Input field
        form.classList.remove('was-validated'); // Set Form unvalidated
        valid = false;
    }
};

const deleteUser = (i) => {
    if (delButtonPress) {
        users.splice(i, 1); // Remove User from Array
        generateTr(); // Rerender Table
        delButtonPress = false;
    } else {
        document.querySelectorAll('.deleteTrigger')[i].querySelector('i').classList.replace('fa-trash', 'fa-check');
        delButtonPress = true;
    }
};

const generateTr = () => {
    userListBody.innerHTML = ""; // Remove every entity from table
    for (let i = 0; i < users.length; i++) {
        let row = userListBody.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = i + 1;
        cell2.innerHTML = users[i];
        cell3.innerHTML = `<button type="button" class="btn btn-secondary btn-danger deleteTrigger" title="Löschen" onclick="deleteUser(${i})"><i class="fa fa-trash"></i></button>`;
    }
};
