function pvpBotV1(bot) {
  const reach = 3;
  let opponent;
  let fight;

  bot.on("spawn", () => {
    bot.setControlState("sprint", true);
  });

  bot.on("entitySpawn", (entity) => {
    if (entity.username === "bot_v2") {
      opponent = entity;
    }
  });

  bot.on("chat", (username, message) => {
    if (message === "fight") {
      fight = true;
    } else if (message === "stop") {
      fight = false;
      bot.setControlState("forward", false);
    }
  });

  bot.on("physicsTick", () => {
    if (!fight || !opponent) return;

    const distance = bot.entity.position.distanceTo(opponent.position);
    bot.lookAt(opponent.position.offset(0, opponent.height, 0), true);
    bot.setControlState("forward", distance > reach);

    if (distance <= reach) {
      bot.attack(opponent);
    }
  });
}

module.exports = pvpBotV1;
