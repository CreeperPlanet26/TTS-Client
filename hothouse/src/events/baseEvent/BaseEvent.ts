import { ClientEvents } from "discord.js";
import { promises as fs } from "fs";
import { join } from "path";
import { client } from "../../client/Client";

export abstract class BaseEvent {
    constructor(e: keyof ClientEvents) {
        client.on(e, this.init);
    }

    public abstract init(...args: any[]): any;

    public static async register(dir: string): Promise<void> {
        const files = await fs.readdir(join(dir));

        for (const f of files) {
            if ((await fs.lstat(join(dir, f))).isDirectory() && f !== "baseEvent") this.register(join(dir, f));
            else if (f !== "baseEvent")
                try {
                    const { default: Event } = await import(join(dir, f));
                    <BaseEvent>new Event();
                } catch (err) {}
        }
    }
}
