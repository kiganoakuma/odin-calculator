const allNormalButtons = document.querySelectorAll('.normal');
const rows = document.querySelectorAll('.row');
const conflictTopLeft = document.querySelector('.top');
const conflictBottomLeft = document.querySelector('.bottom');
const small = document.querySelectorAll('.small');
const big = document.querySelectorAll('.big');
const conflict = document.querySelector('.conflict');

function countSiblingsElements(element) {
    const parent = element.parentNode;
    const children = parent.children;
    const siblings = Array.from(children).filter((child => child !== element));
    return siblings.length;
}

let width = 300;
let height = 400;
let gap = 4;
let leftConflictWidth = ((width) * 3) / 4 - 1

rows.forEach((row) => {
    row.style.justifyContent = 'space-between';
    row.style.gap = `${gap}px`;
})

allNormalButtons.forEach((button) => {
    button.style.width = `${(width - (gap * (countSiblingsElements(button) - 1 ))/ 4)}px`;
});
conflict.style.gap = `${gap}px`;
conflictTopLeft.style.width = `${leftConflictWidth}px`;
conflictTopLeft.style.gap = `${gap}px`;
conflictBottomLeft.style.width = `${leftConflictWidth}px`;
conflictBottomLeft.style.gap = `${gap}px`;

small.forEach((button) => {
    button.style.width = `${(leftConflictWidth) / 3 - gap}px`;
});

big.forEach((button) => {
    button.style.width = `${((leftConflictWidth * 2) / 3)}px`;
});


