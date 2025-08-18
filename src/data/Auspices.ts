import { z } from "zod"
import ragabashLogo from "../resources/asuspiceIcons/Ragabash.webp"
import theurgeLogo from "../resources/asuspiceIcons/Theurge.webp"
import philodoxLogo from "../resources/asuspiceIcons/Philodox.webp"
import galliardLogo from "../resources/asuspiceIcons/Galliard.webp"
import ahrounLogo from "../resources/asuspiceIcons/Ahroun.webp"
import { AuspiceName, auspiceNameSchema } from "./NameSchemas"

export const auspiceSchema = z.object({
    name: auspiceNameSchema,
    moonPhase: z.string(),
    description: z.string(),
    logo: z.string(),
    role: z.string(),
})
export type Auspice = z.infer<typeof auspiceSchema>
export const auspiceKeySchema = auspiceSchema.keyof()
export type AuspiceKey = z.infer<typeof auspiceKeySchema>

export const auspices: Record<AuspiceName, Auspice> = {
    "Ragabash": {
        name: "Ragabash",
        moonPhase: "New Moon",
        description: "Questioners of tradition, Gadflies of the Garou",
        logo: ragabashLogo,
        role: "Trickster and questioner of the old ways",
    },
    "Theurge": {
        name: "Theurge",
        moonPhase: "Crescent Moon",
        description: "Spirit-talkers, Visionaries, and Ritualists",
        logo: theurgeLogo,
        role: "Mystic and spirit-speaker",
    },
    "Philodox": {
        name: "Philodox",
        moonPhase: "Half Moon",
        description: "Judges and Arbiters of the Garou",
        logo: philodoxLogo,
        role: "Judge and keeper of the law",
    },
    "Galliard": {
        name: "Galliard",
        moonPhase: "Gibbous Moon",
        description: "Storytellers, Lorekeepers, and Heralds",
        logo: galliardLogo,
        role: "Storyteller and keeper of history",
    },
    "Ahroun": {
        name: "Ahroun",
        moonPhase: "Full Moon",
        description: "Warriors and Champions",
        logo: ahrounLogo,
        role: "Warrior and protector",
    },
    "": {
        name: "",
        moonPhase: "",
        description: "",
        logo: "",
        role: "",
    },
}
