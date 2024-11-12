const shapes = [
    { id: 'shape1', color: 'red', shape: 'triangle' },
    { id: 'shape2', color: 'green', shape: 'circle' },
    { id: 'shape3', color: 'blue', shape: 'pentagon' },
    { id: 'shape4', color: 'yellow', shape: 'square' }
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
        document.getElementById('message').textContent = `Nivel ${level}`;
        document.getElementById('start').style.display = 'none'; // Ocultar el botón de "Comenzar"
        document.getElementById('restart').style.display = 'inline-block'; // Mostrar el botón de "Reiniciar"
        
        // Generar las formas estáticas de Picasso en el contenedor
        generateShapes();
        addShapeToSequence();
        showSequence();
    }
}

function generateShapes() {
    const gameContainer = document.getElementById('game');
    gameContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevas formas
    
    shapes.forEach(shape => {
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape');
        shapeElement.id = shape.id;
        shapeElement.style.backgroundColor = shape.color;
        
        if (shape.shape === 'circle') {
            shapeElement.style.borderRadius = '50%';
        } else if (shape.shape === 'triangle') {
            shapeElement.style.clipPath = 'polygon(50% 0%, 100% 100%, 0% 100%)';
        } else if (shape.shape === 'pentagon') {
            shapeElement.style.clipPath = 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)';
        } else if (shape.shape === 'square') {
            shapeElement.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
        }

        shapeElement.addEventListener('click', handleShapeClick);
        gameContainer.appendChild(shapeElement);
    });
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
    }, delay);
}

function highlightShape(id) {
    const shape = document.getElementById(id);
    shape.style.opacity = 1;
}

function unhighlightShape(id) {
    const shape = document.getElementById(id);
    const shapeData = shapes.find(s => s.id === id);
    shape.style.opacity = 0.7;
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
                document.getElementById('message').textContent = `Nivel ${level}`;
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

function checkSequence() {
    return playerSequence.every((shape, index) => shape.id === sequence[index].id);
}

function endGame() {
    isPlaying = false;
    document.getElementById('message').textContent = `¡Juego terminado! Alcanzaste el nivel ${level}`;
    document.getElementById('restart').style.display = 'inline-block'; // Mostrar botón de reinicio
    shapes.forEach(shape => {
        document.getElementById(shape.id).removeEventListener('click', handleShapeClick);
    });
}

function restartGame() {
    isPlaying = false;
    level = 1;
    sequence = [];
    playerSequence = [];
    document.getElementById('message').textContent = '¡Haz clic en "Comenzar" para jugar!';
    document.getElementById('start').style.display = 'inline-block'; // Mostrar el botón de "Comenzar"
    document.getElementById('restart').style.display = 'none'; // Ocultar el botón de "Reiniciar"
    // Regenerar las formas
    generateShapes();
    shapes.forEach(shape => {
        document.getElementById(shape.id).removeEventListener('click', handleShapeClick);
    });
}
