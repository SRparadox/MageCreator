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

// Black Furies Gifts
export const blackFuriesGifts: Gift[] = [
    {
        name: "Curse of Aeolus",
        category: "Black Furies",
        renown: "Glory",
        summary: "Call upon a fog to cover the area",
        description: "This powerful rite can establish new sacred sites or claim existing ones.",
        dicePool: "Resolve + Glory",
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Halt the Coward's Flight",
        category: "Black Furies", 
        renown: "Honor",
        summary: "Those attempting to flee have their movement reduced to walking speed and airborne targets brought down to the ground",
        description: "This generally works on any mundane victim, whereas supernatural creatures can attempt to resist as determined by the Storyteller.",
        dicePool: "Resolve + Honor",
        cost: "1 Rage Check",
        duration: "One scene"
    },
    {
        name: "Porcupine's Reprisal",
        category: "Black Furies",
        renown: "Glory",
        summary: "When receiving brawl or melee damage, the user can make a Rage Check to deal superficial damage equal to their Glory back on the attacker",
        description: "The damage dealt cannot surpass the amount of damage received from the initial attack.",
        dicePool: "N/A",
        cost: "1 Rage Check",
        duration: "N/A"
    },
    {
        name: "Coup de Grâce",
        category: "Black Furies",
        renown: "Glory", 
        summary: "Add the Glory rating into their next attack to end the opponent in one hit",
        description: "Only works if the damage would reduce the opponents Health to 0.",
        dicePool: "N/A",
        cost: "1 Willpower",
        duration: "Next Brawl or Melee attack, or the scene ends"
    },
    {
        name: "Kali's Scar",
        category: "Black Furies",
        renown: "Glory",
        summary: "Any damage dealt by these claws cannot be healed even with supernatural means",
        description: "The user also gains bonus dice equal to their Glory in attempts to track or locate the victim while the Gift is active.",
        dicePool: "N/A",
        cost: "1 Rage Check",
        duration: "A night and a day"
    },
    {
        name: "Wasp Talons", 
        category: "Black Furies",
        renown: "Glory",
        summary: "Make ranged attacks with their claws",
        description: "Gain one Superficial damage from their claws being damaged and cannot use claw attacks until this is healed.",
        dicePool: "Dexterity + Glory",
        cost: "N/A",
        duration: "N/A"
    }
]

// Bone Gnawers Gifts
export const boneGnawersGifts: Gift[] = [
    {
        name: "Blissful Ignorance",
        category: "Bone Gnawers",
        renown: "Wisdom",
        summary: "By remaining completely still, the Garou can become invisible to others",
        description: "Any attempt to spot the Garou is done at Difficulty 2+ the Gift user's Wisdom. Movement breaks the effect.",
        dicePool: "N/A",
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Rapid Shift",
        category: "Bone Gnawers",
        renown: "Glory",
        summary: "Rapidly shapeshift with a risk for damage",
        description: "The Difficulty is dependent on the form; homid is 1, glabro and hispo is 2, and crinos is 3.",
        dicePool: "Dexterity + Glory", 
        cost: "Free plus any form costs",
        duration: "N/A"
    },
    {
        name: "Sight from Beyond",
        category: "Bone Gnawers",
        renown: "Wisdom",
        summary: "The Garou receives unclear visions, that can warn for future choices or immediate danger",
        description: "When given freely, the Storyteller determines if a Gift test is needed, with the amount of successes determining how clear it is and what clues are gained.",
        dicePool: "Intelligence + Wisdom",
        cost: "1 Willpower or free",
        duration: "N/A"
    },
    {
        name: "Face in the Crowd",
        category: "Bone Gnawers",
        renown: "Honor",
        summary: "Disappear into a crowd to shake off pursuers",
        description: "This can only be used in homid form or lupus form, depending on which group they are blending into.",
        dicePool: "N/A", 
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Scent of the Past",
        category: "Bone Gnawers", 
        renown: "Wisdom",
        summary: "By smelling an object, the Garou can determine events that unfolded in the area",
        description: "The Difficulty is determined by the information sought, with each point of margin revealing more information.",
        dicePool: "Intelligence + Wisdom",
        cost: "1 Willpower",
        duration: "One turn"
    }
]

