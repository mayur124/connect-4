const GAME_STATUS = {
  STARTED: 0,
  FINISHED: 1,
};

const PLAYER_ID = {
  PLAYER_ONE: 1,
  PLAYER_TWO: 0,
};

class Connect4 {
  rowIndexes = [];
  currentPlayerId = PLAYER_ID.PLAYER_ONE;
  gameStatus = GAME_STATUS.STARTED;
  cells = [];

  constructor(rows = 6, cols = 6, gridId) {
    this.rows = rows;
    this.cols = cols;
    this.gridContainer = document.getElementById(gridId);
    this.gridContainer.addEventListener("click", this._handleClick.bind(this));
    this.rowIndexes = Array.from({ length: rows }, (_) => rows);
  }
  drawGrid() {
    const fragment = document.createDocumentFragment();
    for (let r = 0; r < this.rows; r++) {
      const tr = document.createElement("tr");
      if (!this.cells[r]) this.cells[r] = [];
      for (let c = 0; c < this.cols; c++) {
        const td = document.createElement("td");
        td.dataset["row"] = r;
        td.dataset["col"] = c;
        tr.appendChild(td);
        this.cells[r][c] = td;
      }
      fragment.appendChild(tr);
    }
    this.gridContainer.appendChild(fragment);
  }
  _getCell(row, col) {
    return this.cells[row][col];
  }
  putCoinInGrid(cell) {
    cell.textContent = this.currentPlayerId;
  }
  updateRowIndexes(cell) {
    const { col } = cell.dataset;
    this.rowIndexes[+col]--;
  }
  _announceWinner(playerId) {
    alert(`Player ${playerId} won`);
    this.gameStatus = GAME_STATUS.FINISHED;
  }
  _announceDraw() {
    alert("Game Draw");
    this.gameStatus = GAME_STATUS.FINISHED;
  }
  // prettier-ignore
  checkWinner() {
    // horizontal
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols - 3; j++) {
        let p1Count = 0, p2Count = 0;
        const cells = [];
        cells.push(this._getCell(i, j));
        cells.push(this._getCell(i, j + 1));
        cells.push(this._getCell(i, j + 2));
        cells.push(this._getCell(i, j + 3));
        cells.forEach(cell => {
          if (!cell) return;
          if (cell.textContent !== "") {
            const playerId = +cell.textContent;
            if (playerId === PLAYER_ID.PLAYER_ONE) p1Count++;
            if (playerId === PLAYER_ID.PLAYER_TWO) p2Count++;
            if (p1Count >= 4) {
              this._announceWinner(PLAYER_ID.PLAYER_ONE);
              return;
            }
            if (p2Count >= 4) {
              this._announceWinner(PLAYER_ID.PLAYER_TWO);
              return;
            }
          }
        });
      }
    }
    
    // vertical
    for (let j = 0; j < this.cols; j++) {
      for (let i = 0; i < this.rows - 3; i++) {
        let p1Count = 0, p2Count = 0;
        const cells = [];
        cells.push(this._getCell(i, j));
        cells.push(this._getCell(i + 1, j));
        cells.push(this._getCell(i + 2, j));
        cells.push(this._getCell(i + 3, j));
        cells.forEach(cell => {
          if (!cell) return;
          if (cell.textContent !== "") {
            const playerId = +cell.textContent;
            if (playerId === PLAYER_ID.PLAYER_ONE) p1Count++;
            if (playerId === PLAYER_ID.PLAYER_TWO) p2Count++;
          }
          if (p1Count >= 4) {
            this._announceWinner(PLAYER_ID.PLAYER_ONE);
            return;
          }
          if (p2Count >= 4) {
            this._announceWinner(PLAYER_ID.PLAYER_TWO);
            return;
          }
        });
      }
    }
    
    // diagonal top-left to bottom-right
    for (let i = 0; i < this.rows - 3; i++) {
      for (let j = 0; j < this.cols - 3; j++) {
        let p1Count = 0, p2Count = 0;
        const cells = [];
        cells.push(this._getCell(i, j));
        cells.push(this._getCell(i + 1, j + 1));
        cells.push(this._getCell(i + 2, j + 2));
        cells.push(this._getCell(i + 3, j + 3));
        cells.forEach(cell => {
          if (!cell) return;
          if (cell.textContent !== "") {
            const playerId = +cell.textContent;
            if (playerId === PLAYER_ID.PLAYER_ONE) p1Count++;
            if (playerId === PLAYER_ID.PLAYER_TWO) p2Count++;
          }
          if (p1Count >= 4) {
            this._announceWinner(PLAYER_ID.PLAYER_ONE);
            return;
          }
          if (p2Count >= 4) {
            this._announceWinner(PLAYER_ID.PLAYER_TWO);
            return;
          }
        });
      }
    }
    
    // diagonal top-right to bottom-left
    for (let i = 0; i < this.rows - 3; i++) {
      for (let j = 3; j < this.cols; j++) {
        let p1Count = 0, p2Count = 0;
        const cells = [];
        cells.push(this._getCell(i, j));
        cells.push(this._getCell(i + 1, j - 1));
        cells.push(this._getCell(i + 2, j - 2));
        cells.push(this._getCell(i + 3, j - 3));
        cells.forEach(cell => {
          if (!cell) return;
          if (cell.textContent !== "") {
            const playerId = +cell.textContent;
            if (playerId === PLAYER_ID.PLAYER_ONE) p1Count++;
            if (playerId === PLAYER_ID.PLAYER_TWO) p2Count++;
          }
          if (p1Count >= 4) {
            this._announceWinner(PLAYER_ID.PLAYER_ONE);
            return;
          }
          if (p2Count >= 4) {
            this._announceWinner(PLAYER_ID.PLAYER_TWO);
            return;
          }
        });
      }
    }
  }
  checkDraw() {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this._getCell(i, j);
        if (cell.textContent === "") return;
      }
    }
    this._announceDraw();
  }
  togglePlayer() {
    this.currentPlayerId =
      this.currentPlayerId === PLAYER_ID.PLAYER_ONE
        ? PLAYER_ID.PLAYER_TWO
        : PLAYER_ID.PLAYER_ONE;
  }
  _handleClick(e) {
    // prettier-ignore
    if (e.target.nodeName !== "TD" || this.gameStatus !== GAME_STATUS.STARTED) return;
    const { row, col } = e.target.dataset;
    if (this.rowIndexes[+col] <= 0) return;
    this.updateRowIndexes(e.target);
    const cell = this._getCell(this.rowIndexes[+col], col);
    this.putCoinInGrid(cell);
    this.togglePlayer();
    this.checkWinner(+row, +col);
  }
}

const game = new Connect4(6, 6, "grid");
game.drawGrid();
