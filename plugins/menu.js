const { lite, commands } = require('../lite');
const axios = require('axios');
const config = require('../settings');

lite({
    pattern: 'menu',
    react: '🤖',
    desc: 'Interactive main menu',
    category: 'main',
    filename: __filename
}, async (conn, mek, m, { reply, pushname }) => {
    try {
        // Fetch GitHub forks count (used as Daily Users)
        let forksCount = 0;
        try {
            const res = await axios.get('https://api.github.com/repos/NaCkS-ai/Sung-Suho-MD');
            forksCount = res.data.forks_count || 0;
        } catch(err) {
            console.error('GitHub API error:', err);
        }

        // Main menu buttons
        const buttons = [
            { buttonId: 'menu_economy', buttonText: { displayText: '🏦 Economy' }, type: 1 },
            { buttonId: 'menu_ai', buttonText: { displayText: '🧠 AI' }, type: 1 },
            { buttonId: 'menu_fun', buttonText: { displayText: '🎉 Fun' }, type: 1 },
            { buttonId: 'menu_owner', buttonText: { displayText: '👑 Owner' }, type: 1 },
            { buttonId: 'menu_converter', buttonText: { displayText: '🔄 Converter' }, type: 1 },
            { buttonId: 'menu_logo', buttonText: { displayText: '🎨 Logo/Anime' }, type: 1 },
        ];

        const headerText = `
👑 Bot: ${config.BOT_NAME}
💻 Dev: Mr Sung
📈 Daily Users: ${forksCount}  ← GitHub forks
        `.trim();

        await conn.sendMessage(m.chat, {
            image: { url: config.MENU_IMAGE_URL },
            caption: headerText,
            footer: 'Tap a button to view commands',
            buttons,
            headerType: 4
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply(`❌ Error: ${err.message}`);
    }
});

// Generic function to send category commands
async function sendCategory(conn, m, category, displayName) {
    const list = commands.filter(c => c.category === category)
        .map(c => `• ${c.pattern}${c.alias ? ` (aliases: ${c.alias.join(', ')})` : ''} - ${c.desc || 'No description'}`)
        .join('\n') || 'No commands found';

    // Add back to main menu button
    const buttons = [
        { buttonId: 'menu', buttonText: { displayText: '🔙 Back to Main Menu' }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
        text: `📂 ${displayName} Commands:\n\n${list}`,
        buttons,
        headerType: 1
    }, { quoted: m });
}

// Submenus
lite({
    pattern: 'menu_economy',
    react: '💰',
    desc: 'Economy commands',
    category: 'main',
    filename: __filename
}, async (conn, mek, m) => {
    await sendCategory(conn, m, 'economy', 'Economy');
});

lite({
    pattern: 'menu_ai',
    react: '🧠',
    desc: 'AI commands',
    category: 'main',
    filename: __filename
}, async (conn, mek, m) => {
    await sendCategory(conn, m, 'ai', 'AI');
});

lite({
    pattern: 'menu_fun',
    react: '🎉',
    desc: 'Fun commands',
    category: 'main',
    filename: __filename
}, async (conn, mek, m) => {
    await sendCategory(conn, m, 'fun', 'Fun');
});

lite({
    pattern: 'menu_owner',
    react: '👑',
    desc: 'Owner commands',
    category: 'main',
    filename: __filename
}, async (conn, mek, m) => {
    await sendCategory(conn, m, 'owner', 'Owner');
});

lite({
    pattern: 'menu_converter',
    react: '🔄',
    desc: 'Converter commands',
    category: 'main',
    filename: __filename
}, async (conn, mek, m) => {
    await sendCategory(conn, m, 'convert', 'Converter');
});

lite({
    pattern: 'menu_logo',
    react: '🎨',
    desc: 'Logo/Anime commands',
    category: 'main',
    filename: __filename
}, async (conn, mek, m) => {
    await sendCategory(conn, m, 'logo', 'Logo/Anime');
});