// Children of Gaia Gifts
export const childrenOfGaiaGifts: Gift[] = [
    {
        name: "Brother's Scent", 
        category: "Children of Gaia",
        renown: "Wisdom",
        summary: "Blend into a group as long as their form matches those around them",
        description: "This Gift only works in Homid form unless it's a Garou gathering, this also doesn't prevent them from being noticed for acting unfit to the situation.",
        dicePool: "N/A",
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Mother's Touch",
        category: "Children of Gaia",
        renown: "Glory",
        summary: "Heal other creatures with a Gift test, for as many successes rolled",
        description: "If the amount of successes is greater than the subject's Rage, it is possible to heal one Aggravated instead of one Superficial.",
        dicePool: "Intelligence + Glory",
        cost: "1 Willpower",
        duration: "N/A"
    },
    {
        name: "Sense the True Form",
        category: "Children of Gaia",
        renown: "Wisdom",
        summary: "Determine if someone is something other than a mundane human through sense of smell",
        description: "If they have not met the creature before they may not identify the scent.",
        dicePool: "Wits + Wisdom",
        cost: "1 Willpower",
        duration: "N/A"
    },
    {
        name: "Calm the Furious Beast",
        category: "Children of Gaia",
        renown: "Wisdom",
        summary: "Bring another supernatural creature out of Frenzy",
        description: "The Gift test is made against the target's current Rage or Difficulty 3 for other supernaturals.",
        dicePool: "Composure + Wisdom",
        cost: "1 Willpower", 
        duration: "N/A"
    },
    {
        name: "Open Seal",
        category: "Children of Gaia",
        renown: "Honor",
        summary: "Mechanical locks or bars open automatically. Electronic or supernatural devices required a Gift test",
        description: "The Difficulty can be 2 for regular electronic locks up to 5 for sorcery augmented fingerprint scanners.",
        dicePool: "Manipulation + Honor",
        cost: "1 Rage Check",
        duration: "One scene or until resisted"
    }
]

// Galestalkers Gifts
export const galestalkersGifts: Gift[] = [
    {
        name: "Camouflage",
        category: "Galestalkers",
        renown: "Honor",
        summary: "Blend into the wilderness",
        description: "By spending a full turn and 1 Willpower they can increase this to their entire pack, should they move or make any sound it breaks.",
        dicePool: "N/A",
        cost: "Free / 1 Willpower",
        duration: "One scene"
    },
    {
        name: "Ensnare Spirit",
        category: "Galestalkers",
        renown: "Honor",
        summary: "Weaken a spirit within the same realm, giving them a two-dice penalty to resist the user's will",
        description: "This Gift does not work on hostile spirits and attempts to harm the spirit breaks the Gift.",
        dicePool: "Wits + Honor",
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Chill Cloak",
        category: "Galestalkers",
        renown: "Honor",
        summary: "Add their Honor rating to any Stealth, Survival, or Larceny attempt when avoiding heat based, movement based or light based sensors",
        description: "By spending a full turn and 1 Willpower they can extended this effect to all packmates nearby.",
        dicePool: "N/A",
        cost: "Free / 1 Willpower",
        duration: "One scene"
    },
    {
        name: "Wind Claws",
        category: "Galestalkers",
        renown: "Wisdom",
        summary: "Ignore armor and damage reduction by an amount equal to the user's Wisdom",
        description: "This is instant and free for crinos form.",
        dicePool: "Wits + Wisdom",
        cost: "Free / 1 Willpower",
        duration: "One scene"
    }
]

// Ghost Council Gifts
export const ghostCouncilGifts: Gift[] = [
    {
        name: "Augur",
        category: "Ghost Council",
        renown: "Wisdom",
        summary: "Look into a reflective surface and see through another reflective surface in another area",
        description: "They cannot hear or smell what is going on, only able to see.",
        dicePool: "Intelligence + Wisdom",
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Sense Danger",
        category: "Ghost Council",
        renown: "Wisdom", 
        summary: "Add the users Wisdom to any attempt to detect traps, ambushes or other surprise attacks",
        description: "This should only be added when failure will result in immediate danger.",
        dicePool: "N/A",
        cost: "N/A",
        duration: "N/A"
    },
    {
        name: "Blackout",
        category: "Ghost Council",
        renown: "Wisdom",
        summary: "Extinguish one light source within eyesight per dot of Wisdom",
        description: "Those who cannot see in the dark and/or do not have a light source are subject to a penalty.",
        dicePool: "N/A",
        cost: "1 Rage Check",
        duration: "One scene"
    },
    {
        name: "Mindspeak",
        category: "Ghost Council",
        renown: "Wisdom",
        summary: "Send and receive thoughts to a single subject, which can establish two-way communication",
        description: "This Gift does not allow the user to read minds.",
        dicePool: "Resolve + Wisdom",
        cost: "1 Willpower",
        duration: "One scene or until contact breaks"
    }
]

