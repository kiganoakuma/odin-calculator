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
  clear: document.querySelector("#clearBtn"),
  delete: document.querySelector("#deleteBtn"),
  numbers: document.querySelectorAll("[data-number]"),
  operators: document.querySelectorAll("[data-operator]"),
  equals: document.querySelector("#equalsBtn"),
  point: document.querySelector("#pointBtn"),
  lastOperator: document.querySelector("#lastOperation"),
  currentOperation: document.querySelector("#currentOperation"),
};
