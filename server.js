import { createBot } from "mineflayer";
import { default as chatMessageLoader } from "prismarine-chat";
import { Server } from "socket.io";
import pvpBot from "./pvpBot.js";
import pathfinderBot from "./pathfinder.js";

const bot = createBot({
  host: "localhost",
  port: 65316,
  // auth: "microsoft",
  username: "bot1",
  version: "1.8.9",
});
const bot2 = createBot({
  host: "localhost",
  port: 65316,
  // auth: "microsoft",
  username: "bot2",
  version: "1.8.9",
});

pvpBot(bot);
pathfinderBot(bot2);

// const ChatMessage = chatMessageLoader(bot.registry);
// const io = new Server(3000, { serveClient: false });

// bot.once("spawn", () => {
//   console.log("[Bot] Connected!");
// });

// bot.on("message", (message) => {
//   console.log(message.toAnsi());
// });

// bot.on("kicked", (reason) => {
//   reason = new ChatMessage(JSON.parse(reason));
//   console.log("[Kicked]", reason.toAnsi());
// });

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

// // pvpBot(bot);
// pathfinderBot(bot);

// console.log("[Bot] Connecting...");
