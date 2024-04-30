// const { Server } = require("socket.io");

function consolePlugin(bot) {
  const ChatMessage = require("prismarine-chat")(bot.registry);

  bot.once("spawn", () => {
    console.log("[Connection] State: Connected!");
  });

  bot.on("message", (message) => {
    console.log(message.toAnsi());
  });

  bot.on("kicked", (reason) => {
    reason = new ChatMessage(JSON.parse(reason));
    console.log("[Kicked]", "Reason:", reason.toAnsi());
  });

  console.log("[Connection] State: Connecting...");
}

module.exports = consolePlugin;

// const io = new Server(3000, { serveClient: false });

// bot.on("error", () => {
//   io.close();
// });

// io.on("connection", (socket) => {
//   socket.on("eval", (code, callback) => {
//     try {
//       const output = String(eval(code));
//       callback(output);
//     } catch (err) {
//       callback(err.message);
//     }
//   });
// });
