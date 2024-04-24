function pvpBot(bot) {
  const reach = 3;
  let opponent;

  bot.on("spawn", () => {
    bot.setControlState("sprint", true);
  });

  bot.on("chat", (username, message) => {
    if (username !== "nxrdsz") return;

    if (message === "fight") {
      opponent = bot.nearestEntity(
        (entity) => entity.type === "player" && entity.username === "H4xFLAME"
      );
    } else if (message === "stop") {
      opponent = null;
      bot.setControlState("forward", false);
    }
  });

  bot.on("physicsTick", () => {
    if (!opponent) return;

    const distance = bot.entity.position.distanceTo(opponent.position);
    bot.lookAt(opponent.position.offset(0, opponent.height, 0), true);
    bot.setControlState("forward", distance > reach);
    if (distance <= reach) {
      bot.attack(opponent);
    }
  });
}

export default pvpBot;