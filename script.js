let board = [];
let sheep = [];
let fences = new Set();
let selectedShape = null;
let currentDiceRoll = null;
let bushes = new Set(); // Store bush line positions
let rollsRemaining = 10;
let mustRollDice = true; // Player must roll dice before placing fence

//const placedFenceShapes = []; // global array to store placed fence shapes


function rollDice() {
            console.log("Roll dice function called");
        }
        
function newGame() {
            console.log("New game function called");
        }
// Fence shapes for each dice roll (1-6)
const fenceShapes = {
    1: [
        // U-shape orientations
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'right'}], // Top, Bottom, Right
        [{type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}], // Left, Right, Bottom
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'left'}], // Top, Bottom, Left
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'vertical', row: 0, col: 0, position: 'right'}]  // Top, Left, Right
    ],
    2: [
        // Long line orientations
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'horizontal', row: 0, col: 1, position: 'top'}], // Horizontal line across two cells top
        [{type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'vertical', row: -1, col: 0, position: 'right'}], // Vertical line across two cells right
        [{type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'vertical', row: -1, col: 0, position: 'left'}], // Vertical line across two cells left
        [{type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'horizontal', row: 0, col: 1, position: 'bottom'}] // Horizontal line across two cells bottom
    ],
    3: [
        // L-shape orientations
        [{type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'vertical', row: -1, col: 0, position: 'left'}], // Bottom, Left, Left-above
        [{type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'horizontal', row: 0, col: 1, position: 'top'}], // Left, Top, Top-right
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'vertical', row: 1, col: 0, position: 'right'}], // Top, Right, Right-below
        [{type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'horizontal', row: 0, col: -1, position: 'bottom'}] // Bottom, Right, Bottom-left
    ],
    4: [
        // Inverted L-shape orientations
        [{type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'vertical', row: -1, col: 0, position: 'right'}], // Bottom, Right, Right-above
        [{type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'horizontal', row: 0, col: 1, position: 'bottom'}], // Left, Bottom, Bottom-right
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'vertical', row: 1, col: 0, position: 'left'}], // Top, Left, Left-below
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'horizontal', row: 0, col: -1, position: 'top'}] // Top, Right, Top-left
    ],
    5: [
        // Roll 5 - Two orientations
        [{type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 1, col: 0, position: 'right'}], // Left, Bottom, Right-below
        [{type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'horizontal', row: 0, col: 1, position: 'top'}] // Bottom, Right, Top-right
    ],
    6: [
        // Roll 6 - Two orientations
        [{type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 1, col: 0, position: 'left'}], // Right, Bottom, Left-below
        [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'horizontal', row: 0, col: 1, position: 'bottom'}] // Top, Right, Bottom-right
    ]
};

function initGame() {
    board = Array(7).fill().map(() => Array(7).fill(null));
    sheep = [];
    fences = new Set();
    
    // Reset game state variables
    rollsRemaining = 10;
    mustRollDice = true;
    selectedShape = null;
    currentDiceRoll = null;
    
    // Clear placed shapes array
    placedShapes.length = 0;
    
    // Update display
    document.getElementById('rollsRemaining').textContent = rollsRemaining;
    
    // Place 13 sheep randomly
    let positions = [];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            positions.push([i, j]);
        }
    }
    
    // Shuffle and pick 13 positions
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    for (let i = 0; i < 13; i++) {
        const [row, col] = positions[i];
        board[row][col] = 'sheep';
        sheep.push([row, col]);
    }
    createRandomBushes(); 
    createBoard();
    updateProtectedCount();
    hideErrorMessage();
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    // Create grid points (+ signs at all intersections including borders)
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            const gridPoint = document.createElement('div');
            gridPoint.className = 'grid-point';
            gridPoint.style.left = (j * 60 + 6) + 'px';
            gridPoint.style.top = (i * 60 + 6) + 'px';
            gameBoard.appendChild(gridPoint);
        }
    }
    
    // Create cells
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.onclick = () => placeFence(i, j);
            cell.onmouseenter = () => showFencePreview(i, j);
            cell.onmouseleave = () => hideFencePreview();
            cell.style.left = (j * 60 + 10) + 'px';
            cell.style.top = (i * 60 + 10) + 'px';
            
            if (board[i][j] === 'sheep') {
                cell.innerHTML = '🐑';
                cell.classList.add('sheep');
            }
            
            gameBoard.appendChild(cell);
        }
    }
    updateBushDisplay();
}

