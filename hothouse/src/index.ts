//@ts-nocheck
import "dotenv/config";
import "./ws/conn";
import { client } from "./client/Client";
import { join } from "path";
import { BaseCommand } from "./commands/baseCommand/BaseCommand";
import { BaseEvent } from "./events/baseEvent/BaseEvent";
import { BaseWsEvent } from "./ws/events/BaseWsEvent";

client.on("ready", () => {
    BaseCommand.register(join(__dirname, "commands"));
    BaseEvent.register(join(__dirname, "events"));
    BaseWsEvent.register(join(__dirname, "ws/events"));

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "ping",
            description: "Gets your ping to TTS Bot",
        },
    });

    client.ws.on("INTERACTION_CREATE", async (interaction) => {
        // Do stuff here - interaction is an InteractionResponse object. To get the name, use interaction.data.name
        // In particular, the values you passed to the interaction when creating it will be passed back here

        if (interaction.data.name === "ping") {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Your ping is ${client.ws.ping}ms`,
                        allowed_mentions: { parse: [] },
                    },
                },
            });
        }
    });
});
