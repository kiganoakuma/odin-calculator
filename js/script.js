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
    height: 200,
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
    (dimensions.width - dimensions.gap * (numberOfRows - 1)) / numberOfRows;

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
  equals: document.getElementById("#equalsBtn"),
  clear: document.getElementById("#clearBtn"),
  delete: document.getElementById("#deleteBtn"),
  point: document.getElementById("#pointBtn"),
  lastOperationScreen: document.getElementById("lastOperation"),
  currentOperationScreen: document.getElementById("currentOperation"),
  firstOp: "",
  secondOp: "",
  currentOp: null,
};
let updateScreenState = false;

window.addEventListener("keydown", assignKeyboardInp);

function updateNumber(num) {
  if (variables.currentOperationScreen.textContent === "0" || updateScreenState)
    screenRes();
  variables.currentOperationScreen.textContent += num;
}

function setOperation() {
  if (variables.currentOperationScreen !== null) evalute();
  variables.firstOp = variables.currentOperationScreen.textConent;
  variables.currentOp = operator;
  variables.lastOperationScreen.textContent = `${variables.firstOp} ${variables.currentOp}`;
  updateScreenState = true;
}

function assignKeyboardInp(e) {
  if (e.key >= 0 && e.key <= 9) updateNumber(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOp(e.key));
  if (e.key === "=" || e.key === "Enter") evalute();
  if (e.key === ".") updatePoint();
  console.log(e.key);
}

function convertOp(keyboardOp) {
  if (keyboardOp === "/") return "÷";
  if (keyboardOp === "*") return "v";
  if (keyboardOp === "-" || keyboardOp === "+") return `${keyboardOp}`;
}

function screenRes() {
  variables.currentOperationScreen.textContent = "";
  updateScreenState = false;
}

function clear() {
  variables.currentOperationScreen.textContent = "0";
  variables.lastOperationScreen.textContent = "";
  variables.firstOp = "";
  variables.secondOp = "";
  updateScreenState = false;
}

function updatePoint() {
  if (updateScreenState) screenRes();
  if (variables.currentOperationScreen.textContent === "")
    variables.currentOperationScreen = "0";
  if (variables.currentOperationScreen.textContent.includes(".")) return;
  variables.currentOperationScreen.textContent += ".";
}

function evalute() {
  if (variables.currentOp.textContent || updateScreenState) return;
  if (
    variables.currentOp === "÷" &&
    variables.currentOperationScreen.textContent === "0"
  )
    alert("Error");
}