function hasOverlap(startRow, startCol, shape) {
    console.log("Checking shape:", shape); // Print the entire shape array to the console

    return shape.some(fence => {
        console.log(fence.row, fence.col, fence.position);
        const row = startRow + fence.row;
        const col = startCol + fence.col;
        const fenceKey = `${row}-${col}-${fence.position}`;
        console.log(fenceKey);
        return fences.has(fenceKey);
    });
}

function hideFencePreview() {
    document.querySelectorAll('.fence-preview-element').forEach(el => el.remove());
}

function showErrorMessage(message) {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        hideErrorMessage();
    }, 3000);
}

function hideErrorMessage() {
    document.getElementById('errorMessage').style.display = 'none';
}



// Replace the existing isProtected function with this new implementation

function isProtected(row, col) {
    // Use flood-fill to check if the sheep can reach the board edge
    // If it can't reach the edge, it's protected by the fence arrangement
    
    const visited = new Set();
    const queue = [[row, col]];
    visited.add(`${row}-${col}`);
    
    while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift();
        
        // If we reached the board edge, the sheep is NOT protected
        if (currentRow === -1 || currentRow === 7 || currentCol === -1 || currentCol === 7) {
            return false;
        }
        
        // Check all four directions
        const directions = [
            {dir: 'top', newRow: currentRow - 1, newCol: currentCol, fenceKey: `${currentRow}-${currentCol}-top`},
            {dir: 'bottom', newRow: currentRow + 1, newCol: currentCol, fenceKey: `${currentRow}-${currentCol}-bottom`},
            {dir: 'left', newRow: currentRow, newCol: currentCol - 1, fenceKey: `${currentRow}-${currentCol}-left`},
            {dir: 'right', newRow: currentRow, newCol: currentCol + 1, fenceKey: `${currentRow}-${currentCol}-right`}
        ];
        
        for (const {newRow, newCol, fenceKey} of directions) {
            // Check if we're still within bounds
            if (newRow >= -1 && newRow <= 7 && newCol >= -1 && newCol <= 7) {
                // Check if there's a fence blocking this direction
                if (!fences.has(fenceKey)) {
                    // No fence blocking, and we haven't visited this cell yet
                    const cellKey = `${newRow}-${newCol}`;
                    if (!visited.has(cellKey)) {
                        visited.add(cellKey);
                        queue.push([newRow, newCol]);
                    }
                }
            }
        }
    }
    
    // If we couldn't reach any board edge, the sheep is protected
    return true;
}

// Enhanced version that also provides visual feedback (optional)
function isProtectedWithDebug(row, col) {
    // This version shows which cells the sheep can reach (for debugging)
    const visited = new Set();
    const queue = [[row, col]];
    const reachableCells = [];
    visited.add(`${row}-${col}`);
    
    while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift();
        reachableCells.push([currentRow, currentCol]);
        
        // If we reached the board edge, the sheep is NOT protected
        if (currentRow === 0 || currentRow === 6 || currentCol === 0 || currentCol === 6) {
            console.log(`Sheep at (${row}, ${col}) can reach edge at (${currentRow}, ${currentCol})`);
            console.log('Reachable cells:', reachableCells);
            return false;
        }
        
        // Check all four directions
        const directions = [
            {dir: 'top', newRow: currentRow - 1, newCol: currentCol, fenceKey: `${currentRow}-${currentCol}-top`},
            {dir: 'bottom', newRow: currentRow + 1, newCol: currentCol, fenceKey: `${currentRow}-${currentCol}-bottom`},
            {dir: 'left', newRow: currentRow, newCol: currentCol - 1, fenceKey: `${currentRow}-${currentCol}-left`},
            {dir: 'right', newRow: currentRow, newCol: currentCol + 1, fenceKey: `${currentRow}-${currentCol}-right`}
        ];
        
        for (const {dir, newRow, newCol, fenceKey} of directions) {
            // Check if we're still within bounds
            if (newRow >= 0 && newRow < 7 && newCol >= 0 && newCol < 7) {
                // Check if there's a fence blocking this direction
                if (!fences.has(fenceKey)) {
                    // No fence blocking, and we haven't visited this cell yet
                    const cellKey = `${newRow}-${newCol}`;
                    if (!visited.has(cellKey)) {
                        visited.add(cellKey);
                        queue.push([newRow, newCol]);
                    }
                } else {
                    console.log(`Fence blocks movement from (${currentRow}, ${currentCol}) to ${dir}: ${fenceKey}`);
                }
            }
        }
    }
    
    // If we couldn't reach any board edge, the sheep is protected
    console.log(`Sheep at (${row}, ${col}) is PROTECTED. Reachable area:`, reachableCells);
    return true;
}

