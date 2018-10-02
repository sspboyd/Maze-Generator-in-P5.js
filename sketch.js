var rows, cols;
var w = 40;
var grid = [];


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

}

function draw() {
    background(47);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function Cell(i, j) {
    this.i = i; // cols
    this.j = j; // rows
    this.walls = [true, true, true, true]; // top, right, bottom, left

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
            line(x, y + w, x + w, y + w); // bottom }       if (this.walls[0]) {
        }
        if (this.walls[3]) {
            line(x, y, x, y + w); // left side
        } // noFill();
        // rect(x, y, w, w);

    }


}
