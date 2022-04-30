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
    this.startNewBattle();
    });
};
Game.prototype.startNewBattle = function() {
    //establishes who goes first based on their agility values
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    //displays the player object's stats
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
     //display the description of the current Enemy
    console.log(this.currentEnemy.getDescription());
    //calls the method that is responsible for each individual turn in the round
    this.battle()
  };

 Game.prototype.battle = function(){
    if (this.isPlayerTurn) {
        inquirer
          .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
          })
          .then(({ action }) => {
            if (action === 'Use potion') {
              //display list of potion objects to user
              if (!this.player.getInventory()) {
                console.log("You don't have any potions!");
                return;
              }
            
              inquirer
                .prompt({
                  type: 'list',
                  message: 'Which potion would you like to use?',
                  name: 'action',
                  choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                });
            } else {
              const damage = this.player.getAttackValue();
              this.currentEnemy.reduceHealth(damage);
      
              console.log(`You attacked the ${this.currentEnemy.name}`);
              console.log(this.currentEnemy.getHealth());
            }
          });
      } else {
         const damage = this.currentEnemy.getAttackValue();
         this.player.reduceHealth(damage); 

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
     }
 } ;

module.exports = Game;