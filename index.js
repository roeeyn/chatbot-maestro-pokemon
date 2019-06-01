'use strict';
const BootBot = require('bootbot');

const port = process.env.PORT || 5000;

const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
});

// Saludo Inicial
bot.hear(['hola', 'ola', 'holi', 'holi crayoli'], (payload, chat) =>
  chat.say('Hola amigo!')
    .then(() => chat.say('¿Cómo estás hoy?', { typing: true }))
    .then(() => // Send a list template
      chat.say({
        text: '¿Qué quieres hacer?',
        buttons: [
          { type: 'postback', title: 'Ver documentación', payload: 'MENU_DOCUMENTATION' },
          { type: 'postback', title: 'Instrucciones', payload: 'MENU_INSTRUCTIONS' },
          { type: 'postback', title: 'Ver Pokémon en Pokedex', payload: 'MENU_POKEMON' }
        ]
      })
    )
  );

// Lo que respponde cuando recibe alguna imagen o video
bot.on('attachment', (payload, chat) => chat.say('Lo siento, aún no puedo reconocer este tipo de archivos.'));

// *********************** POSTBACKS DE MENU PRINCIPAL ********************
bot.on('postback:MENU_DOCUMENTATION', (payload, chat) =>
  chat.say({
    attachment: 'file',
    url: 'http://catarina.udlap.mx/u_dl_a/tales/documentos/lco/dominguez_r_g/capitulo5.pdf'
  }, { typing: true })
    .then(() => chat.say('Quieres un pokemon?')));

bot.on('postback:MENU_INSTRUCTIONS', (payload, chat) =>
  chat.say('Aquí debes de poner las instrucciones 👦 🐭')
    .then(() =>  chat.say('Quieres un pokemon?')));

bot.on('postback:MENU_POKEMON', (payload, chat) => chat.say('poikemon'));
// **********************************************************************

// Inicia el servidor del bootbot
bot.start(port);