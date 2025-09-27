export type MeritOrFlaw = { name: string; cost: number[]; summary: string }

export type MeritsAndFlaws = {
    title: string
    merits: MeritOrFlaw[]
    flaws: MeritOrFlaw[]
}

export type BackgroundsData = {
    title: string
    backgrounds: MeritOrFlaw[]
}

// Caern Merits & Flaws
export const caernMeritsAndFlaws: MeritsAndFlaws = {
    title: "�️ Caern",
    merits: [
        { name: "Caern Access", cost: [1], summary: "The character can access a Caern belonging to another sept, as long as they do not interfere with them or put the caern in danger." },
        { name: "Awakened Caern", cost: [5], summary: "Add one to the caern value of the first caern the character joins or finds. This Merit does not stack, it is up to the Storyteller if other members can chip in to accumulate the five dots of this Merit." }
    ],
    flaws: [
        { name: "Caern Pariah", cost: [1], summary: "The character is unwelcome in any and all caerns on their turf. Either needing to pay to use them through dangerous jobs or acts or resorting to sneaking in, which can be disaster if they are caught. This does not apply to a caern whose sept you belong to, though it can be a reason for someone else to want you gone." }
    ]
}

// Day Job Merits
export const dayJobMerits: MeritsAndFlaws = {
    title: "💼 Day Job",
    merits: [
        { name: "Day Job", cost: [1], summary: "Efforts to hide Garou nature by using the job receive a bonus die to relevant pools, such as subterfuge or persuasion." },
        { name: "Corroborate Day Job", cost: [2], summary: "Same benefits as Day Job, but in addition the character's coworkers back up work claims. Add two dice to pools as above instead of one." }
    ],
    flaws: []
}

// Linguistics Merits & Flaws
export const linguisticsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🗣️ Linguistics",
    merits: [
        { name: "Linguistics", cost: [1, 2, 3, 4, 5], summary: "Each dot of Linguistics allows the character to read, write and speak fluently in another language outside of the default two they already know, which is their birth language and the language of the setting." }
    ],
    flaws: [
        { name: "Illiterate", cost: [2], summary: "The Character cannot read nor write and their Science and Academics Skills may not go beyond 1 dot. They cannot have a speciality in them that uses modern knowledge." }
    ]
}

// Looks Merits & Flaws
export const looksMeritsAndFlaws: MeritsAndFlaws = {
    title: "👤 Looks",
    merits: [
        { name: "Clement Lupus", cost: [1], summary: "The lupus form appears more dog-like than wolf-like and no human onlookers assume they are a wolf." },
        { name: "Beautiful", cost: [2], summary: "Add one die to related Social pools" },
        { name: "Stunning", cost: [4], summary: "Add two dice to related Social pools" }
    ],
    flaws: [
        { name: "Ugly", cost: [1], summary: "Lose one die from related Social pools" },
        { name: "Repulsive", cost: [2], summary: "Lose two dice from related Social pools" },
        { name: "Stench", cost: [1], summary: "Lose one die from seduction and similar Social pools. Lose two dice from Stealth pools against opponents who can smell unless you're upwind" },
        { name: "Transparent", cost: [1], summary: "Lose one die from any pools requiring Subterfuge. You cannot gain dots in Subterfuge." }
    ]
}

// Mythic Flaws
export const mythicFlaws: MeritsAndFlaws = {
    title: "🌟 Mythic",
    merits: [],
    flaws: [
        { name: "Additional Ban", cost: [2], summary: "Choose another tribe and suffer its Ban as well as the one from your actual tribe. The Storyteller can prohibit this Flaw if the second Ban would cause problems for, or lack impact in, the chronicle." }
    ]
}

// Other Merits & Flaws
export const otherMeritsAndFlaws: MeritsAndFlaws = {
    title: "📋 Other",
    merits: [],
    flaws: [
        { name: "Knowledge Hungry", cost: [1], summary: "Your character hungers to study a topic of your choice. When your character comes across books, tutorial videos, college seminars or other methods of learning about their chosen subject, make a Willpower test at Difficulty 3 to resist chasing their obsession." }
    ]
}

// Rites Merits
export const ritesMerits: MeritsAndFlaws = {
    title: "�️ Rites",
    merits: [
        { name: "Improviser", cost: [1], summary: "You suffer two dice less penalties for performing Rites in suboptimal conditions" },
        { name: "Moot Caller", cost: [2], summary: "Select 5 social rites, you've mastered them. If allowed during a moot, you can assist in any rite so long as it is performed at a moot or substantially similar gathering of Garou." },
        { name: "Rite Master", cost: [3], summary: "Add one die to any pools involving Rite knowledge or performance" }
    ],
    flaws: []
}