// Optional: Function to highlight protected areas (for visual debugging)
function highlightProtectedAreas() {
    // Remove existing highlights
    document.querySelectorAll('.protected-area').forEach(el => el.remove());
    
    sheep.forEach(([sheepRow, sheepCol]) => {
        if (isProtected(sheepRow, sheepCol)) {
            // Find all cells in this sheep's protected area
            const visited = new Set();
            const queue = [[sheepRow, sheepCol]];
            const protectedCells = [];
            visited.add(`${sheepRow}-${sheepCol}`);
            
            while (queue.length > 0) {
                const [currentRow, currentCol] = queue.shift();
                protectedCells.push([currentRow, currentCol]);
                
                // Don't continue if we hit the edge (shouldn't happen for protected sheep)
                if (currentRow === 0 || currentRow === 6 || currentCol === 0 || currentCol === 6) {
                    continue;
                }
                
                // Check all four directions
                const directions = [
                    {newRow: currentRow - 1, newCol: currentCol, fenceKey: `${currentRow}-${currentCol}-top`},
                    {newRow: currentRow + 1, newCol: currentCol, fenceKey: `${currentRow}-${currentCol}-bottom`},
                    {newRow: currentRow, newCol: currentCol - 1, fenceKey: `${currentRow}-${currentCol}-left`},
                    {newRow: currentRow, newCol: currentCol + 1, fenceKey: `${currentRow}-${currentCol}-right`}
                ];
                
                for (const {newRow, newCol, fenceKey} of directions) {
                    if (newRow >= 0 && newRow < 7 && newCol >= 0 && newCol < 7) {
                        if (!fences.has(fenceKey)) {
                            const cellKey = `${newRow}-${newCol}`;
                            if (!visited.has(cellKey)) {
                                visited.add(cellKey);
                                queue.push([newRow, newCol]);
                            }
                        }
                    }
                }
            }
            
            // Highlight all cells in this protected area
            protectedCells.forEach(([cellRow, cellCol]) => {
                const highlightEl = document.createElement('div');
                highlightEl.className = 'protected-area';
                highlightEl.style.left = (cellCol * 60 + 10) + 'px';
                highlightEl.style.top = (cellRow * 60 + 10) + 'px';
                highlightEl.style.width = '50px';
                highlightEl.style.height = '50px';
                highlightEl.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                highlightEl.style.border = '2px solid rgba(0, 255, 0, 0.5)';
                highlightEl.style.position = 'absolute';
                highlightEl.style.pointerEvents = 'none';
                highlightEl.style.zIndex = '1';
                
                document.getElementById('gameBoard').appendChild(highlightEl);
            });
        }
    });
}

function rollDice() {
    // Check if player must roll dice (first turn or after placing a fence)
    if (!mustRollDice) {
        showErrorMessage('You must place the current fence before rolling again!');
        return;
    }
    
    // Check if rolls remaining
    if (rollsRemaining <= 0) {
        showErrorMessage('No more rolls remaining! Game over.');
        return;
    }
    
    const dice = document.getElementById('dice');
    const roll = Math.floor(Math.random() * 6) + 1;
    currentDiceRoll = roll;
    
    dice.textContent = roll;
    dice.style.animation = 'roll 0.5s';
    
    setTimeout(() => {
        dice.style.animation = '';
        showFenceOptions(roll);
    }, 500);
    
    // Decrease rolls remaining and update display
    rollsRemaining--;
    document.getElementById('rollsRemaining').textContent = rollsRemaining;
    
    // Player no longer needs to roll dice until they place a fence
    mustRollDice = false;
    
    hideErrorMessage();
}

function showFenceOptions(roll) {
    const shapesContainer = document.getElementById('fenceShapes');
    shapesContainer.innerHTML = '';
    
    const shapes = fenceShapes[roll];
    
    shapes.forEach((shape, index) => {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = 'shape-option';
        shapeDiv.onclick = () => selectShape(roll, index);
        
        // Draw the shape preview
        shape.forEach(fence => {
            const fenceEl = document.createElement('div');
            fenceEl.className = 'shape-fence';
            
            if (fence.type === 'horizontal') {
                fenceEl.style.width = '20px';
                fenceEl.style.height = '3px';
                fenceEl.style.left = (fence.col * 20 + 10) + 'px';
                fenceEl.style.top = fence.position === 'top' ? (fence.row * 20 + 8) + 'px' : (fence.row * 20 + 29) + 'px';
            } else {
                fenceEl.style.width = '3px';
                fenceEl.style.height = '20px';
                fenceEl.style.top = (fence.row * 20 + 10) + 'px';
                fenceEl.style.left = fence.position === 'left' ? (fence.col * 20 + 8) + 'px' : (fence.col * 20 + 29) + 'px';
            }
            
            shapeDiv.appendChild(fenceEl);
        });
        
        shapesContainer.appendChild(shapeDiv);
    });
}

