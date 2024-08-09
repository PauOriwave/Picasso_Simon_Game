const shapes = [
    { id: 'shape1', color: 'red', shape: 'circle' },
    { id: 'shape2', color: 'green', shape: 'square' },
    { id: 'shape3', color: 'blue', shape: 'triangle' },
    { id: 'shape4', color: 'yellow', shape: 'pentagon' }
];

let sequence = [];
let playerSequence = [];
let level = 1;
let isPlaying = false;

document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    if (!isPlaying) {
        isPlaying = true;
        level = 1;
        sequence = [];
        playerSequence = [];
        addShapeToSequence();
        showSequence();
    }
}

function addShapeToSequence() {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    sequence.push(shape);
}

function showSequence() {
    let delay = 0;
    sequence.forEach((shape, index) => {
        setTimeout(() => {
            highlightShape(shape.id);
        }, delay);
        delay += 1000;
        setTimeout(() => {
            unhighlightShape(shape.id);
        }, delay);
        delay += 500;
    });

    setTimeout(() => {
        playerSequence = [];
        shapes.forEach(shape => {
            document.getElementById(shape.id).addEventListener('click', handleShapeClick);
        });
    }, delay);
}

function highlightShape(id) {
    const shape = document.getElementById(id);
    shape.style.backgroundColor = '#fff';
}

function unhighlightShape(id) {
    const shape = document.getElementById(id);
    const shapeData = shapes.find(s => s.id === id);
    shape.style.backgroundColor = shapeData.color;
}

function handleShapeClick(event) {
    const id = event.target.id;
    const shape = shapes.find(s => s.id === id);
    playerSequence.push(shape);

    highlightShape(id);

    if (checkSequence()) {
        if (playerSequence.length === sequence.length) {
            setTimeout(() => {
                level++;
                addShapeToSequence();
                showSequence();
            }, 1000);
        }
    } else {
        endGame();
    }
}

function checkSequence() {
    return playerSequence.every((shape, index) => shape.id === sequence[index].id);
}

function endGame() {
    isPlaying = false;
    document.getElementById('message').textContent = `¡Juego terminado! Alcanzaste el nivel ${level}`;
    shapes.forEach(shape => {
        document.getElementById(shape.id).removeEventListener('click', handleShapeClick);
    });
}
