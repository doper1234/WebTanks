var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var stageScreen = document.getElementById("stageScreen");
        var player = document.getElementById("up");
        var bulletImage = document.getElementById("bulletUp");
        
        var bricks = document.getElementById("bricks");
        var steel = document.getElementById("steel");
        var trees = document.getElementById("trees");
        var flag = document.getElementById("flag");
        var water = document.getElementById("water1");
        var ice = document.getElementById("ice");
        var enemy1 = document.getElementById("enemy1Up");
        var enemy2 = document.getElementById("enemy2Up");
        var enemy3 = document.getElementById("enemy3Up");
        var enemy4 = document.getElementById("enemy4Up");
        var peter = document.getElementById("peter");
        var pauseImage = document.getElementById("pause");
        var gameOverScreen = document.getElementById("gameOverScreen");
        var playerXLoc = canvas.width / 2 - 80;
        var playerYLoc = canvas.height - 30;
        var deltaX = 5;
        var deltaY = -5;
        var playerDeltaX = 5;
        var playerDeltaY = 5;
        var peterX = 0;
        var peterY = 0;
        var grid = 16;
        var bulletSpeed = 10;
        var directionFacing = "up";
        var playerLeft = document.getElementById("left");
        var playerRight =document.getElementById("right");
        var playerUp = document.getElementById("up");
        var playerDown = document.getElementById("down");
        var up, down, left, right;
        up = down = left = right = false;
        var playerLevel = 1;
        var playerLives = 3;
        var lostALifeAnimation = false;
        var playerExplosion = 0;
        var playerInvincible = false;
        var playerIsDead = false;
        var timeInvincible = 0;
        var invincibleImage = document.getElementById("invincible1");
        var invincibleInts = 0;
        var bulletCapacity = 1;
        var canDestroySteel = false;
        var shooting = false;
        var map = [];
        var mapNumber = 0;
        var bullets = [];
        var enemies = [];
        var pX = Math.floor(playerXLoc / 15);
        var pY = Math.floor(playerYLoc / 15);
        var settingUpMap = true;
        var paused = false;
        var spawnCount = 0;
        var spawnInterval = 15;
        var spawnedEnemies = 0;
        var spawnLocation = 0;
        var powerUp = {
            image: document.getElementById("blank"),
            type: "none",
            x: 0,
            y: 0,
            grenadePowerUp: function() {
                playAudioFile("gotLife");
                for (var i = 0; i < enemies.length; i++) {
                    var e = enemies[i];
                    e.alive = false;
                }
            },
            helmetPowerUp: function() {
                playerInvincible = true;
                timeInvincible = 0;
                // p.invincible = true;
                // p.invincibleCount = 0;
                // if(p.invincibleCount == invincibleMax){
                //     //p.invincible = false;
                // }
            },
            shovelPowerUp: function() {
                map[25][11] = 2;
                map[24][11] = 2;
                map[23][11] = 2;
                map[23][12] = 2;
                map[23][13] = 2;
                map[23][14] = 2;
                map[24][14] = 2;
                map[25][14] = 2;
                
                
                //draw steel around flag
                //shovelCount = 0;
                
            },
            starPowerUp: function() {
                //p.level++;
                playAudioFile("gotStar")
                if(playerLevel <4){
                    playerLevel++;    
                }
                if(starWars){
                    if(playerLevel == 2){
                        bulletSpeed*=2;
                        playerLeft = document.getElementById("starLeft2");
                        playerRight =document.getElementById("starRight2");
                        playerUp = document.getElementById("starUp2");
                        playerDown = document.getElementById("starDown2");
                    }else if(playerLevel == 3){
                        bulletCapacity = 2;
                        playerLeft = document.getElementById("starLeft3");
                        playerRight =document.getElementById("starRight3");
                        playerUp = document.getElementById("starUp3");
                        playerDown = document.getElementById("starDown3");
                    }else{
                        canDestroySteel = true;
                        playerLeft = document.getElementById("starLeft4");
                        playerRight =document.getElementById("starRight4");
                        playerUp = document.getElementById("starUp4");
                        playerDown = document.getElementById("starDown4");
                    }
                }else{
                    if(playerLevel == 2){
                        bulletSpeed*=2;
                        playerLeft = document.getElementById("left2");
                        playerRight =document.getElementById("right2");
                        playerUp = document.getElementById("up2");
                        playerDown = document.getElementById("down2");
                    }else if(playerLevel == 3){
                        bulletCapacity = 2;
                        playerLeft = document.getElementById("left3");
                        playerRight =document.getElementById("right3");
                        playerUp = document.getElementById("up3");
                        playerDown = document.getElementById("down3");
                    }else{
                        canDestroySteel = true;
                        playerLeft = document.getElementById("left4");
                        playerRight =document.getElementById("right4");
                        playerUp = document.getElementById("up4");
                        playerDown = document.getElementById("down4");
                    }
                }
                
                if (up) {
                    player = playerUp;
                }
                else if (down) {
                    player = playerDown;
                }
                else if (left) {
                    player = playerLeft;
                }
                else {
                    player = playerRight;
                }
                
            },
            tankPowerUp: function(p) {
                playAudioFile("gotLife");
                //p.lives++;
                playerLives++;
            },
            timerPowerUp: function() {
                timerStop = true;
                //timerCount = 0;
            }
        };
        var screenMove = 0;
        var settingScene = true;
        var starting = true;
        var countingScore = false;
        var timeInScore = 0;
        var hiScore;
        var player1Score = 0;
        var enemyPointsWorth = 100;
        var temp1Kills = 0;
        var temp2Kills = 0;
        var temp3Kills = 0;
        var temp4Kills = 0;
        var temp1Points = 0;
        var temp2Points = 0;
        var temp3Points = 0;
        var temp4Points = 0;
        var level1TotalPoints = 0;
        var level2TotalPoints = 0;
        var level3TotalPoints = 0;
        var level4TotalPoints = 0;
        var level1TotalKilled = 0;
        var level2TotalKilled = 0;
        var level3TotalKilled = 0;
        var level4TotalKilled = 0;
        var totalEnemiesKilled = 0;
        var countInterval = 3;
        var count = 0;
        var started1 = false;
        var started2 = false;
        var started3 = false;
        var started4 = false;
        var finished1 = false;
        var finished2 = false;
        var finished3 = false;
        var finishedCount = false;
        var mobileDevice = false;
        var enemyLevels = [];
        var currentEnemyLevel = 0;
        var timerStop = false;
        var timeInTimerStop = 0;
        var gameIsOver = false;
        var flagExplosion = 0;
        var flagExplosionInterval = 1;
        var gameOX = canvas.width/2 - grid*5;
        var gameOY = canvas.height;
        var nextGameOverPressed = false;
        var mainMenu = true;
        var mainMenuImage = document.getElementById("mainScreen");
        var menuX = 0, menuY = canvas.height;
        var menu1Selected = true;
        var menu2Selected = false;
        var passcodeSelected = false;
        var menuOnlineSelected = false;
        var scoresSelected = false;
        var waterNumber = 0;
        var onlineConnection = false;
        var button = document.getElementById("connectButton");
        button.addEventListener('click', checkMobileKeys);
        window.onkeyup = checkKeys(event);
        window.onkeydown = stopMoving(event);
        window.onload = mobile();
        var twoPlayerGame = false;
        var onlineGame = false;
        var onlineScreenMenu = false;
        var clickedYesConnect = false;
        var yesSelected = true;
        var connected = false;
        var connectionText1 = "no connection";
        var connectionText2 = "no connection";
        var searching1 = true;
        var searching2 = true;
        var host = false;
        var passcodeScreenMenu = false;
        var passcodeText = "";
        var passcodeMessage = "";
        var gotHiScore = false;
        var scoresScreenMenu = false;
        var nameScreenMenu = true;
        var name = "def";
        
        var char1 = "_";
        var char2 = "_";
        var char3 = "_";
        var char1Set = false;
        var char2Set = false;
        var char3Set = false;
        
        var readyToGoToMainMenu = false;
        var starWars = false;
        var starWarsSize = 100;
        var starWarsThemePlaying = false;
        var begunStarWars = false;
        var begunStarWarsCount = 0;
        var imperialThemeAudio;
        var starWarsThemeAudio;
        var stars = document.getElementById("stars");
        
        var bomberman = false;
        var bombermanBackground1 = document.getElementById("bombermanBackground1");
        var starWarsGameOverText = "game over";
        
        var scores = [];
        var topTenScores = [];
        var playerName;
        var startUp = true;
        var scoresInitialized = false;
        var highScoresScreenMenu = false;
        var scoresScreenSelected = false;
        var bigF = 30;
        var scoresImageX = bigF;
        var scoresImageY = canvas.height/2 - bigF*2;
        //ctx.drawImage(playerRight,bigFont, canvas.height/2 - bigFont*2);
        //ctx.drawImage(playerRight,bigFont*2, canvas.height/2 );
        var start = 86;
        //var noSelected = false;
        //document.getElementById("connectButton").onclick = checkMobileKeys();
        
        var player2;
        
        var clientCommands = {
            
            stageOver : next(),
            gameOver: gameOver(),
            processEnemyData: function(result){
                var enemyNumber = result[1];
                var enemy = enemies[enemyNumber];
//                var x = result[4];
//                var y = result[5];
//                if(enemy.x !== x && enemy.y !== y){
//                    enemy.x = x;
//                    enemy.y = y;
//                }
                if(result[2] === "doSomething"){
                    enemy.receiveOnlineCommands(result[3]);
                    console.log("I'm an enemy doing something");
                }
                
                /*if(result[2] === ("left")){
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
                    enemies.push(new Enem)
                }*/
                if(result[2] === ("hit")){
                    enemyHit(enemy);
                    console.log("enemy shot");
                }
                if(result[2] === ("locations")){
                    if(!enemy.x === result[3] && !enemy.y === result[4]){
                        enemy.x = result[3];
                        enemy.y = result[4];
                    }
                    console.log("enemy location corrected");
                }
            },
            updateMap: function(result){
                var compareMap = new Array(26);
                var allText = result[1];
                var x = 0;
                var y = 0;
                var items = allText.split(",");
                for (var i = 0; i < items.length; i++) {
                    if (x == 0) {
                        compareMap[y] = new Array(26);
                    }
                   compareMap[y][x] = items[i];
                    x++;
                    if (x == 26) {
                        x = 0;
                        y++;
                    }
                }
                if(compareMap !== map){
                    map = compareMap;
                    console.log("map updated");
                    
                }else{
                    console.log("map is okay");
                }
                    
                        
            },
            startStage: function(){
                
            }
        };
        
        var gameUpdater = {
            
        };
        
        function Score(name, score){
            this.name = name;
            this.score = score;
        }
        
        function loadScores(){
            /*var file = "scores.txt";
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText;
                        var items = allText.split(" ");
                        var hi = hiScore.substr(4,hiScore.length -1);
                        console.log(hi);
                        for (var i = 1; i < items.length; i+=2) {
                            console.log(items[i] + " " + i);
                            if(items[i] > hi){
                                hi = items[i];
                                hiScore = items[i - 1] +" " + hi;
                                console.log(hi + "is not higher than" + items[i]);
                            }
                        }
                    }
                }
            };
            rawFile.send(null);*/
            //hiScore = new Score("fuk", 100);
        }
        
        function checkMobileKeys(){
            alert("Touch");
        }
        
        function connectToServer(){
            
            var net = require('net');
            var client = net.connect(3074, 'localhost');
            client.write('Hello from node.js');
            client.end();
            onlineConnection = true;
           
            
            
        }
        
        function initializeVariables(){
            playerXLoc = canvas.width / 2 - 80;
            playerYLoc = canvas.height - 30;
            enemies = [];
            bullets = [];
            bulletSpeed = 10;
            directionFacing = "up";
            playerLeft = document.getElementById("left");
            playerRight =document.getElementById("right");
            playerUp = document.getElementById("up");
            playerDown = document.getElementById("down");
            flag = document.getElementById("flag");
            down = left = right = false;
            up = true;
            playerLevel = 1;
            playerLives = 3;
            lostALifeAnimation = false;
            playerExplosion = 0;
            playerInvincible = false;
            playerIsDead = false;
            timeInvincible = 0;
            invincibleInts = 0;
            bulletCapacity = 1;
            canDestroySteel = false;
            mapNumber = 1;
            settingUpMap = true;
            spawnedEnemies = 0;
            spawnLocation = 0;
            settingScene = true;
            starting = true;
            countingScore = false;
            timeInScore = 0;
            player1Score = 0;
            level1TotalPoints = 0;
            level2TotalPoints = 0;
            level3TotalPoints = 0;
            level4TotalPoints = 0;
            level1TotalKilled = 0;
            level2TotalKilled = 0;
            level3TotalKilled = 0;
            level4TotalKilled = 0;
            totalEnemiesKilled = 0;
            count = 0;
            started1 = false;
            started2 = false;
            started3 = false;
            started4 = false;
            finished1 = false;
            finished2 = false;
            finished3 = false;
            finishedCount = false;
            mobileDevice = false;
            currentEnemyLevel = 0;
            timerStop = false;
            timeInTimerStop = 0;
            gameIsOver = false;
            flagExplosion = 0;
            flagExplosionInterval = 1;
            gameOX = canvas.width/2 - grid*5;
            gameOY = canvas.height;
            nextGameOverPressed = false;
            mainMenu = true;
            mainMenuImage = document.getElementById("mainScreen");
            menuX = 0, menuY = canvas.height;
            menu1Selected = true;
            menu2Selected = false;
            menuOnlineSelected = false;
            
        }
        
        function gameOver(){
            destroyFlag();
            if(starWars){
                imperialThemeAudio.pause();
                imperialThemeAudio.currentTime = 0;
            }
            
            ctx.fillStyle = "maroon";
            ctx.fillText("Game over", gameOX, gameOY);
            if(gameOY > (canvas.height/2) + grid){
                gameOY-=5;    
            }else{
                countingScore = true;
                Echo.initialize();
            }
        }
        
        function lostALife(){
            if(starWars){
                 if(playerExplosion == flagExplosionInterval){
                    player = document.getElementById("starExplosion1"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 2){
                    player = document.getElementById("starExplosion2"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 3){
                    player = document.getElementById("starExplosion3"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 4){
                    player = document.getElementById("starExplosion4"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 5){
                    player = document.getElementById("starExplosion5"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 6){
                    player = document.getElementById("starExplosion6"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 7){
                    player = document.getElementById("starExplosion7"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 8){
                    player = document.getElementById("starExplosion8"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 9){
                    player = document.getElementById("starExplosion9"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 10){
                    player = document.getElementById("starExplosion10"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 11){
                    player = document.getElementById("starExplosion11"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 12){
                    player = document.getElementById("starExplosion12"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 13){
                    player = document.getElementById("starExplosion13"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 14){
                    playerLeft = document.getElementById("starLeft");
                    playerRight =document.getElementById("starRight");
                    playerUp = document.getElementById("starUp");
                    playerDown = document.getElementById("starDown");
                    player = document.getElementById("starUp");
                     bulletCapacity = 1;
                     canDestroySteel = false;
                     playerXLoc = canvas.width / 2 - 80;
                     playerYLoc = canvas.height - 30;
                     directionFacing = "up";
                     playerLevel = 1;
                     lostALifeAnimation = false;
                     playerExplosion = 0;
                     if(!playerIsDead){
                         playerInvincible = true;    
                     }
                }
            }else{
                if(playerExplosion == flagExplosionInterval){
                    player = document.getElementById("explosion1"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 2){
                    player = document.getElementById("explosion2"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 3){
                    player = document.getElementById("explosion3"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 4){
                    player = document.getElementById("explosion4"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 5){
                    player = document.getElementById("explosion5"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 6){
                    player = document.getElementById("explosion4"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 7){
                    player = document.getElementById("explosion3"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 8){
                    player = document.getElementById("explosion2"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 9){
                    player = document.getElementById("explosion1"); 
                 }
                 else if(playerExplosion == flagExplosionInterval * 10){
                         playerLeft = document.getElementById("left");
                         playerRight =document.getElementById("right");
                         playerUp = document.getElementById("up");
                         playerDown = document.getElementById("down");
                         player = document.getElementById("up");
                     bulletCapacity = 1;
                     canDestroySteel = false;
                     playerXLoc = canvas.width / 2 - 80;
                     playerYLoc = canvas.height - 30;
                     directionFacing = "up";
                     playerLevel = 1;
                     lostALifeAnimation = false;
                     playerExplosion = 0;
                     if(!playerIsDead){
                         playerInvincible = true;    
                     }

                 }
            }
            playerExplosion++;
        }               //player
        
        function destroyFlag(){
            if(starWars){
                if(flagExplosion == flagExplosionInterval){
                    flag = document.getElementById("starExplosion1"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 2){
                    flag = document.getElementById("starExplosion2"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 3){
                    flag = document.getElementById("starExplosion3"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 4){
                    flag = document.getElementById("starExplosion4"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 5){
                    flag = document.getElementById("starExplosion5"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 6){
                    flag = document.getElementById("starExplosion6"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 7){
                    flag = document.getElementById("starExplosion7"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 8){
                    flag = document.getElementById("starExplosion8"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 9){
                    flag = document.getElementById("starExplosion9"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 10){
                    flag = document.getElementById("starExplosion10"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 11){
                    flag = document.getElementById("starExplosion11"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 12){
                    flag = document.getElementById("starExplosion12"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 13){
                    flag = document.getElementById("starExplosion13"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 14){
                    flag = document.getElementById("blank");
                 }
            }else{
                if(flagExplosion == flagExplosionInterval){
                    flag = document.getElementById("explosion1"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 2){
                    flag = document.getElementById("explosion2"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 3){
                    flag = document.getElementById("explosion3"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 4){
                    flag = document.getElementById("explosion4"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 5){
                    flag = document.getElementById("explosion5"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 6){
                    flag = document.getElementById("explosion4"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 7){
                    flag = document.getElementById("explosion3"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 8){
                    flag = document.getElementById("explosion2"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 9){
                    flag = document.getElementById("explosion1"); 
                 }
                 else if(flagExplosion == flagExplosionInterval * 10){
                    flag = document.getElementById("surrender");
                 }
            }
            flagExplosion++;
        }
        
        function timerIsStopped(){
            var timeToResume = 200;
            if(timeInTimerStop == timeToResume){
                timerStop = false;
                timeInTimerStop = 0;
            }
            timeInTimerStop++;
        }
        
        function loadEnemyLevels(){
            // var file = "enemyLevel.txt";
            // var rawFile = new XMLHttpRequest();
            // settingUpMap = true;
            // rawFile.open("GET", file, false);
            // rawFile.onreadystatechange = function() {
            //     if (rawFile.readyState === 4) {
            //         if (rawFile.status === 200 || rawFile.status == 0) {
            //             enemyLevels = new Array(35*20);
            //             var allText = rawFile.responseText;
            //             enemyLevels = allText.split(" ");
            //             alert(enemyLevels);
                        
            //         }
            //     }
            // }
            // rawFile.send(null);
            enemyLevels =  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,
                            4,4,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,4,4,
                            3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,1,1,4,4,4,
                            3,3,3,3,3,4,4,1,1,1,1,1,1,1,1,2,2,2,2,2,
                            3,3,3,3,3,3,3,2,2,1,1,1,1,1,1,1,1,1,4,4,
                            1,1,1,2,2,2,2,3,3,3,3,3,3,1,1,1,1,1,1,1,
                            3,3,3,3,3,3,3,4,4,2,2,2,2,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,2,2,2,2,3,3,3,3,3,3,3,4,4,4,
                            1,1,1,4,1,1,2,1,3,1,4,3,1,3,3,2,4,4,4,4,
                            2,2,2,2,3,3,2,2,4,4,2,4,3,3,4,4,3,3,4,3,
                            2,2,2,3,3,3,3,3,3,3,3,2,2,2,4,4,4,4,4,4,
                            2,2,2,3,3,3,2,2,2,3,3,3,2,3,4,4,4,4,3,4,
                            3,3,3,3,3,2,2,3,3,3,3,3,2,2,4,4,4,4,4,4,
                            1,1,3,3,3,3,3,4,4,3,3,4,4,4,4,3,3,3,4,4,
                            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,4,4,
                            1,1,1,1,3,3,1,1,3,3,1,1,3,3,3,3,2,2,4,4,
                            1,1,2,2,2,2,3,3,3,2,2,2,2,3,3,3,4,4,4,4,
                            1,1,1,1,4,4,3,3,4,4,2,2,3,3,2,2,4,4,4,4,
                            1,1,2,2,2,2,3,3,2,2,2,2,4,4,4,4,4,4,4,4,
                            1,1,1,2,1,1,1,2,3,3,4,3,3,4,3,3,4,3,3,4,
                            1,1,1,2,1,1,1,3,3,2,2,2,2,2,2,2,4,4,4,4,
                            3,2,2,3,2,2,3,2,2,3,2,2,2,2,4,4,4,4,4,4,
                            1,1,2,2,1,1,3,3,1,1,1,1,1,1,2,2,3,3,4,4,
                            2,4,2,4,3,2,4,2,4,2,4,2,4,3,2,4,2,4,4,4,
                            1,2,3,4,1,1,1,2,2,2,2,2,3,3,3,4,4,4,4,4,
                            1,4,1,2,3,4,3,2,4,2,4,4,2,2,4,4,2,2,4,4,
                            1,1,1,1,1,2,3,1,1,1,1,1,2,3,1,1,1,4,1,1,
                            3,3,3,3,2,2,4,4,3,3,3,3,2,2,4,4,3,3,4,4,
                            1,2,2,1,3,3,2,2,4,4,2,2,1,1,3,3,2,2,4,4,
                            2,2,3,3,2,2,3,3,2,2,3,3,4,4,2,2,4,4,4,4,
                            1,1,2,2,4,4,1,1,3,3,2,2,1,1,4,4,4,4,4,4,
                            2,2,3,3,2,2,4,4,3,3,2,2,4,4,2,2,4,4,4,4,
                            2,2,2,2,3,3,2,2,3,3,2,2,4,4,2,2,4,4,2,2,
                            2,2,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,4,4,4];
            
        }
        
        function doInvinciblity(){
            var invincibleIntervals = 1;
            
            if(invincibleInts <= invincibleIntervals){
                if(starWars){
                    invincibleImage = document.getElementById("shield1");
                }else{
                    invincibleImage = document.getElementById("invincible1");
                }
                
            }
            else/* if(invincibleInts <= invincibleIntervals*2)*/{
                if(starWars){
                    invincibleImage = document.getElementById("shield2");
                }else{
                    invincibleImage = document.getElementById("invincible2");
                }
            }
            if(invincibleInts>= invincibleIntervals*2){
                invincibleInts = 0;
            }
            if(timeInvincible >= 200){
                playerInvincible = false;
                timeInvincible = 0;
            }
            
            ctx.drawImage(invincibleImage, playerXLoc, playerYLoc);
            invincibleInts++;
            timeInvincible++;
            
        }          //player

        function mobile() {
            var uagent = navigator.userAgent.toLowerCase();
            if (uagent.search("windows") > -1) {
                var div = document.getElementById("buttons");
                div.style.display = "none";
            }
            else {
                mobileDevice = true;
            }
            canvas.style.borderColor = "black";
            connectionToServer();
            loadEnemyLevels();
            loadScores();
            player2 = {
                                temp1Kills : 0,
                                temp2Kills : 0,
                                temp3Kills : 0,
                                temp4Kills : 0,
                                temp1Points : 0,
                                temp2Points : 0,
                                temp3Points : 0,
                                temp4Points : 0,
                                level1TotalPoints : 0,
                                level2TotalPoints : 0,
                                level3TotalPoints : 0,
                                level4TotalPoints : 0,
                                level1TotalKilled : 0,
                                level2TotalKilled : 0,
                                level3TotalKilled : 0,
                                level4TotalKilled : 0,
                                totalEnemiesKilled : 0,
                                score : 0,
                                pX : Math.floor(playerXLoc / 15),
                                pY : Math.floor(playerYLoc / 15),
                                bullets : [],
                                bulletSpeed : 10,
                                directionFacing : "up",
                                playerLeft : document.getElementById("p2left"),
                                playerRight :document.getElementById("p2right"),
                                playerUp : document.getElementById("p2up"),
                                playerDown : document.getElementById("p2down"),
                                image: document.getElementById("p2up"),
                                up: false,
                                down: false,
                                left: false,
                                right: false,
                                level : 1,
                                lives : 3,
                                lostALifeAnimation : false,
                                playerExplosion : 0,
                                isInvincible : false,
                                isDead : false,
                                timeInvincible : 0,
                                invincibleImage : document.getElementById("invincible1"),
                                invincibleInts : 0,
                                bulletCapacity : 1,
                                canDestroySteel : false,
                                deltaX : 5,
                                deltaY : 5,
                                xLoc : canvas.width / 2 + 80,
                                yLoc : canvas.height - 30,
                                lostALife : function(){

                                if(playerExplosion == flagExplosionInterval){
                                   player = document.getElementById("explosion1"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 2){
                                   player = document.getElementById("explosion2"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 3){
                                   player = document.getElementById("explosion3"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 4){
                                   player = document.getElementById("explosion4"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 5){
                                   player = document.getElementById("explosion5"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 6){
                                   player = document.getElementById("explosion4"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 7){
                                   player = document.getElementById("explosion3"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 8){
                                   player = document.getElementById("explosion2"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 9){
                                   player = document.getElementById("explosion1"); 
                                }
                                else if(playerExplosion == flagExplosionInterval * 10){
                                    playerLeft = document.getElementById("left");
                                    playerRight =document.getElementById("right");
                                    playerUp = document.getElementById("up");
                                    playerDown = document.getElementById("down");
                                    player = document.getElementById("up");
                                    bulletCapacity = 1;
                                    canDestroySteel = false;
                                    playerXLoc = canvas.width / 2 - 80;
                                    playerYLoc = canvas.height - 30;
                                    directionFacing = "up";
                                    playerLevel = 1;
                                    lostALifeAnimation = false;
                                    playerExplosion = 0;
                                    if(!playerIsDead){
                                        playerInvincible = true;    
                                    }

                                }
                                playerExplosion++;
                            },
                                doInvinciblity : function(){
                                    var invincibleIntervals = 1;

                                    if(invincibleInts <= invincibleIntervals){
                                        invincibleImage = document.getElementById("invincible1");
                                    }
                                    else/* if(invincibleInts <= invincibleIntervals*2)*/{
                                        invincibleImage = document.getElementById("invincible2");
                                    }
                                    if(invincibleInts>= invincibleIntervals*2){
                                        invincibleInts = 0;
                                    }
                                    if(timeInvincible >= 200){
                                        playerInvincible = false;
                                        timeInvincible = 0;
                                    }

                                    ctx.drawImage(invincibleImage, playerXLoc, playerYLoc);
                                    invincibleInts++;
                                    timeInvincible++;

                                },
                                collisionWithBullet : function(e){
                                    for(var i = 0; i < bullets.length; i++){
                                        var b = bullets[i];
                                        var bULeftX = Math.floor(b.bx);
                                        var bURightX = Math.floor(b.bx + 12);
                                        var bULeftY = Math.floor(b.by);
                                        var bURightY = Math.floor(b.by + 12);
                                        var eULeftX; 
                                        var eURightX;
                                        var eULeftY;
                                        var eURightY;
                                        checkBulletHitTerrain(b);
                                        if(!b.belongsToEnemy){
                                            eULeftX = e.x; 
                                            eURightX = e.x + 32;
                                            eULeftY = e.y;
                                            eURightY = e.y + 32;

                                        }
                                        else{
                                           eULeftX = playerXLoc; 
                                            eURightX = playerXLoc + 32;
                                            eULeftY = playerYLoc;
                                            eURightY = playerYLoc + 32; 
                                        }
                                        for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                                            for(var x = eULeftY; x < eURightY; x++){
                                                if((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x)){
                                                    if(b.belongsToEnemy && !playerInvincible){
                                                        lostALifeAnimation = true;
                                                        if(playerLives > 0){
                                                            playerLives--;    
                                                        }else{
                                                            gameIsOver = true;
                                                            playerIsDead = true;
                                                        }
                                                        removePlayerBullet(b);
                                                    }else{
                                                        enemyHit(e,b);    
                                                    }

                                                }
                                            }
                                        }
                                    }
                                },
                                collisionWithEnemyBullet  : function(e){
                                    for(var i = 0; i < e.enemyBullets.length; i++){
                                        var b = e.enemyBullets[i];
                                        var bULeftX = Math.floor(b.bx);
                                        var bURightX = Math.floor(b.bx + 12);
                                        var bULeftY = Math.floor(b.by);
                                        var bURightY = Math.floor(b.by + 12);
                                        var eULeftX = playerXLoc; 
                                        var eURightX = playerXLoc + 32;
                                        var eULeftY = playerYLoc;
                                        var eURightY = playerYLoc + 32; 
                                        checkEnemyBulletHitTerrain(b,e);
                                        for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the player's box
                                            for(var x = eULeftY; x < eURightY; x++){
                                                if(!lostALifeAnimation && ((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x))){
                                                    if(!playerInvincible){
                                                        lostALifeAnimation = true;
                                                        if(playerLives > 0){
                                                            playerLives--;    
                                                        }else{
                                                            gameIsOver = true;
                                                            playerIsDead = true;
                                                        }
                                                    }
                                                    removeEnemyBullet(b,e);
                                                }
                                            }
                                        }
                                    }
                                },
                                collisionWithAnotherTank : function(e){
                                    var doesIntersect = false;
                                    for(var i = 0; i < enemies.length; i++){
                                        var e2 = enemies[i];
                                        if(e != e2){
                                           if(intersects(e,e2)){
                                               doesIntersect = true;
                                           } 
                                        }
                                    }
                                    return doesIntersect;
                                },
                                collisionWithPlayer : function(){
                                    for(var i = 0; i < enemies.length; i++){
                                        var e = enemies[i];
                                        var eULeftX = playerXLoc; 
                                        var eURightX = playerXLoc + 32;
                                        var eULeftY = playerYLoc;
                                        var eURightY = playerYLoc + 32;

                                        var bULeftX = (e.x);
                                        var bURightX = (e.x + 32);
                                        var bULeftY = (e.y);
                                        var bURightY = (e.y + 32);
                                        for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                                            for(var x = eULeftY; x < eURightY; x++){
                                                if((bULeftX == y && bULeftY == x)){
                                                    return "up";
                                                }
                                                else if((bURightX == y && bURightY == x)){
                                                    return "up";
                                                }
                                            }
                                        }
                                    }
                                    return "no";
                                },
                                intersects : function(r1, r2){
                                    var eULeftX = r2.x; 
                                    var eURightX = r2.x + 32;
                                    var eULeftY = r2.y;
                                    var eURightY = r2.y + 32;

                                    var bULeftX = Math.floor(r1.x);
                                    var bURightX = Math.floor(r1.x + 12);
                                    var bULeftY = Math.floor(r1.y);
                                    var bURightY = Math.floor(r1.y + 12);

                                    for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                                        for(var x = eULeftY; x < eURightY; x++){
                                            if((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x)){
                                                //alert("intersects");
                                                return true;
                                            }
                                        }
                                    }
                                    return false;
                                },
                                intersectsPlayer : function(r1){
                                    var eULeftX = playerXLoc; 
                                    var eURightX = playerXLoc + 32;
                                    var eULeftY = playerYLoc;
                                    var eURightY = playerYLoc + 32;

                                    var bULeftX = (r1.x);
                                    var bURightX = (r1.x + 32);
                                    var bULeftY = (r1.y);
                                    var bURightY = (r1.y + 32);
                                    document.getElementById("playerLocation").innerHTML = ("px " + playerXLoc + " py " + playerYLoc + " ox " + r1.x + " oy " + r1.y);
                                    for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                                        for(var x = eULeftY; x < eURightY; x++){
                                            if((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x)){
                                                return true;
                                            }
                                        }
                                    }
                                    return false;
                                },
                                didPlayerGetPowerUp : function() {
                                    if (intersectsPlayer(powerUp) && powerUp.type != "none") {
                                        if(powerUp.type == "grenade"){
                                            powerUp.grenadePowerUp();
                                        }else if(powerUp.type == "helmet"){
                                            powerUp.helmetPowerUp();
                                        }else if(powerUp.type =="shovel"){
                                            powerUp.shovelPowerUp();
                                        }else if(powerUp.type == "star"){
                                            powerUp.starPowerUp();
                                        }else if(powerUp.type == "tank"){
                                            powerUp.tankPowerUp()
                                        }else{
                                            powerUp.timerPowerUp();
                                        }
                                        powerUp.type = "none";
                                        powerUp.image = document.getElementById("blank");
                                    }
                                },
                                canGoLeft : function() {
                                    if (pX > 0) {
                                        return map[pY][pX - 1] == 0 || map[pY][pX - 1] == 3 || map[pY][pX - 1] == 6;
                                    }
                                    else {
                                        return true;
                                    }
                                },
                                canGoRight : function() {
                                    if (pX < map.length) {
                                        return map[pY][pX + 1] == 0 || map[pY][pX + 1] == 3 || map[pY][pX + 1] == 6;
                                    }
                                    else {
                                        return true;
                                    }
                                },
                                canGoUp : function() {
                                    if (pY > 0) {
                                        return map[pY - 1][pX] == 0 || map[pY - 1][pX] == 3 || map[pY - 1][pX] == 6;
                                    }
                                    else {
                                        return true;
                                    }
                                },
                                canGoDown : function() {
                                    if (pY < map.length -1) {
                                        return map[pY + 1][pX] == 0 || map[pY + 1][pX] == 3 || map[pY + 1][pX] == 6;
                                    }
                                    else {
                                        return true;
                                    }

                                },
                                stopMoving : function(e) {
                                    var keynum;
                                    if (window.event) { // IE					
                                        keynum = e.keyCode;
                                    }
                                    //else
                                    //if (e.which) { // Netscape/Firefox/Opera					
                                    //    keynum = e.which;
                                    //}
                                    if (keynum >= 37 && keynum <= 40) {
                                        right = up = down = left = false;
                                    }
                                },
                                stopMovingNoEvent : function() {
                                    right = up = down = left = false;
                                },
                                goLeft : function() {
                                    this.image = this.playerLeft;
                                    this.directionFacing = "left";
                                    this.left = true;
                                    this.right = this.up = this.down = false;
                                    if ((this.xLoc - this.deltaX >= 0) /*&& canGoLeft()*/) {
                                        this.xLoc -= this.deltaX;

                                    }
                                },
                                goRight : function() {
                                    this.image = this.playerRight;
                                    this.directionFacing = "right";
                                    this.right = true;
                                    this.left = this.up = this.down = false;
                                    if ((this.xLoc + this.deltaX < canvas.width - 32)/* && canGoRight()*/) {
                                        this.xLoc += this.deltaX;
                                    }
                                },
                                goUp : function() {
                                    this.image = this.playerUp;
                                    this.directionFacing = "up";
                                    this.up = true;
                                    this.left = this.right = this.down = false;
                                    if ((this.yLoc - this.deltaY >= 0)/* && canGoUp()*/) {
                                        this.yLoc -= this.deltaY;

                                    }
                                },
                                goDown : function() {
                                    this.image = this.playerDown;
                                    this.directionFacing = "down";
                                    this.down = true;
                                    this.left = this.right = this.up = false;
                                    if ((this.yLoc + this.deltaY < canvas.height - 32) /* && canGoDown()*/) {
                                        this.yLoc += this.deltaY;
                                    }
                                },
                                shoot: function() {
                                    var self = this;
                                    //if(this.bullets.length < this.bulletCapacity){
                                    if(starWars){
                                        playAudioFile("fireProton");
                                    }else{
                                        playAudioFile("shoot");
                                    }
                                    
                                    var direction;
                                    var bulletL = {
                                        bx: player2.xLoc,
                                        by: player2.yLoc,
                                        image: bulletImage,
                                        direction: player2.directionFacing,
                                        destroyed: false,
                                        explosion: 0,
                                        belongsToEnemy: false
                                    };
                                    if (bulletL.direction == "left") {
                                        if(starWars){
                                            bulletL.image = document.getElementById("protonTorpedoLeft");
                                        }else{
                                            bulletL.image = document.getElementById("bulletLeft");
                                        }
                                        //bulletL.direction = "left";
                                        bulletL.by = bulletL.by + (player.height / 2 - bulletImage.height / 2);
                                    }
                                    else if (bulletL.direction == "right") {
                                        if(starWars){
                                            bulletL.image = document.getElementById("protonTorpedoRight");
                                        }else{
                                            bulletL.image = document.getElementById("bulletRight");
                                        }
                                        //bulletL.direction = "right";
                                        bulletL.bx = bulletL.bx + (player.width);
                                        bulletL.by = bulletL.by + (player.height / 2 - bulletImage.height / 2);
                                    }
                                    else if (bulletL.direction == "up") {
                                        if(starWars){
                                            bulletL.image = document.getElementById("protonTorpedoUp");
                                        }else{
                                            bulletL.image = document.getElementById("bulletUp");
                                        }
                                        //bulletL.direction = "up";
                                        bulletL.bx = bulletL.bx + (player.width / 2 - bulletImage.width / 2);
                                    }
                                    else if (bulletL.direction == "down") {
                                        if(starWars){
                                            bulletL.image = document.getElementById("protonTorpedoDown");
                                        }else{
                                            bulletL.image = document.getElementById("bulletDown");
                                        }
                                        //bulletL.direction = "down";
                                        bulletL.bx = bulletL.bx + (player.width / 2 - bulletImage.width / 2);
                                        bulletL.by = bulletL.by + (player.height);
                                    }
                                    player2.bullets.push(bulletL);
                                    //}
                                },
                                update: function(){
                                    var self = this;
                                    ctx.drawImage(player2.image, player2.xLoc,player2.yLoc);
                                    if(player2.score > hiScore){
                                        hiScore = player2.score;
                                    }
                                    if (map[pY][pX] == 6) {
                                        self.deltaX = 10;
                                        self.deltaX = 10;
                                    }
                                    else {
                                        self.deltaX = 5;
                                        self.deltaY = 5;
                                    }
                                    if(self.isDead){
                                        self.image = document.getElementById("blank");
                                    }
                                    if(self.lostALifeAnimation){
                                        self.lostALife;
                                    }
                                    self.didPlayerGetPowerUp();
                                    if(self.isInvincible && !self.isDead){
                                        self.doInvinciblity;
                                    }
                                    if(!gameIsOver){
                                        if (self.left/* && self.collisionWithPlayer() != "left"*/) {
                                            self.goLeft();
                                        }
                                        if (self.right /*&& self.collisionWithPlayer() != "right"*/) {
                                            self.goRight();
                                        }
                                        if (self.up/* && self.collisionWithPlayer() != "up"*/) {
                                            self.goUp();
                                        }
                                        if (self.down/*&& self.collisionWithPlayer() != "down"*/) {
                                            self.goDown();
                                        }
                                    }
                                    for (var i = 0; i < this.bullets.length; i++) {
                                        var b = this.bullets[i];
                                        ctx.drawImage(b.image, b.bx, b.by);
                                        console.log("we have bullets");

                                        if (!b.destroyed) {
                                            if (b.direction == "right") {
                                                if (b.bx >= canvas.width) {
                                                    b.destroyed = true;
                                                    playAudioFile("BulletHitWall");
                                                }
                                                else {
                                                    b.bx += this.bulletSpeed;
                                                }
                                            }
                                            if (b.direction == "left") {
                                                if (b.bx <= 0) {
                                                    b.destroyed = true;
                                                    playAudioFile("BulletHitWall");
                                                }
                                                b.bx -= this.bulletSpeed;
                                            }
                                            if (b.direction == "up") {
                                                if (b.by <= 0) {
                                                    b.destroyed = true;
                                                    playAudioFile("BulletHitWall");
                                                }
                                                b.by -= this.bulletSpeed;
                                            }
                                            if (b.direction == "down") {
                                                if (b.by >= canvas.height) {
                                                    b.destroyed = true;
                                                    playAudioFile("BulletHitWall");
                                                }
                                                b.by += this.bulletSpeed;
                                            }
                                        }
                                        else {
                                            if (b.explosion == 0) {
                                                b.bx = b.bx - 8;
                                                b.by = b.by - 8;
                                            }
                                            playerBulletExplosionAnimation(b);
                                        }
                                    }
                                    pX = Math.floor(playerXLoc / 15);
                                    pY = Math.floor(playerYLoc / 15);
                                }
                            };
            
        }
        
        function connectionToServer(){
            if(true){
                document.getElementById("bulletLocation").innerHTML =("no connection");
                document.getElementById("bulletLocation").style.color = ("maroon");
            }else{
                document.getElementById("bulletLocation").innerHTML =("connected to server");
                document.getElementById("bulletLocation").style.color = ("green");
            }
        }
        
        function enemyHit(e){
            e.health--;
                    if(e.blinking){
                        newPowerUp();
                        e.blinking = false;
                    }
                    if (e.health == 0) {
                        player1Score += enemyPointsWorth * e.level;
                        if (e.level == 1) {
                            level1TotalKilled++;
                        }
                        else if (e.level == 2) {
                            level2TotalKilled++;
                        }
                        else if (e.level == 3) {
                            level3TotalKilled++;
                        }
                        else {
                            level4TotalKilled++;
                        }
                        e.alive = false;
                    }
                    if (e.level == 4) {
                        if (e.health != 0) {
                            playAudioFile("bigEnemyHit");
                        }
                        if (e.health == 3) {
                            if(starWars){
                                e.downImage = document.getElementById("tieBomberDownB");
                                e.upImage = document.getElementById("tieBomberUpB");
                                e.leftImage = document.getElementById("tieBomberLeftB");
                                e.rightImage = document.getElementById("tieBomberRightB");
                            }else{
                                e.downImage = document.getElementById("enemy4BDown");
                                e.upImage = document.getElementById("enemy4BUp");
                                e.leftImage = document.getElementById("enemy4BLeft");
                                e.rightImage = document.getElementById("enemy4BRight");  
                            }
                        }
                        else if (e.health == 2) {
                            if(starWars){
                                e.downImage = document.getElementById("tieBomberDownC");
                                e.upImage = document.getElementById("tieBomberUpC");
                                e.leftImage = document.getElementById("tieBomberLeftC");
                                e.rightImage = document.getElementById("tieBomberRightC");
                            }else{
                                e.downImage = document.getElementById("enemy4ADown");
                                e.upImage = document.getElementById("enemy4AUp");
                                e.leftImage = document.getElementById("enemy4ALeft");
                                e.rightImage = document.getElementById("enemy4ARight"); 
                            }
                        }
                        else if (e.health == 1) {
                            if(starWars){
                                e.downImage = document.getElementById("tieBomberDown");
                                e.upImage = document.getElementById("tieBomberUp");
                                e.leftImage = document.getElementById("tieBomberLeft");
                                e.rightImage = document.getElementById("tieBomberRight");
                            }else{
                                e.downImage = document.getElementById("enemy4Down");
                                e.upImage = document.getElementById("enemy4Up");
                                e.leftImage = document.getElementById("enemy4Left");
                                e.rightImage = document.getElementById("enemy4Right"); 
                            }
                        }
                        if (e.up) {
                            e.currentImage = e.upImage;
                        }
                        else if (e.down) {
                            e.currentImage = e.downImage;
                        }
                        else if (e.left) {
                            e.currentImage = e.leftImage;
                        }
                        else {
                            e.currentImage = e.rightImage;
                        }
                    }
                    
        }            //player
        
        function checkBulletHitTerrain(b) {
            var x = Math.floor(b.bx / grid);
            var y = Math.floor(b.by / grid);
            var xR = Math.floor(b.bx + 12 / grid);;
            var yR = Math.floor(b.bx + 12 / grid);;
            
            if (x >= 0 && y >= 0 && x < 26 && y < 26) {
                //document.getElementById("bulletLocation").innerHTML =(x + ", " + y + " " + map[y][x] );
                if (map[y][x] == 4 || map[y][x] == 9) {
                    document.getElementById("bulletLocation").innerHTML =("GAME OVER");
                    removePlayerBullet(b);
                    gameIsOver = true;
                    
                }
                if (map[y][x] == 1) {
                    map[y][x] = 0;
                    if(onlineGame){
                        Echo.socket.send("map " + map);
                    }
                    b.destroyed = true;
                    playAudioFile("brickDestroyed");
                }
                if(map[y][x] == 2){
                    if(!b.belongsToEnemy && canDestroySteel){
                        map[y][x] = 0;    
                    }else if (!b.destroyed){
                        playAudioFile("BulletHitWall");    
                    }
                    b.destroyed = true;
                }
            }
        }//player
        
        function checkEnemyBulletHitTerrain(b,e) {
            var x = Math.floor(b.bx / grid);
            var y = Math.floor(b.by / grid);
            // var xR = Math.floor(b.bx + 12 / grid);;
            // var yR = Math.floor(b.bx + 12 / grid);;
            
            if (x >= 0 && y >= 0 && x < 26 && y < 26) {
                if (map[y][x] == 4 || map[y][x] == 9) {
                    removeEnemyBullet(b,e);
                    gameIsOver = true;
                }
                if (map[y][x] == 1) {
                    map[y][x] = 0;
                    b.destroyed = true;
                    playAudioFile("brickDestroyed");
                }
                if(map[y][x] == 2){
                    if (!b.destroyed){
                        playAudioFile("BulletHitWall");    
                    }
                    b.destroyed = true;
                }
            }
        }
        
        function collisionWithBullet(e){
            for(var i = 0; i < bullets.length; i++){
                var b = bullets[i];
                var bULeftX = Math.floor(b.bx);
                var bURightX = Math.floor(b.bx + 12);
                var bULeftY = Math.floor(b.by);
                var bURightY = Math.floor(b.by + 12);
                var eULeftX; 
                var eURightX;
                var eULeftY;
                var eURightY;
                checkBulletHitTerrain(b);
                if(!b.belongsToEnemy){
                    eULeftX = e.x; 
                    eURightX = e.x + 32;
                    eULeftY = e.y;
                    eURightY = e.y + 32;
                    
                }
                else{
                   eULeftX = playerXLoc; 
                    eURightX = playerXLoc + 32;
                    eULeftY = playerYLoc;
                    eURightY = playerYLoc + 32; 
                }
                for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                    for(var x = eULeftY; x < eURightY; x++){
                        if((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x)){
                            if(b.belongsToEnemy && !playerInvincible){
                                lostALifeAnimation = true;
                                if(playerLives > 0){
                                    playerLives--;    
                                }else{
                                    gameIsOver = true;
                                    playerIsDead = true;
                                }
                                removePlayerBullet(b);
                            }else{
                                enemyHit(e);
                                removePlayerBullet(b);
                                if(onlineGame){
                                    Echo.socket.send("enemy " + enemies.indexOf(e) +" hit");
                                }
                            }
                            
                        }
                    }
                }
            }
        }    //player
        
        function collisionWithEnemyBullet(e){
            for(var i = 0; i < e.enemyBullets.length; i++){
                var b = e.enemyBullets[i];
                var bULeftX = Math.floor(b.bx);
                var bURightX = Math.floor(b.bx + 12);
                var bULeftY = Math.floor(b.by);
                var bURightY = Math.floor(b.by + 12);
                var eULeftX = playerXLoc; 
                var eURightX = playerXLoc + 32;
                var eULeftY = playerYLoc;
                var eURightY = playerYLoc + 32; 
                checkEnemyBulletHitTerrain(b,e);
                for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the player's box
                    for(var x = eULeftY; x < eURightY; x++){
                        if(!lostALifeAnimation && ((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x))){
                            if(!playerInvincible){
                                lostALifeAnimation = true;
                                if(playerLives > 0){
                                    playerLives--;    
                                }else{
                                    gameIsOver = true;
                                    playerIsDead = true;
                                }
                            }
                            removeEnemyBullet(b,e);
                        }
                    }
                }
            }
        }//player
        
        function collisionWithAnotherTank(e){
            var doesIntersect = false;
            for(var i = 0; i < enemies.length; i++){
                var e2 = enemies[i];
                if(e != e2){
                   if(intersects(e,e2)){
                       doesIntersect = true;
                   } 
                }
            }
            return doesIntersect;
        }//player
        
        function collisionWithPlayer(){
            for(var i = 0; i < enemies.length; i++){
                var e = enemies[i];
                var eULeftX = playerXLoc; 
                var eURightX = playerXLoc + 32;
                var eULeftY = playerYLoc;
                var eURightY = playerYLoc + 32;
                
                var bULeftX = (e.x);
                var bURightX = (e.x + 32);
                var bULeftY = (e.y);
                var bURightY = (e.y + 32);
                for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                    for(var x = eULeftY; x < eURightY; x++){
                        if((bULeftX == y && bULeftY == x)){
                            return "up";
                        }
                        else if((bURightX == y && bURightY == x)){
                            return "up";
                        }
                    }
                }
            }
            return "no";
        }     //player
        
        function intersects(r1, r2){
            var eULeftX = r2.x; 
            var eURightX = r2.x + 32;
            var eULeftY = r2.y;
            var eURightY = r2.y + 32;
            
            var bULeftX = Math.floor(r1.x);
            var bURightX = Math.floor(r1.x + 12);
            var bULeftY = Math.floor(r1.y);
            var bURightY = Math.floor(r1.y + 12);
            
            for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                for(var x = eULeftY; x < eURightY; x++){
                    if((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x)){
                        //alert("intersects");
                        return true;
                    }
                }
            }
            return false;
        }        //player
        
        function intersectsPlayer(r1){
            var eULeftX = playerXLoc; 
            var eURightX = playerXLoc + 32;
            var eULeftY = playerYLoc;
            var eURightY = playerYLoc + 32;
            
            var bULeftX = (r1.x);
            var bURightX = (r1.x + 32);
            var bULeftY = (r1.y);
            var bURightY = (r1.y + 32);
            document.getElementById("playerLocation").innerHTML = ("px " + playerXLoc + " py " + playerYLoc + " ox " + r1.x + " oy " + r1.y);
            for(var y = eULeftX; y < eURightX; y++){//check if the box surrounding the bullet intersects with the enemy's box
                for(var x = eULeftY; x < eURightY; x++){
                    if((bULeftX == y && bULeftY == x) || (bURightX == y && bURightY == x)){
                        return true;
                    }
                }
            }
            return false;
        }      //player

        function pause() {
            if (!paused) {
                imperialThemeAudio.pause();
                paused = true;
                ctx.drawImage(pauseImage, canvas.width / 2 - pauseImage.width / 2, canvas.height / 2 - pauseImage.height / 2);
            }
            else {
                imperialThemeAudio.play();
                paused = false;
            }
            playAudioFile("pauseSound");
        }
        
        function next(){
            countingScore = false;
                    //nextMap();
                    settingScene = true;
                    setNewStage();
                    started1 = false;
                    started2 = false;
                    started3 = false;
                    started4 = false;
                    finished1 = false;
                    finished2 = false;
                    finished3 = false;
                    finishedCount = false;
                    temp1Kills = 0;
                    temp2Kills = 0;
                    temp3Kills = 0;
                    temp4Kills = 0;
                    temp1Points = 0;
                    temp2Points = 0;
                    temp3Points = 0;
                    temp4Points = 0;
                    level1TotalPoints = 0;
                    level2TotalPoints = 0;
                    level3TotalPoints = 0;
                    level4TotalPoints = 0;
                    level1TotalKilled = 0;
                    level2TotalKilled = 0;
                    level3TotalKilled = 0;
                    level4TotalKilled = 0;
                    totalEnemiesKilled = 0;
                    canvas.style.borderColor = "#616161";
        }
        
        function nameScreen(){
            var fontSize = 22;
            var letterSize = 40;
            var title = "choose your name";
            var fullName = char1 + char2 + char3;
            var readyExpression = "Is " + fullName + " okay?";
            var enterToContinue = "press enter to continue";
            var nameReady;
            if(startUp){
                Echo.initialize();
                startUp = false;
            }
            
            if(scores.length <=0){
                Echo.socket.send("request");
            }
            else{
                scores.sort(sortScores);
                hiScore = scores[0];
                //Echo.socket.close();
            }
            if(char1Set && char2Set && char3Set){
                nameReady = true;
            }else{
                nameReady = false;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = fontSize + "px nes";
            ctx.fillStyle = "white";
            ctx.fillText(title , canvas.width/2 - (title.length/2 *fontSize), fontSize + 5);
            
            ctx.font = letterSize + "px nes";
            
            if(!char1Set){
               ctx.fillText("^", canvas.width/2 - letterSize/2 - letterSize * 2, canvas.height/2 + letterSize + 5);
            }else if(!char2Set){
               ctx.fillText("^", canvas.width/2 - letterSize/2, canvas.height/2 + letterSize + 5);
            }else if(!char3Set){
               ctx.fillText("^", canvas.width/2 - letterSize/2 + letterSize * 2, canvas.height/2 + letterSize + 5);
            }
            
            ctx.fillText(char1, canvas.width/2 - letterSize/2 - letterSize * 2, canvas.height/2);
            ctx.fillText(char2, canvas.width/2 - letterSize/2, canvas.height/2);
            ctx.fillText(char3, canvas.width/2 - letterSize/2 + letterSize * 2, canvas.height/2);
            
            ctx.font = fontSize + "px nes";
            if(nameReady){
                ctx.font = fontSize/2 + "px nes";
                ctx.fillText(enterToContinue, canvas.width/2 - (enterToContinue.length/2 * fontSize/2), canvas.height - fontSize*5);
                ctx.font = fontSize + "px nes";
                ctx.fillText(readyExpression, canvas.width/2 - (readyExpression.length/2 * fontSize), canvas.height - fontSize);
            }
            
        }

        function pointsScreen() {
            if(!nextGameOverPressed){
            canvas.style.borderColor = "black";
            var gridPoints = 48;
            var enemyX = canvas.width/2 - 32;
            var arrowX = enemyX - grid*2;
            var killedX = arrowX - grid;
            var ptsX = killedX - grid*4;
            var totalPointsX = ptsX - grid*3;
            if(starWars){
                ctx.drawImage(stars, 0 ,0);
            }else{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            ctx.font = "12px nes";
            ctx.fillStyle = "maroon";
            ctx.fillText("hi-score", canvas.width/2 - (gridPoints*2), gridPoints / 2);
            ctx.fillStyle = "orange";
            ctx.fillText(hiScore.name + " " + hiScore.score, canvas.width/2 + (gridPoints), gridPoints / 2);

            ctx.fillStyle = "white";
            ctx.fillText("stage " + mapNumber, canvas.width/2 -(gridPoints), gridPoints);

            ctx.fillStyle = "maroon";
            ctx.fillText("i-player", 0, gridPoints * 2);
            ctx.fillStyle = "orange";
            ctx.fillText(player1Score, 0, gridPoints * 3);

            level1TotalPoints = level1TotalKilled * 100;
            ctx.fillStyle = "white";
            ctx.fillText("pts", ptsX, gridPoints * 4);
            ctx.fillText("<-", arrowX, gridPoints * 4);
            ctx.drawImage(enemy1, enemyX, gridPoints * 3.5);

            level2TotalPoints = level2TotalKilled * 200;
            ctx.fillText("pts", ptsX, gridPoints * 5);
            ctx.fillText("<-", arrowX, gridPoints * 5);
            ctx.drawImage(enemy2, enemyX, gridPoints * 4.5);

            level3TotalPoints = level3TotalKilled * 300;
            ctx.fillText("pts", ptsX, gridPoints * 6);
            ctx.fillText("<-", arrowX, gridPoints * 6);
            ctx.drawImage(enemy3, enemyX, gridPoints * 5.5);

            level4TotalPoints = level4TotalKilled * 400;
            ctx.fillText("pts", ptsX, gridPoints * 7);
            ctx.fillText("<-", arrowX, gridPoints * 7);
            ctx.drawImage(enemy4, enemyX, gridPoints * 6.5);
            
            if(started4 && finished3){
                ctx.fillText(temp4Points, totalPointsX, gridPoints * 7);
                ctx.fillText(temp4Kills, killedX, gridPoints * 7); 
            }
            if(started3 && finished2){
                ctx.fillText(temp3Points, totalPointsX, gridPoints * 6);
                ctx.fillText(temp3Kills, killedX, gridPoints * 6);
                finished3 = true;
            }
            if(started2 && finished1){
                ctx.fillText(temp2Points, totalPointsX, gridPoints * 5);
                ctx.fillText(temp2Kills, killedX, gridPoints * 5);
                finished2 = true;
            }
            if(started1){
                if(temp1Points >= 1000){
                    ctx.fillText(temp1Points, totalPointsX - grid, gridPoints * 4); 
                    ctx.fillText(temp1Kills, killedX - grid, gridPoints * 4);
                }else{
                    ctx.fillText(temp1Points, totalPointsX, gridPoints * 4); 
                    ctx.fillText(temp1Kills, killedX, gridPoints * 4);
                }
                
                
                finished1 = true;
            }
            
            
            
            if(count % countInterval == 0){
                if(temp1Kills < level1TotalKilled){
                    if(temp1Points >= 1000){
                        ctx.fillText(temp1Points, totalPointsX - grid/2, gridPoints * 4); 
                        ctx.fillText(temp1Kills, killedX - grid/2, gridPoints * 4);
                    }else{
                        ctx.fillText(temp1Points, totalPointsX, gridPoints * 4); 
                        ctx.fillText(temp1Kills, killedX, gridPoints * 4);
                    }
                    playAudioFile("countingPoints");
                    temp1Kills++
                    temp1Points+=100;
                    started1 = true;
                }else{
                    started1 = true;
                    if(finished1 == true){
                        started2 = true;    
                    }
                }
                if(temp2Kills < level2TotalKilled && started2){
                    if(temp1Kills == 0){
                        ctx.fillText(temp2Points, totalPointsX + grid*6, gridPoints * 5);    
                    }
                    else{
                        ctx.fillText(temp2Kills, killedX, gridPoints * 5);    
                    }
                    playAudioFile("countingPoints");
                    temp2Kills++
                    temp2Points+=200;
                    
                }else if (started2){
                    started3 = true;
                }
                if(temp3Kills < level3TotalKilled && started3){
                    ctx.fillText(temp3Points, totalPointsX, gridPoints * 6);
                    ctx.fillText(temp3Kills, killedX, gridPoints * 6);
                    playAudioFile("countingPoints");
                    temp3Kills++
                    temp3Points+=300;
                    
                }else if(started3){
                    started4 = true;
                }
                if(temp4Kills < level4TotalKilled && started4){
                    ctx.fillText(temp4Points, totalPointsX, gridPoints * 7);
                    ctx.fillText(temp4Kills, killedX, gridPoints * 7);
                    playAudioFile("countingPoints");
                    temp4Kills++
                    temp4Points+=400;
                    
                }else if(started4){
                    finishedCount = true;
                }
            }
            
                
             
            
                if(finishedCount){
    
                    ctx.fillText("_____", gridPoints, gridPoints * 7.5);
    
                    totalEnemiesKilled = level1TotalKilled + level2TotalKilled + level3TotalKilled + level4TotalKilled;
                    ctx.fillText("total", ptsX -grid, gridPoints * 8);
                    if(totalEnemiesKilled >= 10){
                        ctx.fillText(totalEnemiesKilled, killedX - grid, gridPoints * 8);
                    }else{
                        ctx.fillText(totalEnemiesKilled, killedX, gridPoints * 8);    
                    }
                    
                    ctx.fillStyle = "orange";
                    var nextText;
                    if(mobileDevice){
                        nextText = "press next to continue";
                    }else if(gameIsOver){
                        nextText = "game over";
                    }else{
                        nextText = "press enter to continue";    
                    }
                    ctx.fillText(nextText, totalPointsX + (gridPoints), canvas.height - grid/2);
                    
                }else{
                    count++;    
                }
            }
            else{
                if(starWars){
                    var fontSize = 40;
                    ctx.clearRect(0,0,canvas.width, canvas.height);
                    ctx.font = fontSize + "px nes";
                    ctx.fillStyle = "yellow";
                    ctx.fillText(starWarsGameOverText, canvas.width/2 - fontSize * starWarsGameOverText.length/2, canvas.height/2);
                    //ctx.fillText(player1Score.toString(), canvas.width/2 - fontSize * player1Score.length/2, canvas.height/2 + fontSize);
                    //ctx.fillText("why not", 0, 0);
                }
                else{
                    ctx.drawImage(gameOverScreen,0,0);
                }
                
            }
            
            
        }
        
        function onlineScreen(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "18px nes";
            ctx.fillStyle = "white";
            ctx.fillText("Welcome To Tanks Online!", 0, 18);
            ctx.font = "12px nes";
            
            if(clickedYesConnect){
                ctx.font = "12px nes";
                ctx.fillText("player 1",0, 225);
                ctx.drawImage(playerUp,canvas.width/2- 32*2, 200);
                ctx.fillText("player 2",0, 275);
                ctx.drawImage(player2.playerUp,canvas.width/2- 32*2, 250);
                ctx.fillText("press escape if you want to return",0,325);
                ctx.fillText(connectionText1,canvas.width/2, 225);
                ctx.fillText(connectionText2,canvas.width/2, 275);
                
                
            }else{
                ctx.font = "16px nes";
                ctx.fillText("Connect?",canvas.width/2 - 12*6, 100);
                ctx.font = "12px nes";
                if(yesSelected){
                    ctx.fillStyle = "orange";
                    ctx.drawImage(playerRight,canvas.width/2 - 37, 125);
                    ctx.fillText("yes",canvas.width/2, 150);
                    ctx.fillStyle = "white";
                    ctx.fillText("no(back)",canvas.width/2, 185);
                }
                else{
                    ctx.fillStyle = "white";
                    ctx.drawImage(playerRight,canvas.width/2 - 37, 160);
                    ctx.fillText("yes",canvas.width/2, 150);
                    ctx.fillStyle = "orange";
                    ctx.fillText("no(back)",canvas.width/2, 185);
                    ctx.fillStyle = "white";
                }
                
                
            }
            ctx.fillText("connection status: ",0,canvas.height - 12);
            if(connected)
            {
                if(searching1){
                    connectionText1 ="searching...";
                }
                if(searching2){
                    connectionText2 = "searching...";
                }
                
                ctx.fillStyle = "green";
                ctx.fillText("connected!",12*18,canvas.height - 12);
            }else{
//                connectionText = "no connection";
//                ctx.fillText(connectionText,canvas.width/2, 275);
//                ctx.fillText(connectionText,canvas.width/2, 225);
                ctx.fillStyle = "maroon";
                ctx.fillText("not connected.",12*18,canvas.height - 12);  
            }
            
        }
        
        function passcodeScreen(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "18px nes";
            ctx.fillStyle = "white";
            ctx.fillText("Enter passcode: ", 0, 18);
            ctx.fillText(passcodeText, 50,50);
            ctx.fillText(passcodeMessage, 10, 150);
            
            
        }
        
        function scoresScreen(displayTopTen){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(scoresScreenSelected){
                var x = 2;
                var y = 0;
                var xSpacing = 35;
                var bigFont = 36;
                var yStretch = 20;
                if(!highScoresScreenMenu){
                    ctx.font = "10px nes";
                    for (var i = 0; i < scores.length; i++) {
                        if(i > 0 && i % Math.floor(scores.length/3) == 0){
                            x = x + 150;
                            y = 0;
                        }
                        ctx.fillStyle = "maroon";
                        ctx.fillText(scores[i].name, 0 +  x, ((y-1 ) * yStretch)+start);
                        ctx.fillStyle = "orange";
                        ctx.fillText(scores[i].score, xSpacing + x, ((y-1) * yStretch)+start);
                        y++;
                    }
                    ctx.clearRect(0,0,canvas.width,50);
                    ctx.clearRect(0, canvas.height - 16*3,canvas.width,canvas.height);
                    ctx.strokeStyle = "orange";
                    ctx.strokeRect(0,50,canvas.width,canvas.height - 16*6);
                    ctx.font = bigFont +"px nes";
                    ctx.fillStyle = "brown";
                    ctx.fillText("scores",canvas.width/2 - bigFont*3,bigFont);
                }
                else{
                    ctx.font = bigFont +"px nes";
                    ctx.fillStyle = "brown";
                    ctx.fillText("high scores",canvas.width/2 - (bigFont*5.5),bigFont);
                    ctx.font = "14px nes";
                    for (var i = 0; i < topTenScores.length; i++) {
                        ctx.fillStyle = "white";
                        ctx.fillText(topTenScores[i].name, 0 +  x, ((y-1 ) * yStretch)+start);
                        ctx.fillText(topTenScores[i].score, 50 + x, ((y-1) * yStretch)+start);
                        ctx.fillText(topTenScores[i].date, 150 + x, ((y-1) * yStretch)+start);
                        ctx.fillText(topTenScores[i].time, canvas.width - (14*topTenScores[i].time.length), ((y-1) * yStretch)+start);
                        y++;
                    } 
                }
            }
            else{
                var bigFont = 30;
                ctx.font = bigFont +"px nes";
                ctx.fillStyle = "brown";
                ctx.drawImage(playerRight,scoresImageX, scoresImageY);
                //ctx.drawImage(playerRight,bigFont*2, canvas.height/2 );
                ctx.fillText("high scores",canvas.width - bigFont*(11),canvas.height/2 - bigFont);
                ctx.fillText("all scores",canvas.width - bigFont*(10),canvas.height/2 + bigFont);
            }
            ctx.font = "12px nes";
            ctx.fillStyle = "white";
            ctx.fillText("press escape to go back", 0, canvas.height - 16);
        }
        
        function sortScores(score1, score2){
            if(score1.score > score2.score){
                return -1;
            }else if(score1.score === score2.score){
                return 0;
            }else{
                return 1;
            } 
                
        }
        
        /*var webSocket = {
            //var Echo = Echo || {};
            socket: {
                connect: function (host) {
                    if ("WebSocket" in window)
                    {
                        this.socket = new WebSocket(host);
                        console.log("connected websocket?");
                    } else if ("MozWebSocket" in window)

                    {
                        this.socket = new MozWebSocket(host);
                    }
                    else {
                        console.log("Error: WebSocket is not supported by this browser");
                        return;
                    }
            
            },
                onopen : function(message){
                    console.log("Info: connection opened");
                    /*player.number = message.data;
                    console.log("player number is " + player.number);
                    $("#echo")
                    window.onkeydown = function (evt) {
                       var direction ="";
                       if(evt.keyCode ==  13){
                           //console.log("enter");
                            Echo.sendMessage();
                       }
                       if(evt.keyCode == 38){
                           //up
                           player.y--;
                           direction="up";
                       }
                       if(evt.keyCode == 40){
                           //down
                           player.y++;
                           direction="down"
                       }
                       if(evt.keyCode == 37){
                           //left
                           player.x--;
                           direction="left";
                       }
                       if(evt.keyCode == 39){
                           //right
                           player.x++;
                           direction="right";
                           //Echo.sendMessage()
                       }
                       if(direction !=""){
                        //Echo.sendDirection(direction);    
                        Echo.sendPlayerLocation();
                       }
                       //alert(evt.keyCode);
                       //ctx.clearRect(0,0,c.width,c,height);
                       $("#echoBack").text(player.x + " " + player.y + " 2" + 
                                           player2.x + " " + player2.y + " 3" + 
                                           player3.x + " " + player3.y + " 4" + 
                                           player4.x + " " + player4.y);
                       //player.drawPlayer();
                       //player2.drawPlayer();
                    };
                    
                },
                onclose : function(){
                    console.log("Info: connection closed");
                },
                onmessage : function(message){
                    console.log(message);  
                    if(message.data.length === 1){
                        console.log(message.data);
                        player.number = message.data;
                        console.log("We got a player number! " + player.number);
                        $("#numberConnected").text("Connected: " + message.data);
                    }
                    if(message.data.length >=2 ){
                        console.log(message.data + " locations");
                        $("#echoBack").text(message.data);
                        var result = message.data.split(" ");
            //            if(result[0] == 1){
            //               player.x = result[1];
            //               player.y = result[2];
            //               player.drawPlayer();
            //            }else if(result[0] == 2){
                            //if(result[0] === player.number - 1){
                                player2.x = result[1];
                                player2.y = result[2];
                            //}
                            if(result[0] === 3){
                                player3.x = result[1];
                                player3.y = result[2];
                            }
                            if(result[0] === 4){
                                player4.x = result[1];
                                player4.y = result[2];
                            }


                           //player2.drawPlayer();
                        //}
                    }
                }
            },
            sendMessage: function(){
                console.log("sending message");
                var echo = $("#echo");
                var message = echo.val();
                if(message !=""){
                    this.socket.send(message);
                    echo.val("");
                }
            },

            sendDirection : function(direction){
                this.socket.send(direction);
            },

            sendPlayerLocation : function(){
                this.socket.send(player.number + " " + player.x + " " + player.y);
            },

            initialize : function(){
                var ep = "/WebTanks/";

                if(window.location.protocol == "http:")
                {
                    this.socket.connect("ws://" + window.location.host + ep);
                }
                else{
                    this.socket.connect("wss://" + window.location.host + ep);
                }
                
            }
            
        };*/

        var Echo = Echo || {};

        Echo.sendMessage = function(){
            console.log("sending message");
            Echo.socket.send(playerXLoc + " " +  playerYLoc + " " + directionFacing);
//            var echo = $("#echo");
//            var message = echo.val();
//            if(message !=""){
//                Echo.socket.send(message);
//                echo.val("");
//            }
        };

        Echo.sendDirection = function(direction){
            Echo.socket.send(direction);
        };

        Echo.sendPlayerLocation = function(){
            Echo.socket.send(player.number + " " + player.x + " " + player.y);
        };

        Echo.connect = function(host){
            if("WebSocket" in window)
            {
                Echo.socket = new WebSocket(host);
                document.getElementById("bulletLocation").innerHTML =("connected");
                document.getElementById("bulletLocation").style.color = ("green");
                connected = true;
            } else if("MozWebSocket" in window) 
            
            {
                Echo.socket = new MozWebSocket(host);
                document.getElementById("bulletLocation").innerHTML =("connected");
                document.getElementById("bulletLocation").style.color = ("green");
                connected = true;
            } else {
                console.log("Error: WebSocket is not supported by this browser");
                return;
            }
            socketOpen = true;

            Echo.socket.onopen = function(message){
                console.log("Info: connection opened");
//                if(message.data === 1){
//                    host = true;
//                }
        //        player.number = message.data;
        //        console.log("player number is " + player.number);
                /*$("#echo")*/
                /*window.onkeydown = function (evt) {
                   var direction ="";
                   if(evt.keyCode ==  13){
                       //console.log("enter");
                        Echo.sendMessage();
                   }
                   if(evt.keyCode == 38){
                       //up
                       player.y--;
                       direction="up";
                   }
                   if(evt.keyCode == 40){
                       //down
                       player.y++;
                       direction="down"
                   }
                   if(evt.keyCode == 37){
                       //left
                       player.x--;
                       direction="left";
                   }
                   if(evt.keyCode == 39){
                       //right
                       player.x++;
                       direction="right";
                       //Echo.sendMessage()
                   }
                   if(direction !=""){
                    //Echo.sendDirection(direction);    
                    Echo.sendPlayerLocation();
                   }
                   //alert(evt.keyCode);
                   //ctx.clearRect(0,0,c.width,c,height);
                   $("#echoBack").text(player.x + " " + player.y + " 2" + 
                                       player2.x + " " + player2.y + " 3" + 
                                       player3.x + " " + player3.y + " 4" + 
                                       player4.x + " " + player4.y);
                   //player.drawPlayer();
                   //player2.drawPlayer();
                };*/
            };
            Echo.socket.onclose = function(){
                console.log("Info: connection closed");
                socketOpen = false;
            };
            Echo.socket.onmessage = function(message){

                console.log(message.data);
                var result = message.data.split(" ");
                if(result[1] === "pause"){
                        //console.log("WE ARE PAUSING OR WHAT?");
                        pause();
                }
                
                if(result[0] === "next"){
                    
                }
                if(result[0] === "countingscore"){
                    countingScore = true;
                }
                if(result[0] === "enemy"){
                    clientCommands.processEnemyData(result);
                }
                
                if(result[0] === "host"){
                    host = true;
                }
                    
                if(result[0] === "map"){
                    clientCommands.updateMap(result);
                }
                
                if(result[0] === "topten"){
                    for(var i = 1; i < result.length; i+=4){
                        var score = new DateScore(result[i], result[i+1], result[i+2], result[i+3]);
                        topTenScores.push(score);
                    }
                    console.log(topTenScores);
                    topTenScores.sort(sortScores);
                    Echo.socket.close();
                }
                
                if(result[0] === "scores"){
//                    for(var i = 1; i < result.length; i++){
//                        scores.push(result[i]);
//                    }
                    for(var i = 1; i < result.length; i+=2){
                        var score = new Score(result[i], result[i+1]);
                        scores.push(score);
                    }
                    scoresInitialized = true;
                    console.log(scores);
                }
/*                if(message.data === "pause"){
                        console.log("WE ARE PAUSING OR WHAT?");
                        pause();
                }*/
                if(message.data.length === 1){
                    console.log(message.data);
                    player.number = message.data;
                    console.log("We got a player number! " + player.number);
//                    var playerName = prompt("Please enter your name", "Peter");
//                    connectionText1 = playerName;
                    searching1 = false;
                    if(player.number == 1){
                        connectionText1 = playerName;
                        searching1 = false;
                    }else{
                        connectionText2 = playerName;
                        searching2 = false;
                    }
                    
                    if(message.data === "startgame"){
                        mainMenu = false;
                        onlineScreenMenu = false;
                        twoPlayerGame = true;
                        onlineGame = true;
                        canvas.style.borderColor = "#616161";
                    }
                    
                    if(!searching1 && !searching2){
                        mainMenu = false;
                        onlineScreenMenu = false;
                        twoPlayerGame = true;
                        onlineGame = true;
                        canvas.style.borderColor = "#616161";
                    }
                    //$("#numberConnected").text("Connected: " + message.data);
                }
                if(message.data.length >=2 ){
                    if(message.data === "start game"){
                        mainMenu = false;
                        onlineScreenMenu = false;
                        twoPlayerGame = true;
                        onlineGame = true;
                        canvas.style.borderColor = "#616161";
                    }
                    //console.log(message.data + " locations");
                    
                    //$("#echoBack").text(message.data);
                    var result = message.data.split(" ");
                    if(message.data === "shoot and more"){
                        player2.shoot();
                        //console.log("DID IT SHOOT WHY NOT?");
                    }
                    if(!host){
                        if(result[0] === "stageover"){
                            clientCommands.stageOver();
                        }
                        if(result[0] === "gameover"){
                            clientCommands.gameOver();
                        }
                        if(result[0] === "enemydata"){
                            clientCommands.processEnemyData(result);
                        }
                        if(result[0] === "map"){
                            clientCommands.updateMap(result);
                        }
                        if(result[0] === "startstage"){
                            clientCommands.startStage();
                        }
                    }
        //            if(result[0] == 1){
        //               player.x = result[1];
        //               player.y = result[2];
        //               player.drawPlayer();
        //            }else if(result[0] == 2){
                        //if(result[0] === player.number - 1){
                            player2.xLoc = result[1];
                            player2.yLoc = result[2];
                            player2.directionFacing = result[3];
                            if(player2.directionFacing === "up"){
                                player2.image = player2.playerUp;
                            }
                            if(player2.directionFacing === "down"){
                                player2.image = player2.playerDown;
                            }
                            if(player2.directionFacing === "left"){
                                player2.image = player2.playerLeft;
                            }
                            if(player2.directionFacing === "right"){
                                player2.image = player2.playerRight;
                            }
                        //}
                        if(result[0] === 3){
                            player3.x = result[1];
                            player3.y = result[2];
                        }
                        if(result[0] === 4){
                            player4.x = result[1];
                            player4.y = result[2];
                        }


                       //player2.drawPlayer();
                    //}
                }
            };
        };

        Echo.initialize = function(){
            var ep = "/WebTanks/";
            var whereToConnect;
            var where = "p";//prompt("Where do you want to connect?", "linode");
            if(where === "linode")
            {
                whereToConnect = "85.159.209.9:8181";
            }
            else{
                whereToConnect = window.location.host;
            }
            console.log("Connecting to " + whereToConnect);
            if(window.location.protocol == "http:"){
                Echo.connect("ws://" + whereToConnect + ep);
            } 
            else{
                Echo.connect("wss://" + whereToConnect + ep);
            }
            console.log("got protocol");
        };
        
        function saveScore(){
//            if(Echo === undefined){
                //Echo.initialize();
                Echo.socket.send("score " + name + " " + player1Score);
                scores = [];
                Echo.socket.send("request");
                Echo.socket.close();
//          
        }
        
        function DateScore(name, score, date, time){
            this.name = name;
            this.score = score;
            this.date = date;
            this.time = time.substring(0,5);
        }

        function readTextFile(number) {
            var file = "tanks/tanksres/Maps/Map" + number + ".txt";
            var rawFile = new XMLHttpRequest();
            settingUpMap = true;
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        map = new Array(26);
                        var allText = rawFile.responseText;
                        var x = 0;
                        var y = 0;
                        //var grid = 16;
                        var startx = 0;
                        var starty = 0 * 3;
                        var items = allText.split(" ");
                        for (var i = 0; i < items.length; i++) {
                            if (x == 0) {
                                map[y] = new Array(26);
                            }
                            map[y][x] = items[i];
                            x++;
                            if (x == 26) {
                                x = 0;
                                y++;
                            }
                        }
                    }
                }
            }
            rawFile.send(null);
            drawMapTerrainImages();
            
        }

        function createArray(length) {
            var arr = new Array(length || 0),
                i = length;

            if (arguments.length > 1) {
                var args = Array.prototype.slice.call(arguments, 1);
                while (i--) arr[length - 1 - i] = createArray.apply(this, args);
            }

            return arr;
        }

        function newPowerUp() {
            var which = Math.floor((Math.random() * 6) + 1);
            powerUp.x = Math.floor((Math.random() * 25*grid)),
                powerUp.y = Math.floor((Math.random() * 25*grid));
            if (which == 1) {
                powerUp.type = "grenade";
                powerUp.image = document.getElementById("grenade");
            }
            else if (which == 2) {
                powerUp.type = "helmet";
                powerUp.image = document.getElementById("helmet");
            }
            else if (which == 3) {
                powerUp.type = "shovel";
                powerUp.image = document.getElementById("shovel");
            }
            else if (which == 4) {
                powerUp.type = "star";
                powerUp.image = document.getElementById("star");
            }
            else if (which == 5) {
                powerUp.type = "tank";
                powerUp.image = document.getElementById("tank");
            }
            else {
                powerUp.type = "timer";
                powerUp.image = document.getElementById("timer");
            }
        }

        function didPlayerGetPowerUp() {
            if (intersectsPlayer(powerUp) && powerUp.type != "none") {
                if(powerUp.type == "grenade"){
                    powerUp.grenadePowerUp();
                }else if(powerUp.type == "helmet"){
                    powerUp.helmetPowerUp();
                }else if(powerUp.type =="shovel"){
                    powerUp.shovelPowerUp();
                }else if(powerUp.type == "star"){
                    powerUp.starPowerUp();
                }else if(powerUp.type == "tank"){
                    powerUp.tankPowerUp()
                }else{
                    powerUp.timerPowerUp();
                }
                powerUp.type = "none";
                powerUp.image = document.getElementById("blank");
                player1Score += 500;
            }
        }    //player

        function checkKeys(e) {
            if(e != undefined){
                var keynum;
                if (window.event) { // IE					
                    keynum = e.keyCode;
                }
                //else if (e.which) { // Netscape/Firefox/Opera					
                //    keynum = e.which;
                //}
                if(nameScreenMenu){
                    if(keynum >= 48 && keynum <= 90){
                        if(!char1Set){
                            char1 = String.fromCharCode(e.keyCode);
                            char1Set = true;
                        }else if(!char2Set){
                            char2 = String.fromCharCode(e.keyCode);
                            char2Set = true;
                        }else if(!char3Set){
                            char3 = String.fromCharCode(e.keyCode);
                            char3Set = true;
                            
                        }
                    }else if(keynum == 8){
                        if(!char2Set){
                            char1 = "_";
                            char1Set = false;
                        }else if(!char3Set){
                            char2 = "_";
                            char2Set = false;
                        }else{
                            char3 = "_";
                            char3Set = false;
                        }
                    }else if(keynum == 13 && char1Set && char2Set && char3Set){
                        nameScreenMenu = false;
                        name = char1+char2+char3;
                    }
                    
                }
                else if(mainMenu){
                    if (keynum == 38) {
                        //up
                        if(menu2Selected){
                            menu1Selected = true;
                            menu2Selected = false;
                        }
                        if(passcodeSelected){
                            menu2Selected = true;
                            passcodeSelected = false;
                        }
                        if(menuOnlineSelected){
                            passcodeSelected = true;
                            menuOnlineSelected = false;
                        }
                        if(scoresSelected){
                            menuOnlineSelected = true;
                            scoresSelected = false;
                        }
                    }
                    if (keynum == 40) {
                        //down
                        if(menu1Selected){
                            menu2Selected = true;
                            menu1Selected = false;
                        }else if(menu2Selected){
                            passcodeSelected = true;
                            menu2Selected = false;
                        }else if(passcodeSelected){
                            menuOnlineSelected = true;
                            passcodeSelected = false;
                        }else if(menuOnlineSelected){
                            scoresSelected = true;
                            menuOnlineSelected = false;
                        }
                        
                    }  
                    if (keynum == 13) {
                        if(passcodeSelected){
                            mainMenu = false;
                            passcodeScreenMenu = true;
                        }
                        else if(menu2Selected){
                            alert("Only 1 player works right now");
                            alert("Just kidding. It works now.");
                            mainMenu = false;
                            twoPlayerGame = true;
                            canvas.style.borderColor = "#616161";
                            if(starWarsThemePlaying){
                                stopStarWarsTheme();
                            }
                        }
                        else if(menuOnlineSelected){
                            if(starWarsThemePlaying){
                                stopStarWarsTheme();
                            }
                            mainMenu = false;
                            onlineScreenMenu = true;
                        }
                        else if(scoresSelected){
                            scoresScreenMenu = true;
                            mainMenu = false;
                            //scores = [];
//                            Echo.initialize();
//                            Echo.socket.send("request");
                        }
                        else{
                            if(starWarsThemePlaying){
                                stopStarWarsTheme();
                            }
                            mainMenu = false;
                            canvas.style.borderColor = "#616161";    
                        }
                        
                    }
                }
                else if(onlineScreenMenu){
                   if (keynum == 38) {
                        //up
                        if(!yesSelected){
                            yesSelected = true;
                        }
                    }
                    if (keynum == 40) {
                        //down
                        if(yesSelected){
                            yesSelected = false;
                        }
                    }  
                    if (keynum == 13 && !clickedYesConnect) {
                        //enter
                        if(yesSelected){
                            clickedYesConnect = true;
                            Echo.initialize();
                            console.log("done initializing");
                        }else{
                            onlineScreenMenu = false;
                            mainMenu = true;
                            yesSelected = true;
                        }
                    }
                    if(keynum == 27 && clickedYesConnect){
                        onlineScreenMenu = false;
                        mainMenu = true;
                        clickedYesConnect = false;
                        yesSelected = true;
                    }
                }
                else if(passcodeScreenMenu){
                    if(keynum >= 48 && keynum <= 90){
                        passcodeText = passcodeText + String.fromCharCode(e.keyCode);
                    }
                    else if(keynum == 8){
                        passcodeText = passcodeText.substr(0, passcodeText.length - 2);
                    }
                    else if(keynum == 13){
                        passcodeMessage = checkPasscode(passcodeText);
                        passcodeText = "";
                    }
                    else if(keynum == 27){
                        mainMenu = true;
                        passcodeScreenMenu = false;
                    }
                    
                }
                else if(scoresScreenMenu){
                    if(keynum == 27){
                       mainMenu = true;
                       scoresScreenMenu = false;
                       scoresScreenSelected = false;
                       highScoresScreenMenu = false;
                       
                    }
                    if(!scoresScreenSelected){
                        if(keynum == 38){
                           if(start <=86){
                               scoresImageX = bigF;
                               scoresImageY = canvas.height/2 - bigF*2; 
                           }
                        }
                        if(keynum == 40){
                           if(start >= -((20* Math.round(scores.length/3 + 1)))+canvas.height){
                                scoresImageX = bigF*2;
                                scoresImageY = canvas.height/2;
                           }
                        }
                        if(keynum == 13){
                            scoresScreenSelected = true;
                            if((scoresImageX === bigF) && (scoresImageY === canvas.height/2 - bigF*2)){
                                highScoresScreenMenu = true;
                            }
                        }
                    }
                    else if(!highScoresScreenMenu){
                        if(keynum == 38){
                           if(start <=86){
                               start+=4; 
                           }
                        }
                        if(keynum == 40){
                           if(start >= -((20* Math.round(scores.length/3 + 1)))+canvas.height){
                               start-=4; 
                           }
                        }
                    }
                    
                }
                
                else{
                  
                if (keynum == 39) {
                    //right
                    //goRight();
                    right = true;
                    //alert("right");
                }
                if (keynum == 37) {
                    //left
                    //goLeft();
                    left = true;
                }
                if (keynum == 38) {
                    //up
                    //goUp();
                    up = true;
                }
                if (keynum == 40) {
                    //down
                    //goDown();
                    down = true;
                }
                if (keynum == 13 || keynum == 32) {
                    if (countingScore && finishedCount && !gameIsOver) {
                        next();
                    }
                    else if(!paused && !gameIsOver && !settingScene) {
                        shoot();
                    }else if(gameIsOver){
                        //location.reload();
                        if(readyToGoToMainMenu){
                            readyToGoToMainMenu = false;
                            mainMenu = true;
                            saveScore();
                            initializeVariables();
                        }
                        else if(nextGameOverPressed){
                            if (gotHiScore){
                                if(starWars){
                                    starWarsGameOverText = "hi score";
                                    stopAudioFile("gameOverStarWars");
                                    playAudioFile("highScoreStarWars");
                                }else{
                                    playAudioFile("highScoreSound");
                                }
                                
                                gameOverScreen = document.getElementById("highScoreScreen");
                                
                                ctx.font = "32px nesfont";
                                ctx.fillText(player1Score, canvas.width/2, canvas.height/2);
                                hiScore.name = name;
                                hiScore.score = player1Score;
                                writeToFile(hiScore);
                                readyToGoToMainMenu = true;
                            }else{
                                readyToGoToMainMenu = true;
                            }
                        }
                        else if(!nextGameOverPressed){
                            ctx.drawImage(gameOverScreen,0,0);
                            writeToFile(new Score(name, player1Score));
                            if(starWars){
                                playAudioFile("gameOverStarWars");
                            }else{
                                playAudioFile("gameOverSound");
                            }
                            nextGameOverPressed = true; 
                        }
                    }
                }
                if (keynum == 80) { //p
                    if(onlineGame){
                        Echo.socket.send(player.number + " pause");    
                    }
                    pause();
                    
                }
                if (keynum == 78) { //n, debugging
                    newPowerUp();
                    //powerUp.grenadePowerUp();
                    canDestroySteel = true;
                        playerLeft = document.getElementById("starLeft4");
                        playerRight =document.getElementById("starRight4");
                        playerUp = document.getElementById("starUp4");
                        playerDown = document.getElementById("starDown4");
                }
                if(keynum == 73){ //i, debugging
                    bulletCapacity = 50;
                }  
                
                //player 2 local controls
                if (keynum == 68) {
                    //right d key
                    //goRight();
                    player2.right = true;
                    //alert("right");
                }
                if (keynum == 65) {
                    //left a key
                    //goLeft();
                    player2.left = true;
                }
                if (keynum == 87) {
                    //up w key
                    //goUp();
                    player2.up = true;
                }
                if (keynum == 83) {
                    //down s key
                    //goDown();
                    player2.down = true;
                }
                if(keynum == 16){
                    if(!paused && !gameIsOver && !settingScene) {
                        player2.shoot();
                    }
                }
                //alert(keynum);
                }
            }
            
            //alert(keynum);
        }
        
        function checkPasscode(code){
            //alert(passcodeText.length);
            var passcodes = [
                "peter", "unlimitedlives" 
            ];
            
            if(passcodeText.length == 8){
                playAudioFile("love");
                return "iloveyou unlocked!";
            }else if(passcodeText.length == 5){
                playerUp = peter;
                playerDown = peter;
                playerLeft = peter;
                playerRight = peter;
                return "peter unlocked!";
            } else if (passcodeText.length == 1){
                setupStarWarsGame();
                return "star wars unlocked!";
            }else if(passcodeText.length == 2){
                setupBomberman();
            }
            return "wrong passcode";
            
//            for(var i = 0; i < passcodes.length; i ++){
//                if(code.toString() == passcodes[i]){
//                    alert("match!");
//                    return code + " unlocked!";
//                }
//                
//            }
        }
        
        function setupStarWarsGame(){
            starWars = true;
            begunStarWars = true;
            player = document.getElementById("starLeft");
            playerUp = document.getElementById("starUp");
            playerDown = document.getElementById("starDown");
            playerLeft = document.getElementById("starLeft");
            playerRight = document.getElementById("starRight");
            
            player2.playerLeft = document.getElementById("star2Left"),
            player2.playerRight = document.getElementById("star2Right"),
            player2.playerUp = document.getElementById("star2Up"),
            player2.playerDown = document.getElementById("star2Down"),
            player2.image = document.getElementById("star2Up"),
//            var bulletImage = document.getElementById("starbulletUp");
            bricks = document.getElementById("astroid");
            steel = document.getElementById("steelAstroid");
            trees = document.getElementById("astroidTree");
            flag = document.getElementById("planetFlag");
            water = document.getElementById("astroidWater1");
//            ice = document.getElementById("astroidIce");
            enemy1 = document.getElementById("tieFighterUp");
            enemy2 = document.getElementById("tieInterceptorUp");
            enemy3 = document.getElementById("tieHunterUp");
            enemy4 = document.getElementById("tieBomberUp");
        }
        
        function setupBomberman(){
            bomberman = true;
            mainMenu = true;
            passcodeScreenMenu = false;
            playAudioFile("bombermanTheme");
            mainMenuImage = document.getElementById("bombermanMainScreen");
            player = document.getElementById("bombermanLeft");
            playerUp = document.getElementById("bombermanUp");
            playerDown = document.getElementById("bombermanDown");
            playerLeft = document.getElementById("bombermanLeft");
            playerRight = document.getElementById("bombermanRight");
            
//            player2.playerLeft = document.getElementById("star2Left"),
//            player2.playerRight = document.getElementById("star2Right"),
//            player2.playerUp = document.getElementById("star2Up"),
//            player2.playerDown = document.getElementById("star2Down"),
//            player2.image = document.getElementById("star2Up"),
//            var bulletImage = document.getElementById("starbulletUp");
            bricks = document.getElementById("bombermanBrick");
            steel = document.getElementById("bombermanSteel");
//            trees = document.getElementById("astroidTree");
//            flag = document.getElementById("planetFlag");
//            water = document.getElementById("astroidWater1");
            ice = document.getElementById("astroidIce");
//            enemy1 = document.getElementById("tieFighterUp");
//            enemy2 = document.getElementById("tieInterceptorUp");
//            enemy3 = document.getElementById("tieHunterUp");
//            enemy4 = document.getElementById("tieBomberUp");
        }
        
        function writeToFile(score){
            /*alert("Saving score: " + score.name + " " + score.score);
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var fh = fso.OpenTextFile("data.txt", 8);
            fh.WriteLine(" " + score.name + " " + score.score);
            fh.Close();*/ 
        } 
        
        function checkKeysKeyCode(keynum) {
                if(mainMenu){
                    if (keynum == 38) {
                        //up
                        if(menu2Selected){
                            menu1Selected = true;
                            menu2Selected = false;
                        }
                        
                        if(passcodeSelected){
                            menu2Selected = true;
                            passcodeSelected = false;
                        }
                        if(menuOnlineSelected){
                            passcodeSelected = true;
                            menuOnlineSelected = false;
                        }
                        
                        
                    }
                    if (keynum == 40) {
                        //down
                        if(menu1Selected){
                            menu2Selected = true;
                            menu1Selected = false;
                        }else if(menu2Selected){
                            passcodeSelected = true;
                            menu2Selected = false;
                        }else if(passcodeSelected){
                            menuOnlineSelected = true;
                            passcodeSelected = false;
                        }
                    }  
                    if (keynum == 13) {
                        if(passcodeSelected){
                            alert("Yeah that would be a cool feature to have. Oh and I don't have 4 friends. I mean I'll do it when I have time.");
                        }
                        else if(menu2Selected){
                            alert("Only 1 player works right now");
                            alert("Just kidding. It works now.");
                            mainMenu = false;
                            twoPlayerGame = true;
                            canvas.style.borderColor = "#616161";
                            
                            
                        }
                        else if(menuOnlineSelected){
                            alert("I dont have the server up yet. But it does look convincing with the NO CONNECTION right?");
                            mainMenu = false;
                            onlineScreenMenu = true;
                        }
                        else{
                            mainMenu = false;
                            canvas.style.borderColor = "#616161";    
                        }
                        
                    }
                }
                
                else if(onlineScreenMenu){
                   if (keynum == 38) {
                        //up
                        if(!yesSelected){
                            yesSelected = true;
                        }
                    }
                    if (keynum == 40) {
                        //down
                        if(yesSelected){
                            yesSelected = false;
                        }
                    }  
                    if (keynum == 13 && !clickedYesConnect) {
                        //enter
                        if(yesSelected){
                            clickedYesConnect = true;
                            Echo.initialize();
                            console.log("done initializing");
                        }else{
                            onlineScreenMenu = false;
                            mainMenu = true;
                            yesSelected = true;
                        }
                    }
                    if(keynum == 27 && clickedYesConnect){
                        onlineScreenMenu = false;
                        mainMenu = true;
                        clickedYesConnect = false;
                        yesSelected = true;
                    }
                }
                
                else{
                  
                if (keynum == 39) {
                    //right
                    //goRight();
                    right = true;
                    //alert("right");
                }
                if (keynum == 37) {
                    //left
                    //goLeft();
                    left = true;
                }
                if (keynum == 38) {
                    //up
                    //goUp();
                    up = true;
                }
                if (keynum == 40) {
                    //down
                    //goDown();
                    down = true;
                }
                if (keynum == 13 || keynum == 32) {
                    if (countingScore && finishedCount && !gameIsOver) {
                        next();
                    }
                    else if(!paused && !gameIsOver && !settingScene) {
                        shoot();
                    }else if(gameIsOver){
                        //location.reload();
                        if(nextGameOverPressed){
                            mainMenu = true;
                            initializeVariables();
                        }
                        if(!nextGameOverPressed){
                            ctx.drawImage(gameOverScreen,0,0);
                            playAudioFile("gameOverSound");
                            nextGameOverPressed = true;    
                        }
                        else if (player1Score > hiScore){
                            if(starWars){
                                playAudioFile("highScoreStarWArs");
                            }else{
                                gameOverScreen = document.getElementById("highScoreScreen");
                                playAudioFile("highScoreSound");
                            }
                            
                        }
                        
                        
                    }
                }
                if (keynum == 80) { //p
                    Echo.socket.send(player.number + " pause");
                    pause();
                    
                }
                if (keynum == 78) { //n, debugging
                    newPowerUp();
                    //powerUp.grenadePowerUp();
                }
                if(keynum == 73){ //i, debugging
                    bulletCapacity = 50;
                }  
                
                //player 2 local controls
                if (keynum == 68) {
                    //right d key
                    //goRight();
                    player2.right = true;
                    //alert("right");
                }
                if (keynum == 65) {
                    //left a key
                    //goLeft();
                    player2.left = true;
                }
                if (keynum == 87) {
                    //up w key
                    //goUp();
                    player2.up = true;
                }
                if (keynum == 83) {
                    //down s key
                    //goDown();
                    player2.down = true;
                }
                if(keynum == 16){
                    if(!paused && !gameIsOver && !settingScene) {
                        player2.shoot();
                    }
                }
                //alert(keynum);
                }
            
            
            //alert(keynum);
        }//player

        function addNewEnemyToGame() { //spawn a new enemy every x amount of time
            if ((spawnCount % spawnInterval == 0) && spawnedEnemies < 20 && enemies.length < 4) {
                var spawnX;
                if (spawnLocation == 0) {
                    spawnX = 0; //left corner
                }
                else if (spawnLocation == 1) {
                    spawnX = canvas.width / 2 - grid; //top middle
                }
                else {
                    spawnX = canvas.width - 32; //right corner
                }
                var enemy = {
                    x: spawnX,
                    y: 5,
                    speed: 4,
                    bulletSpeed: 8,
                    enemyBullets: [],
                    directionFacing: "down",
                    level: enemyLevels[currentEnemyLevel],
                    health: 1,
                    image: enemy1,
                    downImage: document.getElementById("enemy1Down"),
                    upImage: document.getElementById("enemy1Up"),
                    leftImage: document.getElementById("enemy1Left"),
                    rightImage: document.getElementById("enemy1Right"),
                    currentImage: this.downImage,
                    alive: true,
                    spawning: true,
                    blinking: false,
                    blinks: 0,
                    spawn: 0,
                    explosion: 0,
                    left: false,
                    right: false,
                    up: false,
                    down: true,
                    think: function() {
                            var doSomething = Math.floor((Math.random() * 100) + 1);
                            if(doSomething >= 1 && doSomething <= 4 && starWars){
                                playAudioFile("tieMove");
                            }
                            if (doSomething == 1) { //up
                                this.currentImage = this.upImage;
                                this.directionFacing = "up";
                                this.up = true;
                                this.down = this.left = this.right = false;
                            }
                            else if (doSomething == 2) { //down
                                this.currentImage = this.downImage;
                                this.directionFacing = "down";
                                this.down = true;
                                this.up = this.left = this.right = false;
                            }
                            else if (doSomething == 3) { //left
                                this.currentImage = this.leftImage;
                                this.directionFacing = "left";
                                this.left = true;
                                this.down = this.up = this.right = false;
                            }
                            else if (doSomething == 4) { //right
                                this.currentImage = this.rightImage;
                                this.directionFacing = "right";
                                this.right = true;
                                this.down = this.left = this.up = false;
                            }
                            else if (doSomething >= 5 && doSomething <= 10 && this.enemyBullets.length < 1) {
                                this.shoot();
                            }
                            if(doSomething <= 10 && onlineGame){
                                Echo.socket.send("enemy " + enemies.indexOf(enemy) + " doSomething " + doSomething); //+ " " + this.x + " " + this.y);
                            }
                    },
                    receiveOnlineCommands: function(doSomething){
                            if (doSomething == 1) { //up
                                this.currentImage = this.upImage;
                                this.directionFacing = "up";
                                this.up = true;
                                this.down = this.left = this.right = false;
                            }
                            else if (doSomething == 2) { //down
                                this.currentImage = this.downImage;
                                this.directionFacing = "down";
                                this.down = true;
                                this.up = this.left = this.right = false;
                            }
                            else if (doSomething == 3) { //left
                                this.currentImage = this.leftImage;
                                this.directionFacing = "left";
                                this.left = true;
                                this.down = this.up = this.right = false;
                            }
                            else if (doSomething == 4) { //right
                                this.currentImage = this.rightImage;
                                this.directionFacing = "right";
                                this.right = true;
                                this.down = this.left = this.up = false;
                            }
                            else if (doSomething >= 5 && doSomething <= 10 && this.enemyBullets.length < 1) {
                                this.shoot();
                            }
                    },
                    shoot: function() {
                        if(starWars){
                            playAudioFile("tieFire"); 
                        }else{
                            playAudioFile("enemyShoot");
                        }
                        
                        var bulletL = {
                            bx: 0,
                            by: 0,
                            image: bulletImage,
                            direction: enemy.directionFacing,
                            destroyed: false,
                            explosion: 0,
                            belongsToEnemy: true
                        };
                        bulletL.bx = enemy.x;
                        bulletL.by = enemy.y;
                        bulletL.direction = this.directionFacing;
                        if (bulletL.direction == "left") {
                            if(starWars){
                                bulletL.image = document.getElementById("tieLaserLeftRight");
                            }else{
                                bulletL.image = document.getElementById("bulletLeft");
                            }
                            
                            //bulletL.direction = "left";
                            //bulletL.by = bulletL.by + (this.height / 2 - bulletImage.height / 2);
                        }
                        else if (bulletL.direction == "right") {
                            if(starWars){
                                bulletL.image = document.getElementById("tieLaserLeftRight");
                            }else{
                                bulletL.image = document.getElementById("bulletRight");
                            }
                            //bulletL.direction = "right";
                            //bulletL.bx = bulletL.bx + (this.width);
                            //bulletL.by = bulletL.by + (this.height / 2 - bulletImage.height / 2);
                        }
                        else if (bulletL.direction == "up") {
                            if(starWars){
                                bulletL.image = document.getElementById("tieLaserUpDown");
                            }else{
                                bulletL.image = document.getElementById("bulletUp");
                            }
                            //bulletL.direction = "up";
                            //bulletL.bx = bulletL.bx + (this.width / 2 - bulletImage.width / 2);
                        }
                        else if (bulletL.direction == "down") {
                            if(starWars){
                                bulletL.image = document.getElementById("tieLaserUpDown");
                            }else{
                                bulletL.image = document.getElementById("bulletDown");
                            }//bulletL.direction = "down";
                            //bulletL.bx = bulletL.bx + (this.width / 2 - bulletImage.width / 2);
                            //bulletL.by = bulletL.by + (this.height);
                        }
                        if(bomberman){
                            bulletL.image = document.getElementById("bombermanEnemyBullet");
                        }
                        enemy.enemyBullets.push(bulletL);
                        
                        
                    },
                    canGoLeft: function() {
                        var pX = Math.floor(this.x / 15);
                        var pY = Math.floor(this.y / 15);
                        if (pX > 0) {
                            return map[pY][pX - 1] == 0 || map[pY][pX - 1] == 3 || map[pY][pX - 1] == 6;
                        }
                        else {
                            return true;
                        }
                        
                    },
                    canGoRight: function() {
                        var pX = Math.floor(this.x / 15);
                        var pY = Math.floor(this.y / 15);
                        if (pX < map.length) {
                            return map[pY][pX + 1] == 0 || map[pY][pX + 1] == 3 || map[pY][pX + 1] == 6;
                        }
                        else {
                            return true;
                        }
                    },
                    canGoUp: function() {
                        var pX = Math.floor(this.x / 15);
                        var pY = Math.floor(this.y / 15);
                        if (pY > 0) {
                            return map[pY - 1][pX] == 0 || map[pY - 1][pX] == 3 || map[pY - 1][pX] == 6;
                        }
                        else {
                            return true;
                        }
                    },
                    canGoDown: function() {
                        var pX = Math.floor(this.x / 15);
                        var pY = Math.floor(this.y / 15);
                        if (pY < map.length - 1) {
                            return map[pY + 1][pX] == 0 || map[pY + 1][pX] == 3 || map[pY + 1][pX] == 6;
                        }
                        else {
                            return true;
                        }
                    }
                };
                currentEnemyLevel++;
                
                // if(currentEnemyLevel > 35*20){
                //     currentEnemyLevel = 0;
                // }
                if(enemy.level == 1 && starWars){
                    enemy.downImage = document.getElementById("tieFighterDown");
                    enemy.upImage = document.getElementById("tieFighterUp");
                    enemy.leftImage = document.getElementById("tieFighterLeft");
                    enemy.rightImage = document.getElementById("tieFighterRight");
                }
                if(enemy.level == 1 && bomberman){
                    enemy.downImage = document.getElementById("bombermanEnemy1");
                    enemy.upImage = document.getElementById("bombermanEnemy1");
                    enemy.leftImage = document.getElementById("bombermanEnemy1");
                    enemy.rightImage = document.getElementById("bombermanEnemy1");
                }
                if (enemy.level == 2) {
                    enemy.bulletSpeed *= 2;
                    enemy.speed *= 2;
                    if(starWars){
                        enemy.downImage = document.getElementById("tieInterceptorDown");
                        enemy.upImage = document.getElementById("tieInterceptorUp");
                        enemy.leftImage = document.getElementById("tieInterceptorLeft");
                        enemy.rightImage = document.getElementById("tieInterceptorRight");
                    }else if(bomberman){
                        enemy.downImage = document.getElementById("bombermanEnemy2");
                        enemy.upImage = document.getElementById("bombermanEnemy2");
                        enemy.leftImage = document.getElementById("bombermanEnemy2");
                        enemy.rightImage = document.getElementById("bombermanEnemy2");
                    }
                    else{
                        enemy.downImage = document.getElementById("enemy2Down");
                        enemy.upImage = document.getElementById("enemy2Up");
                        enemy.leftImage = document.getElementById("enemy2Left");
                        enemy.rightImage = document.getElementById("enemy2Right");
                    }
                }
                if (enemy.level == 3) {
                    if(starWars){
                        enemy.downImage = document.getElementById("tieHunterDown");
                        enemy.upImage = document.getElementById("tieHunterUp");
                        enemy.leftImage = document.getElementById("tieHunterLeft");
                        enemy.rightImage = document.getElementById("tieHunterRight");
                    }
                    else if(bomberman){
                        enemy.downImage = document.getElementById("bombermanEnemy3");
                        enemy.upImage = document.getElementById("bombermanEnemy3");
                        enemy.leftImage = document.getElementById("bombermanEnemy3");
                        enemy.rightImage = document.getElementById("bombermanEnemy3");
                    }
                    else{
                        enemy.downImage = document.getElementById("enemy3Down");
                        enemy.upImage = document.getElementById("enemy3Up");
                        enemy.leftImage = document.getElementById("enemy3Left");
                        enemy.rightImage = document.getElementById("enemy3Right");
                    }
                }
                if (enemy.level == 4) {
                    enemy.bulletSpeed *= 2;
                    enemy.speed /= 2;
                    enemy.health = 4;
                    if(starWars){
                        enemy.downImage = document.getElementById("tieBomberDownC");
                        enemy.upImage = document.getElementById("tieBomberUpC");
                        enemy.leftImage = document.getElementById("tieBomberLeftC");
                        enemy.rightImage = document.getElementById("tieBomberRightC");
                    }else{
                        enemy.downImage = document.getElementById("enemy4CDown");
                        enemy.upImage = document.getElementById("enemy4CUp");
                        enemy.leftImage = document.getElementById("enemy4CLeft");
                        enemy.rightImage = document.getElementById("enemy4CRight");
                    }
                }
                if (spawnedEnemies == 4 || spawnedEnemies == 14 || spawnedEnemies == 18){
                    enemy.blinking = true;
                }
                
                enemies.push(enemy);
                spawnedEnemies++;
                spawnLocation++;
                if (spawnLocation >= 3) {
                    spawnLocation = 0;
                }
            }
            spawnCount++;
        }//enemy
        
        function blinkAnimation(e){
            var blinkVar = 5;
            
            if(e.blinks <= blinkVar){
                if(e.level == 1){
                    if(starWars){
                        if(e.down){
                            e.downImage = document.getElementById("tieFighterBDown");
                            e.currentImage = e.downImage;
                        }else if(e.up){
                            e.upImage = document.getElementById("tieFighterBUp");
                            e.currentImage = e.upImage;
                        }else if(e.left){
                            e.leftImage = document.getElementById("tieFighterBLeft");
                            e.currentImage = e.leftImage;
                        }else{
                            e.rightImage = document.getElementById("tieFighterBRight");
                            e.currentImage = e.rightImage;
                        }
                    }else{
                        if(e.down){
                            e.downImage = document.getElementById("bEnemy1Down");
                            e.currentImage = e.downImage;
                        }else if(e.up){
                            e.upImage = document.getElementById("bEnemy1Up");
                            e.currentImage = e.upImage;
                        }else if(e.left){
                            e.leftImage = document.getElementById("bEnemy1Left");
                            e.currentImage = e.leftImage;
                        }else{
                            e.rightImage = document.getElementById("bEnemy1Right");
                            e.currentImage = e.rightImage;
                        }
                    }
                    
                }
                if(e.level == 2){
                    if(starWars){
                       if(e.down){
                                e.downImage = document.getElementById("tieInterceptorBDown");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("tieInterceptorBUp");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("tieInterceptorBLeft");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("tieInterceptorBRight");
                                e.currentImage = e.rightImage;
                            } 
                    }else{
                        if(e.down){
                            e.downImage = document.getElementById("bEnemy2Down");
                            e.currentImage = e.downImage;
                        }else if(e.up){
                            e.upImage = document.getElementById("bEnemy2Up");
                            e.currentImage = e.upImage;
                        }else if(e.left){
                            e.leftImage = document.getElementById("bEnemy2Left");
                            e.currentImage = e.leftImage;
                        }else{
                            e.rightImage = document.getElementById("bEnemy2Right");
                            e.currentImage = e.rightImage;
                        }
                    }
                    
                }
                if(e.level == 3){
                    if(starWars){
                        if(e.down){
                                e.downImage = document.getElementById("tieHunterBDown");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("tieHunterBUp");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("tieHunterBLeft");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("tieHunterBRight");
                                e.currentImage = e.rightImage;
                            }
                    }else{
                        if(e.down){
                            e.downImage = document.getElementById("bEnemy3Down");
                            e.currentImage = e.downImage;
                        }else if(e.up){
                            e.upImage = document.getElementById("bEnemy3Up");
                            e.currentImage = e.upImage;
                        }else if(e.left){
                            e.leftImage = document.getElementById("bEnemy3Left");
                            e.currentImage = e.leftImage;
                        }else{
                            e.rightImage = document.getElementById("bEnemy3Right");
                            e.currentImage = e.rightImage;
                        }
                    }
                    
                }
                if(e.level == 4){
                    if(starWars){
                            if(e.down){
                                e.downImage = document.getElementById("tieBomberBDown");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("tieBomberBUp");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("tieBomberBLeft");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("tieBomberBRight");
                                e.currentImage = e.rightImage;
                            }  
                    }else{
                        if(e.down){
                            e.downImage = document.getElementById("bEnemy4Down");
                            e.currentImage = e.downImage;
                        }else if(e.up){
                            e.upImage = document.getElementById("bEnemy4Up");
                            e.currentImage = e.upImage;
                        }else if(e.left){
                            e.leftImage = document.getElementById("bEnemy4Left");
                            e.currentImage = e.leftImage;
                        }else{
                            e.rightImage = document.getElementById("bEnemy4Right");
                            e.currentImage = e.rightImage;
                        }
                    }
                }
            }
            
            if(e.blinks <= blinkVar*2){
                if(e.blinks == blinkVar){
                    if(e.level == 1){
                        if(starWars){
                        if(e.down){
                            e.downImage = document.getElementById("tieFighterDown");
                            e.currentImage = e.downImage;
                        }else if(e.up){
                            e.upImage = document.getElementById("tieFighterUp");
                            e.currentImage = e.upImage;
                        }else if(e.left){
                            e.leftImage = document.getElementById("tieFighterLeft");
                            e.currentImage = e.leftImage;
                        }else{
                            e.rightImage = document.getElementById("tieFighterRight");
                            e.currentImage = e.rightImage;
                        }
                    }else{
                        if(e.down){
                            e.downImage = document.getElementById("enemy1Down");
                            e.currentImage = e.downImage;
                        }else if(e.up){
                            e.upImage = document.getElementById("enemy1Up");
                            e.currentImage = e.upImage;
                        }else if(e.left){
                            e.leftImage = document.getElementById("enemy1Left");
                            e.currentImage = e.leftImage;
                        }else{
                            e.rightImage = document.getElementById("enemy1Right");
                            e.currentImage = e.rightImage;
                        }
                    }
                        
                    }
                    if(e.level == 2){
                        if(starWars){
                            if(e.down){
                                e.downImage = document.getElementById("tieInterceptorDown");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("tieInterceptorUp");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("tieInterceptorLeft");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("tieInterceptorRight");
                                e.currentImage = e.rightImage;
                            }
                        }else{
                            if(e.down){
                                e.downImage = document.getElementById("enemy2Down");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("enemy2Up");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("enemy2Left");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("enemy2Right");
                                e.currentImage = e.rightImage;
                            }
                        }
                        
                    }
                    if(e.level == 3){
                        if(starWars){
                            if(e.down){
                                e.downImage = document.getElementById("tieHunterDown");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("tieHunterUp");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("tieHunterLeft");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("tieHunterRight");
                                e.currentImage = e.rightImage;
                            }
                        }else{
                            if(e.down){
                                e.downImage = document.getElementById("enemy3Down");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("enemy3Up");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("enemy3Left");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("enemy3Right");
                                e.currentImage = e.rightImage;
                            }
                        }
                        
                    }
                    if(e.level == 4){
                        if(starWars){
                            if(e.down){
                                e.downImage = document.getElementById("tieBomberDown");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("tieBomberUp");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("tieBomberLeft");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("tieBomberRight");
                                e.currentImage = e.rightImage;
                            }
                        }else{
                            if(e.down){
                                e.downImage = document.getElementById("enemy4Down");
                                e.currentImage = e.downImage;
                            }else if(e.up){
                                e.upImage = document.getElementById("enemy4Up");
                                e.currentImage = e.upImage;
                            }else if(e.left){
                                e.leftImage = document.getElementById("enemy4Left");
                                e.currentImage = e.leftImage;
                            }else{
                                e.rightImage = document.getElementById("enemy4Right");
                                e.currentImage = e.rightImage;
                            }
                        }
                        
                    }
                }
            }
            if(e.blinks == blinkVar*2){
                    e.blinks = 0    
            }
            e.blinks++;
            
        }//enemy

        function setupEnemies() {
            var spawnX = 0;
            for (var i = 0; i < 3; i++) {
                if (enemies.length < 3) {
                    if (i == 1) {
                        spawnX = canvas.width / 2 - grid;
                    }
                    else if (i == 2) {
                        spawnX = canvas.width - 32;
                    }
                    var enemy = {
                        x: spawnX,
                        y: 5,
                        speed: 4,
                        image: enemy1,
                        alive: true,
                        spawning: true,
                        spawn: 0,
                        explosion: 0,
                        left: false,
                        right: false,
                        up: false,
                        down: true,
                        think: function() {
                            var doSomething = Math.floor((Math.random() * 100) + 1);
                            if (doSomething == 1) { //up
                                this.image = document.getElementById("enemy1Up");
                                this.up = true;
                                this.down = this.left = this.right = false;
                            }
                            else if (doSomething == 2) { //down
                                this.image = document.getElementById("enemy1Down");
                                this.down = true;
                                this.up = this.left = this.right = false;
                            }
                            else if (doSomething == 3) { //left
                                this.image = document.getElementById("enemy1Left");
                                this.left = true;
                                this.down = this.up = this.right = false;
                            }
                            else if (doSomething == 4) { //right
                                this.image = document.getElementById("enemy1Right");
                                this.right = true;
                                this.down = this.left = this.up = false;
                            }
                        }
                    };
                    enemies.push(enemy);
                    spawnX = 0;
                }
            }
        }//dont know why this is here, but don't use.

        function canGoLeft() {
            if (pX > 0) {
                return map[pY][pX - 1] == 0 || map[pY][pX - 1] == 3 || map[pY][pX - 1] == 6;
            }
            else {
                return true;
            }
        }              //player

        function canGoRight() {
            if (pX < map.length) {
                return map[pY][pX + 1] == 0 || map[pY][pX + 1] == 3 || map[pY][pX + 1] == 6;
            }
            else {
                return true;
            }
        }             //player

        function canGoUp() {
            if (pY > 0) {
                return map[pY - 1][pX] == 0 || map[pY - 1][pX] == 3 || map[pY - 1][pX] == 6;
            }
            else {
                return true;
            }
        }                //player

        function canGoDown() {
            if (pY < map.length -1) {
                return map[pY + 1][pX] == 0 || map[pY + 1][pX] == 3 || map[pY + 1][pX] == 6;
            }
            else {
                return true;
            }

        }              //player

        function stopMoving(e) {
            var keynum;
            if (window.event) { // IE					
                keynum = e.keyCode;
            }
            //else
            //if (e.which) { // Netscape/Firefox/Opera					
            //    keynum = e.which;
            //}
            if (keynum >= 37 && keynum <= 40) {
                right = up = down = left = false;
            }
            if(keynum === 68 || keynum === 65 || keynum === 87|| keynum === 83){
                player2.right = player2.up = player2.down = player2.left = false;
            }
        }            //player

        function stopMovingNoEvent() {
            right = up = down = left = false;
        }      //player

        function goLeft() {
            player = playerLeft;
            directionFacing = "left";
            left = true;
            right = up = down = false;
            if ((playerXLoc - playerDeltaX >= 0) && canGoLeft()) {
                playerXLoc -= playerDeltaX;

            }
        }                 //player

        function goRight() {
            player = playerRight;
            directionFacing = "right";
            right = true;
            left = up = down = false;
            if ((playerXLoc + playerDeltaX < canvas.width - 32) && canGoRight()) {
                playerXLoc += playerDeltaX;
            }
        }                //player

        function goUp() {
            player = playerUp;
            directionFacing = "up";
            up = true;
            left = right = down = false;
            if ((playerYLoc - playerDeltaY >= 0) && canGoUp()) {
                playerYLoc -= playerDeltaY;

            }
        }                   //player

        function goDown() {
            player = playerDown;
            directionFacing = "down";
            down = true;
            left = right = up = false;
            if ((playerYLoc + playerDeltaY < canvas.height - 32) && canGoDown()) {
                playerYLoc += playerDeltaY;
            }
        }                 //player

        function shoot() {
            if(bullets.length < bulletCapacity){
            shooting = true;
            if(onlineGame){
                Echo.socket.send("shoot and more");
            }
            if(starWars){
                playAudioFile("fireProton");
            }else{
                playAudioFile("shoot");
            }
            
            var direction;
            var bulletL = {
                bx: playerXLoc,
                by: playerYLoc,
                image: bulletImage,
                direction: directionFacing,
                destroyed: false,
                explosion: 0,
                belongsToEnemy: false
            };
            if (bulletL.direction == "left") {
                if(starWars){
                    bulletL.image = document.getElementById("protonTorpedoLeft");
                }
                else if(bomberman){
                    bulletL.image = document.getElementById("bomb");
                }
                else{
                    bulletL.image = document.getElementById("bulletLeft");
                }
                //bulletL.direction = "left";
                bulletL.by = bulletL.by + (player.height / 2 - bulletImage.height / 2);
            }
            else if (bulletL.direction == "right") {
                if(starWars){
                    bulletL.image = document.getElementById("protonTorpedoRight");
                }
                else if(bomberman){
                    bulletL.image = document.getElementById("bomb");
                }
                else{
                    bulletL.image = document.getElementById("bulletRight");
                }
                //bulletL.direction = "right";
                bulletL.bx = bulletL.bx + (player.width);
                bulletL.by = bulletL.by + (player.height / 2 - bulletImage.height / 2);
            }
            else if (bulletL.direction == "up") {
                if(starWars){
                    bulletL.image = document.getElementById("protonTorpedoUp");
                }
                else if(bomberman){
                    bulletL.image = document.getElementById("bomb");
                }
                else{
                    bulletL.image = document.getElementById("bulletUp");
                }
                //bulletL.direction = "up";
                bulletL.bx = bulletL.bx + (player.width / 2 - bulletImage.width / 2);
            }
            else if (bulletL.direction == "down") {
                if(starWars){
                    bulletL.image = document.getElementById("protonTorpedoDown");
                }
                else if(bomberman){
                    bulletL.image = document.getElementById("bomb");
                }
                else{
                    bulletL.image = document.getElementById("bulletDown");
                }
                //bulletL.direction = "down";
                bulletL.bx = bulletL.bx + (player.width / 2 - bulletImage.width / 2);
                bulletL.by = bulletL.by + (player.height);
            }
            bullets.push(bulletL);
            }
        }                  //player

        function enemyDestroyedAnimation(e) {
            if (!e.alive) {
                var interval = 1;
                if(starWars){
                    if (e.explosion == 0) {
                        playAudioFile("enemyDestroyed");
                        e.currentImage = document.getElementById("starExplosion1");
                    }
                    if (e.explosion == interval) {
                        e.currentImage = document.getElementById("starExplosion2");
                    }
                    if (e.explosion == interval * 2) {
                        e.currentImage = document.getElementById("starExplosion3");
                    }
                    if (e.explosion == interval * 3) {
                        e.currentImage = document.getElementById("starExplosion4");
//                        e.x = e.x - grid;
//                        e.y = e.y - grid;
                    }
                    if (e.explosion == interval * 4) {
                        e.currentImage = document.getElementById("starExplosion5");
                    }
                    if (e.explosion == interval * 5) {
                        e.currentImage = document.getElementById("starExplosion6");
                    }
                    if (e.explosion == interval * 6) {
                        e.currentImage = document.getElementById("starExplosion7");
//                        e.x = e.x + grid;
//                        e.y = e.y + grid;
                    }
                    if (e.explosion == interval * 7) {
                        e.currentImage = document.getElementById("starExplosion8");
                    }
                    if (e.explosion == interval * 8) {
                        e.currentImage = document.getElementById("starExplosion9");
                    }
                    if (e.explosion == interval * 9) {
                        e.currentImage = document.getElementById("starExplosion10");
                    }
                    if (e.explosion == interval * 10) {
                        e.currentImage = document.getElementById("starExplosion11");
                    }
                    if (e.explosion == interval * 11) {
                        e.currentImage = document.getElementById("starExplosion12");
                    }
                    if (e.explosion == interval * 12) {
                        e.currentImage = document.getElementById("starExplosion13");
                    }
                    if (e.explosion == interval * 13) {
                        e.currentImage = document.getElementById("100");
                        e.explosion = 0;
                        removeEnemyFromEnemiesArray(e);
                    }
                }else{
                    if (e.explosion == 0) {
                        playAudioFile("enemyDestroyed");
                        e.currentImage = document.getElementById("explosion1");
                    }
                    if (e.explosion == interval) {
                        e.currentImage = document.getElementById("explosion2");
                    }
                    if (e.explosion == interval * 2) {
                        e.currentImage = document.getElementById("explosion3");
                    }
                    if (e.explosion == interval * 3) {
                        e.currentImage = document.getElementById("explosion4");
                        e.x = e.x - grid;
                        e.y = e.y - grid;
                    }
                    if (e.explosion == interval * 4) {
                        e.currentImage = document.getElementById("explosion5");
                    }
                    if (e.explosion == interval * 5) {
                        e.currentImage = document.getElementById("explosion4");
                    }
                    if (e.explosion == interval * 6) {
                        e.currentImage = document.getElementById("explosion3");
                        e.x = e.x + grid;
                        e.y = e.y + grid;
                    }
                    if (e.explosion == interval * 7) {
                        e.currentImage = document.getElementById("explosion2");
                    }
                    if (e.explosion == interval * 8) {
                        e.currentImage = document.getElementById("explosion1");
                    }
                    if (e.explosion == interval * 9) {
                        e.currentImage = document.getElementById("100");
                        e.explosion = 0;
                        removeEnemyFromEnemiesArray(e);
                    } 
                }
                
                e.explosion++;
            }
        }//enemy

        function spawnEnemyAnimation(e) {
            if (e.spawning) {
                var interval = 1;
                if (e.spawn == 0) {
                    e.currentImage = document.getElementById("spawn1");
                }
                if (e.spawn == interval) {
                    e.currentImage = document.getElementById("spawn2");
                }
                if (e.spawn == interval * 2) {
                    e.currentImage = document.getElementById("spawn3");
                }
                if (e.spawn == interval * 3) {
                    e.currentImage = document.getElementById("spawn4");
                }
                if (e.spawn == interval * 4) {
                    e.currentImage = document.getElementById("spawn1");
                }
                if (e.spawn == interval * 5) {
                    e.currentImage = document.getElementById("spawn2");
                }
                if (e.spawn == interval * 6) {
                    e.currentImage = document.getElementById("spawn3");
                }
                if (e.spawn == interval * 7) {
                    e.currentImage = document.getElementById("spawn4");
                }
                if (e.spawn == interval * 8) {
                    e.currentImage = e.downImage;
                    e.spawning = false;
                }
                e.spawn++;
            }
        }//enemy

        function loadNextMap() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (mapNumber > 35) {
                mapNumber = 0;
            }
            readTextFile(mapNumber);
            document.getElementById("stage").innerHTML = "Stage " + (mapNumber + 1);
            mapNumber++;
        }

        function removePlayerBullet(b) {
            var index = bullets.indexOf(b);
            if (index > -1) {
                bullets.splice(index, 1);
            }
        }    //player
        
        function removeEnemyBullet(b, e) {
            var index = e.enemyBullets.indexOf(b);
            if (index > -1) {
                e.enemyBullets.splice(index, 1);
            }
        }//enemy

        function playerBulletExplosionAnimation(b) {
            var interval = 1;
            if(starWars){
                    if (b.explosion == 0) {
                        b.image = document.getElementById("starExplosion1");
                    }
                    if (b.explosion == interval) {
                        b.image = document.getElementById("starExplosion2");
                    }
                    if (b.explosion == interval * 2) {
                        b.image = document.getElementById("starExplosion3");
                    }
                    if (b.explosion == interval * 3) {
                        b.image = document.getElementById("starExplosion4");
//                        e.x = e.x - grid;
//                        e.y = e.y - grid;
                    }
                    if (b.explosion == interval * 4) {
                        b.image = document.getElementById("starExplosion5");
                    }
                    if (b.explosion == interval * 5) {
                        b.image = document.getElementById("starExplosion6");
                    }
                    if (b.explosion == interval * 6) {
                        b.image = document.getElementById("starExplosion7");
//                        e.x = e.x + grid;
//                        e.y = e.y + grid;
                    }
                    if (b.explosion == interval * 7) {
                        b.image = document.getElementById("starExplosion8");
                    }
                    if (b.explosion == interval * 8) {
                        b.image = document.getElementById("starExplosion9");
                    }
                    if (b.explosion == interval * 9) {
                        b.image = document.getElementById("starExplosion10");
                    }
                    if (b.explosion == interval * 10) {
                        b.image = document.getElementById("starExplosion11");
                    }
                    if (b.explosion == interval * 11) {
                        b.image = document.getElementById("starExplosion12");
                    }
                    if (b.explosion == interval * 12) {
                        b.Image = document.getElementById("starExplosion13");
                    }
                    if (b.explosion == interval * 13) {
                        removePlayerBullet(b);
                    }
                }else{
                    if (b.explosion == 0) {
                        b.image = document.getElementById("explosion1");
                    }
                    if (b.explosion == interval) {
                        b.image = document.getElementById("explosion2");
                    }
                    if (b.explosion == interval * 2) {
                        b.image = document.getElementById("explosion3");
                    }
                    if (b.explosion == interval * 3) {
                        removePlayerBullet(b);
                    }
                }
            
            b.explosion++;
        }//player
        
        function enemyBulletExplosionAnimation(b, e) {
            var interval = 1;
            if(starWars){
                    if (b.explosion == 0) {
                        b.image = document.getElementById("starExplosion1");
                    }
                    if (b.explosion == interval) {
                        b.image = document.getElementById("starExplosion2");
                    }
                    if (b.explosion == interval * 2) {
                        b.image = document.getElementById("starExplosion3");
                    }
                    if (b.explosion == interval * 3) {
                        b.image = document.getElementById("starExplosion4");
//                        e.x = e.x - grid;
//                        e.y = e.y - grid;
                    }
                    if (b.explosion == interval * 4) {
                        b.image = document.getElementById("starExplosion5");
                    }
                    if (b.explosion == interval * 5) {
                        b.image = document.getElementById("starExplosion6");
                    }
                    if (b.explosion == interval * 6) {
                        b.image = document.getElementById("starExplosion7");
//                        e.x = e.x + grid;
//                        e.y = e.y + grid;
                    }
                    if (b.explosion == interval * 7) {
                        b.image = document.getElementById("starExplosion8");
                    }
                    if (b.explosion == interval * 8) {
                        b.image = document.getElementById("starExplosion9");
                    }
                    if (b.explosion == interval * 9) {
                        b.image = document.getElementById("starExplosion10");
                    }
                    if (b.explosion == interval * 10) {
                        b.image = document.getElementById("starExplosion11");
                    }
                    if (b.explosion == interval * 11) {
                        b.image = document.getElementById("starExplosion12");
                    }
                    if (b.explosion == interval * 12) {
                        b.Image = document.getElementById("starExplosion13");
                    }
                    if (b.explosion == interval * 13) {
                        removeEnemyBullet(b,e);
                    }
                }else{
                    if (b.explosion == 0) {
                        b.image = document.getElementById("explosion1");
                    }
                    if (b.explosion == interval) {
                        b.image = document.getElementById("explosion2");
                    }
                    if (b.explosion == interval * 2) {
                        b.image = document.getElementById("explosion3");
                    }
                    if (b.explosion == interval * 3) {
                        removeEnemyBullet(b,e);
                    }
                }
            b.explosion++;
        }

        function removeEnemyFromEnemiesArray(e) {
            var index = enemies.indexOf(e);
            if (index > -1) {
                enemies.splice(index, 1);
            }
        }//enemy

        function setNewStage() {
            spawnCount = 0;
            spawnedEnemies = 0;
            playerXLoc = canvas.width / 2 - 80;
            playerYLoc = canvas.height - 30;
            directionFacing = "up";
            settingScene = true;
            starting = true;
            loadNextMap();
//            imperialThemeAudio.pause();
//            imperialThemeAudio.currentTime = 0;
            if(starWars){
                startImperialTheme();
            }
            
        }        //stage

        function drawMapTerrainImages() {
            settingUpMap = false;
            var startx = 0;
            var starty = 0 * 3;
            for (var i = 0; i < 26; i++) {
                for (var j = 0; j < 26; j++) {
                    if (map[i][j] == 1) {
                        ctx.drawImage(bricks, startx + j * grid, starty + i * grid);
                    }
                    if (map[i][j] == 2) {
                        ctx.drawImage(steel, startx + j * grid, starty + i * grid);
                    }
                    if (map[i][j] == 3) {
                        ctx.drawImage(trees, startx + j * grid, starty + i * grid);
                    }
                    if (map[i][j] == 4) {
                        ctx.drawImage(flag, startx + j * grid, starty + i * grid);
                    }
                    if (map[i][j] == 5) {
                        ctx.drawImage(water, startx + j * grid, starty + i * grid);
                    }
                }
            }
            if(starWars){
                if(waterNumber == 1){
                    water = document.getElementById("astroidWater2");
                }else if(waterNumber == 10){
                    water = document.getElementById("astroidWater3");
                }else if(waterNumber == 20){
                    water = document.getElementById("astroidWater1");
                }else if (waterNumber == 30){
                    waterNumber = 0;
                }
            }else{
                if(waterNumber == 1){
                    water = document.getElementById("water2");
                }else if(waterNumber == 10){
                    water = document.getElementById("water3");
                }else if(waterNumber == 20){
                    water = document.getElementById("water1");
                }else if (waterNumber == 30){
                    waterNumber = 0;
                }
            }
            waterNumber++;
        }   //stage draw

        function drawIce() {
            var startx = 0;
            var starty = 0 * 3;
            for (var i = 0; i < 26; i++) {
                for (var j = 0; j < 26; j++) {
                    if (map[i][j] == 6) {
                        ctx.drawImage(ice, startx + j * grid, starty + i * grid);
                    }
                }
            }
        }   
        
        function updateGraphics() {
            if(nameScreenMenu){
                nameScreen();
                
            }
            else if(begunStarWars){
                //draw();
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.fillStyle = "blue";
                ctx.font = "16px nes";
                ctx.fillText("a long time ago on a ", 0, canvas.height/2);
                ctx.fillText("server far, far away....", 0, canvas.height/2 + 16);
                    
                if(begunStarWarsCount >= 30){
                    begunStarWars = false;
                    mainMenu = true;
                    passcodeScreenMenu = false;
                }
                begunStarWarsCount++;
            }
            else if(mainMenu){
                canvas.style.borderColor = "black";
                if(starWars){
                    ctx.drawImage(stars, 0 ,0);
                }
                else{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                var tankY = menuY + 250;
                if(menu1Selected){
                    tankY = menuY + 225;
                }
                if(menu2Selected){
                   tankY = menuY + 250; 
                }
                if(passcodeSelected){
                    tankY = menuY + 275;
                }
                if(menuOnlineSelected){
                    tankY = menuY + 300;
                }
                if(scoresSelected){
                    tankY = menuY + 325
                }
                if(starWars){
                    if(!starWarsThemePlaying){
                        startStarWarsTheme();
                        starWarsThemePlaying = true;
                    }
                    if(starWarsSize > 0){
                        ctx.fillStyle = "yellow";
                        ctx.font = starWarsSize + "px nes";
                        ctx.fillText("Battle", canvas.width/2 - starWarsSize*3, canvas.height/2);
                        ctx.fillText("City", canvas.width/2 - starWarsSize*2, canvas.height/2 + starWarsSize);
                        starWarsSize--;
                        menuY = 416;
                    }else if(menuY > 0){
                        menuY-=2;
                    }
                }
                else{
                    ctx.drawImage(mainMenuImage, menuX, menuY);
                }
                if(starWars){
                    var fontSize = 60;
                    ctx.fillStyle = "yellow";
                    ctx.font = fontSize + "px nes";
                    ctx.fillText("Battle", canvas.width/2 - fontSize*3, menuY + fontSize*2);
                    ctx.fillText("City", canvas.width/2 - fontSize*2, menuY + fontSize*3);
                }else if(bomberman){
                    var fontSize = 60;
                    ctx.fillStyle = "red";
                    ctx.font = fontSize + "px nes";
                    ctx.fillText("Battle", canvas.width/2 - fontSize*3, menuY + fontSize*2);
                    ctx.fillText("City", canvas.width/2 - fontSize*2, menuY + fontSize*3);
                    ctx.fillStyle = "white";
                }
                ctx.font = "14px nes";
                if(menuY > 0 && !starWars)
                {
                    menuY-=10
                }else{
                    ctx.drawImage(playerRight, canvas.width/2 - grid * 6, tankY);
                }
                
                ctx.fillText("Hi- " + hiScore.name + " " + hiScore.score, canvas.width/2, menuY +20);
                ctx.fillText("(c) 1980 1985 nameco ltd.", grid*4, menuY + 375);
                ctx.fillText("all rights reserved", grid*6, menuY + 400);
                if(menu1Selected){
                    ctx.fillStyle = "orange"; 
                }else{
                    ctx.fillStyle = "white";
                }
                ctx.fillText("1 player", canvas.width/2 - grid * 3, menuY + 250);
                if(menu2Selected){
                    ctx.fillStyle = "orange"; 
                }else{
                    ctx.fillStyle = "white";
                }
                ctx.fillText("2 players", canvas.width/2 - grid * 3, menuY + 275);
                if(passcodeSelected){
                    ctx.fillStyle = "orange"; 
                }else{
                    ctx.fillStyle = "white";
                }
                ctx.fillText("Passcode", canvas.width/2 - grid * 3, menuY + 300);
                if(menuOnlineSelected){
                    if(!onlineConnection){
                        ctx.fillStyle = "red";    
                    }else{
                        ctx.fillStyle = "lime";
                    }
                }else{
                    if(!onlineConnection){
                        ctx.fillStyle = "maroon";    
                    }else{
                        ctx.fillStyle = "green";
                    }
                }
                ctx.fillText("online", canvas.width/2 - grid * 3, menuY + 325);
                if(scoresSelected){
                    ctx.fillStyle = "orange"; 
                }else{
                    ctx.fillStyle = "white";
                }
                ctx.fillText("scores", canvas.width/2 - grid * 3, menuY + 350);
            }
            else if(onlineScreenMenu){
                onlineScreen();
            }
            else if(passcodeScreenMenu){
                passcodeScreen();
            }
            else if(scoresScreenMenu){
                scoresScreen(false);
            }
            else{
                if (!paused && !settingScene && !countingScore) {
                    if(onlineGame){
                        Echo.socket.send(player.number + " " + playerXLoc + " " +  playerYLoc + " " + directionFacing);
                    }
                    
                    if (enemies.length == 0 && spawnedEnemies >= 20) {
                        //alert("enemies defeated");
                        //nextMap();
                        //setNewStage();
                        imperialThemeAudio.pause();
                        imperialThemeAudio.currentTime = 0;
                        countingScore = true;
                        if(onlineGame){
                            Echo.socket.send("countingscore");
                        }
                    }
                    if(player1Score > hiScore.score){
                        hiScore = new Score(name, player1Score);
                        gotHiScore = true;
                    }
                    if (settingUpMap) {
                        readTextFile(mapNumber);
                    }
                    if(starWars){
                        ctx.drawImage(stars, 0 ,0);
                    }else if(bomberman){
                        ctx.drawImage(bombermanBackground1, 0 ,0);
                    }
                    else{
                       ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    drawIce();
                    if (map[pY][pX] == 6) {
                        playerDeltaX = 10;
                        playerDeltaX = 10;
                    }
                    else {
                        playerDeltaX = 5;
                        playerDeltaY = 5;
                    }
                    if(playerIsDead){
                        player = document.getElementById("blank");
                    }
                    if(lostALifeAnimation){
                        lostALife();
                    }
                    ctx.drawImage(player, playerXLoc, playerYLoc); //draw Player
                    //ctx.drawImage(peter, peterX, peterY); //draw Peter
                    if(twoPlayerGame){
                        player2.update();
                    }
                    didPlayerGetPowerUp();
                    if(timerStop){
                        timerIsStopped();
                    }
                    if(playerInvincible && !playerIsDead){
                        doInvinciblity();
                    }
                    for (var i = 0; i < enemies.length; i++) {
                        var e = enemies[i];
                        if(host){
                            Echo.socket.send("enemy " + i + " locations " + e.x + " " + e.y);
                        }
                        spawnEnemyAnimation(e);
                        enemyDestroyedAnimation(e);
                        collisionWithEnemyBullet(e);
                        for(var j = 0; j < e.enemyBullets.length; j++){
                                var b = e.enemyBullets[j];
                                ctx.drawImage(b.image, b.bx, b.by);
                                if (!b.destroyed) {
                                    if (b.direction == "right") {
                                        if (b.bx >= canvas.width) {
                                            b.destroyed = true;
                                            playAudioFile("BulletHitWall");
                                        }
                                        else {
                                            b.bx += bulletSpeed;
                                        }
                                    }
                                    if (b.direction == "left") {
                                        if (b.bx <= 0) {
                                            b.destroyed = true;
                                            playAudioFile("BulletHitWall");
                                        }
                                        b.bx -= bulletSpeed;
                                    }
                                    if (b.direction == "up") {
                                        if (b.by <= 0) {
                                            b.destroyed = true;
                                            playAudioFile("BulletHitWall");
                                        }
                                        b.by -= bulletSpeed;
                                    }
                                    if (b.direction == "down") {
                                        if (b.by >= canvas.height) {
                                            b.destroyed = true;
                                            playAudioFile("BulletHitWall");
                                        }
                                        b.by += bulletSpeed;
                                    }
                                }
                                else {
                                    if (b.explosion == 0) {
                                        b.bx = b.bx - 8;
                                        b.by = b.by - 8;
                                    }
                                    enemyBulletExplosionAnimation(b,e);
                                }
                            }
                        if (!e.spawning && e.alive) {
                            if(e.blinking){
                                blinkAnimation(e);
                            }
                            collisionWithBullet(e);
                            //collisionWithTerrain(e);
                            //collisionWithAnotherTank(e);
                            if(!timerStop){
                                if(host || !onlineGame){
                                    
                                }
                                e.think();
                                if(!collisionWithAnotherTank(e)){
                                    if (e.left && e.canGoLeft()) {
                                    if (e.x >= e.speed) {
                                        e.x -= e.speed;
                                    }
                                    }else if (e.right && e.canGoRight()) {
                                        if (e.x + e.speed < (canvas.width - grid * 2)) {
                                            e.x += e.speed;
                                        }
                                    }else if (e.up && e.canGoUp()) {
                                        if (e.y >= e.speed) {
                                            e.y -= e.speed;
                                        }
                                    }else if (e.down && e.canGoDown()) {
                                        if (e.y + e.speed < (canvas.height - grid * 2)) {
                                            e.y += e.speed;
                                        }
                                    }
                                }
                            }
                        }
                        ctx.drawImage(e.currentImage, e.x, e.y);
                    }
    
                    if(!gameIsOver){
                        if (left && collisionWithPlayer() != "left") {
                            goLeft();
                        }
                        if (right && collisionWithPlayer() != "right") {
                            goRight();
                        }
                        if (up && collisionWithPlayer() != "up") {
                            goUp();
                        }
                        if (down&& collisionWithPlayer() != "down") {
                            goDown();
                        }
                    }
    
                    //else{
                    drawMapTerrainImages();
                    //}
                    ctx.drawImage(powerUp.image, powerUp.x, powerUp.y);
                    for (var i = 0; i < bullets.length; i++) {
                        var b = bullets[i];
                        ctx.drawImage(b.image, b.bx, b.by);
    
                        if (!b.destroyed) {
                            if (b.direction == "right") {
                                if (b.bx >= canvas.width) {
                                    b.destroyed = true;
                                    playAudioFile("BulletHitWall");
                                }
                                else {
                                    b.bx += bulletSpeed;
                                }
                            }
                            if (b.direction == "left") {
                                if (b.bx <= 0) {
                                    b.destroyed = true;
                                    playAudioFile("BulletHitWall");
                                }
                                b.bx -= bulletSpeed;
                            }
                            if (b.direction == "up") {
                                if (b.by <= 0) {
                                    b.destroyed = true;
                                    playAudioFile("BulletHitWall");
                                }
                                b.by -= bulletSpeed;
                            }
                            if (b.direction == "down") {
                                if (b.by >= canvas.height) {
                                    b.destroyed = true;
                                    playAudioFile("BulletHitWall");
                                }
                                b.by += bulletSpeed;
                            }
                        }
                        else {
                            if (b.explosion == 0) {
                                b.bx = b.bx - 8;
                                b.by = b.by - 8;
                            }
                            playerBulletExplosionAnimation(b);
                        }
                    }
                    pX = Math.floor(playerXLoc / 15);
                    pY = Math.floor(playerYLoc / 15);
                    var terrain = map[pY][pX];
                    document.getElementById("playerLocation").innerHTML = "x: " + pX + " y:" + pY + " score:" + player1Score + " left:" + (-(spawnedEnemies - 20)) + " pow " + powerUp.x + " " + powerUp.y + " lives:" + playerLives;
                    //setupEnemies();
                    addNewEnemyToGame();
                    if(gameIsOver){
                        gameOver();
                    }
    
    
                }// main game
                else if (countingScore) {
                    pointsScreen();
                    timeInScore++;
                }//counting enemies killed and score
                else if (settingScene) {
                    if(starWars){
                        ctx.drawImage(stars, 0 ,0);
                    }else{
                       ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    if (!starting) {
                        readTextFile(mapNumber);
                        drawMapTerrainImages();
                        drawIce();
                    }
                    ctx.drawImage(stageScreen, 0, screenMove - 208);
                    ctx.drawImage(stageScreen, 0, canvas.height + (-screenMove));
                    if (screenMove <= 207 && starting) {
                        screenMove += 8;
                    }
                    else if (!starting && screenMove >= 0) {
                        screenMove -= 8;
                    }
                    else if (!starting && screenMove <= 0) {
                        settingScene = false;
                    }
                    else {
                        ctx.fillStyle = "black";
                        ctx.font = "16px nes";
                        ctx.fillText("Stage " + mapNumber, canvas.width / 2 - grid * 3, canvas.width / 2);
                        starting = false;
                        if(starWars){
                            startImperialTheme();
                        }else{
                            playAudioFile("theme");
                        }
                        
                    }
                } //stage closing and opening sequence   
            }
                
        }

        function playAudioFile(title) {
            var audio = document.getElementById(title);
            if (audio.paused) {
                audio.play();
            }
            else {
                audio.currentTime = 0;
            }
        }
        function stopAudioFile(title) {
            var audio = document.getElementById(title);
            audio.pause();
            audio.currentTime = 0;
        }
        
        function startStarWarsTheme(){
            starWarsThemeAudio = document.getElementById("starWarsTheme");
            if (starWarsThemeAudio.paused) {
                starWarsThemeAudio.play();
            }
            else {
                starWarsThemeAudio.currentTime = 0;
            }
        }
        
        function stopStarWarsTheme(){
            starWarsThemeAudio.pause();
            starWarsThemeAudio.currentTime = 0;
        }
        
        function startImperialTheme(){
            imperialThemeAudio = document.getElementById("imperialMarch");
            if (imperialThemeAudio.paused) {
                imperialThemeAudio.play();
            }
            else {
                imperialThemeAudio.currentTime = 0;
            }
        }
        
        function stopImperialTheme(){
            imperialThemeAudio.pause();
            imperialThemeAudio.currentTime = 0;
        }

        setInterval(updateGraphics, 100);