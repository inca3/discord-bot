const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Bot komutları hakkında bilgi verir."),
  async execute({ client, interaction }) {
    await interaction.reply(
      `
      **Sunucu Komutları**\n\n
      **Genel**\n
      **/user** : Kullanıcının sunucuya ne zaman katıldığını gösterir. \n\n
      **Müzik**\n
      **/play** : Aradığınız şarkıyı veya youtube linkini oynatır. \n
      **/stop** : Çalan şarkıyı durdurur ve çalma listesini temizler. \n
      **/pause** : Çalan şarkıyı duraklatır. \n
      **/resume** : Duraklatılan şarkıyı devam ettirir. \n
      **/prev** : Bir önceki şarkıyı çalar. \n
      **/skip** : Bir sonraki şarkıyı çalar. \n\n
      **Admin**\n
      **/delete** : Belirtilen sayıdaki mesajı kanaldan siler.
      `
    );
  },
};
