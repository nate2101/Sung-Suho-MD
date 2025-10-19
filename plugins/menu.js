const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const config = require('../settings');
const { lite, commands } = require('../lite');
const { getPrefix } = require('../lib/prefix');
const { runtime } = require('../lib/functions');

lite({
  pattern: "menu",
  react: "🤖",
  alias: ["help", "allmenu"],
  desc: "Show bot command list",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
  try {
    const prefix = getPrefix();
    const time = moment().tz("Africa/Harare").format("HH:mm:ss");
    const date = moment().tz("Africa/Harare").format("DD/MM/YYYY");

    // 🍴 GitHub forks = bot reach
    const repoUrl = "https://api.github.com/repos/NaCkS-ai/Sung-Suho-MD";
    let forks = 0;
    try {
      const res = await axios.get(repoUrl);
      forks = res.data.forks_count || 0;
    } catch {
      forks = "N/A";
    }

    // 🎭 Icons per category
    const categoryIcons = {
      main: "💠",
      ai: "🧠",
      fun: "🎭",
      owner: "👑",
      group: "👥",
      convert: "🔄",
      reaction: "💫",
      logo: "🎨",
      anime: "✨",
      settings: "⚙️",
      download: "📥",
      other: "🕵️‍♂️"
    };

    // 🗂️ Categorize commands
    const categorized = {};
    for (let cmd of commands) {
      if (!cmd.pattern || cmd.dontAddCommandList) continue;
      const cat = cmd.category || "other";
      if (!categorized[cat]) categorized[cat] = [];
      categorized[cat].push(cmd.pattern);
    }

    // 🧾 Centered + balanced layout
    let menuText = `
╭───────────────────────────╮
│              *${config.BOT_NAME}*
│───────────────────────────────────────│
│ 👤 User: ${pushname}
│ 🕓 Time: ${time}
│ 📅 Date: ${date}
│ ⚙️ Mode: ${config.MODE}
│ 💠 Prefix: [ ${prefix} ]
│ ⏳ Runtime: ${runtime(process.uptime())}
│ 🧾 Total Cmds: ${commands.length}
│ 🍴 Daily users: ${forks}
│ 👑 Developer: Lord Sung
│ 🚀 Version: ${config.version}
╰───────────────────────────────────────╯

${config.DESCRIPTION}

╭───────────────────────────────────────╮
│           🧩 COMMANDS MENU 🧩
╰───────────────────────────────────────╯
`;

    // 🧩 Add each command category
    for (const [cat, cmds] of Object.entries(categorized)) {
      const icon = categoryIcons[cat] || "📁";
      menuText += `
┌── ${icon} ${cat.toUpperCase()}
${cmds.map(c => `│ ➤ ${c}`).join("\n")}
└──────────────────────────────
`;
    }

    menuText += `
╭───────────────────────────────────────╮
│            ✦ END OF MENU ✦
╰───────────────────────────────────────╯
`;

    // 🖼️ Send styled image + text
    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL },
      caption: menuText.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363402507750390@newsletter",
          newsletterName: "Lord Sung",
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // 🎵 Optional menu sound
    try {
      await conn.sendMessage(from, {
        audio: fs.readFileSync("./all/menu.m4a"),
        mimetype: "audio/mp4",
        ptt: true
      }, { quoted: mek });
    } catch {}

  } catch (e) {
    console.error("Menu Error:", e);
    reply(`❌ *Error:* ${e.message}`);
  }
});
