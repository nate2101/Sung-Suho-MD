const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

// 🌐 GLOBAL SETTINGS
global.domain = process.env.DOMAIN || "https://kelvin-vps.goodnesstechhost.xyz"; // Fill in your domain (no / at the end)
global.apikey = process.env.API_KEY || "ptlc_Ag7Vw59tmwwUJxCX1TzYJXFiNPUjCOXefOe7fqSXvZb"; // Fill API key
global.capikey = process.env.CA_API_KEY || "ptla_3HsV2SmFEggs4tB4EDXjd01BdoLloIdIJlGXICKh4z2"; // Fill secondary API key (if any)

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "",
    PREFIX: process.env.PREFIX || ".",
    BOT_NAME: process.env.BOT_NAME || "sᴜʜᴏ-ᴍᴅ",
    MODE: process.env.MODE || "public",

    LINK_WHITELIST: "youtube.com,github.com",
    LINK_WARN_LIMIT: 3,
    LINK_ACTION: "kick",

    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*sᴛᴀᴛᴜs sᴇᴇɴ ʙʏ ᴍᴇ 😆*",

    WELCOME: process.env.WELCOME || "true",
    ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
    ANTI_LINK: process.env.ANTI_LINK || "true",
    MENTION_REPLY: process.env.MENTION_REPLY || "false",

    MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/pyda5w.jpg",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/pyda5w.jpg",

    LIVE_MSG: process.env.LIVE_MSG || 
`> ʙᴏᴛ ɪs sᴘᴀʀᴋɪɴɢ ᴀᴄᴛɪᴠᴇ ᴀɴᴅ ᴀʟɪᴠᴇ

ᴋᴇᴇᴘ ᴜsɪɴɢ ✦sᴜɴɢ sᴜʜᴏ✦ ғʀᴏᴍ ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ ɪɴᴄ⚡

*© ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*

> ɢɪᴛʜᴜʙ : github.com/NaCkS-ai/SungSu-ho-MD`,

    STICKER_NAME: process.env.STICKER_NAME || "suho-xᴅ",
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,💛,💚,💙,💜,🤎,🖤,🤍",

    DELETE_LINKS: process.env.DELETE_LINKS || "false",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "27649342626",
    OWNER_NAME: process.env.OWNER_NAME || "ᴍʀ sᴜɴɢ",
    DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ sᴜɴɢ sᴜʜᴏ*",

    READ_MESSAGE: process.env.READ_MESSAGE || "false",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    ANTI_BAD: process.env.ANTI_BAD || "false",
    ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
    AUTO_STICKER: process.env.AUTO_STICKER || "false",
    AUTO_REPLY: process.env.AUTO_REPLY || "false",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    PUBLIC_MODE: process.env.PUBLIC_MODE || "false",
    AUTO_TYPING: process.env.AUTO_TYPING || "false",
    READ_CMD: process.env.READ_CMD || "false",
    DEV: process.env.DEV || "27649342626",
    ANTI_VV: process.env.ANTI_VV || "true",
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",

    version: process.env.version || "v1.8"
};