function selectShape(roll, shapeIndex) {
    selectedShape = { roll, shapeIndex };
    
    // Update visual selection
    document.querySelectorAll('.shape-option').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.shape-option')[shapeIndex].classList.add('selected');
    
    hideErrorMessage();
}

// Store placed shapes instead of just fence keys
const placedShapes = []; // Array to store {startRow, startCol, shape, roll, shapeIndex}

// Helper function to determine the direction of a fence from a specific grid point
function getDirectionFromGridPoint(gridPoint, fence, fenceRow, fenceCol) {
    if (fence.type === 'horizontal') {
        // For horizontal fences, direction is always left-right from any grid point
        return 'horizontal';
    } else {
        // For vertical fences, direction is always up-down from any grid point
        return 'vertical';
    }
}

// Updated showFencePreview function to include grid point conflict check
function showFencePreview(startRow, startCol) {
    if (mustRollDice) {
        showErrorMessage('Please roll the dice first!');
        return;
    }

    hideFencePreview(); // Clear any existing preview
    
    if (!selectedShape) return;
    
    const shape = fenceShapes[selectedShape.roll][selectedShape.shapeIndex];
    
    // Check if placement is valid (within bounds)
    const isWithinBounds = isValidPlacement(startRow, startCol, shape);
    // Check if there's any overlap
    const hasOverlapping = isWithinBounds && hasOverlap(startRow, startCol, shape);
    // Check for geometric intersections
    const hasGeometricIntersections = isWithinBounds && hasGeometricIntersection(startRow, startCol, shape);
    // Check for grid point conflicts
    const hasGridPointConflicts = isWithinBounds && hasGridPointConflict(startRow, startCol, shape);
    const hasBushConflicts = isWithinBounds && hasBushOverlap(startRow, startCol, shape);
    if (!isWithinBounds) return;
    
    const isInvalid = hasOverlapping || hasGeometricIntersections || hasGridPointConflicts || hasBushConflicts;
    
    // Show preview fences
    shape.forEach(fence => {
        const row = startRow + fence.row;
        const col = startCol + fence.col;
        
        const previewEl = document.createElement('div');
        previewEl.className = 'fence-preview';
        previewEl.classList.add('fence-preview-element'); // For easy removal
        
        // Mark as invalid if any conflict exists
        if (isInvalid) {
            previewEl.classList.add('fence-preview-invalid');
        }
        
        if (fence.type === 'horizontal') {
            previewEl.classList.add('fence-preview-horizontal');
            previewEl.style.left = (col * 60 + 10) + 'px';
            if (fence.position === 'top') {
                previewEl.style.top = (row * 60 + 8) + 'px';
            } else {
                previewEl.style.top = (row * 60 + 68) + 'px';
            }
        } else {
            previewEl.classList.add('fence-preview-vertical');
            previewEl.style.top = (row * 60 + 10) + 'px';
            if (fence.position === 'left') {
                previewEl.style.left = (col * 60 + 8) + 'px';
            } else {
                previewEl.style.left = (col * 60 + 68) + 'px';
            }
        }
        
        document.getElementById('gameBoard').appendChild(previewEl);
    });

    // Visual feedback for the cell
    const cell = document.querySelector(`[data-row="${startRow}"][data-col="${startCol}"]`);
    if (isInvalid) {
        cell.classList.add('invalid-placement');
        setTimeout(() => cell.classList.remove('invalid-placement'), 500);
    }
}

