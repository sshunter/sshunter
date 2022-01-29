/*! bcc-magic v0.2.1 | (c) 2022 Sam Hunter | All Rights Reserved | https://github.com/sshunter/bcc-magic.git */
(function () {
  'use strict';

  var GameBoard = /** @class */ (function () {
      function GameBoard() {
          this.dimensions = 3;
          this.colors = [GameBoard.RED, GameBoard.WHITE, GameBoard.BLUE];
          this.grid = new Array(this.dimensions);
          for (var r = 0; r < this.dimensions; ++r) {
              this.grid[r] = new Array(this.dimensions).fill(GameBoard.WHITE);
          }
      }
      // For testing at this point, so make sure it's a deep copy, even if it's
      // not very efficient
      GameBoard.prototype.getGrid = function () {
          return JSON.parse(JSON.stringify(this.grid));
      };
      GameBoard.prototype.shuffle = function () {
          for (var r = 0; r < this.grid.length; ++r) {
              for (var c = 0; c < this.grid[r].length; ++c) {
                  this.grid[r][c] =
                      this.colors[Math.floor(Math.random() * this.colors.length)];
              }
          }
      };
      GameBoard.prototype.advance_color = function (color) {
          var originalIndex = Math.max(0, this.colors.indexOf(color));
          var newIndex = (originalIndex + 1) % this.colors.length;
          return this.colors[newIndex];
      };
      GameBoard.prototype.tap_one = function (row, column) {
          if (row < 0 ||
              row >= this.dimensions ||
              column < 0 ||
              column >= this.dimensions) {
              return;
          }
          this.grid[row][column] = this.advance_color(this.grid[row][column]);
      };
      GameBoard.prototype.tap = function (row, column) {
          this.tap_one(row, column);
          this.tap_one(row - 1, column); // N
          this.tap_one(row, column - 1); // W
          this.tap_one(row + 1, column); // S
          this.tap_one(row, column + 1); // E
      };
      GameBoard.prototype.isSolved = function () {
          var color = this.grid[0][0];
          for (var r = 0; r < this.grid.length; ++r) {
              for (var c = 0; c < this.grid[r].length; ++c) {
                  if (this.grid[r][c] !== color) {
                      return false;
                  }
              }
          }
          return true;
      };
      GameBoard.RED = "red";
      GameBoard.WHITE = "white";
      GameBoard.BLUE = "blue";
      return GameBoard;
  }());

  var boardView = document.querySelector("#board");
  var buttons = boardView.querySelectorAll(".gameboard__button");
  var gb = new GameBoard();
  function updateBoard() {
      var _a;
      var grid = gb.getGrid();
      for (var i = 0; i < buttons.length; ++i) {
          if (i >= Math.pow(gb.dimensions, 2)) {
              break;
          }
          var row = Math.floor(i / 3);
          var col = i % 3;
          var color = (_a = grid === null || grid === void 0 ? void 0 : grid[row]) === null || _a === void 0 ? void 0 : _a[col];
          buttons[i].style.backgroundColor = color;
      }
  }
  document.addEventListener("DOMContentLoaded", function () {
      gb.shuffle();
      updateBoard();
  });
  var _loop_1 = function (i) {
      var row = Math.floor(i / 3);
      var col = i % 3;
      var button = buttons[i];
      button.addEventListener("click", function (event) {
          event.preventDefault();
          gb.tap(row, col);
          updateBoard();
          if (gb.isSolved()) {
              setTimeout(function () {
                  alert("You did a thing!");
                  gb.shuffle();
                  updateBoard();
                  setTimeout(function () {
                      alert("Now do it again!");
                  });
              });
          }
          return true;
      });
  };
  for (var i = 0; i < buttons.length; ++i) {
      _loop_1(i);
  }

})();
//# sourceMappingURL=main.js.map
