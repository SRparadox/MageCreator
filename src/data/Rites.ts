import { z } from "zod"
import { RenownType, renownTypeSchema } from "./Gifts"

export const riteTypeSchema = z.enum(["Common", "Social"])
export type RiteType = z.infer<typeof riteTypeSchema>

export const riteSchema = z.object({
    name: z.string(),
    type: riteTypeSchema,
    renown: renownTypeSchema.optional(), // Some rites don't require specific renown
    summary: z.string(),
    description: z.string(),
    duration: z.string(),
    requirements: z.string(),
})
export type Rite = z.infer<typeof riteSchema>

// Common Rites (pp. 180-186)
export const commonRites: Rite[] = [
    {
        name: "Abjuration",
        type: "Common",
        renown: "Honor",
        summary: "End a spiritual possession",
        description: "This rite forces a possessing spirit to leave its host.",
        duration: "10 minutes",
        requirements: "Salt circle, holy symbol or fetish"
    },
    {
        name: "Rage",
        type: "Common", 
        renown: "Glory",
        summary: "Increase participants' Rage",
        description: "This rite fills participants with righteous fury, increasing their Rage.",
        duration: "30 minutes",
        requirements: "War paint or ritual scarification"
    },
    {
        name: "Tranquility",
        type: "Common",
        renown: "Wisdom",
        summary: "Reduce participants' Rage",
        description: "This calming rite reduces the Rage of all participants.",
        duration: "30 minutes", 
        requirements: "Peaceful location, meditation"
    },
    {
        name: "Contrition",
        type: "Common",
        renown: "Honor",
        summary: "Make amends with a spirit or cast chagrin off",
        description: "This rite allows the Garou to make peace with an offended spirit.",
        duration: "1 hour",
        requirements: "Offering appropriate to the spirit"
    },
    {
        name: "The Forgetful Record",
        type: "Common",
        renown: "Wisdom",
        summary: "Corrupt electronically or physically recorded information",
        description: "This rite can alter or destroy recorded information to hide supernatural activity.",
        duration: "10 minutes",
        requirements: "Something to burn, electronic device"
    },
    {
        name: "The Living Caern",
        type: "Common",
        renown: "Wisdom", 
        summary: "Maintain a caern",
        description: "This rite maintains the spiritual power of a caern sacred site.",
        duration: "1 hour",
        requirements: "Performed at a caern"
    },
    {
        name: "Shadow Passage",
        type: "Common",
        summary: "Enter the Umbra",
        description: "This rite allows passage between the physical and spirit worlds.",
        duration: "Instant",
        requirements: "Reflective surface or natural boundary"
    },
    {
        name: "Dedication",
        type: "Common",
        summary: "Spiritually attune to clothing",
        description: "This rite bonds clothing or simple tools to the Garou so they transform with them.",
        duration: "10 minutes",
        requirements: "Personal item"
    },
    {
        name: "Kinseeking",
        type: "Common",
        renown: "Wisdom",
        summary: "Find a nascent Garou",
        description: "This rite helps locate humans who are about to undergo their First Change.",
        duration: "1 hour",
        requirements: "Map of the local area"
    },
    {
        name: "Spirit Summoning",
        type: "Common",
        renown: "Honor",
        summary: "Call a spirit to you",
        description: "This rite summons a specific type of spirit to the ritual location.",
        duration: "30 minutes",
        requirements: "Offering, appropriate location"
    },
    {
        name: "Binding",
        type: "Common",
        renown: "Glory",
        summary: "Tie a spirit to a location, object, or person",
        description: "This rite binds a spirit to serve in a specific capacity.",
        duration: "1 hour", 
        requirements: "Fetish materials or binding circle"
    },
    {
        name: "Shame",
        type: "Common",
        summary: "Exacerbate chagrin",
        description: "This rite increases feelings of shame and regret in the target.",
        duration: "Instant",
        requirements: "Public setting"
    },
    {
        name: "Patronage",
        type: "Common",
        summary: "Enjoy a Patron spirit's favor",
        description: "This rite gains the favor and protection of a powerful spirit patron.",
        duration: "Variable",
        requirements: "Varies by patron spirit"
    },
    {
        name: "Celebration",
        type: "Common",
        renown: "Honor",
        summary: "Restore Willpower after a victory",
        description: "This rite celebrates victory and restores the spiritual strength of participants.",
        duration: "1 hour",
        requirements: "Recent victory to celebrate"
    },
    {
        name: "Caern Building",
        type: "Common",
        renown: "Wisdom",
        summary: "Awaken a dormant caern or dominate a hostile one",
        description: "This powerful rite can establish new sacred sites or claim existing ones.",
        duration: "3 hours",
        requirements: "Spiritually significant location, pack participation"
    },
    {
        name: "The Wolf Reborn",
        type: "Common",
        summary: "Help a participant regain the ability to shapeshift",
        description: "This healing rite can restore shapeshifting abilities lost due to trauma or curse.",
        duration: "3 hours",
        requirements: "Full moon, pack participation"
    },
    {
        name: "The Whispering Field",
        type: "Common",
        renown: "Wisdom",
        summary: "Attune to the area around a caern",
        description: "This rite allows the Garou to sense disturbances in the area around a sacred site.",
        duration: "1 hour",
        requirements: "Performed at a caern"
    },
    {
        name: "The Shrouded Glen",
        type: "Common", 
        renown: "Wisdom",
        summary: "Hide a caern from others",
        description: "This rite conceals a caern from discovery by enemies or the unworthy.",
        duration: "3 hours",
        requirements: "Performed at a caern, materials for concealment"
    }
]

// Social Rites (p. 187)
export const socialRites: Rite[] = [
    {
        name: "Passage",
        type: "Social",
        summary: "Help fledgling Garou join society",
        description: "This rite formally welcomes a new Garou into werewolf society.",
        duration: "2 hours",
        requirements: "Pack or tribe witnesses"
    },
    {
        name: "Satire Rite",
        type: "Social",
        summary: "Warn another Garou of their bad behavior",
        description: "This rite uses humor and mockery to correct inappropriate behavior.",
        duration: "30 minutes",
        requirements: "Public audience of Garou"
    },
    {
        name: "Accomplishment",
        type: "Social",
        summary: "Honor another Garou's victory",
        description: "This rite formally recognizes and celebrates another werewolf's achievements.",
        duration: "1 hour",
        requirements: "Witnesses to the accomplishment"
    },
    {
        name: "Gathering for the Departed",
        type: "Social", 
        summary: "Honor the dead",
        description: "This funeral rite honors fallen Garou and helps their spirits find peace.",
        duration: "3 hours",
        requirements: "Personal items of the deceased"
    },
    {
        name: "The Winter Wolf",
        type: "Social",
        summary: "Help the aged and infirm find an honorable death",
        description: "This somber rite helps elderly or mortally wounded Garou die with dignity.",
        duration: "Variable",
        requirements: "Consent of the dying, pack presence"
    }
]

// All rites combined
export const allRites = [...commonRites, ...socialRites]

// Helper functions
export const getRitesByType = (type: RiteType): Rite[] => {
    return allRites.filter(rite => rite.type === type)
}

export const getRitesByRenown = (renown: RenownType): Rite[] => {
    return allRites.filter(rite => rite.renown === renown)
}
