//1. Create game object
var myGame;
$(document).ready(function(){
  myGame = new Game2048();
  loadSounds();
  //2. Load iniatial board state onto page
  renderTiles();
  //3. Handle keyboard events
  $(document).keydown(function(e){
    // e.preventDefault();
    switch (e.keyCode){
      case 37:
      myGame.move('left');
      ion.sound.play('snap');break;
      case 38:
      myGame.move('up'); break;
      case 39:
      myGame.move('right'); break;
      case 40:
      myGame.move('down'); break;
    }

    renderTiles();
    $('#score-display').html(myGame.score);
    checkIfDone();
  });
});
function checkIfDone(){
  if(myGame.hasWon){
    var winnerHtml = '<h1>Winner</h1>';
    $('body').append(winnerHtml);
  }else if(myGame.hasLost){
    console.log('lost');
    var loserHtml = '<h1>Loser</h1>';
    $('body').append(loserHtml);
  }
}
function renderTiles(){
  $('#tile-container').empty();
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
function loadSounds(){
  ion.sound({
    sounds:[{ name: 'snap'},{ name: 'tap'}, {name:'beer_can_opening'}],
    path: 'lib/ion.sound-3.0.7/sounds/',
    preload: true,
    volume: 1.0
  });
}