// Safe House Merits
export const safeHouseMerits: MeritsAndFlaws = {
    title: "🏠 Safe House",
    merits: [
        { name: "Obscure Safe House", cost: [2], summary: "Efforts to locate the character and anyone with them while at the safehouse suffers a two dice penalty." },
        { name: "Secure Safe House", cost: [2], summary: "Add two dice to relevant pools related to learning of or resisting unauthorized entry." }
    ],
    flaws: []
}

// Substance Abuse Flaws
export const substanceAbuseFlaws: MeritsAndFlaws = {
    title: "🍷 Substance Abuse",
    merits: [],
    flaws: [
        { name: "Addiction", cost: [1], summary: "Unless the action is to immediately gain their drug, lose one die to all pools if in the last scene they did not indulge on the drug of their choice." },
        { name: "Hopeless Addiction", cost: [2], summary: "Unless the action is to immediately gain their drug, lose two dice to all pools if in the last scene they did not indulge on the drug of their choice." }
    ]
}

// Supernatural Situations Merits & Flaws
export const supernaturalSituationsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🌙 Supernatural Situations",
    merits: [
        { name: "Moon-Quickened", cost: [1], summary: "The first time the character howls at the moon during any night, they restore one point of Superficial Willpower damage." },
        { name: "Moon-Riled", cost: [3], summary: "The first time the character howls at the moon during any night, they gain an additional point of Rage." }
    ],
    flaws: [
        { name: "Folkloric Bane", cost: [1], summary: "Take Aggravated Damage when touching a specific object. Examples: Holy water (as if fire), Weapon wielded by a devout believer in their faith, weapon adorned with moonstone or moonstone itself, etc" },
        { name: "Folkloric Block", cost: [1], summary: "Must spend Willpower or move away from a specific object. Examples: Wolfbanes or other herbs with mystic properties, Holy symbols presented by a believer, silver brandished, etc" },
        { name: "Folkloric Tell", cost: [1], summary: "The character bears an indicator that makes them appear unsettling to others, regardless if they associate it with werewolves or not. Those who feel the folkloric tell distrust them, reducing the character's dice pool by one for all Social tests other than Intimidation. Examples: People hear howls in their presence, their shadow looks wolf-like in human form and human-like in wolf form, etc" },
        { name: "Crone's Curse", cost: [2], summary: "The character appears aged well past their prime and they have one box fewer on their health tracker than they should." },
        { name: "Moon-Thrall", cost: [2], summary: "Whenever the character sees the moon for the first time of the night, they must change form to glabro or hispo with any required Rage checks made." }
    ]
}

// Allies Merits & Flaws
export const alliesMeritsAndFlaws: MeritsAndFlaws = {
    title: "🤝 Allies",
    merits: [
        { name: "Allies", cost: [1, 2, 3, 4, 5, 6], summary: "A group who will support or aid the Garou. Family, friends, or an organization that has loyalty. Build them between (• - ••••) Effectiveness and (•-•••) Reliability, the maximum amount of total points is 6. Effectiveness defines how proficient they are at a task. Reliability determines how dependable they are." }
    ],
    flaws: [
        { name: "Enemy", cost: [1, 2, 3, 4, 5], summary: "The opposite to Allies, and are rated two dots less than their effectiveness." },
        { name: "Stalkers", cost: [1], summary: "Something about the character tends to attract others who get a little bit too attached and just won't let go. Should they get rid of them, another soon appears." }
    ]
}

// Contacts Merits
export const contactsMerits: MeritsAndFlaws = {
    title: "📞 Contacts",
    merits: [
        { name: "Contacts", cost: [1, 2, 3], summary: "These are people who can get the character information, items or other things of value." }
    ],
    flaws: []
}

// Fame Merits & Flaws
export const fameMeritsAndFlaws: MeritsAndFlaws = {
    title: "⭐ Fame",
    merits: [
        { name: "Fame", cost: [1, 2, 3, 4, 5], summary: "The character might be a pop singer, actress, or other celebrity. The level of fame can subtract from tests against fans and can be used inplace of a another Trait in Social tests as allowed by the Storyteller. However, this can also be a dangerous trait as tailing a target unnoticed may become difficult with fans spotting the character." }
    ],
    flaws: [
        { name: "Infamy", cost: [2], summary: "They've done something atrocious and others know." },
        { name: "Dark Secret", cost: [1], summary: "What they've done is still a secret, except to one or two very motivated enemies." },
        { name: "Infamous Partner", cost: [1], summary: "A spouse, lover or someone else significant to the character has Infamy that will sometimes tarnish the reputation of the Garou by association." }
    ]
}

