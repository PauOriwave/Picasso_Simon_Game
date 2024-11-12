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
document.getElementById('restart').addEventListener('click', restartGame);


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
function restartGame() {
    isPlaying = false;
    level = 1;
    sequence = [];
    playerSequence = [];
    document.getElementById('message').textContent = '¡Haz clic en "Comenzar" para jugar!';
    shapes.forEach(shape => {
        document.getElementById(shape.id).removeEventListener('click', handleShapeClick);
    });
    document.getElementById('start').style.display = 'inline-block'; // Muestra el botón de "Comenzar"
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
        event.target.style.backgroundColor = 'red'; // Resaltar en rojo si la respuesta es incorrecta
        setTimeout(() => {
            endGame();
        }, 500);
    }
}

function endGame() {
    isPlaying = false;
    document.getElementById('message').textContent = `¡Juego terminado! Alcanzaste el nivel ${level}`;
    shapes.forEach(shape => {
        document.getElementById(shape.id).removeEventListener('click', handleShapeClick);
    });
}
