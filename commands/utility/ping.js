import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    const latencia = `\nLatency: ${
      sent.createdTimestamp - interaction.createdTimestamp
    }ms`;
    interaction.editReply(`Pong! ${latencia}`);
  },
};
