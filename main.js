const { createBot } = require("mineflayer");
const { pathfinder } = require("mineflayer-pathfinder");
const follow = require("./follow");

const bot = createBot({ port: 56137 });

bot.loadPlugin(follow);
bot.loadPlugin(pathfinder);

bot.on("chat", (username, message) => {
  if (message === "follow") {
    bot.follow.setTarget(username);
  } else if (message === "stop") {
    bot.follow.clearTarget();
  }
});
