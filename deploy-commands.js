import { REST, Routes } from "discord.js";
import fs from "node:fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

async function uploadCommands() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const commands = [];
  const foldersPath = join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      console.log(`Cargando ${file} en guilds.`);
      const filePath = join(commandsPath, file);
      const { default: command } = await import(filePath);
      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  const rest = new REST().setToken(process.env.DISCORD_TOKEN);
  const clientID = process.env.CLIENT_ID;

  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands in ${clientID}.`
      );

      const data = await rest.put(Routes.applicationCommands(clientID), {
        body: commands,
      });

      console.log(`Successfully reloaded ${data.length}.`);
    } catch (error) {
      console.error(error);
    }
  })();
}

export default uploadCommands;
