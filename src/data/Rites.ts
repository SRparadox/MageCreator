import { z } from "zod"
import { RenownType, renownTypeSchema } from "./Gifts"

export const riteTypeSchema = z.enum(["Common", "Social", "Mystical"])
export type RiteType = z.infer<typeof riteTypeSchema>

export const riteSchema = z.object({
    name: z.string(),
    type: riteTypeSchema,
    renown: renownTypeSchema.optional(), // Some rites don't require specific renown
    summary: z.string(),
    description: z.string(),
    pool: z.string(), // Dice pool for the rite
})
export type Rite = z.infer<typeof riteSchema>

// Common Rites
export const commonRites: Rite[] = [
    {
        name: "Rite of Abjuration",
        type: "Common",
        renown: "Honor",
        summary: "This Rite will purify a person, place, or object, driving out any spiritual possessions",
        description: "This Rite will purify a person, place, or object, driving out any spiritual possessions.",
        pool: "Honor + Occult"
    },
    {
        name: "Rite of Rage",
        type: "Common", 
        renown: "Glory",
        summary: "Increase the Rage of the participants",
        description: "Increase the Rage of the participants.",
        pool: "Glory + Intimidation"
    },
    {
        name: "Rite of Tranquility",
        type: "Common",
        renown: "Wisdom",
        summary: "Reduce the Rage of everyone participating",
        description: "Reduce the Rage of everyone participating.",
        pool: "Wisdom + Performance"
    },
    {
        name: "Rite of Contrition",
        type: "Common",
        renown: "Honor",
        summary: "A Rite used to either make amends with a spirit or to remove chagrin",
        description: "A Rite used to either make amends with a spirit or to remove chagrin.",
        pool: "Honor + Etiquette"
    },
    {
        name: "Rite of Forgetful Record",
        type: "Common",
        renown: "Wisdom",
        summary: "This Rite is used to wreak havoc on any recorded information about the Garou",
        description: "This Rite is used to wreak havoc on any recorded information about the Garou.",
        pool: "Wisdom + Investigation"
    },
    {
        name: "Rite of the Living Caern",
        type: "Common",
        renown: "Wisdom", 
        summary: "A Rite used to bring life to a caern, strengthening their bond and it's spiritual connection to the Umbra",
        description: "A Rite used to bring life to a caern, strengthening their bond and it's spiritual connection to the Umbra.",
        pool: "Wisdom + Craft"
    },
    {
        name: "Rite of Shadow Passage",
        type: "Common",
        summary: "This Rite allows a pack to open a pathway between the physical world and the Umbra",
        description: "This Rite allows a pack to open a pathway between the physical world and the Umbra.",
        pool: "Renown (any) + Occult"
    },
    {
        name: "Rite of Dedication",
        type: "Common",
        summary: "A Rite used to bind clothing to Garou, so that when they shapeshift their clothes do not rip off",
        description: "A Rite used to bind clothing to Garou, so that when they shapeshift their clothes do not rip off.",
        pool: "N/A"
    },
    {
        name: "Rite of Kinseeking",
        type: "Common",
        renown: "Wisdom",
        summary: "A Rite Used to locate Kin before accidents occur",
        description: "A Rite Used to locate Kin before accidents occur.",
        pool: "Wisdom + Investigation"
    },
    {
        name: "Rite of Spirit Summoning",
        type: "Common",
        renown: "Honor",
        summary: "A Rite used to summon an absent, unaware, or unwilling spirit",
        description: "A Rite used to summon an absent, unaware, or unwilling spirit.",
        pool: "Honor + Persuasion vs Power"
    },
    {
        name: "Rite of Binding",
        type: "Common",
        renown: "Glory",
        summary: "A Rite used to bind a spirit to a physical feature",
        description: "A Rite used to bind a spirit to a physical feature.",
        pool: "Glory + Occult"
    },
    {
        name: "Rite of Shame",
        type: "Common",
        summary: "A Rite that is used as a form of punishment",
        description: "A Rite that is used as a form of punishment.",
        pool: "N/A"
    },
    {
        name: "Rite of Patronage",
        type: "Common",
        summary: "A Rite used to adopt a Patron Spirit",
        description: "A Rite used to adopt a Patron Spirit.",
        pool: "Renown (the type associated with the new Patron Spirit) + Etiquette"
    },
    {
        name: "Rite of Celebration",
        type: "Common",
        renown: "Honor",
        summary: "A Rite used to celebrate victories",
        description: "A Rite used to celebrate victories.",
        pool: "Honor + Performance"
    },
    {
        name: "Rite of Caern Building",
        type: "Common",
        renown: "Wisdom",
        summary: "A Rite usually performed by an entire sept and takes many days and nights, this results in the opening of a new caern",
        description: "A Rite usually performed by an entire sept and takes many days and nights, this results in the opening of a new caern.",
        pool: "Wisdom + Craft"
    },
    {
        name: "Rite of the Wolf Reborn",
        type: "Common",
        summary: "A Rite used to help a Garou who has Lost the Wolf",
        description: "A Rite used to help a Garou who has Lost the Wolf.",
        pool: "Renown (highest of target) + Leadership"
    },
    {
        name: "Rite of the Whispering Field",
        type: "Common",
        renown: "Wisdom",
        summary: "A Rite used at a caern to allow participants to become attuned to themselves and their surroundings to detect trespassers",
        description: "A Rite used at a caern to allow participants to become attuned to themselves and their surroundings to detect trespassers.",
        pool: "Wisdom + Survival"
    },
    {
        name: "Rite of the Shrouded Glen",
        type: "Common", 
        renown: "Wisdom",
        summary: "A Rite used to hide a caern from mundane individuals",
        description: "A Rite used to hide a caern from mundane individuals.",
        pool: "Wisdom + Craft"
    }
]

