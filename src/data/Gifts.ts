import { z } from "zod"
import { Power } from "./Disciplines"

export const renownTypeSchema = z.enum(["Glory", "Honor", "Wisdom"])
export type RenownType = z.infer<typeof renownTypeSchema>

export const giftCategorySchema = z.enum(["Native", "Ragabash", "Theurge", "Philodox", "Galliard", "Ahroun", "Black Furies", "Bone Gnawers", "Children of Gaia", "Galestalkers", "Ghost Council", "Glass Walkers", "Hart Wardens", "Red Talons", "Shadow Lords", "Silent Striders", "Silver Fangs"])
export type GiftCategory = z.infer<typeof giftCategorySchema>

export const giftSchema = z.object({
    name: z.string(),
    category: giftCategorySchema,
    renown: renownTypeSchema,
    summary: z.string(),
    description: z.string(),
    dicePool: z.string(),
    cost: z.string(),
    duration: z.string(),
})
export type Gift = z.infer<typeof giftSchema>

// Native Gifts (pp. 146-147)
export const nativeGifts: Gift[] = [
    {
        name: "Catfeet",
        category: "Native",
        renown: "Honor",
        summary: "Gain a supernatural sense of balance",
        description: "The Garou gains perfect balance and can walk on narrow surfaces without falling.",
        dicePool: "Dexterity + Athletics",
        cost: "None",
        duration: "Scene"
    },
    {
        name: "Eyes of the Owl",
        category: "Native", 
        renown: "Wisdom",
        summary: "See in the dark",
        description: "The Garou can see clearly in complete darkness as if it were daylight.",
        dicePool: "Wits + Awareness",
        cost: "None",
        duration: "Scene"
    },
    {
        name: "Hare's Leap",
        category: "Native",
        renown: "Glory", 
        summary: "Leap great distances",
        description: "The Garou can leap superhuman distances in any form.",
        dicePool: "Strength + Athletics",
        cost: "1 Rage",
        duration: "One jump"
    },
    {
        name: "Penumbral Senses",
        category: "Native",
        renown: "Wisdom",
        summary: "Perceive the spirit and mundane worlds",
        description: "The Garou can perceive both the physical and spirit worlds simultaneously.",
        dicePool: "Wits + Awareness",
        cost: "None", 
        duration: "Scene"
    },
    {
        name: "Raging Strike",
        category: "Native",
        renown: "Glory",
        summary: "Deal extra damage with Brawl attacks",
        description: "The Garou's unarmed attacks deal additional damage when enraged.",
        dicePool: "Strength + Brawl",
        cost: "1 Rage",
        duration: "One attack"
    },
    {
        name: "Staredown",
        category: "Native",
        renown: "Honor",
        summary: "Cause humans and animals to get out of your way",
        description: "The Garou can intimidate humans and animals into backing down or fleeing.",
        dicePool: "Presence + Intimidation",
        cost: "None",
        duration: "Scene"
    }
]

// Ragabash Gifts (pp. 149-150)
export const ragabashGifts: Gift[] = [
    {
        name: "Blissful Ignorance",
        category: "Ragabash",
        renown: "Wisdom",
        summary: "Stand unseen",
        description: "The Garou becomes effectively invisible to casual observation.",
        dicePool: "Wits + Stealth",
        cost: "1 Gnosis",
        duration: "Scene"
    },
    {
        name: "Crow's Laughter", 
        category: "Ragabash",
        renown: "Honor",
        summary: "Mockery causes Superficial Willpower damage",
        description: "The Garou's mocking laughter causes psychological harm to enemies.",
        dicePool: "Manipulation + Performance",
        cost: "None",
        duration: "Instant"
    },
    {
        name: "Gremlins",
        category: "Ragabash",
        renown: "Glory",
        summary: "Cause a device to malfunction",
        description: "The Garou can cause technological devices to fail or malfunction.",
        dicePool: "Manipulation + Technology",
        cost: "1 Rage",
        duration: "Scene"
    },
    {
        name: "Spider's Song",
        category: "Ragabash", 
        renown: "Wisdom",
        summary: "Eavesdrop on electronic communication",
        description: "The Garou can listen in on electronic communications like phone calls or internet traffic.",
        dicePool: "Intelligence + Technology",
        cost: "1 Gnosis",
        duration: "Scene"
    }
]

// Theurge Gifts (pp. 152-153)  
export const theurgeGifts: Gift[] = [
    {
        name: "Ensnare Spirit",
        category: "Theurge",
        renown: "Honor", 
        summary: "Stop a spirit and make it susceptible to further Gifts",
        description: "The Garou can bind a spirit in place and make it vulnerable to other supernatural effects.",
        dicePool: "Composure + Occult",
        cost: "1 Gnosis",
        duration: "Scene"
    },
    {
        name: "Mother's Touch",
        category: "Theurge",
        renown: "Glory",
        summary: "Heal other physical, living creatures", 
        description: "The Garou can heal wounds on other living beings through touch.",
        dicePool: "Intelligence + Medicine",
        cost: "1 Gnosis",
        duration: "Instant"
    },
    {
        name: "Shadow Sense",
        category: "Theurge",
        renown: "Wisdom",
        summary: "Sense unseen creatures and the supernatural",
        description: "The Garou can detect invisible, hidden, or supernatural entities.",
        dicePool: "Wits + Awareness", 
        cost: "None",
        duration: "Scene"
    },
    {
        name: "Sight from Beyond",
        category: "Theurge",
        renown: "Wisdom",
        summary: "Prophetic visions",
        description: "The Garou receives visions of possible futures or distant events.",
        dicePool: "Intelligence + Occult",
        cost: "1 Gnosis",
        duration: "Instant"
    }
]

