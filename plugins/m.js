const { lite, commands } = require('../lite');
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

lite({
    pattern: "m",
    alias: ["menu", "help"],
    react: "📜",
    desc: "Display an interactive command menu",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Group commands by category
        const grouped = {};
        for (const cmd of commands) {
            const cat = cmd.category || 'other';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(cmd);
        }

        // Create one "card" per category
        const cards = [];
        for (const [category, cmds] of Object.entries(grouped)) {
            cards.push({
                header: proto.Message.InteractiveMessage.Header.create({
                    ...(await prepareWAMessageMedia(
                        { image: { url: 'https://files.catbox.moe/lvomei.jpg' } },
                        { upload: conn.waUploadToServer }
                    )),
                    title: `⚔️ ${category.toUpperCase()} ⚔️`,
                    subtitle: `Commands in ${category}`,
                    hasMediaAttachment: false
                }),
                body: {
                    text: cmds.map(c => `• ${c.pattern}`).join('\n')
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: "quick_reply",
                            buttonParamsJson: `{"display_text":"🔄 Refresh","id":".menu"}`
                        },
                        {
                            name: "quick_reply",
                            buttonParamsJson: `{"display_text":"🏠 Main Menu","id":".button"}`
                        },
                        {
                            name: "cta_url",
                            buttonParamsJson: `{"display_text":"🌐 GitHub","url":"https://github.com/NaCkS-ai/Sung-Suho-MD"}`
                        }
                    ]
                }
            });
        }

        // Fallback in case no commands found
        if (cards.length === 0) {
            return reply("❌ No commands found in the system.");
        }

        // Construct the interactive message
        const msg = generateWAMessageFromContent(
            from,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `> ⚙️ *Sung Suho MD Command Menu*` },
                            footer: { text: "🦄 Created by Lord Sung" },
                            carouselMessage: {
                                cards,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            {}
        );

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        });

    } catch (err) {
        console.error("Menu Command Error:", err);
        reply(`❌ *Error loading menu:* ${err.message}`);
    }
});
