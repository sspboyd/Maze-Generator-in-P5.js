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

}

function draw() {
    background(47);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    var next = current.checkNeighbours();
    if (next) {
        next.visited = true;
        current = next;
    }else{
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
            fill(123, 0, 199);
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
}
