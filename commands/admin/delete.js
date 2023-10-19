const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Kanaldaki son x mesajı siler.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("miktar")
        .setDescription("Silmek istediğiniz mesaj sayısı.")
        .setRequired(true)
    ),
  async execute({ client, interaction }) {
    const { channel, options } = interaction;
    const amount = options.getInteger("miktar");
    const messages = await channel.messages.fetch({
      limit: amount + 1,
    });
    try {
      await channel.bulkDelete(amount, true).then((messages) => {
        interaction.reply(`Son ${messages.size} mesaj silindi.`);
      });
      setTimeout(() => interaction.deleteReply(), 3000);
    } catch (error) {
      console.log(error);
    }
  },
};
