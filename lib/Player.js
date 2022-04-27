const Potion = require('../lib/Potion');
// name parameter sets a default empty string if no name is provided
function Player(name = '') {
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
   
    this.inventory = [new Potion('health'), new Potion()];

    // returns an object with various player properties
  this.getStats = function() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  };

  // returns the inventory array or false if empty
  this.getInventory = function() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  };
  }
  
  module.exports = Player;