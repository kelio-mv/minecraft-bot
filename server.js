import { createBot } from "mineflayer";
import { default as chatMessageLoader } from "prismarine-chat";
import { Server } from "socket.io";
import pvpBot from "./pvpBot.js";

const bot = createBot({
  host: "jogar.mush.com.br",
  port: 25565,
  auth: "microsoft",
  // username: "seer_v4",
  version: "1.8.9",
});
const ChatMessage = chatMessageLoader(bot.registry);
const io = new Server(3000, { serveClient: false });

bot.once("spawn", () => {
  console.log("[Bot] Connected!");
});

bot.on("message", (message) => {
  console.log(message.toAnsi());
});

bot.on("kicked", (reason) => {
  reason = new ChatMessage(JSON.parse(reason));
  console.log("[Kicked]", reason.toAnsi());
});

bot.on("error", () => {
  io.close();
});

io.on("connection", (socket) => {
  socket.on("eval", (code, callback) => {
    try {
      const output = String(eval(code));
      callback(output);
    } catch (err) {
      callback(err.message);
    }
  });
});

pvpBot(bot);

console.log("[Bot] Connecting...");