// Updated placeFence function with the new check
function placeFence(startRow, startCol) {

    if (mustRollDice) {
        showErrorMessage('Please roll the dice first!');
        return;
    }

    if (!selectedShape) {
        showErrorMessage('Please roll the dice and select a fence shape first!');
        return;
    }
    
    const shape = fenceShapes[selectedShape.roll][selectedShape.shapeIndex];
    
    // Check if placement is valid (within bounds)
    if (!isValidPlacement(startRow, startCol, shape)) {
        showErrorMessage('Cannot place fence here - it would go outside the board!');
        return;
    }
    
    // Check for overlapping fences
    if (hasOverlap(startRow, startCol, shape)) {
        showErrorMessage('Cannot place fence here - it overlaps with existing fences!');
        return;
    }
    
    // Check for geometric intersections with existing shapes
    if (hasGeometricIntersection(startRow, startCol, shape)) {
        showErrorMessage('Cannot place fence here - it intersects with existing fence lines!');
        return;
    }
    
    // NEW CHECK: Check for grid point conflicts (cross patterns)
    if (hasGridPointConflict(startRow, startCol, shape)) {
        showErrorMessage('Cannot place fence here - it would create crossing fence lines at a grid point!');
        return;
    }


    // In placeFence(), add this check after existing checks:
    if (hasBushOverlap(startRow, startCol, shape)) {
        showErrorMessage('Cannot place fence here - it overlaps with bush barriers!');
        return;
}
    
    // Store the placed shape
    placedShapes.push({startRow, startCol, shape, roll: selectedShape.roll, shapeIndex: selectedShape.shapeIndex});
    
    // Place the fences with modified logic for boundary fences
    shape.forEach(fence => {
        const row = startRow + fence.row;
        const col = startCol + fence.col;
        const fenceKey1 = `${row}-${col}-${fence.position}`;
        fences.add(fenceKey1);
        console.log('Added fence:', fenceKey1);

        // Check if this is a boundary fence that should not have an adjacent fence stored
        const isTopBoundary = (row === 0 && fence.position === 'top');
        const isLeftBoundary = (col === 0 && fence.position === 'left');
        
        if (isTopBoundary || isLeftBoundary) {
            // For boundary fences, store the same fenceKey1 again (as requested)
            fences.add(fenceKey1);
            console.log('Added boundary fence (same as fenceKey1):', fenceKey1);
        } else {
            // For non-boundary fences, calculate and store the adjacent fence
            let adjacentRow = row, adjacentCol = col, oppositePosition = '';
            if (fence.position === 'top') {
                adjacentRow = row - 1;
                oppositePosition = 'bottom';
            } else if (fence.position === 'bottom') {
                adjacentRow = row + 1;
                oppositePosition = 'top';
            } else if (fence.position === 'left') {
                adjacentCol = col - 1;
                oppositePosition = 'right';
            } else if (fence.position === 'right') {
                adjacentCol = col + 1;
                oppositePosition = 'left';
            }

            const fenceKey2 = `${adjacentRow}-${adjacentCol}-${oppositePosition}`;
            fences.add(fenceKey2);
            console.log('Added adjacent/opposite fence:', fenceKey2);
        }
    });
    
    updateFenceDisplay();
    updateProtectedCount();
    selectedShape = null;
    document.querySelectorAll('.shape-option').forEach(el => el.classList.remove('selected'));
    hideFencePreview();
    hideErrorMessage();

    mustRollDice = true;

  // Check if game is over due to no more rolls
    if (rollsRemaining <= 0) {
    setTimeout(() => {
        const protectedCount = document.getElementById('protectedCount').textContent;
        alert(`Game Over! You protected ${protectedCount} out of 13 sheep.`);
    }, 100);
}
}


function hasGeometricIntersection(newStartRow, newStartCol, newShape) {
    const newLines = newShape.map(f => ({row: newStartRow + f.row, col: newStartCol + f.col, ...f}));
    
    return placedShapes.some(placed => {
        const existingLines = placed.shape.map(f => ({row: placed.startRow + f.row, col: placed.startCol + f.col, ...f}));
        return newLines.some(line1 => existingLines.some(line2 => doFenceLinesIntersect(line1, line2)));
    });
}

function doFenceLinesIntersect(line1, line2) {
    const coords1 = getFenceCoords(line1);
    const coords2 = getFenceCoords(line2);
    return doLineSegmentsIntersect(coords1.s, coords1.e, coords2.s, coords2.e);
}

function getFenceCoords({row, col, position, type}) {
    let coords;
    
    if (type === 'horizontal') {
        const y = position === 'top' ? row : row + 1;
        coords = {s: {x: col, y}, e: {x: col + 1, y}};
    } else {
        const x = position === 'left' ? col : col + 1;
        coords = {s: {x, y: row}, e: {x, y: row + 1}};
    }
    
    // Console logging
    console.log(`Fence at (${row}, ${col}) ${position} ${type}:`);
    console.log(`  Start: (${coords.s.x}, ${coords.s.y})`);
    console.log(`  End: (${coords.e.x}, ${coords.e.y})`);
    console.log('---');
    
    return coords;
}

