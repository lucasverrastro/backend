const express = require("express");
const router = express.Router();
const socket = require("socket.io");
const ChatManagerDb = require("../controller/chatManagerDb");
const chatManagerDb = new ChatManagerDb();

router.use(express.static("./src/public"));

router.get("/", async (req, res) => {
  var httpServer = req.httpServer;
  const io = socket(httpServer);
  try {
    io.on("connection", (socket) => {
      console.log("Initiating websocket connection");
      socket.on("chat", async() => {
        const chat = await chatManagerDb.getChat();
        io.emit("chat", chat);
      });

      socket.on("newMessage", async (newMessage) => {
        await chatManagerDb.addMessageToChat(newMessage);
        const newChat = await chatManagerDb.getChat();
        io.emit("chat", newChat);
      });
    });

    res.render("chat", {active: {chat: true }});
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;