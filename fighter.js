function fighterPlugin(bot) {
  class Fighter {
    pluginName = "fighter";
    range = 3;
    fight = false;

    constructor() {
      bot.on("physicsTick", this.handlePhysicsTick);
    }

    setTarget = (username) => {
      bot.follower.setTarget(username, this.pluginName);
      this.fight = true;
    };

    clearTarget = () => {
      bot.follower.clearTarget(this.pluginName);
      this.fight = false;
    };

    handlePhysicsTick = () => {
      const target = bot.target.entity;
      if (!this.fight || !target) return;
      if (bot.entity.position.distanceTo(target.position) <= this.range) {
        bot.attack(target);
      }
    };
  }

  bot.fighter = new Fighter();
}

module.exports = fighterPlugin;

/*
  Try:
  - Chat gpt code
  - GoalY(y)
  - GoalLookAtBlock(pos, world, options = {})
  - GoalPlaceBlock(pos, world, options)
*/
