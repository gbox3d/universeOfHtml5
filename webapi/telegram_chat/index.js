
import YAML from 'yaml';
import fs from 'fs';

// const TelegramBot = require('node-telegram-bot-api');
import TelegramBot from 'node-telegram-bot-api'

let settings = YAML.parse(fs.readFileSync('./settings.yaml', 'utf8'))

console.log(settings)

// replace the value below with the Telegram token you receive from @BotFather
const token = settings.token

let bAlertEnable = true
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  console.log(msg)

  console.log(chatId)

  bAlertEnable = false;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, `Received your message ${msg.text}`);
});

function _loop()
{
  if(bAlertEnable) {
    bot.sendMessage(settings.chenelID, '비상!! 비상!! 기포를 확인해야합니다. 확인 했으면 "/ok" 이라고 메씨지 주세요');
    setTimeout(_loop,10000)
  }
    
}

_loop()