// Social Rites
export const socialRites: Rite[] = [
    {
        name: "Rite of Passage",
        type: "Social",
        summary: "Before they are called Garou, Kin as set on a dangerous task to prove they have the means and represent what it means to be a true werewolf",
        description: "Before they are called Garou, Kin as set on a dangerous task to prove they have the means and represent what it means to be a true werewolf.",
        pool: "N/A"
    },
    {
        name: "Satire Rite",
        type: "Social",
        summary: "A Rite used to ridicule another",
        description: "A Rite used to ridicule another.",
        pool: "N/A"
    },
    {
        name: "Rite of Accomplishment",
        type: "Social",
        summary: "A rite used to honor a Garou for the trials they have endured to reach their current standing",
        description: "A rite used to honor a Garou for the trials they have endured to reach their current standing.",
        pool: "N/A"
    },
    {
        name: "Gathering for the Departed",
        type: "Social", 
        summary: "A Rite to honor the newly dead",
        description: "A Rite to honor the newly dead.",
        pool: "N/A"
    },
    {
        name: "Rite of the Winter Wolf",
        type: "Social",
        summary: "A Rite used for the too-wounded or too-old Garou to end their lives; if done by two members at the same time, they fight to the death in ritual combat",
        description: "A Rite used for the too-wounded or too-old Garou to end their lives; if done by two members at the same time, they fight to the death in ritual combat.",
        pool: "N/A"
    },
    {
        name: "Rite of the Ban Shared",
        type: "Social",
        summary: "All participants in this rite agree to adhere to a Ban not of their own tribe. There are not any mechanical interactions tied to this, purely role-play",
        description: "All participants in this rite agree to adhere to a Ban not of their own tribe. There are not any mechanical interactions tied to this, purely role-play.",
        pool: "N/A"
    },
    {
        name: "Cleansing Rite",
        type: "Social",
        summary: "A rite that uses sacred materials to cleanse the spirit and physical form of a Garou. Often done after encounters with powerful Banes or Black Spiral Dancers",
        description: "A rite that uses sacred materials to cleanse the spirit and physical form of a Garou. Often done after encounters with powerful Banes or Black Spiral Dancers.",
        pool: "N/A"
    },
    {
        name: "The Long Vigil",
        type: "Social",
        summary: "A rite in which all associated packs gather together, temporarily putting aside all animosity to celebrate Helios, praise Luna and tell the tales of their victories over the past several years",
        description: "A rite in which all associated packs gather together, temporarily putting aside all animosity to celebrate Helios, praise Luna and tell the tales of their victories over the past several years. When all is said and done, all involved burn their trophies and make a final appeal to Luna and Helios to guard Gaia to the last.",
        pool: "N/A"
    },
    {
        name: "Pledging Rite",
        type: "Social",
        summary: "A rite that is used by a Pack to define a specific goal such as \"Destroy my local oil plant\" - When the goal is completed ST's may grant additional glory or mitigate chagrin",
        description: "A rite that is used by a Pack to define a specific goal such as \"Destroy my local oil plant\" - When the goal is completed ST's may grant additional glory or mitigate chagrin.",
        pool: "N/A"
    },
    {
        name: "The Renewal Circle",
        type: "Social",
        summary: "A rite in which a Garou who has been struggling emotionally or spiritually is joined by their allies and friends in silence, awaiting their moment to support their friend in need",
        description: "A rite in which a Garou who has been struggling emotionally or spiritually is joined by their allies and friends in silence, awaiting their moment to support their friend in need.",
        pool: "N/A"
    }
]

