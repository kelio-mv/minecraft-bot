import { createBot } from "mineflayer";
import { default as chatMessageLoader } from "prismarine-chat";
import { Server } from "socket.io";
import pvpBotV1 from "./pvp-bot-v1.js";
import pvpBotV2 from "./pvp-bot-v2.js";
import plugin from "./plugin.js";

const bot = createBot({
  port: 51106,
});

bot.loadPlugin(plugin);

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

// console.log("[Bot] Connecting...");
