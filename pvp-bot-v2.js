import mineflayerPathfinder from "mineflayer-pathfinder";
const { pathfinder, Movements, goals } = mineflayerPathfinder;

function pvpBotV2(bot) {
  const followRange = 3;
  const attackRange = 3;
  let target;
  let fight;

  function startFollowing() {
    /* When using a range of 3, the bot somehow gets better at PvP, giving more knockback, getting
    more hits and automatically doing s-tap. However the bot may stop moving prematurely, if its
    target is in a different Y coordinate. */
    bot.pathfinder.setGoal(new goals.GoalFollow(target, followRange));
  }

  function stopFollowing() {
    /* If the bot is trying to follow an entity after killing it, using bot.pathfind.stop() won't
    stop it. Use bot.pathfinder.setGoal(null) instead. */
    bot.pathfinder.setGoal(null);
  }

  bot.loadPlugin(pathfinder);

  bot.once("spawn", () => {
    /* By default the bot can sprint but it makes weird moves when it should be walking straight.
    Enabling allowFreeMotion solves this problem, but on the other hand, i need to manually sprint
    on every physicsTick */
    const movements = new Movements(bot);
    movements.allowFreeMotion = true;
    bot.pathfinder.setMovements(movements);
  });

  bot.on("entitySpawn", (entity) => {
    /* Save the target entity as soon as it spawns, and start following it, if it is supposed to
    fight it */
    if (entity.username === "bot_yt") {
      target = entity;
      if (fight) {
        startFollowing();
      }
    }
  });

  bot.on("chat", (username, message) => {
    /* Set fight to true to start following it when the entity spawns or is loaded. If it's already
    spawned, start following it */
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
    /* Don't run if the bot is not supposed to fight or if the target didn't spawn or load. */
    if (!fight || !target) return;
    /* Manual sprint */
    bot.setControlState("sprint", true);
    /* The calculation that determines if the player can hit another is based on hit boxes and
    slightly different than player's actual distance. A legit player might hit around 3.3 and
    3.4 blocks of distance if we consider the real distance. However, prefer using 3 to make sure
    your hits are legit and avoid getting banned. */
    if (bot.entity.position.distanceTo(target.position) <= attackRange) {
      bot.attack(target);
    }
  });

  bot.on("goal_reached", () => {
    /* If we set another goal in this event handler, it won't work. Use setTimeout to do that. */
    setTimeout(startFollowing);
  });

  bot.on("death", () => {
    /* Stop following the target as soon as you die to prevent high CPU usage bug. */
    stopFollowing();
  });
}

export default pvpBotV2;
