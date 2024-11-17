import fs from "node:fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import "dotenv/config";

console.log(`
    ___            __   __                   
   /   |   ____   / /_ / /_   ___   ____ ___ 
  / /| |  / __ \\ / __// __ \\ / _ \\ / __ \`__ \\ 
 / ___ | / / / // /_ / / / //  __// / / / / / 
/_/  |_|/_/ /_/ \\__//_/ /_/ \\___//_/ /_/ /_/   
`);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Carga de comandos

const foldersPath = join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
console.log("Cargando comandos...");
for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const { default: command } = await import(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log(`Comando: ${command.data.name} listo!`);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

//Carga de eventos

const eventsPath = join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

console.log("\nCargando Eventos...");
for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const { default: event } = await import(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
    console.log(`Evento unico ${event.name} listo!`);
  } else {
    client.on(event.name, (...args) => event.execute(...args));
    console.log(`Evento ${event.name} listo!`);
  }
}

//login con el token de discord

const token = process.env.DISCORD_TOKEN;

client.login(token);
