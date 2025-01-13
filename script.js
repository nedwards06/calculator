let currDisplay = '0';
let num1 = 0;
let num2 = 0;
let operator = '';
let calculatedDisplay = 1;

const BUILDING_FIRST_NUMBER = 1;
const BUILDING_SECOND_NUMBER = 2;

let currStatus = BUILDING_FIRST_NUMBER;

function processInput(input) {

    switch (input) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            // process a number
            // if we're at 0 or building 2nd num, 
            // replace it with the number pressed
            if (calculatedDisplay === 1 || currStatus === BUILDING_SECOND_NUMBER) {
                
                //forget the initial display value
                calculatedDisplay = 0;

                //store input and use it to replace current display
                currDisplay = input;                
                document.getElementById('display').textContent = currDisplay;
            } else { 

                //append number pressed to display
                currDisplay += input;
                document.getElementById('display').textContent = currDisplay;
                calculatedDisplay = 0;
            }
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            operator = input;

            if (currStatus === BUILDING_FIRST_NUMBER) {
                num1 = currDisplay;
                calculatedDisplay = 0;
                currStatus = BUILDING_SECOND_NUMBER;
            } else {     //assume building the second number
                num2 = currDisplay;
                currDisplay = operate(Number(num1), Number(num2), operator);
                document.getElementById('display').textContent = currDisplay;
                num1 = currDisplay;
                num2 = 0;
                operator = '';
                currStatus = BUILDING_FIRST_NUMBER;
                calculatedDisplay = 1;
            }
           break;
        case '=':
            
            if (currStatus === BUILDING_FIRST_NUMBER) {
                break;
            } else {    //assume I have an operator

                num2 = currDisplay;

                if (num2 === '0' && operator === '/') {
                    alert("Nice try! You can't divide by 0, dummy.");
                    break;
                }

                currDisplay = operate(Number(num1), Number(num2), operator);
                document.getElementById('display').textContent = currDisplay;
                num1 = currDisplay;
                num2 = 0;
                operator = '';
                currStatus = BUILDING_FIRST_NUMBER;
                calculatedDisplay = 1;
            }
    }
}






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

document.getElementById('*').addEventListener('click', (event) => {
    operatorPress('*');
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

    processInput(num);

}

function operatorPress(op) {

    processInput(op);

}

function equalPress() {
    
    processInput('=');

}

function clearPress() {
    num1 = '0';
    num2 = '0';
    operator = '';
    currDisplay = '0';
    document.getElementById('display').textContent = currDisplay;
    calculatedDisplay = 1;
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
