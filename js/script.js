const allNormalButtons = document.querySelectorAll('.normal');
const allInputs = document.querySelectorAll('input');
const rows = document.querySelectorAll('.row');
const conflictTopLeft = document.querySelector('.top');
const conflictBottomLeft = document.querySelector('.bottom');
const small = document.querySelectorAll('.small');
const big = document.querySelectorAll('.big');
const plus = document.querySelector('.plus');
const conflict = document.querySelector('.conflict');
const left = document.querySelector('.left');
const buttonContainer = document.querySelector('#entry-buttons')

function countSiblingsElements(element) {
    const parent = element.parentNode;
    const children = parent.children;
    const siblings = Array.from(children).filter((child => child !== element));
    return siblings.length;
}

let width = 300;
let height = 400;
let buttonContainerHeight = 200;
let gap = 4;
let leftConflictWidth = ((width) * 3) / 4 - gap * 2.5;
let rightConflictWidth = ((width) * 3) / 4 - 1;

buttonContainer.style.height = `${buttonContainerHeight}px`;
buttonContainer.style.gap = `${gap}px`;
left.style.gap = `${gap}px`;

plus.style.width = `${(width / 4) - (gap * 2)}px`;


allInputs.forEach((input) => {
    input.style.height = `${((buttonContainerHeight - (gap * 5)) / 6)}px`;
})

rows.forEach((row) => {
    row.style.justifyContent = 'space-between';
    row.style.gap = `${gap}px`;
})

allNormalButtons.forEach((button) => {
    button.style.width = `${(width - (gap * (4 ))/ 4)}px`;
});
conflict.style.gap = `${gap}px`;
conflictTopLeft.style.width = `${leftConflictWidth}px`;
conflictTopLeft.style.gap = `${gap}px`;
conflictBottomLeft.style.width = `${leftConflictWidth}px`;
conflictBottomLeft.style.gap = `${gap}px`;

small.forEach((button) => {
    button.style.width = `${(width) / 4 - (gap)}px`;
});

big.forEach((button) => {
    button.style.width = `${((width * 2) / 4 )}px`;
});