// Mystical Rites
export const mysticalRites: Rite[] = [
    {
        name: "Rite of the Borne Word",
        type: "Mystical",
        renown: "Honor",
        summary: "Use a friendly spirit to deliver a secure message. The spirit must be capable of traveling swiftly, i.e a bird spirit, a wind spirit, etc",
        description: "Use a friendly spirit to deliver a secure message. The spirit must be capable of traveling swiftly, i.e a bird spirit, a wind spirit, etc.",
        pool: "Honor + Etiquette"
    },
    {
        name: "Rite of the Broken Sun (Broken Son)",
        type: "Mystical",
        renown: "Honor",
        summary: "A rite used as a severe form of punishment, usually after the target has undergone several Rite of Shames. A successful use of this rite stops the targets ability to shapeshift and call on mystical rites besides the Rite of Contrition",
        description: "A rite used as a severe form of punishment, usually after the target has undergone several Rite of Shames. A successful use of this rite stops the targets ability to shapeshift and call on mystical rites besides the Rite of Contrition.",
        pool: "Honor + Occult"
    },
    {
        name: "Rite of Caging",
        type: "Mystical",
        renown: "Wisdom",
        summary: "This rite makes it more difficult for a creature in the physical world to interact with the Umbra. It can even remove someone from the Umbra. Cannot be used on spirits",
        description: "This rite makes it more difficult for a creature in the physical world to interact with the Umbra. It can even remove someone from the Umbra. Cannot be used on spirits.",
        pool: "Wisdom + Awareness"
    },
    {
        name: "Rite of Chiminage",
        type: "Mystical",
        renown: "Wisdom",
        summary: "This rite allows a Garou to better understand the wants and needs of a spirit",
        description: "This rite allows a Garou to better understand the wants and needs of a spirit.",
        pool: "Wisdom + Etiquette"
    },
    {
        name: "Rite of the Grim Reach",
        type: "Mystical",
        renown: "Glory",
        summary: "This rite turns a large area more hostile and even dangerous. Can be used to protect caerns or places important to Garou",
        description: "This rite turns a large area more hostile and even dangerous. Can be used to protect caerns or places important to Garou.",
        pool: "Glory + Survival"
    },
    {
        name: "Rite of the Living Tale",
        type: "Mystical",
        renown: "Wisdom",
        summary: "This rite adds an olfactory dimension to the telling of a story, making it all the more immersive for your listeners. Especially appreciated by Lupus-born",
        description: "This rite adds an olfactory dimension to the telling of a story, making it all the more immersive for your listeners. Especially appreciated by Lupus-born.",
        pool: "Wisdom + Survival"
    },
    {
        name: "Rite of the Moon's Fickle Grace",
        type: "Mystical",
        renown: "Glory",
        summary: "The performer asks Luna herself for a bit of luck. It can only be performed under a full moon and has the potential to both help and harm you",
        description: "The performer asks Luna herself for a bit of luck. It can only be performed under a full moon and has the potential to both help and harm you.",
        pool: "Glory + Performance"
    },
    {
        name: "Rite of Renunciation",
        type: "Mystical",
        summary: "This rite allows a Garou to gracefully leave their tribe, becoming Forsworn when completed",
        description: "This rite allows a Garou to gracefully leave their tribe, becoming Forsworn when completed.",
        pool: "None"
    },
    {
        name: "Rite of the Sacred Scar",
        type: "Mystical",
        summary: "This rite marks a Garou's flesh with a mystical scar or tattoo related to their renown. This marking allows for an additional point of renown on all gifts and Rites appropriate to the glyph they have been marked with",
        description: "This rite marks a Garou's flesh with a mystical scar or tattoo related to their renown. This marking allows for an additional point of renown on all gifts and Rites appropriate to the glyph they have been marked with.",
        pool: "Any appropriate renown + Craft"
    },
    {
        name: "Rite of Shared Fury",
        type: "Mystical",
        renown: "Honor",
        summary: "A rite that allows the participants to pool their rage and then redistribute it amongst all involved. Requires a performance of violence or confrontation between members",
        description: "A rite that allows the participants to pool their rage and then redistribute it amongst all involved. Requires a performance of violence or confrontation between members.",
        pool: "Honor + Politics"
    }
]

// All rites combined
export const allRites = [...commonRites, ...socialRites, ...mysticalRites]

// Helper functions
export const getRitesByType = (type: RiteType): Rite[] => {
    return allRites.filter(rite => rite.type === type)
}

export const getRitesByRenown = (renown: RenownType): Rite[] => {
    return allRites.filter(rite => rite.renown === renown)
}
