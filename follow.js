const { Movements, goals } = require("mineflayer-pathfinder");
const { GoalFollow } = goals;

function follow(bot) {
  const followLostEntity = false;
  const range = 3;
  let target;

  function handleSpawn() {
    // Without allowFreeMotion the bot makes weird moves. Fix this if possible.
    const movements = new Movements(bot);
    movements.allowFreeMotion = true;
    bot.pathfinder.setMovements(movements);
  }

  function handleMove() {
    // When allowFreeMotion is enabled, it keeps preventing our bot from sprinting.
    bot.setControlState("sprint", true);
  }

  function handleEntitySpawn(entity) {
    if (entity.type === "player" && entity.username === target) {
      bot.pathfinder.setGoal(new GoalFollow(entity, range), true);
    }
  }

  function handleEntityGone(entity) {
    // If followLostEntity is true, the bot will keep following the position where the entity despawned.
    // Else, the bot will only follow the entity, when it spawns again.
    if (followLostEntity) return;
    if (entity.type === "player" && entity.username === target) {
      bot.pathfinder.setGoal(null);
    }
  }

  function setTarget(username) {
    const entity = bot.players[username].entity;
    target = username;
    if (entity) {
      bot.pathfinder.setGoal(new GoalFollow(entity, range), true);
    }
  }

  function clearTarget() {
    // Don't use bot.pathfinder.stop(). It is really glitchy.
    target = null;
    bot.pathfinder.setGoal(null);
  }

  bot.once("spawn", handleSpawn);
  bot.on("move", handleMove);
  bot.on("entitySpawn", handleEntitySpawn);
  bot.on("entityGone", handleEntityGone);
  bot.follow = {
    setTarget,
    clearTarget,
  };
}

module.exports = follow;
