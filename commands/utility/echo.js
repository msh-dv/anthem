import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Returns the input message.")
    .addStringOption((option) =>
      option.setName("mensaje").setDescription("Message.").setRequired(true)
    ),
  async execute(interaction) {
    const mensaje = interaction.options.getString("mensaje");
    await interaction.reply(mensaje);
  },
};