function doLineSegmentsIntersect(p1, q1, p2, q2) {
    const o1 = orientation(p1, q1, p2), o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1), o4 = orientation(p2, q2, q1);
    
    // X-crossing: only disallow if not at endpoints
    if (o1 !== o2 && o3 !== o4) {
        return !isEndpointMatch(p1, q1, p2, q2);
    }
    
    // Collinear overlaps: only disallow if not at exact endpoints
    return (o1 === 0 && onSegment(p1, p2, q1) && !areEqual(p2, p1) && !areEqual(p2, q1)) ||
           (o2 === 0 && onSegment(p1, q2, q1) && !areEqual(q2, p1) && !areEqual(q2, q1)) ||
           (o3 === 0 && onSegment(p2, p1, q2) && !areEqual(p1, p2) && !areEqual(p1, q2)) ||
           (o4 === 0 && onSegment(p2, q1, q2) && !areEqual(q1, p2) && !areEqual(q1, q2));
}

function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    return val === 0 ? 0 : (val > 0 ? 1 : 2);
}

function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
           q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function isEndpointMatch(p1, q1, p2, q2) {
    return areEqual(p1, p2) || areEqual(p1, q2) || areEqual(q1, p2) || areEqual(q1, q2);
}

function areEqual(p1, p2) {
    return Math.abs(p1.x - p2.x) < 0.0001 && Math.abs(p1.y - p2.y) < 0.0001;
}

function clearAllShapes() {
    placedShapes.length = 0;
    fences.clear();
}

function determineFenceClass(fenceKey) {
    if (fenceKey.includes("top") || fenceKey.includes("bottom")) {
        return "fence-horizontal";
    } else if (fenceKey.includes("left") || fenceKey.includes("right")) {
        return "fence-vertical";
    }
}

function createRandomBushes() {
    bushes.clear();
    
    // Generate 8-12 random bush lines
    const numBushes = Math.floor(Math.random() * 5) + 8;
    
    for (let i = 0; i < numBushes; i++) {
        const isHorizontal = Math.random() < 0.5;
        
        if (isHorizontal) {
            const row = Math.floor(Math.random() * 8); // 0-7 for horizontal lines
            const col = Math.floor(Math.random() * 7); // 0-6 for horizontal lines
            bushes.add(`${row}-${col}-horizontal`);
        } else {
            const row = Math.floor(Math.random() * 7); // 0-6 for vertical lines
            const col = Math.floor(Math.random() * 8); // 0-7 for vertical lines
            bushes.add(`${row}-${col}-vertical`);
        }
    }
}

function updateBushDisplay() {
    // Remove existing bush elements
    document.querySelectorAll('.bush-line').forEach(el => el.remove());
    
    bushes.forEach(bushKey => {
        const [row, col, type] = bushKey.split('-');
        const rowNum = parseInt(row);
        const colNum = parseInt(col);
        
        const bushEl = document.createElement('div');
        bushEl.className = 'bush-line';
        
        if (type === 'horizontal') {
            bushEl.classList.add('bush-horizontal');
            bushEl.style.left = (colNum * 60 + 10) + 'px';
            bushEl.style.top = (rowNum * 60 + 8) + 'px';
        } else {
            bushEl.classList.add('bush-vertical');
            bushEl.style.top = (rowNum * 60 + 10) + 'px';
            bushEl.style.left = (colNum * 60 + 8) + 'px';
        }
        
        document.getElementById('gameBoard').appendChild(bushEl);
    });
}

function hasBushOverlap(startRow, startCol, shape) {
    return shape.some(fence => {
        const row = startRow + fence.row;
        const col = startCol + fence.col;
        
        let bushKey;
        if (fence.type === 'horizontal') {
            if (fence.position === 'top') {
                bushKey = `${row}-${col}-horizontal`;
            } else { // bottom
                bushKey = `${row + 1}-${col}-horizontal`;
            }
        } else { // vertical
            if (fence.position === 'left') {
                bushKey = `${row}-${col}-vertical`;
            } else { // right
                bushKey = `${row}-${col + 1}-vertical`;
            }
        }
        
        return bushes.has(bushKey);
    });
}

function isValidPlacement(startRow, startCol, shape) {
    return shape.every(fence => {
        const row = startRow + fence.row;
        const col = startCol + fence.col;
        return row >= 0 && row < 7 && col >= 0 && col < 7;
    });
}

