import { Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! logged as ${client.user.tag}`);
  },
};
