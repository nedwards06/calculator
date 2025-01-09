let currentDisplay = '0';

for (i=0; i<10; i++) {
    document.getElementById(i).addEventListener('click', (event) => {
        numberPress(event.target.id);
    })
};

function numberPress(num) {
    currentDisplay === '0' ? currentDisplay = num : currentDisplay += num;
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
