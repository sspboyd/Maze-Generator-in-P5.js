var rows, cols;
var w = 10;
var grid = [];
var current;

var stack = [];

function setup() {
    createCanvas(400, 400);
    cols = floor(width / w);
    rows = floor(height / w);

    for (j = 0; j < rows; j++) {
        for (i = 0; i < cols; i++) {
            c = new Cell(i, j);
            grid.push(c);

        }
    }
    current = grid[0];
    // frameRate(7);

}

function draw() {
    background(47);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    // Step 1
    var next = current.checkNeighbours();
    if (next) {
        next.visited = true;

        //Step 2
        stack.push(current);

        // Step 3
        removeWalls(current, next);
        //Step 4
        current = next;
    } else if(stack.length>0){
        console.log("No more neighbours...");
        current = stack.pop();

    }
}

function gridIndex(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    } else {
        return i + (j * cols);
    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}
