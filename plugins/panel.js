/**
 * ╔═══════════════════════════════════════╗
 * ║         SUHO MD - PANEL CREATOR       ║
 * ║        © 2025 Suho Multi Device       ║
 * ║   Clean & Optimized by @SuhoOfficial  ║
 * ╚═══════════════════════════════════════╝
 */

const fs = require('fs');
const { createCanvas } = require('canvas');
const fetch = require('node-fetch');
const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

// File where all generated panels are saved
const DB_PATH = './data/panels.json';

// Ensure database file exists
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '[]', 'utf-8');

// Anti-spam cooldown
const cooldownMap = new Map();
const cooldownTime = 10000; // 10 seconds

// ────────────────────────────────
// 🔹 Utility
// ────────────────────────────────
function randomCode(length = 4) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function drawCard(ctx, x, y, width, height, color) {
  ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 15);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, 8, height, [0, 5, 5, 0]);
  ctx.fill();
}

async function createPanelImage({ username, password, ram, cpu, disk, domain }) {
  const canvas = createCanvas(1280, 720);
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 1280, 720);
  gradient.addColorStop(0, '#000814');
  gradient.addColorStop(0.5, '#001d3d');
  gradient.addColorStop(1, '#003566');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1280, 720);

  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 1280;
    const y = Math.random() * 720;
    const size = Math.random() * 5 + 1;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#00b4d8';
  ctx.font = 'bold 46px "Poppins", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SUHO MD PANEL READY', 640, 80);
  ctx.fillStyle = '#caf0f8';
  ctx.font = '20px "Poppins", sans-serif';
  ctx.fillText('Your server has been successfully created!', 640, 115);

  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.strokeStyle = 'rgba(0,180,216,0.3)';
  ctx.roundRect(40, 150, 1200, 500, 30);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 26px "Poppins", sans-serif';
  ctx.fillStyle = '#00b4d8';
  ctx.fillText('ACCOUNT DETAILS', 240, 190);
  ctx.fillText('SERVER SPECS', 960, 190);

  const leftX = 100;
  drawCard(ctx, leftX, 220, 450, 70, '#00b4d8');
  ctx.fillStyle = '#fff';
  ctx.font = '18px "Poppins"';
  ctx.fillText('USERNAME', leftX + 30, 250);
  ctx.font = '20px "Consolas"';
  ctx.fillText(username, leftX + 30, 280);

  drawCard(ctx, leftX, 310, 450, 70, '#00b4d8');
  ctx.fillStyle = '#fff';
  ctx.fillText('PASSWORD', leftX + 30, 340);
  ctx.font = '20px "Consolas"';
  ctx.fillText(password, leftX + 30, 370);

  drawCard(ctx, leftX, 400, 450, 70, '#00b4d8');
  ctx.fillStyle = '#fff';
  ctx.fillText('EMAIL', leftX + 30, 430);
  ctx.font = '20px "Consolas"';
  ctx.fillText(`${username}@suhopanel.xyz`, leftX + 30, 460);

  const rightX = 700;
  drawCard(ctx, rightX, 220, 450, 70, '#00b4d8');
  ctx.fillStyle = '#fff';
  ctx.fillText('RAM', rightX + 30, 250);
  ctx.font = '20px "Consolas"';
  ctx.fillText(ram, rightX + 30, 280);

  drawCard(ctx, rightX, 310, 450, 70, '#00b4d8');
  ctx.fillStyle = '#fff';
  ctx.fillText('CPU', rightX + 30, 340);
  ctx.font = '20px "Consolas"';
  ctx.fillText(cpu, rightX + 30, 370);

  drawCard(ctx, rightX, 400, 450, 70, '#00b4d8');
  ctx.fillStyle = '#fff';
  ctx.fillText('DISK', rightX + 30, 430);
  ctx.font = '20px "Consolas"';
  ctx.fillText(disk, rightX + 30, 460);

  ctx.fillStyle = '#00b4d8';
  ctx.font = 'bold 22px "Poppins"';
  ctx.fillText('ACCESS YOUR SERVER AT', 640, 540);
  ctx.fillStyle = '#fff';
  ctx.font = '22px "Consolas"';
  ctx.fillText(domain, 640, 575);

  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  ctx.fillStyle = '#888';
  ctx.font = '16px "Poppins"';
  ctx.fillText(`Created on ${date} | Powered by SUHO MD`, 640, 660);

  return canvas.toBuffer();
}

