let currentDisplay = '0';
let num1 = 0;
let num2 = 0;
let operator = '';
let equalAlready = false;


//call functions to handle operator press
document.getElementById('+').addEventListener('click', (event) => {
    operatorPress('+');
}
);

document.getElementById('-').addEventListener('click', (event) => {
    operatorPress('-');
}
);

document.getElementById('/').addEventListener('click', (event) => {
    operatorPress('/');
}
);

//call function to handle number press
for (i=0; i<10; i++) {
    document.getElementById(i).addEventListener('click', (event) => {
        numberPress(event.target.id);
    });
}

//call function to handle equal sign press
document.getElementById('=').addEventListener('click', (event) => {
    equalPress();
});

//call function to handle clear press
document.getElementById('clear').addEventListener('click', (event) => {
    clearPress();
});


function numberPress(num) {

    //start over if equal has already been pushed; else append
    if (equalAlready) {
        currentDisplay = num;
    } else {
        currentDisplay === '0' ? currentDisplay = num : currentDisplay += num;
    }
  
    document.getElementById('display').textContent = currentDisplay;


}

function operatorPress(op) {

    //store operator
    operator = op;
    
    //store current number
    num1 = Number(currentDisplay);
        
    //now that the first number has been stored, update currentDisplay
    //so that it forgets the first number and is ready to work with
    //the second number
    currentDisplay = '';

    //display the HTML divide symbol if '/' is the operator
    if (op === '/') {
        op = "&divide";
    }
    
    document.getElementById('display').innerHTML = op;
}

function equalPress() {
    
    //don't do anything if the user hasn't pressed an
    //operator button yet
    if (!operator) {
        return;
    }

    //store current number
    num2 = Number(currentDisplay);

    //operate on the two numbers
    currentDisplay = operate(num1, num2, operator);
    
    //display result
    document.getElementById('display').textContent = currentDisplay;

    //reset starting values in preparation for another number press
    num1 = currentDisplay;
    num2 = '0';
    operator = '';
    
    //remember that equals has been pushed so that if the user pushes 
    //another number at this point, we start over with that new number
    equalAlready = true;
}

function clearPress() {
    num1 = '0';
    num2 = '0';
    operator = '';
    currentDisplay = '0';
    equalAlready = false;
    document.getElementById('display').textContent = currentDisplay;
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
