var canvas = document.getElementById("myCanvas");

var gameUpdater = {
            
        };

var onlineSettings = {
            onlineConnection: false,
twoPlayerGame: false,
        onlineGame: false,
        onlineScreenMenu: false,
        clickedYesConnect: false,
        yesSelected: true,
        connected: false,
        connectionText1: "no connection",
        connectionText2: "no connection",
        searching1: true,
        searching2: true,
        host: false
}

var clientCommands = {
            
    stageOver : gameSettings.next,
    gameOver: gameSettings.gameOver,
    processEnemyData: function(result){
                var enemyNumber = result[1];
                var enemy = enemies[enemyNumber];
                if(result[2] === ("left")){
                    //enemy.setLeft();
                }
                if(result[2] === ("right")){
                    //enemy.setLeft();
                }
                if(result[2] === ("up")){
                    //enemy.setLeft();
                }
                if(result[2] === ("down")){
                    //enemy.setLeft();
                }
                if(result[2] === ("shoot")){
                    enemy.shoot();
                }
                if(result[2] === ("spawn")){
                    enemies.push(new Enemy);
                }
            },
    updateMap: function(result){
                if(result[1] !== map){
                    map = result[1];
                    console.log("map updated");
                }
            },
    startStage: function(){
                
    }
};
        
window.onkeyup = gameSettings.checkKeys;
window.onkeydown = gameSettings.stopMoving;
window.onload = gameSettings.mobile;
setInterval(gameSettings.updateGraphics, 100);