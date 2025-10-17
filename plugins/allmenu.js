const { lite, commands } = require('../lite');
const config = require('../settings');

lite({
    pattern: 'allmenu',
    react: '📜',
    desc: 'List all bot commands',
    category: 'main',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        if (!commands || commands.length === 0) return reply('No commands found.');

        // Group commands by category
        const categories = {};
        for (let cmd of commands) {
            if (!cmd.pattern) continue;
            const cat = cmd.category || 'other';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(cmd);
        }

        // Build the text menu
        let text = '📜 *All Bot Commands*\n\n';
        for (let [cat, cmds] of Object.entries(categories)) {
            text += `┌─『 ${cat.toUpperCase()} 』\n`;
            for (let c of cmds) {
                text += `│ • ${c.pattern}${c.alias ? ` (aliases: ${c.alias.join(', ')})` : ''} - ${c.desc || 'No description'}\n`;
            }
            text += '└────────────\n\n';
        }

        text += '⚡ Use your prefix before each command!\n';
        text += `💡 Example: .help`;

        // Send message with bot image
        await conn.sendMessage(m.chat, {
            image: { url: config.MENU_IMAGE_URL },
            caption: text,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply(`❌ Error: ${err.message}`);
    }
});
