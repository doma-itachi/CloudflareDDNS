import z from "zod";

export const zHttpbinResponse = z.object({
    origin: z.string()
})