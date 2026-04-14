require('dotenv').config();
const login = require("facebook-chat-api");
const security = require('./security');

// 🔐 Load AppState
const appState = security.getAppState();

// 👑 Admin ID (multiple support)
const ADMINS = process.env.OWNER_ID.split("61582071385233");

// ⏱️ delay function
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// 🚫 anti spam (simple)
let lastMessageTime = {};

login({ appState }, (err, api) => {
  if (err) return console.error("Login error:", err);

  console.log("✅ Secure Bot Running...");

  api.listenMqtt(async (err, event) => {
    if (err) return console.error(err);

    const sender = event.senderID;
    const thread = event.threadID;
    const msg = event.body;

    // 🔐 Only admin access
    if (!ADMINS.includes(sender)) return;

    // 🚫 Anti spam (2 sec delay per user)
    const now = Date.now();
    if (lastMessageTime[sender] && now - lastMessageTime[sender] < 2000) {
      return api.sendMessage("⏳ Slow down bro...", thread);
    }
    lastMessageTime[sender] = now;

    // 🧠 Commands
    if (msg === "ping") {
      await delay(1000);
      return api.sendMessage("🏓 Pong!", thread);
    }

    if (msg === "status") {
      return api.sendMessage("✅ Bot is secure & running 😎", thread);
    }

    if (msg === "help") {
      return api.sendMessage(
        "🔐 Admin Commands:\n- ping\n- status\n- help",
        thread
      );
    }

  });
});
