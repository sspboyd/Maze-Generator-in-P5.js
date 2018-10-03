var rows, cols;
var w = 40;
var grid = [];
var current;

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
    frameRate(7);

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

        // Step 3
        removeWalls(current, next);
        //Step 4
        current = next;
    } else {
        noLoop();
        console.log("No more neighbours...");
    }
}

function gridIndex(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    } else {
        return i + (j * cols);
    }
}

function Cell(i, j) {
    this.i = i; // cols
    this.j = j; // rows
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.visited = false;

    this.show = function() {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y); // top
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w); // right side?
        }
        if (this.walls[2]) {
            line(x, y + w, x + w, y + w); // bottom
        }
        if (this.walls[3]) {
            line(x, y, x, y + w); // left side
        }

        if (this.visited) {
            noStroke();
            fill(123, 0, 199,123);
            rect(x, y, w, w);
        }
    }

    this.checkNeighbours = function() {
        var neighbours = [];

        var topCell = grid[gridIndex(i, j - 1)];
        var rightCell = grid[gridIndex(i + 1, j)];
        var btmCell = grid[gridIndex(i, j + 1)];
        var leftCell = grid[gridIndex(i - 1, j)];

        if (topCell && !topCell.visited) {
            neighbours.push(topCell);
        }
        if (rightCell && !rightCell.visited) {
            neighbours.push(rightCell);
        }
        if (btmCell && !btmCell.visited) {
            neighbours.push(btmCell);
        }
        if (leftCell && !leftCell.visited) {
            neighbours.push(leftCell);
        }

        if (neighbours.length > 0) {
            return neighbours[Math.floor(Math.random() * neighbours.length)];
        } else {
            return undefined;
        }
    }
    this.highlight = function(){
        let x = this.i*w;
        let y = this.j*w;
        noStroke();
        fill(0,47,199);
        rect(x,y,w,w);
    }
}


function removeWalls(a, b) {
    var x = a.i - b.i;
console.log(x);
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











