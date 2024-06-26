//  ------- CSS DYNAMIC STYLING -------
function elementStyling() {
  // ELEMENT VARIABLES
  const elements = {
    container: document.querySelector(".container"),
    buttonContainer: document.querySelector(".button-container"),
    bigButtonsContainer: document.querySelector(".row.big-keys"),
    rows: document.querySelectorAll(".row"),
    row1: document.querySelector(".row.one"),
    screen: document.querySelector(".screen"),
    buttons: document.querySelectorAll("button"),
    bigButtons: document.querySelectorAll(".big-btn"),
  };
  elements.screenDivs = document.querySelectorAll("div");
  // DIMENSION INITIALIZATION
  const dimensions = {
    width: 200,
    height: 250,
    gap: 4,
  };

  // ALL FUNCTIONS
  function setStyles(element, styles) {
    for (const property in styles) {
      element.style[property] = styles[property];
    }
  }

  function multiSetStyle(elements, styles) {
    [...elements].forEach((element) => {
      setStyles(element, styles);
      console.log(element, styles);
    });
  }
  function countDivsInClass(parentElement, className) {
    if (!parentElement) {
      console.error("Parent element is not provided or does not exist.");
      return 0;
    }

    const divElements = parentElement.querySelectorAll(`div.${className}`);
    return divElements.length;
  }

  function countAllChildElements(parentElement) {
    if (!parentElement) {
      console.error("Parent element is not provided or does not exist.");
      return 0;
    }
    return parentElement.children.length;
  }

  // Calculate new dimensions after defining initial dimensions
  const numberOfRows = countDivsInClass(elements.buttonContainer, "row");
  const numberOfColumns = countAllChildElements(elements.row1);
  console.log(numberOfColumns);

  dimensions.buttonWidth =
    (dimensions.width - dimensions.gap * (numberOfColumns - 1)) /
    numberOfColumns;
  dimensions.buttonHeight =
    (dimensions.height - dimensions.gap * (numberOfRows - 1)) / numberOfRows;

  //containers  styles

  setStyles(elements.buttonContainer, {
    //button container
    width: `${dimensions.width}px`,
    height: `${dimensions.widtht}px`,
    gap: `${dimensions.gap}px`,
  });

  // input and screen styling
  dimensions.screenWidth =
    dimensions.buttonWidth * numberOfColumns +
    dimensions.gap * (numberOfColumns - 1);
  dimensions.screenHeight = dimensions.buttonHeight * 2;

  setStyles(elements.screen, {
    width: `${dimensions.screenWidth}px`,
    height: `${dimensions.screenHeight}px`,
    margin: `${dimensions.gap}px`,
  });

  multiSetStyle(elements.screenDivs, {
    width: `${(dimensions.screenwidth - dimensions.gap * 2) / 2}px`,
    height: `${(dimensions.screenheight - dimensions.gap * 2) / 2}px`,
  });

  // button styles

  multiSetStyle(elements.buttons, {
    // global
    width: `${dimensions.buttonWidth}px`,
    height: `${dimensions.buttonHeight}px`,
  });

  multiSetStyle(elements.bigButtons, {
    width: `${dimensions.buttonWidth * 2 + dimensions.gap}px`,
    height: `${dimensions.buttonHeight}px`,
  });

  //rows styling
  multiSetStyle(elements.rows, {
    gap: `${dimensions.gap}px`,
  });
}
elementStyling();

// --------------- logic ---------------

// buttons and variables

const variables = {
  numbers: document.querySelectorAll("[data-number]"),
  operators: document.querySelectorAll("[data-operator]"),
  equals: document.getElementById("equalsBtn"),
  clear: document.getElementById("clearBtn"),
  delete: document.getElementById("deleteBtn"),
  point: document.getElementById("pointBtn"),
  lastOperationScreen: document.getElementById("lastOperation"),
  currentOperationScreen: document.getElementById("currentOperation"),
  firstOp: "",
  secondOp: "",
  currentOperation: null,
};
let updateScreenState = false;

