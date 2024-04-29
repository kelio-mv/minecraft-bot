const { createBot } = require("mineflayer");
const { pathfinder } = require("mineflayer-pathfinder");
const target = require("./target");
const follower = require("./follower");
const fighter = require("./fighter");

const bot = createBot({ port: 50988 });

bot.loadPlugin(pathfinder);
bot.loadPlugin(target);
bot.loadPlugin(follower);
bot.loadPlugin(fighter);

bot.on("chat", (username, message) => {
  if (message === "follow") {
    bot.follower.setTarget(username);
  } else if (message === "stop following") {
    bot.follower.clearTarget();
  } else if (message === "fight") {
    bot.fighter.setTarget(username);
  } else if (message === "stop fighting") {
    bot.fighter.clearTarget();
  }
});
