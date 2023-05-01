const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Kullanıcı hakkında bilgi verir.'),
  async execute({client, interaction}) {
    await interaction.reply(
      `${interaction.user.username}, ${interaction.member.joinedAt} tarihinde sunucuya katılmış.`
    );
  },
};
