import TelegramBot from 'node-telegram-bot-api';

// Bot token'ını buraya gir
const token = '7208509479:AAHGvqRij3P26h_LV3bD5H8V9cm-E4jX_cw';
const bot = new TelegramBot(token, { polling: true });

// Komutları tanımla
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hoş geldiniz! Yardım için /help yazabilirsiniz.');
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot komutları:\n/start - Başlangıç\n/help - Yardım');
});

bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot hakkında bilgi');
});

// Diğer komutlar için benzer şekilde işlemleri ekleyebilirsin
