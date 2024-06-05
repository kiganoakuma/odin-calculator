const elements = {
    allNormalButtons: document.querySelectorAll('.normal'),
    allInputs: document.querySelectorAll('input'),
    rows: document.querySelectorAll('.row'),
    conflictTopLeft: document.querySelector('.top'),
    conflictBottomLeft: document.querySelector('.bottom'),
    small: document.querySelectorAll('.small'),
    big: document.querySelectorAll('.big'),
    plus: document.querySelector('.plus'),
    conflict: document.querySelector('.conflict'),
    left: document.querySelector('.left'),
    buttonContainer: document.querySelector('#entry-buttons')
};

const dimensions = {
    width: 300,
    buttonContainerHeight: 200,
    gap: 4,
    leftConflictWidth: (300 * 3) / 4 - 4 * 2,
    rightConflictWidth: (300 * 3) / 4 - 1
};

// Calculate normalButtonWidth after defining initial dimensions
dimensions.normalButtonWidth = (dimensions.width - dimensions.gap * 4) / 4;

// Apply styles to buttonContainer and left elements
Object.assign(elements.buttonContainer.style, {
    height: `${dimensions.buttonContainerHeight}px`,
});

// Apply styles to plus element
Object.assign(elements.plus.style, {
    width: `${dimensions.rightConflictWidth}px`,
});

// Apply styles to inputs
const inputHeight = (dimensions.buttonContainerHeight - dimensions.gap * 5) / 6;
elements.allInputs.forEach(input => input.style.height = `${inputHeight}px`);

// Apply styles to rows
elements.rows.forEach(row => {
    row.style.justifyContent = 'space-between';
});

// Apply styles to normal buttons
elements.allNormalButtons.forEach(button => button.style.width = `${dimensions.normalButtonWidth}px`);

// Apply styles to conflict elements
[elements.conflictTopLeft, elements.conflictBottomLeft].forEach(el => {
    el.style.width = `${dimensions.leftConflictWidth}px`;
});

// Apply styles to small buttons
const smallButtonWidth = dimensions.width / 4 - (dimensions.gap - 0.5);
elements.small.forEach(button => button.style.width = `${smallButtonWidth}px`);

// Apply styles to big buttons
const bigButtonWidth = dimensions.normalButtonWidth * 2 + dimensions.gap;
elements.big.forEach(button => button.style.width = `${bigButtonWidth}px`);