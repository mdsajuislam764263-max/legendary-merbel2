require('dotenv').config();
const fs = require('fs');

// 👑 Admin list
const ADMINS = process.env.OWNER_ID.split("61582071385233");

// 🧠 Memory सिस्टम
let userCooldown = {};
let blockedUsers = new Set();
let warningCount = {};

// 📁 Log file
const LOG_FILE = "security_log.txt";

// 📝 Save log
function saveLog(text) {
  const time = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${time}] ${text}\n`);
}

module.exports = {

  // 🔐 Check admin
  isAdmin(uid) {
    return ADMINS.includes(uid);
  },

  // 🚫 Block user
  blockUser(uid, reason = "Unknown") {
    blockedUsers.add(uid);
    saveLog(`🚫 Blocked ${uid} | Reason: ${reason}`);
  },

  // ⚠️ Warning system
  addWarning(uid) {
    warningCount[uid] = (warningCount[uid] || 0) + 1;

    if (warningCount[uid] >= 3) {
      this.blockUser(uid, "Too many warnings");
    }
  },

  // 🚫 Check blocked
  isBlocked(uid) {
    return blockedUsers.has(uid);
  },

  // ⏱️ Anti-spam system (2s)
  checkCooldown(uid) {
    const now = Date.now();

    if (userCooldown[uid] && now - userCooldown[uid] < 2000) {
      this.addWarning(uid);
      return false;
    }

    userCooldown[uid] = now;
    return true;
  },

  // 🔐 Load AppState safely
  getAppState() {
    try {
      if (!process.env.APPSTATE) {
        saveLog("❌ AppState missing");
        process.exit(1);
      }
      return JSON.parse(process.env.APPSTATE);
    } catch (e) {
      saveLog("❌ Invalid AppState");
      process.exit(1);
    }
  },

  // 🚨 Advanced Anti-Leak
  antiLeak() {
    if (!process.env.APPSTATE) {
      saveLog("❌ No AppState");
      process.exit(1);
    }

    if (process.env.APPSTATE.length < 100) {
      saveLog("⚠️ Suspicious AppState size");
    }

    if (process.env.APPSTATE.includes("c_user")) {
      saveLog("⚠️ Possible AppState exposure");
    }
  },

  // 🧠 Suspicious activity detect
  detectAbuse(uid, message) {
    if (!message) return false;

    const spamWords = ["hack", "crash", "spam", "attack"];
    for (let word of spamWords) {
      if (message.toLowerCase().includes(word)) {
        this.addWarning(uid);
        saveLog(`⚠️ Suspicious word by ${uid}: ${word}`);
        return true;
      }
    }
    return false;
  },

  // 🔒 Main security gate
  allowCommand(uid, message) {

    if (this.isBlocked(uid)) {
      saveLog(`🚫 Blocked user tried: ${uid}`);
      return false;
    }

    if (!this.isAdmin(uid)) {
      saveLog(`⛔ Non-admin access: ${uid}`);
      return false;
    }

    if (!this.checkCooldown(uid)) {
      saveLog(`⏱️ Spam detected: ${uid}`);
      return false;
    }

    if (this.detectAbuse(uid, message)) {
      return false;
    }

    return true;
  }

};
