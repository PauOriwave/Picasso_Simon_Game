const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
let sequence = [];
let userSequence = [];
let level = 0;
let userTurn = false;

// Referencias a los elementos DOM
const shapes = document.querySelectorAll('.shape');
const message = document.getElementById('message');
const startButton = document.getElementById('start');

// Genera una secuencia aleatoria
function generateSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    userSequence = [];
    userTurn = false;
    message.textContent = `Nivel ${level}`;
    showSequence();
}

// Muestra la secuencia al usuario
function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(interval);
            userTurn = true;
            return;
        }
        flashColor(sequence[index]);
        index++;
    }, 1000);
}

// Hace parpadear un color
function flashColor(color) {
    const shape = document.getElementById(color);
    shape.classList.add('active');
    setTimeout(() => {
        shape.classList.remove('active');
    }, 500);
}

// Maneja el clic en un segmento de color
function handleColorClick(color) {
    if (userTurn) {
        userSequence.push(color);
        flashColor(color);
        checkSequence();
    }
}

// Verifica si la secuencia del usuario es correcta
function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            message.textContent = '¡Perdiste! Presiona "Iniciar Juego" para volver a intentarlo.';
            return;
        }
    }
    if (userSequence.length === sequence.length) {
        level++;
        setTimeout(generateSequence, 1000);
    }
}

// Asigna eventos a los segmentos de color
shapes.forEach(shape => {
    shape.addEventListener('click', () => handleColorClick(shape.id));
});

// Inicia el juego al hacer clic en el botón de inicio
startButton.addEventListener('click', () => {
    sequence = [];
    level = 0;
    message.textContent = 'Nivel 0';
    generateSequence();
});
