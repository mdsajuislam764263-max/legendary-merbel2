const fs = require("fs");

module.exports = {
  name: "redmi",

  run: async function ({ api, event }) {

    // 🧠 Hacker style messages
    api.sendMessage("💀 SYSTEM INITIALIZING...", event.threadID);

    setTimeout(() => {
      api.sendMessage("🔍 Scanning target profile...", event.threadID);
    }, 1500);

    setTimeout(() => {
      api.sendMessage("⚡ Access Granted...", event.threadID);
    }, 3000);

    setTimeout(() => {

      api.sendMessage({
        body: "🔥 SAJU SYSTEM ACTIVATED 🔥\n👿 Hacker Mode ON 😈",
        attachment: fs.createReadStream(__dirname + "/../redmi.jpg")
      }, event.threadID);

    }, 4500);

  }
};
