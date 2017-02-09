//1. Create game object
var myGame;
$(document).ready(function(){
  myGame = new Game2048();

  renderTiles();
});
//2. Load iniatial board state onto page
function renderTiles(){
  myGame.board.forEach(function (row,rowIndex){
    row.forEach(function (cell, colIndex){
      if(cell === null){
        return;
      }
      //put cell on the screen
      var tileHtml = '<div class="tile tile-position-'+rowIndex+
      '-'+colIndex+' val-'+cell+'"> '+cell+' </div>';
      $('#tile-container').append(tileHtml);
    });
  });
}
//3. Handle keyboard events
//4. Move board in object based on keypress
//5. Updating the screen based on new board state
//6. win or lose (maybe)
