export default class Game {
    constructor(app) {
        Object.assign(this, { app, size: 40, speed: 1, color: 0xFF0000, bgColor: 0xFFFFFF })
        this.count = this.speed;
        this.scale();
        this.grid = new Array(this.size).fill(null).map(
            () => new Array(this.size).fill(null).map(() => [Math.random() > 0.5, new PIXI.Graphics()])
        );
        this.grid.forEach(row => row.forEach(cell => this.app.stage.addChild(cell[1])))
    }
    evolve = () => this.grid = this.grid.map(
        (row, i) => row.map(
            (cell, j) => [cell,
                [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].map(n => [i + n[0], j + n[1]])
                    .filter(n => n[0] !== -1 && n[1] !== -1
                        && n[0] !== this.grid.length && n[1] !== this.grid[i].length
                        && this.grid[n[0]][n[1]][0]).length])
            .map(c => [(c[0][0] && c[1] < 2) || (c[0][0] && c[1] > 3) ? false :
                !c[0][0] && c[1] === 3 ? true : c[0][0], c[0][1]])
    )
    scale = () => ['width', 'height'].forEach(s =>
        this[s] = Math.round(this.app.renderer[s] / this.app.renderer.resolution / this.size)
    )
    drawGrid = () =>
        this.grid.forEach((row, i) =>
            row.forEach((gr, j) => gr[1].clear().beginFill(gr[0] ? this.color : this.bgColor)
                .drawRect(i * this.width, j * this.height, this.width, this.height).endFill()))
    renderFrame(timeDiff) {
        this.count -= timeDiff;
        if (this.count < 0) {
            this.count = this.speed;
            this.evolve();
            this.drawGrid();
        }
    }
}
