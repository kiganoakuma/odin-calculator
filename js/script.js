// CSS DYNAMIC STYLING

function elementStyling() {
  // ELEMENT VARIABLES
  const elements = {
    container: document.querySelector(".container"),
    buttonContainer: document.querySelector(".button-container"),
    bigButtonsContainer: document.querySelector(".row.big-keys"),
    rows: document.querySelectorAll(".row"),
    result: document.querySelector(".result"),
    buttons: document.querySelectorAll("button"),
    bigButtons: document.querySelectorAll(".big-btn"),
  };

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

  // Calculate new dimensions after defining initial dimensions
  const numberOfRows = countDivsInClass(elements.buttonContainer, "row");
  dimensions.buttonWidth = (dimensions.width - dimensions.gap * (4 - 1)) / 4;
  dimensions.buttonHeight = dimensions.buttonWidth;

  //containers  styles

  setStyles(elements.buttonContainer, {
    //button container
    width: `${dimensions.width}px`,
    height: `${dimensions.widtht}px`,
    gap: `${gap}px`,
  });

  setStyles(elements.bigButtonsContainer, {
    width: `${dimensions.width}px`,
    height: `${dimensions.height / 4}px`,
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