window.addEventListener("keydown", assignKeyboardInp);
variables.equals.addEventListener("click", evalute);
variables.delete.addEventListener("click", deleteNum);
variables.clear.addEventListener("click", clear);
variables.point.addEventListener("click", updatePoint);

variables.numbers.forEach((button) =>
  button.addEventListener("click", () => updateNumber(button.textContent))
);

variables.operators.forEach((button) =>
  button.addEventListener("click", () =>
    setOperation(button.textContent, button)
  )
);

function toScientificNotation(num) {
  if (num === 0) return "0";
  const exponent = Math.floor(Math.log10(Math.abs(num)));
  const mantissa = num / Math.pow(10, exponent);
  return `${mantissa.toFixed(5)}e${exponent}`;
}

function updateNumber(num) {
  if (variables.currentOperationScreen.textContent.includes("e")) {
    alert("digit limit exceeded");
    clear();
  } else {
    if (
      variables.currentOperationScreen.textContent === "0" ||
      updateScreenState
    )
      screenRes();

    const newValue = Number(variables.currentOperationScreen.textContent + num);
    if (newValue > 999999999) {
      variables.currentOperationScreen.textContent =
        toScientificNotation(newValue);
    } else {
      variables.currentOperationScreen.textContent = newValue;
    }
  }
}

function buttonClick(button) {
  button.style.backgroundColor = "var(--btn)";
}

function setOperation(operator, button) {
  if (variables.currentOperationScreen.textContent !== "") evalute();
  variables.firstOp = variables.currentOperationScreen.textContent;
  variables.currentOperation = operator;
  variables.lastOperationScreen.textContent = `${variables.firstOp} ${variables.currentOperation}`;
  variables.currentOperationScreen.textContent = "";
  updateScreenState = true;
}

function assignKeyboardInp(e) {
  if (e.key >= 0 && e.key <= 9) updateNumber(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOp(e.key));
  if (e.key === "=" || e.key === "Enter") evalute();
  if (e.key === ".") updatePoint();
  if (e.key === "Backspace") deleteNum();
  if (e.key === "Escape") clear();
}

function convertOp(keyboardOp) {
  if (keyboardOp === "/") return "÷";
  if (keyboardOp === "*") return "x";
  if (keyboardOp === "-" || keyboardOp === "+") return `${keyboardOp}`;
}

function screenRes() {
  variables.currentOperationScreen.textContent = "";
  updateScreenState = false;
}

function clear() {
  variables.currentOperationScreen.textContent = "";
  variables.lastOperationScreen.textContent = "";
  variables.firstOp = "";
  variables.secondOp = "";
  variables.currentOperation = null;
}

function deleteNum() {
  variables.currentOperationScreen.textContent =
    variables.currentOperationScreen.textContent.slice(0, -1);
}

function updatePoint() {
  if (updateScreenState) screenRes();
  if (variables.currentOperationScreen.textContent === "")
    variables.currentOperationScreen.textContent = "0";
  if (variables.currentOperationScreen.textContent.includes(".")) return;
  variables.currentOperationScreen.textContent += ".";
}

function evalute() {
  if (variables.currentOperation === null || updateScreenState) return;
  if (
    variables.currentOperation === "÷" &&
    variables.currentOperationScreen.textContent === "0"
  )
    alert("Error");
  variables.secondOp = variables.currentOperationScreen.textContent;
  const result = operate(
    variables.currentOperation,
    variables.firstOp,
    variables.secondOp
  );
  if (result.toString().length > 10) {
    variables.currentOperationScreen.textContent = toScientificNotation(result);
  } else {
    variables.currentOperationScreen.textContent = roundResult(result);
  }
  variables.lastOperationScreen.textContent = `${variables.firstOp} ${variables.currentOperation} ${variables.secondOp} =`;
  variables.currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

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

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
