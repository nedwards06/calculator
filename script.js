let currDisplay = '0';
let num1 = 0;
let num2 = 0;
let operator = '';

const BUILD_NUM1_NOT_STARTED = 1;
const BUILD_NUM1_STARTED = 2;
const BUILD_NUM2_NOT_STARTED_OP_PRESSED = 3;
const BUILD_NUM2_STARTED = 4;
const DISPLAY_RESULT = 5;

let currStep = BUILD_NUM1_NOT_STARTED;

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
            if (shouldReplaceDisplay(input)) {
                replaceDisplay(input);
                moveToNextStep(input);
                break;
            } else {
                appendToDisplay(input);
                //stay on current step
                break;
            }
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            if (shouldReplaceOperator()) {
                operator = input;
                // stay on current step
                break;
            }

            if (shouldOperate()) {
                
                //If user pushed an operator after already 
                //having pushed one without pushing "=",
                //need to operate based
                //on current display (second number)
                if (currStep === BUILD_NUM2_STARTED) {
                    num2 = currDisplay;
                }
                
                let result = operate(num1, num2, operator);
                replaceDisplay(result);
            }

            // The following always happens whether or not we operated
            num1 = currDisplay;
            operator = input;
            moveToNextStep(input);
            break;    

        case '=':      
            
            if (currStep === BUILD_NUM1_NOT_STARTED || 
                currStep === BUILD_NUM1_STARTED || 
                currStep === BUILD_NUM2_NOT_STARTED_OP_PRESSED ||
                operator === '') {
                break;
            } else {    //assume I have an operator

                if (currStep === BUILD_NUM2_NOT_STARTED_OP_PRESSED ||
                    currStep === BUILD_NUM2_STARTED) {
                    num2 = currDisplay;
                }
                
                if ((num1 === '0' || num2 === '0') && (operator === '/')) {
                    alert("You can't divide by zero, dummy!");
                    clearPress();
                    break;
                }

                result = operate(num1, num2, operator);
                replaceDisplay(result);
                num1 = currDisplay;
                num2 = 0;
                operator = '';
                currStep = DISPLAY_RESULT;
            }
    }
}


function shouldOperate() {
    return (currStep === BUILD_NUM2_STARTED ||
            currStep === BUILD_NUM2_NOT_STARTED_OP_PRESSED
    );
}

function shouldReplaceOperator() {
    return (currStep === BUILD_NUM2_NOT_STARTED_OP_PRESSED);
}

function shouldReplaceDisplay(input) {
    if (currStep === BUILD_NUM1_NOT_STARTED ||
        currStep === BUILD_NUM2_NOT_STARTED_OP_PRESSED ||
        currStep === DISPLAY_RESULT) {
        return true;
    } else {
        return false;
    }
}

function replaceDisplay(input) {
    currDisplay = input;
    document.getElementById('display').textContent = currDisplay;
}

function appendToDisplay(input) {
    currDisplay += input;
    document.getElementById('display').textContent = currDisplay;
}

function moveToNextStep(input) {
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
            switch (currStep) {
                case BUILD_NUM1_NOT_STARTED:
                    currStep = BUILD_NUM1_STARTED;
                    break;
                case BUILD_NUM1_STARTED:
                    currStep = BUILD_NUM2_NOT_STARTED_OP_PRESSED;
                    break;
                case BUILD_NUM2_NOT_STARTED_OP_PRESSED:
                    currStep = BUILD_NUM2_STARTED;
                    break;
                case DISPLAY_RESULT:
                    currStep = BUILD_NUM1_STARTED;
                    break;
            }
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            switch (currStep) {
                case BUILD_NUM1_NOT_STARTED:
                case BUILD_NUM1_STARTED:
                case BUILD_NUM2_STARTED:
                case DISPLAY_RESULT:
                    currStep = BUILD_NUM2_NOT_STARTED_OP_PRESSED;
                    break;   
            }
            break;
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
    currStep = BUILD_NUM1_NOT_STARTED;
}

function operate (n1, n2, op) {
    
    let result = 0;

    switch(op) {
        case '+':
            result = add(n1, n2);
            break;
        case '-':
            result = subtract(n1, n2);
            break;
        case '*':
            result = multiply(n1, n2);
            break;
        case '/':
            result = divide(n1, n2);
    }

    if ((result % 1) != 0) {
        return result.toFixed(2);
    }
    else {
        return result;
    }
}

function add (a, b) {
    return Number(a) + Number(b);
}

function subtract (a, b) {
    return Number(a) - Number(b);
}

function multiply (a, b) {
    return Number(a) * Number(b);
}

function divide (a, b) {
    return Number(a) / Number(b);
}