// Glass Walkers Gifts
export const glassWalkersGifts: Gift[] = [
    {
        name: "Animal Magnetism",
        category: "Glass Walkers",
        renown: "Glory",
        summary: "Exudes a feral aura that draws the attention of humans",
        description: "Grants Glory as bonus dice against humans with Social Skill tests.",
        dicePool: "N/A",
        cost: "1 Rage Check",
        duration: "One scene"
    },
    {
        name: "Gaia's Candor",
        category: "Glass Walkers",
        renown: "Glory",
        summary: "Determine if someone believes their answer is the truth based on scent",
        description: "No test is required for humans unaware of the Garou. Victims can refuse to answer.",
        dicePool: "Charisma + Glory",
        cost: "1 Rage Check",
        duration: "One question"
    },
    {
        name: "Skinbind",
        category: "Glass Walkers",
        renown: "Wisdom",
        summary: "Transform mundane items into a tattoo-like image on their skin",
        description: "Store an amount of objects up to their Wisdom rating and non-mundane may come with side effects.",
        dicePool: "N/A",
        cost: "1 Willpower",
        duration: "Indefinitely"
    },
    {
        name: "Energize",
        category: "Glass Walkers",
        renown: "Wisdom",
        summary: "Power any object as if it was plugged in or fuelled up",
        description: "This Gift does not repair destroyed items and does not equate them having knowledge to use it.",
        dicePool: "Resolve + Wisdom",
        cost: "1+ Rage Checks",
        duration: "One scene / Margin of turns"
    }
]

// Hart Wardens Gifts
export const hartWardensGifts: Gift[] = [
    {
        name: "Crow's Laughter",
        category: "Hart Wardens",
        renown: "Honor",
        summary: "A target within sight and hearing can be enticed to attack the user",
        description: "Upon winning the test, the target must attack the user or spend one point of Willpower to resist.",
        dicePool: "Manipulation + Honor",
        cost: "1 Rage Check",
        duration: "One scene or until resisted"
    },
    {
        name: "Sacred Boundary",
        category: "Hart Wardens",
        renown: "Glory",
        summary: "Create a boundary that when broken while still active gives the user a glimpse of the movement",
        description: "This lasts either for a day and a night unless the objects anchoring it are moved/destroyed.",
        dicePool: "N/A",
        cost: "Free",
        duration: "A day or a night or until broken"
    },
    {
        name: "Beast's Fealty",
        category: "Hart Wardens",
        renown: "Honor",
        summary: "Command the loyalty of a single animal",
        description: "This lasts until until the Garou releases the animal or it dies, this can only be used on one animal at a time.",
        dicePool: "Charisma + Honor",
        cost: "1 Rage Check",
        duration: "Until lapsed"
    },
    {
        name: "Song of Inspiration",
        category: "Hart Wardens",
        renown: "Wisdom",
        summary: "The Garou can sing a song to buff either a Mental or Social Skill for their packmates",
        description: "On a win, other members of the pack gain a bonus die for tests using that Skill, a critical win increases the bonus to two dice.",
        dicePool: "Manipulation + Wisdom",
        cost: "1 Willpower",
        duration: "One scene"
    }
]

// Red Talons Gifts
export const redTalonsGifts: Gift[] = [
    {
        name: "Hidden Killer",
        category: "Red Talons",
        renown: "Honor",
        summary: "Cover up how someone died",
        description: "Mundane attempts to gather information fail, those familiar with the Garou can make the attempt but suffer a dice penalty equal to the Gift user's Honor.",
        dicePool: "N/A",
        cost: "1 Willpower",
        duration: "N/A"
    },
    {
        name: "Razor Claws",
        category: "Red Talons",
        renown: "Glory",
        summary: "Grow supernaturally sharp claws",
        description: "This is free and instant for crinos and deal damage equal to half their Glory (rounded up).",
        dicePool: "N/A",
        cost: "Free / 1 Rage Check",
        duration: "One scene"
    },
    {
        name: "Song of Rage",
        category: "Red Talons",
        renown: "Glory",
        summary: "The Garou can sing a song to increase nearby packmates rage by 1",
        description: "Two points of Rage are given on a critical win. Characters can only be affected by this once per session.",
        dicePool: "Charisma + Glory",
        cost: "1 Rage Check",
        duration: "N/A"
    },
    {
        name: "Fangs of Judgement",
        category: "Red Talons",
        renown: "Honor",
        summary: "Bolster their allies claws and fangs against a single enemy who has previously harmed the pack",
        description: "A successful Gift test at Difficulty 3, grants the pack a +1 damage against the target. This can only be used one target and cannot stack by others using the same Gift.",
        dicePool: "Resolve + Honor",
        cost: "1 Willpower",
        duration: "Until the target dies or the sentence is revoked"
    }
]

