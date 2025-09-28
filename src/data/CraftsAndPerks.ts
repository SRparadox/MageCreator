import { z } from "zod"

export const craftSchema = z.object({
    name: z.string(),
    level: z.number().min(1).max(5).int(),
    description: z.string(),
    prerequisites: z.string().optional(),
})
export type Craft = z.infer<typeof craftSchema>

export const perkSchema = z.object({
    name: z.string(),
    level: z.number().min(1).max(3).int(),
    description: z.string(),
    prerequisites: z.string().optional(),
})
export type Perk = z.infer<typeof perkSchema>

export const crafts: Craft[] = [
    {
        name: "Alchemy",
        level: 1,
        description: "The ancient art of transforming base materials into more refined substances."
    },
    {
        name: "Artifice",
        level: 1,
        description: "Creating magical items and focusing implements."
    },
    {
        name: "Enchantment",
        level: 1,
        description: "Imbuing objects with lasting magical effects."
    },
    {
        name: "Divination",
        level: 1,
        description: "Techniques for scrying and fortune telling."
    },
    {
        name: "Fascination",
        level: 1,
        description: "Mental magic and influence over others' minds."
    },
    {
        name: "Healing",
        level: 1,
        description: "Magical restoration of body and spirit."
    },
    {
        name: "Illusion",
        level: 1,
        description: "Creating false sensory experiences and deceptions."
    },
    {
        name: "Necromancy",
        level: 1,
        description: "Communication with and command over the dead."
    },
    {
        name: "Shapeshifting",
        level: 1,
        description: "Altering physical form and appearance."
    },
    {
        name: "Weather Control",
        level: 1,
        description: "Influencing atmospheric conditions and natural phenomena."
    }
]

export const perks: Perk[] = [
    {
        name: "Arete Focus",
        level: 1,
        description: "Enhanced ability to channel magical energy through a specific focus."
    },
    {
        name: "Avatar Connection",
        level: 1,
        description: "Stronger connection to your Avatar, granting clearer mystical insight."
    },
    {
        name: "Countermagic",
        level: 1,
        description: "Enhanced ability to dispel and counter hostile magics."
    },
    {
        name: "Echoes Resistance",
        level: 1,
        description: "Natural resistance to the chaotic effects of reality storms."
    },
    {
        name: "Fast-Cast",
        level: 1,
        description: "Ability to cast certain magics more quickly than normal."
    },
    {
        name: "Gilded Touch",
        level: 1,
        description: "Supernatural luck in financial and material matters."
    },
    {
        name: "Iron Will",
        level: 1,
        description: "Exceptional mental fortitude against magical influence."
    },
    {
        name: "Natural Linguist",
        level: 1,
        description: "Supernatural aptitude for learning and understanding languages."
    },
    {
        name: "Oracular Ability",
        level: 1,
        description: "Spontaneous prophetic visions and mystical insights."
    },
    {
        name: "Sphere Natural",
        level: 1,
        description: "Innate affinity with a particular Sphere of magic."
    }
]