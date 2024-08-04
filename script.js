// Initialize variables
let firstNumber = null;
let operator = null;
let displayValue = '';
let waitingForSecondNumber = false;

// Get the display element
const display = document.getElementById('display');

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle number button clicks
function handleNumberClick(event) {
    const number = event.target.textContent;
    
    // If we're waiting for the second number, reset displayValue
    if (waitingForSecondNumber) {
        displayValue = number;
        waitingForSecondNumber = false;
    } else {
        displayValue += number;
    }
    
    // Update the display
    updateDisplay(displayValue);
}

// Function to handle operator button clicks
function handleOperatorClick(event) {
    // If no number has been entered yet, ignore the operator button
    if (displayValue === '' && operator === null) return;

    // Calculate if there is an existing operator
    if (operator && !waitingForSecondNumber) {
        const result = operate(operator, firstNumber, parseFloat(displayValue));
        displayValue = String(result);
        // Check for division by zero
        if (displayValue.includes("Error")) {
            updateDisplay(displayValue);
            return;
        }
        updateDisplay(displayValue);
        firstNumber = parseFloat(displayValue);
    } else {
        firstNumber = parseFloat(displayValue);
    }
    
    operator = event.target.textContent;
    waitingForSecondNumber = true;
}

// Function to handle the equals button click
function handleEqualsClick() {
    if (operator && !waitingForSecondNumber) {
        const result = operate(operator, firstNumber, parseFloat(displayValue));
        displayValue = String(Math.round(result * 100) / 100); // Round result to 2 decimal places
        updateDisplay(displayValue);
        firstNumber = parseFloat(displayValue);
        operator = null;
        waitingForSecondNumber = false;
    } else if (displayValue !== '') {
        // If equals is pressed without an operator, just display the current value
        updateDisplay(displayValue);
    }
}

// Function to clear the display
function clearDisplay() {
    displayValue = '';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay('0');
}

// Define the operate function
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0) {
                return "Error: Can't divide by zero!";
            }
            return divide(num1, num2);
        default:
            return "Error: Unknown operator";
    }
}

// Define basic arithmetic functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Attach event listeners to number buttons
document.querySelectorAll('.buttons button').forEach(button => {
    if (!isNaN(button.textContent) || button.textContent === '.') {
        button.addEventListener('click', handleNumberClick);
    }
});

// Attach event listeners to operator buttons
document.querySelectorAll('.buttons button.operator').forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

// Attach event listener to the equals button
document.querySelector('.buttons button.double.operator').addEventListener('click', handleEqualsClick);

// Attach event listener to the clear button
document.querySelector('.clear').addEventListener('click', clearDisplay);