// Shadow Lords Gifts
export const shadowLordsGifts: Gift[] = [
    {
        name: "Fatal Flaw",
        category: "Shadow Lords",
        renown: "Glory",
        summary: "Learn a method not yet known to deal Aggravated damage to a target, if there is nothing they gain a bonus die to attacks",
        description: "During the full turn studying they can do nothing else.",
        dicePool: "Intelligence + Glory",
        cost: "1 Willpower",
        duration: "N/A"
    },
    {
        name: "Icy Chill of Despair",
        category: "Shadow Lords",
        renown: "Glory",
        summary: "Gain Glory as bonus dice for Intimidation tests",
        description: "Those nearby, other than the packmates, cannot reroll using Willpower or regain Willpower other than through mystical means.",
        dicePool: "N/A",
        cost: "1 Rage Check",
        duration: "One scene"
    },
    {
        name: "Shadow Sense",
        category: "Shadow Lords",
        renown: "Wisdom",
        summary: "Determine if supernatural creatures or elements are nearby without pinpointing the exact location or identity",
        description: "The Difficulty of the Gift test is 2, but can be modified by powers that allow creatures to hide their supernatural features.",
        dicePool: "Wits + Wisdom",
        cost: "1 Willpower",
        duration: "One turn"
    },
    {
        name: "True Fear",
        category: "Shadow Lords",
        renown: "Glory",
        summary: "Instill fear to drive the victim away or terror that freezes the victim in place",
        description: "Mundane victims are automatically affected, supernatural creatures and those aware of the Garou may resist.",
        dicePool: "Charisma + Glory",
        cost: "1 Rage Check",
        duration: "One scene"
    }
]

// Silent Striders Gifts
export const silentStridersGifts: Gift[] = [
    {
        name: "Fetch Bounty",
        category: "Silent Striders",
        renown: "Wisdom",
        summary: "Locate mundane nonliving objects",
        description: "This Gift can also be used in any form.",
        dicePool: "Wits + Wisdom",
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Speech of the World",
        category: "Silent Striders",
        renown: "Wisdom",
        summary: "Read and speak any living language",
        description: "This Gift can also be used in any form.",
        dicePool: "Intelligence + Wisdom",
        cost: "1 Willpower",
        duration: "One scene"
    },
    {
        name: "Scent of Running Water",
        category: "Silent Striders",
        renown: "Wisdom",
        summary: "The Garou can make themselves impossible to track through mundane means and difficulty through supernatural means",
        description: "They also gain their Wisdom as a bonus to avoid supernatural tracking.",
        dicePool: "N/A",
        cost: "Free/1 Willpower",
        duration: "One scene"
    },
    {
        name: "Against the Odds",
        category: "Silent Striders",
        renown: "Glory",
        summary: "Restore superficial Willpower of the Gift user and pack",
        description: "Each success of the test heals one Superficial Willpower. This can only be used once per story.",
        dicePool: "Glory",
        cost: "1 Rage Check",
        duration: "N/A"
    }
]

// Silver Fangs Gifts
export const silverFangsGifts: Gift[] = [
    {
        name: "Howl of Assembly",
        category: "Silver Fangs",
        renown: "Honor",
        summary: "Heal a Willpower point of other Garou who join in the presence of the user",
        description: "This can only affect a character once per session.",
        dicePool: "Charisma + Honor",
        cost: "1 Rage Check",
        duration: "N/A"
    },
    {
        name: "Pack Instinct",
        category: "Silver Fangs",
        renown: "Honor",
        summary: "The Garou has instinctual knowledge of the whereabouts of their packmates",
        description: "They must be within a 10-kilometer radius.",
        dicePool: "Composure + Honor",
        cost: "Free / 1 Willpower",
        duration: "One scene"
    },
    {
        name: "Command the Gathering",
        category: "Silver Fangs",
        renown: "Glory",
        summary: "Draw the attention of those within hearing and viewing distance, regardless if they speak the same language",
        description: "Add the Garou's Glory to their dice pools to any public speech/presentation with the Skills Persuasion or Performance.",
        dicePool: "N/A",
        cost: "1 Rage Check",
        duration: "One scene or until it is broken or lapses"
    },
    {
        name: "Luna's Avenger",
        category: "Silver Fangs",
        renown: "Honor",
        summary: "Gain a bonus of one die for each Impaired packmate and two for each member with their Health tracker filled with Aggravated damage",
        description: "The bonus dice cannot exceed the Gift user's Honor.",
        dicePool: "N/A",
        cost: "1 Rage Check",
        duration: "One scene"
    }
]

// All gifts combined for easy access
export const allGifts = [
    ...nativeGifts,
    ...ragabashGifts, 
    ...theurgeGifts,
    ...philodoxGifts,
    ...galliardGifts,
    ...ahrounGifts,
    ...blackFuriesGifts,
    ...boneGnawersGifts,
    ...childrenOfGaiaGifts,
    ...galestalkersGifts,
    ...ghostCouncilGifts,
    ...glassWalkersGifts,
    ...hartWardensGifts,
    ...redTalonsGifts,
    ...shadowLordsGifts,
    ...silentStridersGifts,
    ...silverFangsGifts
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
