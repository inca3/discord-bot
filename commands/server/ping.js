const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong! cevabını döndürür.'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
