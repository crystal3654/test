const screen = document.getElementById("screen");
const history = document.getElementById("history");
const keys = document.querySelector(".keys");

const state = {
  currentInput: "0",
  storedValue: null,
  operator: null,
  shouldResetInput: false,
  error: false,
};

const operatorLabel = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  return Number.isInteger(value)
    ? value.toString()
    : parseFloat(value.toFixed(12)).toString();
}

function updateDisplay() {
  screen.textContent = state.currentInput;
  if (state.operator && state.storedValue !== null) {
    history.textContent = `${formatNumber(state.storedValue)} ${operatorLabel[state.operator]}`;
  } else {
    history.textContent = "\u00A0";
  }
}

function resetAll() {
  state.currentInput = "0";
  state.storedValue = null;
  state.operator = null;
  state.shouldResetInput = false;
  state.error = false;
  updateDisplay();
}

function clearEntry() {
  state.currentInput = "0";
  state.shouldResetInput = false;
  state.error = false;
  updateDisplay();
}

function backspace() {
  if (state.error || state.shouldResetInput) {
    clearEntry();
    return;
  }

  state.currentInput =
    state.currentInput.length > 1
      ? state.currentInput.slice(0, -1)
      : "0";
  updateDisplay();
}

function inputNumber(num) {
  if (state.error) {
    resetAll();
  }

  if (state.shouldResetInput) {
    state.currentInput = num;
    state.shouldResetInput = false;
  } else if (state.currentInput === "0") {
    state.currentInput = num;
  } else {
    state.currentInput += num;
  }

  updateDisplay();
}

function inputDecimal() {
  if (state.error) {
    resetAll();
  }

  if (state.shouldResetInput) {
    state.currentInput = "0.";
    state.shouldResetInput = false;
    updateDisplay();
    return;
  }

  if (!state.currentInput.includes(".")) {
    state.currentInput += ".";
    updateDisplay();
  }
}

function calculate(left, right, operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return right === 0 ? null : left / right;
    default:
      return right;
  }
}

function setError() {
  state.currentInput = "Error";
  state.error = true;
  state.storedValue = null;
  state.operator = null;
  state.shouldResetInput = true;
  history.textContent = "0除算はできません";
  screen.textContent = state.currentInput;
}

function inputOperator(nextOperator) {
  if (state.error) {
    return;
  }

  const currentValue = Number(state.currentInput);

  if (state.operator && !state.shouldResetInput) {
    const result = calculate(state.storedValue, currentValue, state.operator);
    if (result === null) {
      setError();
      return;
    }

    state.storedValue = result;
    state.currentInput = formatNumber(result);
  } else if (state.storedValue === null) {
    state.storedValue = currentValue;
  }

  state.operator = nextOperator;
  state.shouldResetInput = true;
  updateDisplay();
}

function inputEquals() {
  if (state.error || state.operator === null || state.storedValue === null) {
    return;
  }

  const currentValue = Number(state.currentInput);
  const result = calculate(state.storedValue, currentValue, state.operator);

  if (result === null) {
    setError();
    return;
  }

  state.currentInput = formatNumber(result);
  state.storedValue = null;
  state.operator = null;
  state.shouldResetInput = true;
  updateDisplay();
}

function handleAction(action, value) {
  switch (action) {
    case "number":
      inputNumber(value);
      break;
    case "decimal":
      inputDecimal();
      break;
    case "operator":
      inputOperator(value);
      break;
    case "equals":
      inputEquals();
      break;
    case "all-clear":
      resetAll();
      break;
    case "clear":
      clearEntry();
      break;
    case "backspace":
      backspace();
      break;
    default:
      break;
  }
}

keys.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const { action, value } = target.dataset;
  handleAction(action, value);
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

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
    handleAction("equals");
    return;
  }

  if (key === "Backspace") {
    handleAction("backspace");
    return;
  }

  if (key === "Delete") {
    handleAction("all-clear");
  }
});

updateDisplay();
