let board = [];
let sheep = [];
let fences = new Set();
let selectedShape = null;
let currentDiceRoll = null;
let bushes = new Set(); // Store bush line positions
let rollsRemaining = 10;
let mustRollDice = true; // Player must roll dice before placing fence
// Store the initial game state for replay option
let initialSheepPositions = [];
let initialBushes = new Set();

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
function replayGame() {
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
    
    // Restore the same sheep positions
    for (let i = 0; i < initialSheepPositions.length; i++) {
        const [row, col] = initialSheepPositions[i];
        board[row][col] = 'sheep';
        sheep.push([row, col]);
    }
    
    // Restore the same bush positions
    bushes = new Set(initialBushes);
    
    createBoard();
    updateProtectedCount();
    hideErrorMessage();
    
    // Reset dice and shapes display
    document.getElementById('dice').textContent = '?';
    document.getElementById('fenceShapes').innerHTML = '';
    hideFencePreview();
}

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
    
    // Store initial positions for replay
    initialSheepPositions = [...sheep];
    
    createRandomBushes();
    
    // Store initial bushes for replay
    initialBushes = new Set(bushes);
    
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
        
        // Calculate the bounding box of the shape to center it
        let minRow = Infinity, maxRow = -Infinity;
        let minCol = Infinity, maxCol = -Infinity;
        
        shape.forEach(fence => {
            minRow = Math.min(minRow, fence.row);
            maxRow = Math.max(maxRow, fence.row);
            minCol = Math.min(minCol, fence.col);
            maxCol = Math.max(maxCol, fence.col);
        });
        
        // Calculate the center offset for the shape
        const shapeWidth = (maxCol - minCol + 1) * 20;
        const shapeHeight = (maxRow - minRow + 1) * 20;
        
        // Assuming the shape-option button is around 60px x 60px (adjust as needed)
        const buttonWidth = 60;
        const buttonHeight = 60;
        
        const offsetX = (buttonWidth - shapeWidth) / 2 - minCol * 20;
        const offsetY = (buttonHeight - shapeHeight) / 2 - minRow * 20;
        
        // Draw the shape preview with centering offset
        shape.forEach(fence => {
            const fenceEl = document.createElement('div');
            fenceEl.className = 'shape-fence';
            
            if (fence.type === 'horizontal') {
                fenceEl.style.width = '20px';
                fenceEl.style.height = '3px';
                fenceEl.style.left = (fence.col * 20 + 10 + offsetX) + 'px';
                fenceEl.style.top = fence.position === 'top' ? 
                    (fence.row * 20 + 8 + offsetY) + 'px' : 
                    (fence.row * 20 + 29 + offsetY) + 'px';
            } else {
                fenceEl.style.width = '3px';
                fenceEl.style.height = '20px';
                fenceEl.style.top = (fence.row * 20 + 10 + offsetY) + 'px';
                fenceEl.style.left = fence.position === 'left' ? 
                    (fence.col * 20 + 8 + offsetX) + 'px' : 
                    (fence.col * 20 + 29 + offsetX) + 'px';
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

// Add undo stack for placed shapes
const undoStack = [];

function undoLastFencePlacement() {
    if (placedShapes.length === 0) return;
    // Only allow undo if mustRollDice is true (i.e. after a placement, before next roll)
    if (mustRollDice) {
        // Remove last placed shape
        const last = placedShapes.pop();
        // Remove all fences for this shape
        last.shape.forEach(fence => {
            const row = last.startRow + fence.row;
            const col = last.startCol + fence.col;
            const fenceKey1 = `${row}-${col}-${fence.position}`;
            fences.delete(fenceKey1);
            // Remove adjacent/opposite fence
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
            fences.delete(fenceKey2);
        });
        // Restore mustRollDice = false so player can select a different shape
        mustRollDice = false;
        selectedShape = { roll: last.roll, shapeIndex: null };
        updateFenceDisplay();
        updateProtectedCount();
        hideFencePreview();
        hideErrorMessage();
        // Optionally, show fence options for the same roll again
        showFenceOptions(last.roll);
    }
}

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

// function createRandomBushes() {
//     bushes.clear();
    
//     // Create a set of forbidden bush positions based on edge sheep
//     const forbiddenBushes = new Set();
    
//     sheep.forEach(([row, col]) => {
//         // Sheep on top edge (row 0) - forbid horizontal bush above it
//         if (row === 0) {
//             forbiddenBushes.add(`0-${col}-horizontal`);
//         }
        
//         // Sheep on bottom edge (row 6) - forbid horizontal bush below it
//         if (row === 6) {
//             forbiddenBushes.add(`7-${col}-horizontal`);
//         }
        
//         // Sheep on left edge (column 0) - forbid vertical bush to its left
//         if (col === 0) {
//             forbiddenBushes.add(`${row}-0-vertical`);
//         }
        
//         // Sheep on right edge (column 6) - forbid vertical bush to its right
//         if (col === 6) {
//             forbiddenBushes.add(`${row}-7-vertical`);
//         }
//     });
    
//     // Generate 8-12 random bush lines, avoiding forbidden positions
//     const numBushes = Math.floor(Math.random() * 5) + 8;
//     let attempts = 0;
//     const maxAttempts = 100; // Prevent infinite loops
    
//     while (bushes.size < numBushes && attempts < maxAttempts) {
//         const isHorizontal = Math.random() < 0.5;
//         let bushKey;
        
//         if (isHorizontal) {
//             const row = Math.floor(Math.random() * 8); // 0-7 for horizontal lines
//             const col = Math.floor(Math.random() * 7); // 0-6 for horizontal lines
//             bushKey = `${row}-${col}-horizontal`;
//         } else {
//             const row = Math.floor(Math.random() * 7); // 0-6 for vertical lines
//             const col = Math.floor(Math.random() * 8); // 0-7 for vertical lines
//             bushKey = `${row}-${col}-vertical`;
//         }
        
//         // Only add the bush if it's not forbidden and not already present
//         if (!forbiddenBushes.has(bushKey) && !bushes.has(bushKey)) {
//             bushes.add(bushKey);
//         }
        
//         attempts++;
//     }
    
//     // If we couldn't generate enough bushes due to restrictions, 
//     // fill remaining spots with non-forbidden positions
//     while (bushes.size < numBushes && attempts < maxAttempts * 2) {
//         const isHorizontal = Math.random() < 0.5;
//         let bushKey;
        
//         if (isHorizontal) {
//             const row = Math.floor(Math.random() * 8);
//             const col = Math.floor(Math.random() * 7);
//             bushKey = `${row}-${col}-horizontal`;
//         } else {
//             const row = Math.floor(Math.random() * 7);
//             const col = Math.floor(Math.random() * 8);
//             bushKey = `${row}-${col}-vertical`;
//         }
        
//         if (!forbiddenBushes.has(bushKey) && !bushes.has(bushKey)) {
//             bushes.add(bushKey);
//         }
        
//         attempts++;
//     }
// }
function createRandomBushes() {
    bushes.clear();
    
    // Create a set of forbidden bush positions based on edge sheep
    const forbiddenBushes = new Set();
    
    sheep.forEach(([row, col]) => {
        // Sheep on top edge (row 0) - forbid horizontal bush above it
        if (row === 0) {
            forbiddenBushes.add(`0-${col}-horizontal`);
        }
        
        // Sheep on bottom edge (row 6) - forbid horizontal bush below it
        if (row === 6) {
            forbiddenBushes.add(`7-${col}-horizontal`);
        }
        
        // Sheep on left edge (column 0) - forbid vertical bush to its left
        if (col === 0) {
            forbiddenBushes.add(`${row}-0-vertical`);
        }
        
        // Sheep on right edge (column 6) - forbid vertical bush to its right
        if (col === 6) {
            forbiddenBushes.add(`${row}-7-vertical`);
        }
    });
    
    // Helper function to check if a bush configuration creates a path from sheep to edge
    function createsBadPath(candidateBushes) {
        // For each sheep, check if there's a path from adjacent positions to any edge
        for (const [sheepRow, sheepCol] of sheep) {
            const adjacentPositions = [
                `${sheepRow}-${sheepCol}-horizontal`,
                `${sheepRow + 1}-${sheepCol}-horizontal`,
                `${sheepRow}-${sheepCol}-vertical`,
                `${sheepRow}-${sheepCol + 1}-vertical`
            ].filter(pos => candidateBushes.has(pos));
            
            // For each adjacent bush position, check if it connects to an edge
            for (const startPos of adjacentPositions) {
                if (hasPathToEdge(startPos, candidateBushes)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // Helper function to check if a bush position connects to any edge via other bushes
    function hasPathToEdge(startPos, candidateBushes) {
        const visited = new Set();
        const queue = [startPos];
        
        while (queue.length > 0) {
            const currentPos = queue.shift();
            
            if (visited.has(currentPos)) continue;
            visited.add(currentPos);
            
            const [row, col, type] = currentPos.split('-');
            const rowNum = parseInt(row);
            const colNum = parseInt(col);
            
            // Check if current position is at an edge
            if (isEdgePosition(rowNum, colNum, type)) {
                return true;
            }
            
            // Get connected bush positions
            const connected = getConnectedBushes(rowNum, colNum, type, candidateBushes);
            for (const connectedPos of connected) {
                if (!visited.has(connectedPos)) {
                    queue.push(connectedPos);
                }
            }
        }
        
        return false;
    }
    
    // Helper function to check if a bush position is at a board edge
    function isEdgePosition(row, col, type) {
        if (type === 'horizontal') {
            return row === 0 || row === 7;
        } else { // vertical
            return col === 0 || col === 7;
        }
    }
    
    // Helper function to get connected bush positions
    function getConnectedBushes(row, col, type, candidateBushes) {
        const connected = [];
        
        if (type === 'horizontal') {
            // Horizontal bush can connect to vertical bushes at its endpoints
            // Left endpoint (row, col)
            if (candidateBushes.has(`${row}-${col}-vertical`)) {
                connected.push(`${row}-${col}-vertical`);
            }
            if (row > 0 && candidateBushes.has(`${row-1}-${col}-vertical`)) {
                connected.push(`${row-1}-${col}-vertical`);
            }
            
            // Right endpoint (row, col+1)
            if (candidateBushes.has(`${row}-${col+1}-vertical`)) {
                connected.push(`${row}-${col+1}-vertical`);
            }
            if (row > 0 && candidateBushes.has(`${row-1}-${col+1}-vertical`)) {
                connected.push(`${row-1}-${col+1}-vertical`);
            }
        } else { // vertical
            // Vertical bush can connect to horizontal bushes at its endpoints
            // Top endpoint (row, col)
            if (candidateBushes.has(`${row}-${col}-horizontal`)) {
                connected.push(`${row}-${col}-horizontal`);
            }
            if (col > 0 && candidateBushes.has(`${row}-${col-1}-horizontal`)) {
                connected.push(`${row}-${col-1}-horizontal`);
            }
            
            // Bottom endpoint (row+1, col)
            if (candidateBushes.has(`${row+1}-${col}-horizontal`)) {
                connected.push(`${row+1}-${col}-horizontal`);
            }
            if (col > 0 && candidateBushes.has(`${row+1}-${col-1}-horizontal`)) {
                connected.push(`${row+1}-${col-1}-horizontal`);
            }
        }
        
        return connected;
    }
    
    // Generate bushes with path checking
    const numBushes = Math.floor(Math.random() * 5) + 8;
    let attempts = 0;
    const maxAttempts = 1000;
    
    while (bushes.size < numBushes && attempts < maxAttempts) {
        const isHorizontal = Math.random() < 0.5;
        let bushKey;
        
        if (isHorizontal) {
            const row = Math.floor(Math.random() * 8);
            const col = Math.floor(Math.random() * 7);
            bushKey = `${row}-${col}-horizontal`;
        } else {
            const row = Math.floor(Math.random() * 7);
            const col = Math.floor(Math.random() * 8);
            bushKey = `${row}-${col}-vertical`;
        }
        
        // Check if this bush is forbidden or already exists
        if (forbiddenBushes.has(bushKey) || bushes.has(bushKey)) {
            attempts++;
            continue;
        }
        
        // Temporarily add the bush and check if it creates a bad path
        const testBushes = new Set(bushes);
        testBushes.add(bushKey);
        
        if (!createsBadPath(testBushes)) {
            bushes.add(bushKey);
        }
        
        attempts++;
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
    // Count horizontal and vertical fences from each array
    const newHorizontal = newFences.filter(f => f.direction === 'horizontal').length;
    const newVertical = newFences.filter(f => f.direction === 'vertical').length;
    const existingHorizontal = existingFences.filter(f => f.direction === 'horizontal').length;
    const existingVertical = existingFences.filter(f => f.direction === 'vertical').length;
    
    // Check for forbidden patterns:
    
    // // 1. Two or more horizontal fences at the same grid point
    // if (newHorizontal > 0 && existingHorizontal > 0) {
    //     return true; // Forbidden: two horizontal connections at same point
    // }
    
    // // 2. Two or more vertical fences at the same grid point
    // if (newVertical > 0 && existingVertical > 0) {
    //     return true; // Forbidden: two vertical connections at same point
    // }
    
    // 3. Special case for roll 2, 3, 4: 
    // Check if this grid point is a connector of parallel fences
    const isNewConnector = isParallelConnector(newFences);
    const isExistingConnector = isParallelConnector(existingFences);
    
    // If both are parallel connectors, don't allow them to coincide
    if (isNewConnector && isExistingConnector) {
        return true;
    }
    
    // Otherwise the pattern is allowed
    return false;
}

// Helper function to detect if fences represent a parallel connector
function isParallelConnector(fences) {
    // For roll 2: we have exactly 2 fences of the same direction
    if (fences.length === 2) {
        const directions = fences.map(f => f.direction);
        // If both have the same direction, it's a parallel connector
        return directions[0] === directions[1];
    }
    
    // For roll 3 & 4: detect if two parallel fences are connected by a perpendicular one
    // These are L shapes and inverted L shapes with junction points
    if (fences.length === 3) {
        const horizontalCount = fences.filter(f => f.direction === 'horizontal').length;
        const verticalCount = fences.filter(f => f.direction === 'vertical').length;
        
        // If we have 2 of one direction and 1 of the other, check positions
        if ((horizontalCount === 2 && verticalCount === 1) || 
            (horizontalCount === 1 && verticalCount === 2)) {
            // This is likely a connector in an L shape
            return true;
        }
    }
    
    return false;
}


// Initialize the game
initGame();

// Modal functions
        function openInstructions() {
            document.getElementById('instructionsModal').style.display = 'block';
        }

        function closeInstructions() {
            document.getElementById('instructionsModal').style.display = 'none';
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            const modal = document.getElementById('instructionsModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

    // Function to create visual representation of fence shapes
function createReferenceShapes() {
    const fenceShapes = {
        1: [
            // U-shape orientations
            [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'right'}], // Top, Bottom, Right
            
        ],
        2: [
            // Long line orientations
            [{type: 'horizontal', row: 0, col: 0, position: 'top'}, {type: 'horizontal', row: 0, col: 1, position: 'top'}], // Horizontal line across two cells top
            
        ],
        3: [
            // L-shape orientations
            [{type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'vertical', row: -1, col: 0, position: 'left'}], // Bottom, Left, Left-above
            ],
        4: [
            // Inverted L-shape orientations
            [{type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'vertical', row: -1, col: 0, position: 'right'}], // Bottom, Right, Right-above
             ],
        5: [
            // Roll 5 - Two orientations
            [{type: 'vertical', row: 0, col: 0, position: 'left'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 1, col: 0, position: 'right'}], // Left, Bottom, Right-below
             ],
        6: [
            // Roll 6 - Two orientations
            [{type: 'vertical', row: 0, col: 0, position: 'right'}, {type: 'horizontal', row: 0, col: 0, position: 'bottom'}, {type: 'vertical', row: 1, col: 0, position: 'left'}], // Right, Bottom, Left-below
             ]
    };

    // Helper function to calculate fence position and size for reference display
    function calculateReferenceFenceStyle(fence, cellSize = 60) {
        const baseRow = 0;
        const baseCol = 0;
        
        let left, top, width, height;
        
        if (fence.type === 'horizontal') {
            width = cellSize;
            height = 4;
            left = (baseCol + fence.col) * cellSize;
            
            if (fence.position === 'top') {
                top = (baseRow + fence.row) * cellSize - 2;
            } else { // bottom
                top = (baseRow + fence.row + 1) * cellSize - 2;
            }
        } else { // vertical
            width = 4;
            height = cellSize;
            top = (baseRow + fence.row) * cellSize;
            
            if (fence.position === 'left') {
                left = (baseCol + fence.col) * cellSize - 2;
            } else { // right
                left = (baseCol + fence.col + 1) * cellSize - 2;
            }
        }
        
        return { left, top, width, height };
    }

    // Create reference shapes for each dice number
    Object.keys(fenceShapes).forEach(diceNum => {
        const container = document.getElementById(`shapes-${diceNum}`);
        if (!container) return;
        
        container.innerHTML = ''; // Clear existing content
        
        fenceShapes[diceNum].forEach((shape, index) => {
            // Create shape container
            const shapeDiv = document.createElement('div');
            shapeDiv.className = 'reference-shape';
            
            // Calculate the bounds to center the shape
            let minRow = 0, maxRow = 0, minCol = 0, maxCol = 0;
            
            shape.forEach(fence => {
                const row = fence.row;
                const col = fence.col;
                
                if (fence.type === 'horizontal' && fence.col === 1) {
                    maxCol = Math.max(maxCol, col + 1);
                } else if (fence.type === 'vertical' && fence.row === -1) {
                    minRow = Math.min(minRow, row);
                } else if (fence.type === 'vertical' && fence.row === 1) {
                    maxRow = Math.max(maxRow, row + 1);
                } else if (fence.type === 'horizontal' && fence.col === -1) {
                    minCol = Math.min(minCol, col);
                }
                
                minRow = Math.min(minRow, row);
                maxRow = Math.max(maxRow, row);
                minCol = Math.min(minCol, col);
                maxCol = Math.max(maxCol, col);
            });
            
            // Calculate scaling to fit in 60x60 container
            const shapeWidth = (maxCol - minCol + 1) * 20; // 20px per cell in reference
            const shapeHeight = (maxRow - minRow + 1) * 20;
            const scale = Math.min(60 / shapeWidth, 60 / shapeHeight, 1);
            const cellSize = 20 * scale;
            
            // Center offset
            const offsetX = (60 - (maxCol - minCol + 1) * cellSize) / 2;
            const offsetY = (60 - (maxRow - minRow + 1) * cellSize) / 2;
            
            // Add fences to shape
            shape.forEach(fence => {
                const fenceDiv = document.createElement('div');
                fenceDiv.className = 'reference-fence';
                
                let left, top, width, height;
                
                if (fence.type === 'horizontal') {
                    width = cellSize;
                    height = 2 * scale;
                    left = (fence.col - minCol) * cellSize + offsetX;
                    
                    if (fence.position === 'top') {
                        top = (fence.row - minRow) * cellSize - scale + offsetY;
                    } else { // bottom
                        top = (fence.row - minRow + 1) * cellSize - scale + offsetY;
                    }
                } else { // vertical
                    width = 2 * scale;
                    height = cellSize;
                    top = (fence.row - minRow) * cellSize + offsetY;
                    
                    if (fence.position === 'left') {
                        left = (fence.col - minCol) * cellSize - scale + offsetX;
                    } else { // right
                        left = (fence.col - minCol + 1) * cellSize - scale + offsetX;
                    }
                }
                
                fenceDiv.style.left = `${left}px`;
                fenceDiv.style.top = `${top}px`;
                fenceDiv.style.width = `${width}px`;
                fenceDiv.style.height = `${height}px`;
                
                shapeDiv.appendChild(fenceDiv);
            });
            
            container.appendChild(shapeDiv);
        });
    });
}

// Call this function when the page loads or when you want to initialize the reference shapes
document.addEventListener('DOMContentLoaded', function() {
    createReferenceShapes();
});

// You can also call it manually if needed
// createReferenceShapes();    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function downloadPrintableBoard() {
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (A4 proportion, scaled for good quality)
    canvas.width = 600;
    canvas.height = 600;
    
    // Fill background with white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw game board background (white for B&W printing)
    ctx.fillStyle = 'white';
    ctx.fillRect(50, 50, 500, 500);
    
    // Draw grid points at intersections (no grid lines, just crosses)
    ctx.fillStyle = 'black';
    const cellSize = 500 / 7;
    
    for (let row = 0; row <= 7; row++) {
        for (let col = 0; col <= 7; col++) {
            const x = 50 + col * cellSize;
            const y = 50 + row * cellSize;
            
            // Draw cross at each grid point
            ctx.fillRect(x - 4, y - 1, 8, 2);
            ctx.fillRect(x - 1, y - 4, 2, 8);
        }
    }
    
    // Draw sheep using grid coordinates instead of screen coordinates
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    
    // Get sheep positions from the current game board using data attributes or grid position
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        if (cell.textContent === '🐑') {
            // Calculate grid position from cell index (7x7 grid of cells)
            const row = Math.floor(index / 7);
            const col = index % 7;
            
            // Convert grid coordinates to canvas coordinates (center of cell)
            const cellSize = 500 / 7; // Each cell is 500/7 pixels
            const canvasX = 50 + col * cellSize + cellSize / 2; // Center of cell
            const canvasY = 50 + row * cellSize + cellSize / 2; // Center of cell
            
            ctx.fillText('🐑', canvasX, canvasY);
        }
    });
    
    // Draw bushes on the edges between cells (black dotted lines)
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0;
    ctx.setLineDash([8, 4]); // Dotted line pattern
    
    // Parse bush positions from DOM
    const bushLines = document.querySelectorAll('.bush-line');
    bushLines.forEach(bush => {
        // Get the bush's position relative to the game board
        const gameBoard = document.getElementById('gameBoard');
        const bushRect = bush.getBoundingClientRect();
        const boardRect = gameBoard.getBoundingClientRect();
        
        // Calculate which edge this bush is on
        const relativeLeft = bushRect.left - boardRect.left;
        const relativeTop = bushRect.top - boardRect.top;
        const relativeWidth = bushRect.width;
        const relativeHeight = bushRect.height;
        
        // Determine if it's horizontal or vertical and calculate grid position
        if (bush.classList.contains('bush-horizontal')) {
            // Horizontal bush - spans between two cells horizontally
            const row = Math.round((relativeTop - 10) / (420 / 7)); // 420 is the board size, 10 is padding
            const col = Math.round((relativeLeft - 10) / (420 / 7));
            
            // Draw horizontal line on the edge between cells
            const y = 50 + row * cellSize;
            const startX = 50 + col * cellSize;
            const endX = startX + cellSize;
            
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            
            // Draw tree emoji centered on the line
            ctx.setLineDash([]); // Reset to solid line for text
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial'; // Slightly smaller font for better fit
            ctx.fillText('🌳', startX + cellSize/2, y);
            ctx.setLineDash([8, 4]); // Back to dotted
            
        } else if (bush.classList.contains('bush-vertical')) {
            // Vertical bush - spans between two cells vertically
            const row = Math.round((relativeTop - 10) / (420 / 7));
            const col = Math.round((relativeLeft - 10) / (420 / 7));
            
            // Draw vertical line on the edge between cells
            const x = 50 + col * cellSize;
            const startY = 50 + row * cellSize;
            const endY = startY + cellSize;
            
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();
            
            // Draw tree emoji centered on the line
            ctx.setLineDash([]); // Reset to solid line for text
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial'; // Slightly smaller font for better fit
            ctx.fillText('🌳', x, startY + cellSize/2);
            ctx.setLineDash([8, 4]); // Back to dotted
        }
    });
    
    // Reset line dash
    ctx.setLineDash([]);
    
    // Add title
    ctx.fillStyle = 'black';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('13 Sheep - Printable Board', canvas.width/2, 30);
    
    // Add instructions at the bottom (updated to reflect no emojis)
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
   
    
    // Convert canvas to image and download
    const link = document.createElement('a');
    link.download = '13-sheep-board.png';
    link.href = canvas.toDataURL('image/png');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show confirmation message
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'block';
    errorDiv.style.background = 'rgba(34, 139, 34, 0.1)';
    errorDiv.style.color = '#228b22';
    errorDiv.style.borderLeft = '3px solid #228b22';
    errorDiv.textContent = 'Printable board downloaded successfully!';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
        // Reset error message styling
        errorDiv.style.background = 'rgba(255, 69, 0, 0.1)';
        errorDiv.style.color = '#cc2900';
        errorDiv.style.borderLeft = '3px solid #ff4500';
    }, 3000);
}
