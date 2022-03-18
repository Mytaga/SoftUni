function solve() {

    let firstNameField = document.getElementById('fname');
    let lastNameField = document.getElementById('lname');
    let emailField = document.getElementById('email');
    let birthField = document.getElementById('birth');
    let positionField = document.getElementById('position');
    let salaryField = document.getElementById('salary');
    let hireButton = document.getElementById('add-worker');
    let tableElement = document.getElementById('tbody');
    let sumElement = document.getElementById('sum');
   
   

    hireButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (firstNameField.value == '' || lastNameField.value == '' || emailField.value == '' || birthField.value == ''
        || positionField.value == '' || salaryField.value == ''){
            return;
        }

        let tableRowElement = document.createElement('tr');
        let tableFirstNameElement = document.createElement('td');
        tableFirstNameElement.textContent = firstNameField.value;
        let tableLastNameElement = document.createElement('td');
        tableLastNameElement.textContent = lastNameField.value;
        let tableEmailElement = document.createElement('td');
        tableEmailElement.textContent = emailField.value;
        let tableBirthElement = document.createElement('td');
        tableBirthElement.textContent = birthField.value;
        let tablePositionElement = document.createElement('td');
        tablePositionElement.textContent = positionField.value;
        let tableSalaryElement = document.createElement('td');
        tableSalaryElement.textContent = Number(salaryField.value);
        let tableButtonsElement = document.createElement('td');
        let firedButtonElement = document.createElement('button');
        firedButtonElement.classList = 'fired';
        firedButtonElement.textContent = 'Fired';
        let editButtonElement = document.createElement('button');
        editButtonElement.classList = 'edit';
        editButtonElement.textContent = 'Edit';
        tableButtonsElement.appendChild(firedButtonElement);
        tableButtonsElement.appendChild(editButtonElement);
        tableRowElement.appendChild(tableFirstNameElement);
        tableRowElement.appendChild(tableLastNameElement);
        tableRowElement.appendChild(tableEmailElement);
        tableRowElement.appendChild(tableBirthElement);
        tableRowElement.appendChild(tablePositionElement);
        tableRowElement.appendChild(tableSalaryElement);
        tableRowElement.appendChild(tableButtonsElement);
        tableElement.appendChild(tableRowElement);

        firstNameField.value = '';
        lastNameField.value = '';
        emailField.value = '';
        birthField.value = '';
        positionField.value = '';
        salaryField.value = ''; 
        
        
        let totalBudget = Number(sumElement.textContent);
        totalBudget += Number(tableSalaryElement.textContent);
        sumElement.textContent = totalBudget.toFixed(2);

        editButtonElement.addEventListener('click', (ev) => {
            ev.preventDefault();
            firstNameField.value = ev.currentTarget.parentElement.parentElement.children[0].textContent;
            lastNameField.value = ev.currentTarget.parentElement.parentElement.children[1].textContent;
            emailField.value = ev.currentTarget.parentElement.parentElement.children[2].textContent;
            birthField.value = ev.currentTarget.parentElement.parentElement.children[3].textContent;
            positionField.value = ev.currentTarget.parentElement.parentElement.children[4].textContent;
            salaryField.value = ev.currentTarget.parentElement.parentElement.children[5].textContent;

            let budget = Number(sumElement.textContent)
            budget -= Number(ev.currentTarget.parentElement.parentElement.children[5].textContent)
            sumElement.textContent = budget.toFixed(2);
            ev.currentTarget.parentElement.parentElement.remove(); 
        });

        firedButtonElement.addEventListener('click', (ev) => {
            ev.preventDefault();
            let budget = Number(sumElement.textContent)
            budget -= Number(ev.currentTarget.parentElement.parentElement.children[5].textContent);
            sumElement.textContent = budget.toFixed(2);
            ev.currentTarget.parentElement.parentElement.remove();
        })
    })

};

solve();