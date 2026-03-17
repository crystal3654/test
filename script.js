const currentEl = document.getElementById("current");
const historyEl = document.getElementById("history");
const keyContainer = document.querySelector(".keys");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetScreen = false;
let historyText = "";
let lastOperator = null;
let lastOperand = null;

const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  const text = String(value);
  if (!text.includes(".")) {
    return text;
  }

  return String(parseFloat(text));
}

function updateDisplay() {
  currentEl.textContent = currentInput;
  historyEl.textContent = historyText;
}

function clearAll() {
  currentInput = "0";
  previousInput = null;
  operator = null;
  shouldResetScreen = false;
  historyText = "";
  lastOperator = null;
  lastOperand = null;
  updateDisplay();
}

function deleteOne() {
  if (shouldResetScreen || currentInput === "Error") {
    clearAll();
    return;
  }

  currentInput = currentInput.length <= 1 ? "0" : currentInput.slice(0, -1);
  updateDisplay();
}

function appendNumber(number) {
  if (currentInput === "Error") {
    clearAll();
  }

  if (shouldResetScreen) {
    currentInput = "0";
    shouldResetScreen = false;
  }

  if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

function appendDecimal() {
  if (currentInput === "Error") {
    clearAll();
  }

  if (shouldResetScreen) {
    currentInput = "0";
    shouldResetScreen = false;
  }

  if (currentInput.includes(".")) {
    return;
  }

  currentInput += ".";
  updateDisplay();
}

function calculateResult(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return null;
      }
      return a / b;
    default:
      return b;
  }
}

function compute() {
  if (operator === null || previousInput === null) {
    if (lastOperator && lastOperand !== null && shouldResetScreen && currentInput !== "Error") {
      const first = parseFloat(currentInput);
      const second = parseFloat(lastOperand);
      const result = calculateResult(first, second, lastOperator);

      if (result === null) {
        currentInput = "Error";
        historyText = "0除算エラー";
        shouldResetScreen = true;
        updateDisplay();
        return;
      }

      historyText = `${formatNumber(first)} ${operatorSymbols[lastOperator]} ${formatNumber(second)} =`;
      currentInput = formatNumber(result);
      shouldResetScreen = true;
      updateDisplay();
    }
    return;
  }

  if (shouldResetScreen) {
    return;
  }

  const first = parseFloat(previousInput);
  const second = parseFloat(currentInput);
  const result = calculateResult(first, second, operator);

  if (result === null) {
    currentInput = "Error";
    previousInput = null;
    operator = null;
    shouldResetScreen = true;
    historyText = "0除算エラー";
    updateDisplay();
    return;
  }

  historyText = `${formatNumber(first)} ${operatorSymbols[operator]} ${formatNumber(second)} =`;
  lastOperator = operator;
  lastOperand = formatNumber(second);

  currentInput = formatNumber(result);
  previousInput = currentInput;
  operator = null;
  shouldResetScreen = true;
  updateDisplay();
}

function chooseOperator(nextOperator) {
  if (currentInput === "Error") {
    clearAll();
    return;
  }

  if (operator && shouldResetScreen) {
    operator = nextOperator;
    historyText = `${formatNumber(previousInput)} ${operatorSymbols[operator]}`;
    updateDisplay();
    return;
  }

  if (operator && previousInput !== null) {
    compute();
  }

  previousInput = currentInput;
  operator = nextOperator;
  shouldResetScreen = true;
  historyText = `${formatNumber(previousInput)} ${operatorSymbols[operator]}`;
  updateDisplay();
}

function handleAction(action, value) {
  switch (action) {
    case "number":
      appendNumber(value);
      break;
    case "decimal":
      appendDecimal();
      break;
    case "operator":
      chooseOperator(value);
      break;
    case "calculate":
      compute();
      break;
    case "all-clear":
      clearAll();
      break;
    case "delete":
      deleteOne();
      break;
    default:
      break;
  }
}

keyContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  handleAction(button.dataset.action, button.dataset.value);
});

document.addEventListener("keydown", (event) => {
  const { key } = event;

  if (/^[0-9]$/.test(key)) {
    handleAction("number", key);
    return;
  }

  if (key === ".") {
    handleAction("decimal");
    return;
  }

  if (["+", "-", "*", "/"].includes(key)) {
    handleAction("operator", key);
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    handleAction("calculate");
    return;
  }

  if (key === "Backspace") {
    handleAction("delete");
    return;
  }

  if (key === "Delete" || key.toLowerCase() === "c") {
    handleAction("all-clear");
  }
});

updateDisplay();
