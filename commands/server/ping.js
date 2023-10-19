const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong! cevabını döndürür."),
  async execute({ client, interaction }) {
    await interaction.reply("Pong!");
  },
};
