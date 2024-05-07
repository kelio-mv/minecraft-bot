const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");

function pvpBotV2(bot) {
  const followRange = 3;
  const attackRange = 3;
  let target;
  let fight;

  function startFollowing() {
    bot.pathfinder.setGoal(new goals.GoalFollow(target, followRange));
  }

  function stopFollowing() {
    bot.pathfinder.setGoal(null);
  }

  bot.loadPlugin(pathfinder);

  bot.once("spawn", () => {
    const movements = new Movements(bot);
    movements.allowFreeMotion = true;
    bot.pathfinder.setMovements(movements);
  });

  bot.on("entitySpawn", (entity) => {
    if (entity.username === "bot_v2") {
      target = entity;
      if (fight) {
        startFollowing();
      }
    }
  });

  bot.on("chat", (username, message) => {
    if (message === "fight") {
      fight = true;
      if (target) {
        startFollowing();
      }
    } else if (message === "stop") {
      fight = false;
      stopFollowing();
    }
  });

  bot.on("physicsTick", () => {
    if (!fight || !target) return;

    bot.setControlState("sprint", true);

    if (bot.entity.position.distanceTo(target.position) <= attackRange) {
      bot.attack(target);
    }
  });

  bot.on("goal_reached", () => {
    setTimeout(startFollowing);
  });

  bot.on("death", () => {
    stopFollowing();
  });
}

module.exports = pvpBotV2;
