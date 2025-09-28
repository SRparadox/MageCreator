import { z } from "zod"

/**
 * Crafts are specialties that the mage has mastered. 
 * Magical effects that do not invoke the possibilities of a Paradox.
 */
export const craftSchema = z.object({
    name: z.string(),
    level: z.number().min(1).max(5).int(),
    description: z.string(),
    prerequisites: z.string().optional(),
})
export type Craft = z.infer<typeof craftSchema>

/**
 * Perks are specialties that aid the Mage in the traversing of the world of the supernatural.
 */
export const perkSchema = z.object({
    name: z.string(),
    level: z.number().min(1).max(3).int(),
    description: z.string(),
    prerequisites: z.string().optional(),
})
export type Perk = z.infer<typeof perkSchema>

export const crafts: Craft[] = [
    {
        name: "True Sight",
        level: 1,
        description: "Gives the Mage the ability to suss out supernatural creatures, seeing what they are or even altered objects. Perceiving obfuscated creatures and items require a wits + awareness roll."
    },
    {
        name: "Familiar/Companion",
        level: 1,
        description: "The mage has a mystical non-human companion. Created by the chaos of the umbra, it may complete simple tasks. If the task involves a level of risk, the mage must succeed a manipulation + animal ken roll difficulty of 3. The mage can also perceive the senses of the Familiar but in doing so, leaves the mage vulnerable."
    },
    {
        name: "Escape Artist",
        level: 1,
        description: "The mage cannot be held by bondage against their will. With a successful dexterity + Larceny roll the mage can escape non magical locks, ropes or any form of bindings and even can open locked doors."
    },
    {
        name: "Trickster's Foil",
        level: 1,
        description: "The mage of this craft has a closer affinity to the sphere of entropy. Whenever the mage triggers a paradox, the mage may spend willpower to reroll that arete die and they must take the new result."
    },
    {
        name: "Medium",
        level: 1,
        description: "The mage may call upon a spirit to guide them and answer questions about mysteries they need solved. The mage simply must succeed a Charisma + Occult roll. The spirit present may or may not be friendly."
    },
    {
        name: "Iron Body",
        level: 1,
        description: "The mage is in tune with the sphere of life. They may add their Dots in the Life Sphere to their total Health."
    },
    {
        name: "Illusionist",
        level: 1,
        description: "The mage has the aptitude for creating small illusions like fake ID's, trinkets, or even counterfeit bills. The mage must make a successful Manipulation + Craft to change the appearance of an item equal to 1 hour for every success. Note that these illusions are not immune against other creatures with true sight."
    },
    {
        name: "Psychic",
        level: 1,
        description: "The mage can attempt to read an individual's mind. With a successful Wits + Insight the mage can read the individual's immediate thoughts. On a failure, the thoughts are read but the individual is aware of the probing."
    },
    {
        name: "Ritualist",
        level: 1,
        description: "The mage specializes in casting circles for group casting. When the mage creates a casting circle, the number of successes needed to create one drops to 3."
    },
    {
        name: "Warding",
        level: 1,
        description: "The mage may create a ward on an object or location as big as one room with a successful intelligence + Occult roll difficulty of 5."
    }
]

export const perks: Perk[] = [
    {
        name: "Bookworm",
        level: 1,
        description: "A studious individual you are, you find power outside of magic in the pages of a book. Gain a specialty in Academics (Research) and a Dot in Contacts or A one dot library in your sanctum."
    },
    {
        name: "Prodigy",
        level: 1,
        description: "You have a natural talent with your new gifts and inspire fellow newly awakened mages. Gain a specialty in Leadership (Mage Initiates) And a dot in Allies or Fame."
    },
    {
        name: "Scholar of Traditions",
        level: 1,
        description: "Despite the fall of the Circle of Nine, you have stumbled across remnants of their studies. Whether you practice what they preach or not, you have a better understanding of what they were about than most. Gain a specialty in Politics (The Nine Traditions) and a Dot in Mawla or Status."
    },
    {
        name: "Problem Solver",
        level: 1,
        description: "Even before being awakened by 'The Storm', you have always been resourceful. This had no problem in carrying over to your new life. Gain a specialty in Craft (Improvised Tools) and a Dot in workshop in your Sanctum or a dot in Retainers."
    },
    {
        name: "Internet Personality",
        level: 1,
        description: "Whether it was before the changes or after, you are the center of the attention when you walk into a room. Gain a specialty in Persuasion (Fans) and a dot on Mask or A dot in Influence."
    },
    {
        name: "Apprentice",
        level: 1,
        description: "You're one of the lucky ones who didn't have to go on this journey alone from the start. A mentor has been your guide to this new world you are now a part of and it has been a bit easier. Gain a specialty in Etiquette (Mage society) and a dot in Mentor or a dot in Resources."
    },
    {
        name: "Urchin",
        level: 1,
        description: "Unlike the apprentice, you had to claw through the mud to get to where you are. But that doesn't come without its perks. You know a guy that knows a guy that owes a goblin a favor. You are able to get what by. Gain a specialty in Streetwise (Magical Underground) and a dot in Allies or A dot in Mask."
    },
    {
        name: "Alchemist",
        level: 1,
        description: "You understand that magic is not only raw energy bending reality to its will but it can be captured in a bottle. Gain a specialty in Science (Magical Formula) and a dot in a Lab for your sanctum or a dot in Retainers."
    },
    {
        name: "Wild Card",
        level: 1,
        description: "You are either extremely talented, or extremely lucky. At the end of the day you're just glad you haven't ended up halfway through the Umbra. Gain a specialty in Occult (Thaumaturgy) and a dot in Fame or a dot in Retainers."
    },
    {
        name: "Diplomat",
        level: 1,
        description: "You have found other sub-sects of supernatural beings and you have built a rapport to act as a diplomat between their world and yours. Gain a specialty in Etiquette (A supernatural sub culture) and a dot in Allies or a dot in Contacts."
    }
]