// ────────────────────────────────
// 🔹 Presets
// ────────────────────────────────
const resourceMap = {
  "1gb": { ram: "1000", disk: "1000", cpu: "40" },
  "2gb": { ram: "2000", disk: "2000", cpu: "60" },
  "3gb": { ram: "3000", disk: "2000", cpu: "80" },
  "4gb": { ram: "4000", disk: "3000", cpu: "100" },
  "5gb": { ram: "5000", disk: "3000", cpu: "120" },
  "unli": { ram: "0", disk: "0", cpu: "0" }
};

// ────────────────────────────────
// 🔹 Main Handler
// ────────────────────────────────
const handlePanelCreation = async (client, m, command) => {
  try {
    const text = m.body.trim();
    if (!text.includes(',')) return m.reply(`🧩 Usage: ${command} username,628xxx`);

    if (cooldownMap.has(m.sender)) return m.reply(`⏳ Please wait 10s before creating another panel.`);
    cooldownMap.set(m.sender, true);
    setTimeout(() => cooldownMap.delete(m.sender), cooldownTime);

    const [usernameRaw, phoneRaw] = text.split(',');
    const username = usernameRaw.trim();
    const phone = phoneRaw.replace(/\D/g, '') + '@s.whatsapp.net';
    const random = randomCode(4);
    const password = username + random;
    const email = `${username}@suhopanel.xyz`;
    const { ram, disk, cpu } = resourceMap[command];
    const domain = global.domain || "https://kelvin-vps.goodnesstechhost.xyz";

    await m.reply('🛠️ Creating your SUHO MD panel...');
    const panelImage = await createPanelImage({
      username, password,
      ram: ram === '0' ? 'Unlimited' : `${ram / 1000}GB`,
      cpu: cpu === '0' ? 'Unlimited' : `${cpu}%`,
      disk: disk === '0' ? 'Unlimited' : `${disk / 1000}GB`,
      domain
    });

    // ✅ Save to database
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    db.push({
      username,
      password,
      email,
      phone: phone.split('@')[0],
      specs: { ram, cpu, disk },
      domain,
      createdBy: m.pushName || m.sender,
      date: new Date().toISOString()
    });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    const panelMedia = await prepareWAMessageMedia({ image: panelImage }, { upload: client.waUploadToServer });
    const caption = `✅ *SUHO MD PANEL CREATED*

👤 *Username:* ${username}
🔐 *Password:* ${password}
📧 *Email:* ${email}

💾 *Specs:*
• RAM: ${ram === '0' ? 'Unlimited' : `${ram / 1000}GB`}
• CPU: ${cpu === '0' ? 'Unlimited' : `${cpu}%`}
• DISK: ${disk === '0' ? 'Unlimited' : `${disk / 1000}GB`}

🌐 *Login:* ${domain}
📋 *Rules:*
- No abuse / DDoS
- 15-day warranty
- Personal use only`;

    const msg = generateWAMessageFromContent(phone, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { isForwarded: true, forwardingScore: 999 },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: { text: caption },
            footer: { text: 'SUHO MD © 2025' },
            header: { ...panelMedia, hasMediaAttachment: true },
            nativeFlowMessage: {
              buttons: [
                { name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: 'Copy Username', copy_code: username }) },
                { name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: 'Copy Password', copy_code: password }) },
                { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Open Panel', url: domain }) }
              ]
            }
          })
        }
      }
    }, { userJid: m.chat, quoted: m });

    await client.relayMessage(phone, msg.message, { messageId: msg.key.id });
    m.reply(`✅ Panel sent to *${phone.split('@')[0]}* successfully & saved to database.`);
  } catch (err) {
    console.error(err);
    m.reply(`❌ Error: ${err.message}`);
  }
};

module.exports = { handlePanelCreation, resourceMap, DB_PATH };