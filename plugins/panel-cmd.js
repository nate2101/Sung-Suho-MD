const { handlePanelCreation, DB_PATH } = require('./panel');
const fs = require('fs');

lite({
  pattern: '1gb',
  desc: 'Create a 1GB SUHO panel',
  type: 'tools'
}, async (client, m) => await handlePanelCreation(client, m, '1gb'));

lite({
  pattern: '2gb',
  desc: 'Create a 2GB SUHO panel',
  type: 'tools'
}, async (client, m) => await handlePanelCreation(client, m, '2gb'));

lite({
  pattern: 'unli',
  desc: 'Create an Unlimited SUHO panel',
  type: 'tools'
}, async (client, m) => await handlePanelCreation(client, m, 'unli'));

lite({
  pattern: 'listpanels',
  desc: 'Show all generated SUHO panels',
  type: 'tools'
}, async (client, m) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  if (data.length === 0) return m.reply('📭 No panels created yet.');

  let text = '📋 *SUHO MD PANEL LIST*\n\n';
  for (const p of data.slice(-20).reverse()) {
    text += `👤 *${p.username}*\n📞 ${p.phone}\n💾 ${p.specs.ram / 1000}GB RAM | ${p.specs.cpu}% CPU\n🌐 ${p.domain}\n📅 ${new Date(p.date).toLocaleString()}\n────────────────\n`;
  }

  await m.reply(text);
});