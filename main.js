const { createBot } = require("mineflayer");
const { pathfinder } = require("mineflayer-pathfinder");
const target = require("./target");
const follower = require("./follower");

const bot = createBot({ port: 50988 });

bot.loadPlugin(pathfinder);
bot.loadPlugin(target);
bot.loadPlugin(follower);

bot.on("chat", (username, message) => {
  if (message === "follow") {
    bot.follower.setTarget(username);
  } else if (message === "stop") {
    bot.follower.clearTarget();
  }
});
