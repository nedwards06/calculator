let num1 = 0;
let num2 = 0;
let operator = '';

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
