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
