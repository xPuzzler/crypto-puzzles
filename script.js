const PUZZLE_IDS = 100; // Total number of puzzles available
const GRID_SIZE = 3; // 3x3 grid

function getRandomPuzzle() {
    const randomId = Math.floor(Math.random() * PUZZLE_IDS) + 1;
    return `https://4s3bpi7mop3zkt5ytdgak5gbstobngp5c4re6lqondkdforxzcwq.arweave.net/5LYXo-xz95VPuJjMBXTBlNwWmf0XIk8uDmjUMro3yK0/${randomId}.png`;
}

async function createPuzzle() {
    const container = document.getElementById('puzzleContainer');
    container.innerHTML = '';
    
    const puzzleImage = new Image();
    puzzleImage.src = getRandomPuzzle();
    
    await new Promise((resolve) => puzzleImage.onload = resolve);
    
    container.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    
    const pieceWidth = puzzleImage.width / GRID_SIZE;
    const pieceHeight = puzzleImage.height / GRID_SIZE;
    
    for(let row = 0; row < GRID_SIZE; row++) {
        for(let col = 0; col < GRID_SIZE; col++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.backgroundImage = `url(${puzzleImage.src})`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            
            // Add drag functionality
            let isDragging = false;
            let currentX = 0;
            let currentY = 0;
            let initialX = 0;
            let initialY = 0;
            
            piece.addEventListener('mousedown', dragStart);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
            
            container.appendChild(piece);
        }
    }
}

function dragStart(e) {
    isDragging = true;
    this.style.transition = 'none';
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        this.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
}

function dragEnd() {
    isDragging = false;
    this.style.transition = 'transform 0.3s';
    this.style.transform = 'translate(0, 0)';
}

// Initial load
createPuzzle();
