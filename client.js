import { createInterface } from "readline";
import { io } from "socket.io-client";

const rl = createInterface(process.stdin, process.stdout);
const socket = io("http://localhost:3000");

function requestInput() {
  rl.question("> ", (code) => {
    socket.emit("eval", code, (output) => {
      console.log(output);
      requestInput();
    });
  });
}

socket.on("connect", () => {
  console.log("[Client] Connected!");
  requestInput();
});

socket.on("connect_error", () => {
  console.log("[Client] Connection error!");
});

socket.on("disconnect", () => {
  console.log("[Client] Disconnected!");
});

console.log("[Client] Connecting...");
