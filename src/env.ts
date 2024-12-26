import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
    server: {
        API_EMAIL: z.string().email(),
        API_KEY: z.string(),
        ZONE_ID: z.string()
    },
    runtimeEnv: Deno.env.toObject()
})