function updateFenceDisplay() {
    console.log('All stored fences:', Array.from(fences));
    console.log('Does fences contain 0-0-top?', fences.has('0-0-top'));
    
    // Remove existing fence elements
    document.querySelectorAll('.fence').forEach(el => el.remove());
    
    // Add fence elements
    
    // First, log what fences are supposed to be rendered
    console.log('=== FENCE RENDERING DEBUG ===');
    console.log('Fences array contains:', fences);
    console.log('Number of fences to render:', fences.length);

    // Clear any existing fences first to see what this function adds
    const existingFences = document.querySelectorAll('.fence');
    console.log('Existing fences on board before rendering:', existingFences.length);

    fences.forEach((fenceKey, index) => {
        console.log(`Rendering fence ${index + 1}: ${fenceKey}`);
        
        const [row, col, position] = fenceKey.split('-');
        const rowNum = parseInt(row);
        const colNum = parseInt(col);
        
        const fenceEl = document.createElement('div');
        fenceEl.className = 'fence';
        fenceEl.setAttribute('data-fence-key', fenceKey); // Mark with original key
        
        if (position === 'top' || position === 'bottom') {
            fenceEl.classList.add('fence-horizontal');
            fenceEl.style.left = (colNum * 60 + 10) + 'px';
            if (position === 'top') {
                fenceEl.style.top = (rowNum * 60 + 8) + 'px';
            } else {
                fenceEl.style.top = (rowNum * 60 + 68) + 'px';
            }
        } else {
            fenceEl.classList.add('fence-vertical');
            fenceEl.style.top = (rowNum * 60 + 10) + 'px';
            if (position === 'left') {
                fenceEl.style.left = (colNum * 60 + 8) + 'px';
            } else {
                fenceEl.style.left = (colNum * 60 + 68) + 'px';
            }
        }
        
        document.getElementById('gameBoard').appendChild(fenceEl);
    });

    // After rendering, check what's actually on the board
    const allFencesAfter = document.querySelectorAll('.fence');
    console.log('Total fences on board after rendering:', allFencesAfter.length);

    // List all fence elements and their data-fence-key attributes
    console.log('All fence elements on board:');
    allFencesAfter.forEach((fence, index) => {
        const fenceKey = fence.getAttribute('data-fence-key');
        const position = `left: ${fence.style.left}, top: ${fence.style.top}`;
        console.log(`  ${index + 1}. Key: ${fenceKey || 'UNKNOWN'}, Position: ${position}`);
        
        // Flag fences without keys (these might be from elsewhere)
        if (!fenceKey) {
            console.warn('    ⚠️  This fence has no data-fence-key - it may be from another source!');
        }
    });

    console.log('=== END FENCE DEBUG ===');
}

// Add this function to your existing JavaScript code
function updateSheepVisuals() {
    // Remove all existing protected classes first
    document.querySelectorAll('.sheep').forEach(sheepEl => {
        sheepEl.classList.remove('protected');
    });
    
    // Add protected class to protected sheep
    sheep.forEach(([row, col]) => {
        const sheepEl = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (sheepEl && isProtected(row, col)) {
            sheepEl.classList.add('protected');
        }
    });
}

function updateProtectedCount() {
    let protectedCount = 0;
    sheep.forEach(([row, col]) => {
        if (isProtected(row, col)) {
            protectedCount++;
        }
    });
    
    document.getElementById('protectedCount').textContent = protectedCount;

    // Add this line to update sheep visuals
    updateSheepVisuals();
    
    if (protectedCount === 13) {
        setTimeout(() => {
            alert('🎉 Congratulations! You protected all 13 sheep! 🎉');
        }, 100);
    }
}

function newGame() {
    initGame();
    selectedShape = null;
    currentDiceRoll = null;
    document.getElementById('dice').textContent = '?';
    document.getElementById('fenceShapes').innerHTML = '';
    hideFencePreview();
}

