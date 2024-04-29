const { Movements, goals } = require("mineflayer-pathfinder");
const { GoalFollow } = goals;

function followerPlugin(bot) {
  class Follower {
    pluginName = "follower";
    followLostTarget = false;
    range = 3;

    constructor() {
      bot.once("spawn", this.handleSpawn);
      bot.on("move", this.handleMove);
      bot.on("targetFound", this.handleTargetFound);
      bot.on("targetLost", this.handleTargetLost);
    }

    setTarget = (username, manager) => {
      bot.target.set(username, manager || this.pluginName);
    };

    clearTarget = (manager) => {
      // Don't use bot.pathfinder.stop(). It is really glitchy.
      bot.target.clear(manager || this.pluginName);
      bot.pathfinder.setGoal(null);
    };

    handleSpawn = () => {
      // Without allowFreeMotion the bot makes weird moves. Fix this if possible.
      const movements = new Movements(bot);
      movements.allowFreeMotion = true;
      bot.pathfinder.setMovements(movements);
    };

    handleMove = () => {
      // When allowFreeMotion is enabled, it keeps preventing our bot from sprinting.
      bot.setControlState("sprint", true);
    };

    handleTargetFound = (entity) => {
      bot.pathfinder.setGoal(new GoalFollow(entity, this.range), true);
    };

    handleTargetLost = () => {
      // If followLostTarget is true, the bot will keep following the position where the entity despawned.
      // Else, the bot will only follow the entity, when it spawns again.
      if (this.followLostTarget) return;
      bot.pathfinder.setGoal(null);
    };
  }

  bot.follower = new Follower();
}

module.exports = followerPlugin;
