import mineflayerPathfinder from "mineflayer-pathfinder";
const { pathfinder, Movements, goals } = mineflayerPathfinder;

function pathfinderBot(bot) {
  let opponent;
  const reach = 3;
  const defaultMove = new Movements(bot);
  // defaultMove.allowFreeMotion = true;

  bot.loadPlugin(pathfinder);

  bot.on("chat", (username, message) => {
    if (message === "fight") {
      opponent = bot.players.bot1.entity;
      bot.pathfinder.setMovements(defaultMove);
      bot.pathfinder.setGoal(new goals.GoalFollow(opponent, 0), true);
    } else if (message === "stop") {
      bot.pathfinder.setGoal(null);
      opponent = null;
    }
  });

  bot.on("physicsTick", () => {
    if (!opponent) return;

    const distance = bot.entity.position.distanceTo(opponent.position);
    // bot.lookAt(opponent.position.offset(0, opponent.height, 0), true);
    // bot.setControlState("forward", distance > reach);
    if (distance <= reach) {
      bot.attack(opponent);
    }
  });

  bot.on("goal_reached", () => console.log("goal_reached"));
  bot.on("path_update", () => console.log("path_update"));
  bot.on("goal_updated", () => console.log("goal_updated"));
  bot.on("path_reset", () => console.log("path_reset"));
  bot.on("path_stop", () => console.log("path_stop"));
}

export default pathfinderBot;
