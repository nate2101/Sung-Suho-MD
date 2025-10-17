const { lite } = require('../lite');
const { 
  generateWAMessageFromContent, 
  proto, 
  prepareWAMessageMedia 
} = require('@whiskeysockets/baileys');

lite({
    pattern: "button",
    react: "🦄",
    desc: "Display an interactive button menu",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const pan = `> MADE BY Lord Sung`;

        const msg = generateWAMessageFromContent(
            from,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: pan },
                            carouselMessage: {
                                cards: [
                                    {
                                        header: proto.Message.InteractiveMessage.Header.create({
                                            ...(await prepareWAMessageMedia(
                                                { image: { url: 'https://files.catbox.moe/lvomei.jpg' } },
                                                { upload: conn.waUploadToServer }
                                            )),
                                            title: ``,
                                            gifPlayback: true,
                                            subtitle: 'LORD SUNG',
                                            hasMediaAttachment: false
                                        }),
                                        body: {
                                            text: `✨ *Welcome to Sung Suho MD Button Test!*`
                                        },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "quick_reply",
                                                    buttonParamsJson: `{"display_text":"📜 Menu","id":",menu"}`
                                                },
                                                {
                                                    name: "quick_reply",
                                                    buttonParamsJson: `{"display_text":"💫 Alive","id":",alive"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"📢 WhatsApp Channel","url":"https://whatsapp.com/channel/0029VbB3YxTDJ6H15SKoBv3S"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"💻 GitHub Repo","url":"https://github.com/NaCkS-ai/Sung-Suho-MD","merchant_url":"https://github.com/NaCkS-ai/Sung-Suho-MD"}`
                                                }
                                            ],
                                        },
                                    },
                                ],
                                messageVersion: 1,
                            },
                        },
                    },
                },
            },
            {}
        );

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        });

    } catch (e) {
        console.error("Button Command Error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
