const { lite } = require('../lite');
const { prepareWAMessageMedia, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

lite({
  pattern: "owner",
  alias: ["creator", "boss"],
  react: "👑",
  desc: "Show owner information and send vCard",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // ---------- EDIT THESE ----------
    const OWNER_NAME = "Lord Sung";
    const OWNER_NUMBER = "27649342626"; // include country code e.g. +27...
    const OWNER_EMAIL = "sungdev00@gmail.com";
    const OWNER_GITHUB = "https://github.com/NaCkS-ai";
    const OWNER_INSTAGRAM = "https://instagram.com/lordsung";
    const OWNER_BIO = "Developer • Bot Creator • Keep calm and code on.";
    const OWNER_AVATAR = "https://files.catbox.moe/lvomei.jpg"; // avatar image
    // ---------------------------------

    // Build vCard string
    const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${OWNER_NAME}
N:${OWNER_NAME};;;;
ORG:Sung Suho MD;
TITLE:Developer
TEL;type=CELL;type=VOICE;waid=${OWNER_NUMBER.replace(/\D/g,'')}:${OWNER_NUMBER}
EMAIL:${OWNER_EMAIL}
URL:${OWNER_GITHUB}
NOTE:${OWNER_BIO}
END:VCARD`;

    // 1) send the vCard (contacts message)
    await conn.sendMessage(from, {
      contacts: {
        displayName: OWNER_NAME,
        contacts: [
          {
            vcard
          }
        ]
      }
    }, { quoted: mek });

    // 2) prepare an owner info card (hydrated template with avatar + buttons)
    const image = await prepareWAMessageMedia({ image: { url: OWNER_AVATAR } }, { upload: conn.waUploadToServer });

    const content = `
╭━━〔 👑 OWNER INFO 〕━━⬣
┃ Name: ${OWNER_NAME}
┃ Phone: ${OWNER_NUMBER}
┃ Email: ${OWNER_EMAIL}
┃ GitHub: ${OWNER_GITHUB}
┃ Instagram: ${OWNER_INSTAGRAM}
┃
┃ ${OWNER_BIO}
╰━━━━━━━━━━━━━━━━⬣
(You can save the contact — the vCard was sent above)
`.trim();

    const template = {
      templateMessage: {
        hydratedTemplate: {
          hydratedContentText: content,
          hydratedFooterText: '🔰 Owner — Sung Suho MD',
          ...image,
          hydratedButtons: [
            { hydratedURLButton: { displayText: '🌐 GitHub', url: OWNER_GITHUB } },
            { hydratedURLButton: { displayText: '📷 Instagram', url: OWNER_INSTAGRAM } },
            { hydratedReplyButton: { displayText: '📜 Menu', id: '.menu' } }
          ]
        }
      }
    };

    const msg = generateWAMessageFromContent(from, template, {});
    await conn.relayMessage(from, msg.message, { messageId: msg.key.id });

  } catch (err) {
    console.error("Owner Command Error:", err);
    reply(`❌ Error sending owner info: ${err.message || err}`);
  }
});
