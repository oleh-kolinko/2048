function Game2048(){
  this.score = 0;
  this.board = [
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
  ];
  this.hasWon = false;
  this.hasLost = false;

  this._generateTile();
  this._generateTile();

}

Game2048.prototype._generateTile = function(){
  var tileValue;
  if(Math.random() < 0.8){
    tileValue = 2;
  }else{
    tileValue = 4;
  }
  var emptyTile  = this._getAvailablePosition();
  if (emptyTile !== null ){
    this.board[emptyTile.x][emptyTile.y] = tileValue;
  }
};

Game2048.prototype._getAvailablePosition = function(){
  var emptyTiles = [];

  this.board.forEach(function(row,rowIndex){
    row.forEach(function(cell,colIndex){
      if(cell === null){
        emptyTiles.push({x:rowIndex, y:colIndex});
      }
    });
  });

  if(emptyTiles.length === 0 ){
    return null;
  }

  var randomIndex = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomIndex];
};

Game2048.prototype._renderBoard = function(){
  this.board.forEach(function(row){
    console.log(row);
  });
};

Game2048.prototype.moveLeft = function (){
  var updatedBoard = [];
  this.board.forEach(function (row){
    //1.remove empties from row
    var newRow = row.filter(function (cell){
      return cell !== null;//if true save cell to new array
    });
    //2.merge tiles that are together and the same number
    for(var i = 0; i < newRow.length - 1  ; i++){
      if(newRow[i] === newRow[i+1]){
        newRow[i] *= 2;
        newRow.splice(i+1,1);
      }
    }
    //3.push() nulls until row has length 4 again
    for(i = newRow.length ; i < 4; i++){
      newRow.push(null);
    }
    updatedBoard.push(newRow);
  });
  this.board = updatedBoard;
};

Game2048.prototype.moveRight = function (){
  var updatedBoard = [];
  this.board.forEach(function (row){
    //1.remove empties from row
    var newRow = row.filter(function (cell){
      return cell !== null;//if true save cell to new array
    });
    //2.merge tiles that are together and the same number
    newRow = newRow.reverse();
    for(var i = 0; i < newRow.length - 1  ; i++){
      if(newRow[i] === newRow[i+1]){
        newRow[i] *= 2;
        newRow.splice(i+1,1);
      }
    }
    //3.push() nulls until row has length 4 again
    for(i = newRow.length ; i < 4; i++){
      newRow.push(null);
    }
    newRow = newRow.reverse();
    updatedBoard.push(newRow);
  });
  this.board = updatedBoard;
};

Game2048.prototype._transposeMatrix = function () {
  for (var row = 0; row < this.board.length; row++) {
    for (var column = row+1; column < this.board.length; column++) {
      var temp = this.board[row][column];
      this.board[row][column] = this.board[column][row];
      this.board[column][row] = temp;
    }
  }
};
Game2048.prototype.moveUp = function () {
  this._transposeMatrix();
  this.moveLeft();
  this._transposeMatrix();
};
Game2048.prototype.moveDown = function () {
  this._transposeMatrix();
  this.moveRight();
  this._transposeMatrix();
};
