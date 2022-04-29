const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
   //currentEnemy and player are undefined here, we will define them when the
   // initializeGame() method is called.  Incluing them now helps convey which 
   //properties a Game object is intended to have
    this.currentEnemy;
    this.player;
  }
  Game.prototype.initializeGame = function() {
      //populate the enemies array
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    //keeps track of which enemy object is currently fighting the player
    this.currentEnemy = this.enemies[0];
    //prompts the user for their name, which will become the Player name
    inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    })
    // destructure name from the prompt object
    //(arrow key is necessary here.  If we were to use a normal function, the word
    //'function' would have created a new lexical scope where 'this' no longer references
    //the game object)
    .then(({ name }) => {
      this.player = new Player(name);
  
      // test the object creation
     // console.log(this.currentEnemy, this.player);
     console.log(this.startNewBattle());
    });




};
module.exports = Game;