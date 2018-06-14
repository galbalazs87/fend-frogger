// Our player
var Player = function() {
    // define which sprite is being used for player
    this.sprite = 'images/char-princess-girl.png';
    // location X for Player on board
    this.x = 200;
    // location Y for Player on board
    this.y = 400;
};


// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    this.speed = Math.floor((Math.random() * 100) + (Math.random() * 110) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 550) {
        this.x += this.speed * dt;
    } else {
        this.x = -2;
    }

    if(player.x >= this.x - 75 && player.x <= this.x + 75 && player.y >= this.y - 75 && player.y <= this.y + 75) {
        player.reset('YOU LOST, BETTER LUCK NEXT TIME!');
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
Player.prototype.reset = function(message) {
    this.x = 200;
    this.y = 400;
  
    var div = document.createElement('div');
  
    div.id = 'message';
    div.innerHTML = '<h2>' + message + '</h2>';
  
    document.body.appendChild(div);
  
    setTimeout(function() {
      document.body.removeChild(div);
    }, 1000);
  };

  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  Player.prototype.update = function() {
    
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if(this.ctlKey === 'left' && this.x > 0){
      this.x = this.x - 50;
      //if r ight key is pressed and player is not on edge of map increment x
    } else if(this.ctlKey === 'right' && this.x != 400){
      this.x = this.x + 50;
      //if up key is pressed increment y
    } else if(this.ctlKey === 'up'){
      this.y = this.y - 50;
      //if down key is pressed and player is not on edge of map decrement y
    } else if (this.ctlKey === 'down' && this.y != 400){
      this.y = this.y + 50;
    }
    this.ctlKey = null;
  
    //If on water, pop a message and reset the game
    if(this.y < 25){
  
      this.reset('Well done!');
    }
  };

  Player.prototype.handleInput = function(e) {
    this.ctlKey = e;
  };

  var player = new Player();

/** Array for enemy objects **/
const allEnemies = [
  new Enemy(-2, 60),
  new Enemy(-2, 100),
  new Enemy(-2, 150),
  new Enemy(-2, 220)
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
