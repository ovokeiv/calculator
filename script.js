const calculator = {
    screenDisplay: '0',
    firstOperand: null,
    ready4SecondOperand: false,
    operator: null,
};

function displayNumberInputs(clickedDigit) {
    const { screenDisplay, ready4SecondOperand } = calculator;

    if (ready4SecondOperand === true) {
        calculator.screenDisplay = clickedDigit;
        calculator.ready4SecondOperand = false;
    } else {
        //if the value of screenDisplay is 0, it appends to it
        calculator.screenDisplay = screenDisplay === '0' ? clickedDigit : screenDisplay + clickedDigit;
    }
}


function displayPeriodInputs(period) {
    if (calculator.ready4SecondOperand === true) {
        calculator.screenDisplay = '0.'
        calculator.ready4SecondOperand = false;
        return;
    }
    //if displayScreen does not already have a dot, append the clicked dot
    if (!calculator.screenDisplay.includes(period)) {
        calculator.screenDisplay += period;
    }
}


function displayOperatorInput(nextOperator) {
    const { firstOperand, screenDisplay, operator } = calculator//Destructure the properties on the calculator object to create new variables names firstOperand, screenDisplay & operator
    const displayValue = parseFloat(screenDisplay);//convert the strings in screenDisplay to floats


    if (operator && calculator.ready4SecondOperand) {
        calculator.operator = nextOperator;
        return;

    }


    if (firstOperand == null && !isNaN(displayValue)) {
        calculator.firstOperand = displayValue;
    } else if (operator) {
        const result = calculate(firstOperand, displayValue, operator);
        calculator.screenDisplay = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.ready4SecondOperand = true;
    calculator.operator = nextOperator;
}



function calculate(firstOperand, ready4SecondOperand, operator) {
    if (operator === '+') {
        return firstOperand + ready4SecondOperand;
    } else if (operator === '-') {
        return firstOperand - ready4SecondOperand;
    } else if (operator === '*') {
        return firstOperand * ready4SecondOperand;
    } else if (operator === '/') {
        return firstOperand / ready4SecondOperand;
    } else if (operator === '%') {
        return firstOperand % ready4SecondOperand;
    }
    return ready4SecondOperand;
}

function resetCalculator() {
    calculator.screenDisplay = '0';
    calculator.firstOperand = null;
    calculator.ready4SecondOperand = false;
    calculator.operator = null;
}

function deleteLastChar() {
    const { screenDisplay } = calculator
    calculator.screenDisplay = screenDisplay.slice(0, -1);
}

function updateScreenDisplay() {
    const display = document.querySelector('.screen');
    // update the value of the input element with the contents of `screenDisplay`
    display.value = calculator.screenDisplay;
}


const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', event => {
    const { target } = event;//equivalent of const target = event.target;
    const { value } = target;//equivalent of const value = target.value;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
        case '%':
            displayOperatorInput(value);
            break;
        case '.':
            displayPeriodInputs(value);
            break;
        case 'AC':
            resetCalculator();
            break;
        case 'back':
            deleteLastChar();
        default:
            // check if the key is an integer
            if (Number.isInteger(parseFloat(value))) {
                displayNumberInputs(value);
            }
    }
    updateScreenDisplay();
});
