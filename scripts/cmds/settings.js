module.exports.config = {
 name: "settings",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "",
 commandCategory: "admin",
 usages: "",
 cooldowns: 10,
 
};
const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");
function handleByte(byte) {
	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	let i = 0, usage = parseInt(byte, 10) || 0;

	while(usage >= 1024 && ++i){
		usage = usage/1024;
	}
 
	return(usage.toFixed(usage < 10 && i > 0 ? 1 : 0) + ' ' + units[i]);
}

function handleOS(ping) {
	var os = require("os");
	var cpus = os.cpus();
	var speed, chips;
	for (var i of cpus) chips = i.model, speed = i.speed;
	if (cpus == undefined) return;
	else return msg = 
	`📌 Ping: ${Date.now() - ping}ms.\n\n`;

}
module.exports.onLoad = function() {
 const { writeFileSync, existsSync } = require('fs-extra');
 const { resolve } = require("path");
 const path = resolve(__dirname, 'cache', 'data.json');
 if (!existsSync(path)) {
 const obj = {
 adminbox: {}
 };
 writeFileSync(path, JSON.stringify(obj, null, 4));
 } else {
 const data = require(path);
 if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
 writeFileSync(path, JSON.stringify(data, null, 4));
 }
}
module.exports.run = async function({ api, args, event, Users,handleReply,permssion, Threads }) {
 const moment = require("moment-timezone");
 const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
 var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
 var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
 const axios = require("axios")
 const fs = require('fs-extra');
 const request = require('request')
 const { threadID, messageID, senderID } = event;
 return api.sendMessage({body: `========\n[1] Reboot the BOT system\n[2] Reload config\n[3] Update box data\n[4] Update user data \n[5] Log out of Facebook account\n========\n[6] Turn off the mode that only admins can use BOT\n[7] mode forbid users from entering the box\n[8] Toggle anti-robbery mode on box\n[9] Toggle Antiout mode\n[10] Kick Facebook users\n=========\n[11] View information about BOT\n[12] View box information\n[13] View list of group admins\n[14] View Admin book\n[15] View group list \n-----------\n 👉 Reply to this message at the number you choose\n\n`
 }, threadID, (error, info) => {
 global.client.handleReply.push({
 name: this.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "choosee",
 })
 }, event.messageID)
}
module.exports.handleReply = async function({
 args, event, Users,Threads, api, handleReply, permssion
}) {
 const { threadID, messageID, senderID } = event;
 switch (handleReply.type) {
 case "choosee": {
 switch (event.body) {
 case "1": {
 const permission = ["61582071385233"];
 if (!permission.includes(event.senderID))
 return api.sendMessage("Do you want the age to reset?", event.threadID, event.messageID);
 

	const { threadID, messageID } = event;
	return api.sendMessage(`《Restarted successfully》`, threadID, () => process.exit(1));
}break;
 case "2": {
 const permission = ["61582071385233"];
 if (!permission.includes(event.senderID))
 return api.sendMessage("Border convex rights?", event.threadID, event.messageID);
 const listAdmin = global.config.ADMINBOT[0];
 if (senderID != listAdmin) return api.sendMessage("done -_-", threadID, messageID);
 delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("Successfully reloaded config.json", event.threadID, event.messageID); 
}break;
 case "3": {
 const permission = ["61582071385233"];
 if (!permission.includes(event.senderID))
 return api.sendMessage("Border convex rights?", event.threadID, event.messageID);
 const { threadID } = event;
const { setData, getData } = Threads;
var inbox = await api.getThreadList(100, null, ['INBOX']);
 let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
 const lengthGroup = list.length
 for (var groupInfo of list) {
 console.log(`Updated box data ID: ${groupInfo.threadID}`)
 var threadInfo = await api.getThreadInfo(groupInfo.threadID);
 threadInfo.threadName;
 await Threads.setData(groupInfo.threadID, { threadInfo });
 }
 console.log(`Updated your data ${lengthGroup} box`)
 return api.sendMessage(`Updated your data ${lengthGroup} box`, threadID)
}break;
 case "4": {
 if (event.senderID != "61582071385233") return api.sendMessage(`The age of the cock`, event.threadID, event.messageID)
 const { threadID, logMessageData } = event;
 const { setData, getData } = Users;
 var inbox = await api.getThreadList(100, null, ['INBOX']);
 let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
 for (var groupInfo of list) {
 var { participantIDs } = await Threads.getInfo(groupInfo.threadID) || await api.getThreadInfo(groupInfo.threadID);
 for (var id of participantIDs) {
 let data = await api.getUserInfo(id);
 data.name
 
