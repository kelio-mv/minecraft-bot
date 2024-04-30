const { createBot } = require("mineflayer");
const { pathfinder } = require("mineflayer-pathfinder");
const target = require("./target");
const follower = require("./follower");
const fighter = require("./fighter");
const _console = require("./console");

const bot = createBot({ host: "jogar.mush.com.br", auth: "microsoft", version: "1.8.8" });
const partyInvite = "\nnordsz convidou você para uma party\nCLIQUE AQUI para aceitar o convite.\n";
const partyAccept = "/party accept nordsz";
const privatePrefix = "[nordsz » nxrdsz] ";

bot.loadPlugin(pathfinder);
bot.loadPlugin(target);
bot.loadPlugin(follower);
bot.loadPlugin(fighter);
bot.loadPlugin(_console);

bot.on("message", (message) => {
  message = message.toString();

  if (message === partyInvite) {
    bot.chat(partyAccept);
  } else if (message.startsWith(privatePrefix)) {
    const content = message.substring(privatePrefix.length);
    const [cmd, target] = content.split(" ");

    if (cmd === "follow") {
      bot.follower.setTarget(target);
    } else if (cmd === "stop_following") {
      bot.follower.clearTarget();
    } else if (cmd === "fight") {
      bot.fighter.setTarget(target);
    } else if (cmd === "stop_fighting") {
      bot.fighter.clearTarget();
    }
  }
});
