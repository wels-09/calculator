const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentInput = "0"
let firstNumber = null
let operator = null
let shouldReset = false

function updateDisplay() {
    display.value = currentInput
}

function calculate(){
    if(firstNumber === null || operator === null){
        return;
    }

const secondNumber = Number(currentInput)
let result;

switch (operator) {
    case "+":
        result = firstNumber + secondNumber;
        break
    case "-": 
        result = firstNumber - secondNumber;
        break
    case "*":
        result = firstNumber * secondNumber
        break
    case "/":
        if(secondNumber === 0){
            currentInput = "Cannot divide by zero";
            firstNumber = null
            operator = null
            shouldReset = true
            updateDisplay();
            return
        }
        result = firstNumber / secondNumber
        break
    }

    currentInput = String(
        Number.isFinite(result)
            ? Number(result.toPrecision(10))
            :"Error"
    )

    firstNumber = null
    operator = null
    shouldReset = true

    updateDisplay()
}

buttons.addEventListener("click", function(event){
        const button = event.target;
        if (button.tagName !== "BUTTON") return;

        if (button.dataset.number !== undefined){
            if(shouldReset || currentInput === "0"){
                currentInput = button.dataset.number
                shouldReset = false;
            } else {
                currentInput += button.dataset.number
        }
        updateDisplay();
    }

    if (button.dataset.action === "decimal"){
        if (shouldReset){
            currentInput = "0"
            shouldReset = false;
        }

        if (!currentInput.includes(".")) {
            currentInput += "."
        }
        updateDisplay()
    }

    if (button.dataset.operator !== undefined){
        if (operator !== null && !shouldReset){
            calculate();
        }

        firstNumber = Number(currentInput);
        operator = button.dataset.operator
        shouldReset = true
    }

    if (button.dataset.action === "equals"){
        calculate()
    }

    if (button.dataset.action === "clear"){
        currentInput = "0"
        firstNumber = null
        operator = null
        shouldReset = false
        updateDisplay()
    }
    if (button.dataset.action === "delete"){
    if(shouldReset){
        currentInput = "0"
        shouldReset = false
    } else {
        currentInput = currentInput.length > 1
        ? currentInput.slice(0, -1)
        : "0"
    }
    updateDisplay()
    }
})