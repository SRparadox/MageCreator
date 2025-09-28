import { z } from "zod"
import { covenNameSchema } from "./NameSchemas"

export type CovenName = z.infer<typeof covenNameSchema>

export const covenSchema = z.object({
    name: covenNameSchema,
    description: z.string(),
    philosophy: z.string(),
})
export type Coven = z.infer<typeof covenSchema>

export const covens: Coven[] = [
    {
        name: "independent",
        description: "Mages who operate outside the major factions, following their own path to enlightenment.",
        philosophy: "Self-reliance and personal discovery guide the independent mage's journey."
    },
    {
        name: "marauder",
        description: "Chaotic mages whose reality has become unstable, bending the world around them in unpredictable ways.",
        philosophy: "Reality is subjective and should be shaped by will and madness."
    },
    {
        name: "technocracy",
        description: "A hierarchical organization that seeks to control reality through science and technology.",
        philosophy: "Order through science, progress through control."
    },
    {
        name: "traditions",
        description: "Nine ancient traditions of mages who preserve mystical knowledge and fight against the Technocracy.",
        philosophy: "Ancient wisdom and mystical traditions hold the keys to true understanding."
    }
]