import mineflayerPathfinder from "mineflayer-pathfinder";
const { pathfinder, Movements, goals } = mineflayerPathfinder;

function pvpBotV2(bot) {
  const reach = 3;
  let opponent;
  let fight;

  function startFollowing() {
    bot.pathfinder.setGoal(new goals.GoalFollow(opponent, reach));
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
    if (entity.username === "bot_v1") {
      opponent = entity;
      if (fight) {
        startFollowing();
      }
    }
  });

  bot.on("chat", (username, message) => {
    if (message === "fight") {
      fight = true;
      if (opponent) {
        startFollowing();
      }
    } else if (message === "stop") {
      fight = false;
      stopFollowing();
    }
  });

  bot.on("physicsTick", () => {
    if (!fight || !opponent) return;

    bot.setControlState("sprint", true);

    if (bot.entity.position.distanceTo(opponent.position) <= reach) {
      bot.attack(opponent);
    }
  });

  bot.on("goal_reached", () => {
    setTimeout(startFollowing);
  });

  bot.on("death", stopFollowing);
}

export default pvpBotV2;
