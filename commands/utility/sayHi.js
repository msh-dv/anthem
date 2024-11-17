import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("hi").setDescription("Says hi!"),
  async execute(interaction) {
    await interaction.reply(`Hi, ${interaction.user.username}! ;)`);
  },
};