// Philodox Gifts (pp. 155-156)
export const philodoxGifts: Gift[] = [
    {
        name: "Ancestral Conviction",
        category: "Philodox",
        renown: "Honor",
        summary: "Persuade other Garou",
        description: "The Garou can call upon ancestral wisdom to make persuasive arguments to other werewolves.",
        dicePool: "Presence + Persuasion",
        cost: "1 Gnosis",
        duration: "Scene"
    },
    {
        name: "Gaia's Candor",
        category: "Philodox", 
        renown: "Glory",
        summary: "Determine if a target believes what they say",
        description: "The Garou can tell if someone truly believes what they are saying.",
        dicePool: "Wits + Insight",
        cost: "None",
        duration: "Scene"
    },
    {
        name: "Porcupine's Reprisal",
        category: "Philodox",
        renown: "Glory",
        summary: "Damage those who harm you",
        description: "Those who attack the Garou suffer damage in return.",
        dicePool: "Stamina + Survival", 
        cost: "1 Rage",
        duration: "Scene"
    },
    {
        name: "Sense the True Form",
        category: "Philodox",
        renown: "Wisdom",
        summary: "Detect a creature's supernatural nature",
        description: "The Garou can see through shapeshifting and detect supernatural creatures.",
        dicePool: "Wits + Awareness",
        cost: "None",
        duration: "Instant"
    }
]

// Galliard Gifts (pp. 158-159)
export const galliardGifts: Gift[] = [
    {
        name: "Animal Magnetism",
        category: "Galliard",
        renown: "Glory",
        summary: "Bonus to Social tests against humans",
        description: "The Garou becomes supernaturally charismatic and appealing to humans.",
        dicePool: "Presence + Performance",
        cost: "1 Gnosis",
        duration: "Scene"
    },
    {
        name: "Howl of Assembly",
        category: "Galliard",
        renown: "Honor",
        summary: "Call other Garou to you and fortify those who heed your call",
        description: "The Garou's howl summons other werewolves and strengthens their resolve.",
        dicePool: "Presence + Performance",
        cost: "1 Gnosis",
        duration: "Scene"
    },
    {
        name: "Song of Rage",
        category: "Galliard",
        renown: "Glory",
        summary: "Grant Rage to your pack",
        description: "The Garou's song fills pack members with righteous fury.",
        dicePool: "Presence + Performance",
        cost: "1 Gnosis", 
        duration: "Scene"
    },
    {
        name: "Song of Serenity",
        category: "Galliard",
        renown: "Honor",
        summary: "Lower your pack's Rage",
        description: "The Garou's calming song reduces the Rage of pack members.",
        dicePool: "Presence + Performance",
        cost: "1 Gnosis",
        duration: "Scene"
    }
]

// Ahroun Gifts (pp. 161-162)
export const ahrounGifts: Gift[] = [
    {
        name: "Halt the Coward's Flight",
        category: "Ahroun",
        renown: "Honor",
        summary: "Slow a fleeing target",
        description: "The Garou can supernaturally slow down fleeing enemies.",
        dicePool: "Presence + Intimidation",
        cost: "1 Rage",
        duration: "Scene"
    },
    {
        name: "Rapid Shift",
        category: "Ahroun",
        renown: "Glory",
        summary: "Quickly change form",
        description: "The Garou can shift between forms with supernatural speed.",
        dicePool: "Stamina + Athletics",
        cost: "1 Rage",
        duration: "Instant"
    },
    {
        name: "Razor Claws",
        category: "Ahroun",
        renown: "Glory",
        summary: "Deal extra damage with claws",
        description: "The Garou's claws become supernaturally sharp and deadly.",
        dicePool: "Strength + Brawl",
        cost: "1 Rage",
        duration: "Scene"
    },
    {
        name: "Sense Danger",
        category: "Ahroun", 
        renown: "Wisdom",
        summary: "Detect traps, ambushes, and surprises",
        description: "The Garou can sense impending danger and hostile intent.",
        dicePool: "Wits + Awareness",
        cost: "None",
        duration: "Scene"
    }
]

// All gifts combined for easy access
export const allGifts = [
    ...nativeGifts,
    ...ragabashGifts, 
    ...theurgeGifts,
    ...philodoxGifts,
    ...galliardGifts,
    ...ahrounGifts
]

// Helper functions
export const getGiftsByCategory = (category: GiftCategory): Gift[] => {
    return allGifts.filter(gift => gift.category === category)
}

export const getGiftsByRenown = (renown: RenownType): Gift[] => {
    return allGifts.filter(gift => gift.renown === renown)
}

// Check if character has gifts that might give access to rituals
export const containsRituals = (gifts: Power[]): boolean => {
    // In Werewolf, characters with spirit gifts or certain other gifts may have access to rituals
    // For now, just check if they have any gifts/powers at all
    return gifts.length > 0
}