// Mask Merits & Flaws
export const maskMeritsAndFlaws: MeritsAndFlaws = {
    title: "🎭 Mask",
    merits: [
        { name: "Mask", cost: [1, 2], summary: "A fake identity that allows the Garou to keep their true selves away from the law, this might include bank accounts, a birth certificate and everything else a Garou might need to hide their identity." },
        { name: "Zeroed", cost: [1], summary: "All of the character's past self has been purged from all systems as if they never existed. The character must have a 2-dot mask in order to take this." },
        { name: "Cobbler", cost: [1], summary: "The ability to create or source out masks. Making a mask takes 3 days per dot. The character must have a 2-dot mask in order to take this." }
    ],
    flaws: [
        { name: "Serial Error", cost: [1], summary: "A mistake has been made in the characters background checks showing that they'd recently died, are on a dangerous watchlist, or otherwise likely to be called or detained by the police. This also applies to any database lookups on their identity." },
        { name: "Person of Interest", cost: [2], summary: "The Garou has become a person of interest and with their biometrics and information having been logged as a potential terrorist in agency databases." }
    ]
}

// Mentor Merits & Flaws
export const mentorMeritsAndFlaws: MeritsAndFlaws = {
    title: "👨‍🏫 Mentor",
    merits: [
        { name: "Mentor", cost: [1, 2, 3, 4, 5], summary: "Another Garou or pack of Garou who has taken the character under their wing." }
    ],
    flaws: [
        { name: "Adversary", cost: [1, 2, 3], summary: "A rival Garou who wants to do the Garou or their pack harm." }
    ]
}

// Resources Merits & Flaws
export const resourcesMeritsAndFlaws: MeritsAndFlaws = {
    title: "💰 Resources",
    merits: [
        { name: "Resources", cost: [1, 2, 3, 4, 5], summary: "An abstract form of wealth or other assets the character can use to their advantage in some situations." }
    ],
    flaws: [
        { name: "Destitute", cost: [1], summary: "No money and no home." }
    ]
}

// Spirit Pact Merits & Flaws
export const spiritPactMeritsAndFlaws: MeritsAndFlaws = {
    title: "👻 Spirit Pact",
    merits: [
        { name: "Spirit Pact", cost: [1, 2, 3, 4, 5], summary: "Loyal spirit who will aid the Garou." },
        { name: "Host", cost: [1], summary: "The spirit has a physical body it hosts. Spirits without the Companion trait still must be summoned." },
        { name: "Companion", cost: [2], summary: "The spirit can accompany the character whenever they go long as nothing prevents it such as spiritual wards. Without a physical host communication is restricted to the Umbra or other means." }
    ],
    flaws: [
        { name: "Pact Condition", cost: [1], summary: "The pact requires performing or avoiding certain actions in exchange for aid. Failing to do so angers the spirits and it does not count as an ally until penance has been made." }
    ]
}

// Backgrounds
export const backgroundsData: BackgroundsData = {
    title: "📚 Backgrounds",
    backgrounds: [
        { name: "Allies", cost: [1, 2, 3, 4, 5], summary: "Human or Garou who will help you" },
        { name: "Ancestors", cost: [1, 2, 3, 4, 5], summary: "Guidance from ancestral spirits" },
        { name: "Contacts", cost: [1, 2, 3, 4, 5], summary: "Network of information sources" },
        { name: "Fate", cost: [1, 2, 3, 4, 5], summary: "Destiny guides and protects you" },
        { name: "Fetish", cost: [1, 2, 3, 4, 5], summary: "Spirit-inhabited magical item" },
        { name: "Kinfolk", cost: [1, 2, 3, 4, 5], summary: "Human or wolf relatives who know the truth" },
        { name: "Mentor", cost: [1, 2, 3, 4, 5], summary: "Older Garou who teaches and guides you" },
        { name: "Past Life", cost: [1, 2, 3, 4, 5], summary: "Memories from previous incarnations" },
        { name: "Pure Breed", cost: [1, 2, 3, 4, 5], summary: "Strong connection to wolf or human ancestry" },
        { name: "Resources", cost: [1, 2, 3, 4, 5], summary: "Wealth and material possessions" },
        { name: "Rites", cost: [1, 2, 3, 4, 5], summary: "Knowledge of Garou rituals" },
        { name: "Totem", cost: [1, 2, 3, 4, 5], summary: "Shared pack totem spirit" }
    ]
}

// Main merits and flaws array
export const meritsAndFlaws: MeritsAndFlaws[] = [
    alliesMeritsAndFlaws,
    caernMeritsAndFlaws,
    contactsMerits,
    dayJobMerits,
    fameMeritsAndFlaws,
    linguisticsMeritsAndFlaws,
    looksMeritsAndFlaws,
    maskMeritsAndFlaws,
    mentorMeritsAndFlaws,
    mythicFlaws,
    otherMeritsAndFlaws,
    resourcesMeritsAndFlaws,
    ritesMerits,
    safeHouseMerits,
    spiritPactMeritsAndFlaws,
    substanceAbuseFlaws,
    supernaturalSituationsMeritsAndFlaws
]
