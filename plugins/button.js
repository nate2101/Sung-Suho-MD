const { lite } = require('../lite');
const { prepareWAMessageMedia, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

lite({
  pattern: "button",
  react: "🦄",
  desc: "Display an interactive button menu",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const pan = `> MADE BY Lord Sung`;
    const imgUrl = 'https://files.catbox.moe/lvomei.jpg';

    // prepare image (upload)
    const image = await prepareWAMessageMedia({ image: { url: imgUrl } }, { upload: conn.waUploadToServer });

    const template = {
      templateMessage: {
        hydratedTemplate: {
          hydratedContentText: pan,
          hydratedFooterText: '🦄 Created by Lord Sung',
          // attach the image that we uploaded
          ...image, 
          hydratedButtons: [
            { hydratedReplyButton: { displayText: '📜 Menu', id: '.menu' } },
            { hydratedReplyButton: { displayText: '💫 Alive', id: '.alive' } },
            { hydratedURLButton: { displayText: '📢 Channel', url: 'https://whatsapp.com/channel/0029VbB3YxTDJ6H15SKoBv3S' } },
            { hydratedURLButton: { displayText: '💻 GitHub', url: 'https://github.com/NaCkS-ai/Sung-Suho-MD' } }
          ]
        }
      }
    };

    const msg = generateWAMessageFromContent(from, template, {});
    await conn.relayMessage(from, msg.message, { messageId: msg.key.id });

  } catch (e) {
    console.error("Button Command Error:", e);
    reply(`❌ Error: ${e.message || e}`);
  }
});
