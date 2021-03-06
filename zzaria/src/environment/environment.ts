import "dotenv/config";

class Dev {
    public TTS_DISCORD_SERVER_ID = "570349873337991203";
    public TTS_DISCORD_SERVER_INVITE = "https://discord.gg/RNTemwY";

    public PORT = 8000;
    public BASE_URL = `http://localhost:${this.PORT}/api`;
    public REDIRECT_URL = `${this.BASE_URL}/login/redirect`;

    public CLIENT_BASE_URL = "http://localhost:3000";
    public CLIENT_DASHBOARD_URL = `${this.CLIENT_BASE_URL}/dashboard`;
}

class Prod {
    public TTS_DISCORD_SERVER_ID = "570349873337991203";
    public TTS_DISCORD_SERVER_INVITE = "https://discord.gg/RNTemwY";

    public PORT = process.env.PORT;
    public BASE_URL = "https://tts-api-prod.herokuapp.com/api";
    public REDIRECT_URL = `${this.BASE_URL}/login/redirect`;

    public CLIENT_BASE_URL = "https://ttsclan.vercel.app";
    public CLIENT_DASHBOARD_URL = `${this.CLIENT_BASE_URL}/dashboard`;
}

export const IS_TEST = process.env.MONGO_URI === "mongodb://localhost/test";
export const TTS_BOT = { ID: "674378932476444704", TEST_ID: "704722603767496765", ROOM: "tts-bot" } as const;

export let environment: Dev | Prod = new Dev();
if (process.env.NODE_ENV === "production") environment = new Prod();

// 674378932476444704
