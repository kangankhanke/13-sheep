
let board = [];
let sheep = [];
let fences = new Set();
let selectedShape = null;
let currentDiceRoll = null;
let bushes = new Set(); // Store bush line positions
let rollsRemaining = 10;
let mustRollDice = true; // Player must roll dice before placing fence

//const placedFenceShapes = []; // global array to store placed fence shapes



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

// function initGame() {
//     board = Array(7).fill().map(() => Array(7).fill(null));
//     sheep = [];
//     fences = new Set();
    
//     // Place 13 sheep randomly
//     let positions = [];
//     for (let i = 0; i < 7; i++) {
//         for (let j = 0; j < 7; j++) {
//             positions.push([i, j]);
//         }
//     }
    
//     // Shuffle and pick 13 positions
//     for (let i = positions.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [positions[i], positions[j]] = [positions[j], positions[i]];
//     }
    
//     for (let i = 0; i < 13; i++) {
//         const [row, col] = positions[i];
//         board[row][col] = 'sheep';
//         sheep.push([row, col]);
//     }
//     createRandomBushes(); 
//     createBoard();
//     updateProtectedCount();
//     hideErrorMessage();
// }
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

// function rollDice() {
//     const dice = document.getElementById('dice');
//     const roll = Math.floor(Math.random() * 6) + 1;
//     currentDiceRoll = roll;
    
//     dice.textContent = roll;
//     dice.style.animation = 'roll 0.5s';
    
//     setTimeout(() => {
//         dice.style.animation = '';
//         showFenceOptions(roll);
//     }, 500);
    
//     hideErrorMessage();
// }
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Store placed shapes instead of just fence keys
const placedShapes = []; // Array to store {startRow, startCol, shape, roll, shapeIndex}


// Enhanced intersection detection function
function hasGridPointConflict(newStartRow, newStartCol, newShape) {
    // Get all grid points where the new shape has multiple fence lines meeting
    const newGridPoints = getGridPointsWithMultipleFences(newStartRow, newStartCol, newShape);
    
    // Check each existing placed shape
    for (const placedShape of placedShapes) {
        const existingGridPoints = getGridPointsWithMultipleFences(
            placedShape.startRow, 
            placedShape.startCol, 
            placedShape.shape
        );
        
        // Check if any grid points overlap
        for (const newPoint of newGridPoints) {
            for (const existingPoint of existingGridPoints) {
                if (newPoint.gridX === existingPoint.gridX && newPoint.gridY === existingPoint.gridY) {
                    // Same grid point has multiple fences from both shapes
                    // Check if they would create a cross pattern (perpendicular intersections)
                    if (wouldCreateCrossPattern(newPoint.fences, existingPoint.fences)) {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}

// Helper function to find grid points where a shape has multiple fence lines meeting
function getGridPointsWithMultipleFences(startRow, startCol, shape) {
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
                direction: getDirectionFromGridPoint(point, fence, row, col)
            });
        });
    });
    
    // Return only grid points that have multiple fences
    return Array.from(gridPointMap.values()).filter(point => point.fences.length > 1);
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

// Check if two sets of fence directions would create a cross pattern
function wouldCreateCrossPattern(newFences, existingFences) {
    const newHasHorizontal = newFences.some(f => f.direction === 'horizontal');
    const newHasVertical = newFences.some(f => f.direction === 'vertical');
    const existingHasHorizontal = existingFences.some(f => f.direction === 'horizontal');
    const existingHasVertical = existingFences.some(f => f.direction === 'vertical');
    
    // Cross pattern occurs when:
    // - New shape has both horizontal and vertical at this point, OR
    // - Existing shape has both horizontal and vertical at this point, OR  
    // - New shape has horizontal and existing has vertical, OR
    // - New shape has vertical and existing has horizontal
    return (newHasHorizontal && newHasVertical) ||
           (existingHasHorizontal && existingHasVertical) ||
           (newHasHorizontal && existingHasVertical) ||
           (newHasVertical && existingHasHorizontal);
}

// Updated showFencePreview function to include grid point conflict check
function showFencePreview(startRow, startCol) {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function isProtected(row, col) {
    // A sheep is protected if it's completely surrounded by fences or board edges
    const directions = ['top', 'bottom', 'left', 'right'];
    
    return directions.every(dir => {
        if (dir === 'top' && row === 0) return true;
        if (dir === 'bottom' && row === 6) return true;
        if (dir === 'left' && col === 0) return true;
        if (dir === 'right' && col === 6) return true;
        
        const fenceKey = `${row}-${col}-${dir}`;
        return fences.has(fenceKey);
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
    
    if (protectedCount === 13) {
        setTimeout(() => {
            alert('🎉 Congratulations! You protected all 13 sheep! 🎉');
        }, 100);
    }
}

// function newGame() {
//     initGame();
//     selectedShape = null;
//     currentDiceRoll = null;
//     document.getElementById('dice').textContent = '?';
//     document.getElementById('fenceShapes').innerHTML = '';
//     hideFencePreview();
// }
function newGame() {
    initGame();
    selectedShape = null;
    currentDiceRoll = null;
    document.getElementById('dice').textContent = '?';
    document.getElementById('fenceShapes').innerHTML = '';
    hideFencePreview();
}

// Initialize the game
initGame();













