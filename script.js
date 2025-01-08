let currentDisplay = '0';

const buttons = document.querySelectorAll('button');
for (i=0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        populateDisplay(event.target.id);
    })
};

let num1 = 0;
let num2 = 0;
let operator = '';

function populateDisplay (value) {
    if (currentDisplay === '0') {
        //replace placeholder (0) if that's the only value
        document.getElementById("display").textContent = value;
    } else if (value === 'clear') {
        //reset display to 0 when "clear" button is clicked
        document.getElementById("display").textContent = '0';
    } else {
        //else add to current value
        document.getElementById("display").textContent += value;
    }
    //update currentDisplay variable
    currentDisplay = document.getElementById("display").textContent;
}


function operate (n1, n2, op) {
    switch(op) {
        case '+':
            return add (n1, n2);
        case '-':
            return subtract (n1, n2);
        case '*':
            return multiply (n1, n2);
        case '/':
            return divide (n1, n2);
    }
}

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}