// Enhanced intersection detection function
function hasGridPointConflict(newStartRow, newStartCol, newShape) {
    // Get all grid points where the new shape has fence lines
    const newGridPoints = getGridPointsWithFences(newStartRow, newStartCol, newShape);
    
    // Check each existing placed shape
    for (const placedShape of placedShapes) {
        const existingGridPoints = getGridPointsWithFences(
            placedShape.startRow, 
            placedShape.startCol, 
            placedShape.shape
        );
        
        // Check if any grid points overlap
        for (const newPoint of newGridPoints) {
            for (const existingPoint of existingGridPoints) {
                if (newPoint.gridX === existingPoint.gridX && newPoint.gridY === existingPoint.gridY) {
                    // Same grid point - check if they would create a forbidden cross pattern
                    if (wouldCreateForbiddenCrossPattern(newPoint.fences, existingPoint.fences)) {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}

// Helper function to find grid points where a shape has fence lines
function getGridPointsWithFences(startRow, startCol, shape) {
    const gridPointMap = new Map();
    
    // For each fence in the shape, determine which grid points it touches
    shape.forEach(fence => {
        const row = startRow + fence.row;
        const col = startCol + fence.col;
        
        let gridPoints = [];
        
        if (fence.type === 'horizontal') {
            if (fence.position === 'top') {
                gridPoints = [
                    {gridX: col, gridY: row},
                    {gridX: col + 1, gridY: row}
                ];
            } else { // bottom
                gridPoints = [
                    {gridX: col, gridY: row + 1},
                    {gridX: col + 1, gridY: row + 1}
                ];
            }
        } else { // vertical
            if (fence.position === 'left') {
                gridPoints = [
                    {gridX: col, gridY: row},
                    {gridX: col, gridY: row + 1}
                ];
            } else { // right
                gridPoints = [
                    {gridX: col + 1, gridY: row},
                    {gridX: col + 1, gridY: row + 1}
                ];
            }
        }
        
        // Add this fence to each grid point it touches
        gridPoints.forEach(point => {
            const key = `${point.gridX},${point.gridY}`;
            if (!gridPointMap.has(key)) {
                gridPointMap.set(key, {
                    gridX: point.gridX,
                    gridY: point.gridY,
                    fences: []
                });
            }
            gridPointMap.get(key).fences.push({
                type: fence.type,
                position: fence.position,
                direction: getDirectionFromGridPoint(point, fence, row, col)
            });
        });
    });
    
    return Array.from(gridPointMap.values());
}

// Helper function to determine the direction of a fence from a specific grid point
function getDirectionFromGridPoint(gridPoint, fence, fenceRow, fenceCol) {
    if (fence.type === 'horizontal') {
        return 'horizontal';
    } else {
        return 'vertical';
    }
}

// Updated function to check for forbidden cross patterns
function wouldCreateForbiddenCrossPattern(newFences, existingFences) {
    // Count directions for existing fences (from the same shape)
    const existingHorizontalCount = existingFences.filter(f => f.direction === 'horizontal').length;
    const existingVerticalCount = existingFences.filter(f => f.direction === 'vertical').length;
    
    // Count directions for new fences (from the same shape)
    const newHorizontalCount = newFences.filter(f => f.direction === 'horizontal').length;
    const newVerticalCount = newFences.filter(f => f.direction === 'vertical').length;
    
    // Forbidden pattern 1: Existing shape has left AND right fences (2 vertical lines)
    // and new shape has top AND/OR bottom fences (horizontal lines)
    if (existingVerticalCount >= 2 && newHorizontalCount >= 1) {
        // Check if existing shape actually has both left and right at this grid point
        const hasLeft = existingFences.some(f => f.position === 'left');
        const hasRight = existingFences.some(f => f.position === 'right');
        
        if (hasLeft && hasRight) {
            return true;
        }
    }
    
    // Forbidden pattern 2: Existing shape has top AND bottom fences (2 horizontal lines)
    // and new shape has left AND/OR right fences (vertical lines)
    if (existingHorizontalCount >= 2 && newVerticalCount >= 1) {
        // Check if existing shape actually has both top and bottom at this grid point
        const hasTop = existingFences.some(f => f.position === 'top');
        const hasBottom = existingFences.some(f => f.position === 'bottom');
        
        if (hasTop && hasBottom) {
            return true;
        }
    }
    
    // Forbidden pattern 3: New shape has left AND right fences (2 vertical lines)
    // and existing shape has top AND/OR bottom fences (horizontal lines)
    if (newVerticalCount >= 2 && existingHorizontalCount >= 1) {
        // Check if new shape actually has both left and right at this grid point
        const newHasLeft = newFences.some(f => f.position === 'left');
        const newHasRight = newFences.some(f => f.position === 'right');
        
        if (newHasLeft && newHasRight) {
            return true;
        }
    }
    
    // Forbidden pattern 4: New shape has top AND bottom fences (2 horizontal lines)
    // and existing shape has left AND/OR right fences (vertical lines)
    if (newHorizontalCount >= 2 && existingVerticalCount >= 1) {
        // Check if new shape actually has both top and bottom at this grid point
        const newHasTop = newFences.some(f => f.position === 'top');
        const newHasBottom = newFences.some(f => f.position === 'bottom');
        
        if (newHasTop && newHasBottom) {
            return true;
        }
    }
    
    return false;
}


// Initialize the game
initGame();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

