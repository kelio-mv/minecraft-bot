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
    const cmd = message.substring(privatePrefix.length);

    if (cmd === "follow") {
      bot.follower.setTarget("nordsz");
    } else if (cmd === "stop_follow") {
      bot.follower.clearTarget();
    } else if (cmd === "fight") {
      // const target = bot.nearestEntity(
      //   (e) => e.type === "player" && ![bot.username, "nordsz"].includes(e.username)
      // );
      bot.fighter.setTarget("nordsz");
    } else if (cmd === "stop_fight") {
      bot.fighter.clearTarget();
    }
  }
});
