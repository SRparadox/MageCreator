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
        { name: "Linguistics", cost: [1, 2, 3, 4, 5], summary: "This determines languages you would know not limited to native birth languages. Every dot in this merit represents a language your character is fluent in. Dead languages may be included as options under this merit and can be added to checks on Academics or Occult tests." }
    ],
    flaws: [
        { name: "Illiterate", cost: [2], summary: "You cannot read or write. Academics and Science Skills are capped at 1 and you can have no specialty in them incorporating modern knowledge." }
    ]
}

// Looks Merits & Flaws
export const looksMeritsAndFlaws: MeritsAndFlaws = {
    title: "👤 Looks",
    merits: [
        { name: "Beautiful", cost: [2], summary: "You add one extra die to all appropriate Social Dice Pools. These modifiers can only apply when you are seen." },
        { name: "Stunning", cost: [4], summary: "You add two extra dice to all appropriate social dice pools. These modifiers can only apply when you are seen." }
    ],
    flaws: [
        { name: "Ugly", cost: [1], summary: "You lose one die from all relevant social dice pools. These modifiers can only apply when you are seen." },
        { name: "Repulsive", cost: [2], summary: "You lose two dice from all relevant social dice pools. These modifiers can only apply when you are seen." }
    ]
}

// Hedge Magic Merits & Flaws
export const hedgeMagicMeritsAndFlaws: MeritsAndFlaws = {
    title: "🔮 Hedge Magic",
    merits: [
        { name: "Hedge Mage", cost: [2], summary: "You are used to achieving your power on your own with your ingenuity and perseverance. You need one less result for a success in creating Casting Circles and add one more die to your pool when participating in Group Casting." }
    ],
    flaws: [
        { name: "Dark Deals", cost: [2], summary: "Your magik is granted to you by an outside force. A Changeling, Kindred or even maybe one of the Fallen opened your avatar to the storm. When you participate in Group casting, you suffer a 2 die penalty as the source of your magik clashes with the natural ebb and flow of the ones around you." }
    ]
}

// Psychological Traits Merits & Flaws
export const psychologicalTraitsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🧠 Psychological Traits",
    merits: [
        { name: "Strong-Willed", cost: [2], summary: "Something within you drives you and propels you through life. You know yourself enough to push through mundane and supernatural manipulations. When subjected to such, and are aware, you may add two dice to resist this influence." }
    ],
    flaws: [
        { name: "Living on the Edge", cost: [2], summary: "You're one of those people who feel compelled to take every chance to experience life at its fullest. When you are confronted with a chance to indulge a risky temptation you haven't done before, you suffer a two-dice penalty to all actions until you either partake of the new experience or the scene ends." },
        { name: "Weak-Willed", cost: [2], summary: "You struggle to assert your own personality when confronted with the will of another. Even when you're aware of supernatural attempts to sway you mentally or emotionally, you may not use active resistance systems to avoid those effects." }
    ]
}

// Substance Abuse Flaws
export const substanceAbuseMeritsAndFlaws: MeritsAndFlaws = {
    title: "💊 Substance Abuse",
    merits: [],
    flaws: [
        { name: "Severe Addiction", cost: [2], summary: "Lose two dice from all pools when you did not indulge in your substance of choice during the last scene, except pools for actions that will immediately obtain said substance." },
        { name: "Addiction", cost: [1], summary: "Lose one dice from all pools when you did not indulge in your substance of choice during the last scene, except pools for actions that will immediately obtain said substance." }
    ]
}

// Supernatural Situations Merits & Flaws  
export const supernaturalSituationsMeritsAndFlaws2: MeritsAndFlaws = {
    title: "🌟 Supernatural Situations",
    merits: [
        { name: "Unseeming", cost: [1], summary: "You know the dangers of being identified as one of the Awakened and this allows you to adapt and hide your true nature. Supernatural Creatures and Mages alike have a hard time sensing the storm within. This may lead your adversaries to underestimate you but it is a handy way to slip through the cracks when stealth and subtlety is required." }
    ],
    flaws: [
        { name: "Frail Existence", cost: [1], summary: "The price of having power is paid in blood. Part of your life force is trapped in the umbra after being bestowed with the powers you possess. You appear frail, weak, even older than you actually are. In addition your health has suffered, and you have one fewer box on your health tracker than you otherwise would." }
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
        { name: "Person of Interest", cost: [2], summary: "The Mage  has become a person of interest and with their biometrics and information having been logged as a potential terrorist in agency databases." }
    ]
}

// Mentor Merits & Flaws
export const mentorMeritsAndFlaws: MeritsAndFlaws = {
    title: "👨‍🏫 Mentor",
    merits: [
        { name: "Mentor", cost: [1, 2, 3, 4, 5], summary: "Another Mage who has taken the character under their wing." }
    ],
    flaws: [
        { name: "Adversary", cost: [1, 2, 3], summary: "A rival Mage who wants to do the Mage or their pack harm." }
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

// Sanctum Merits & Flaws
export const sanctumMeritsAndFlaws: MeritsAndFlaws = {
    title: "🏠 Sanctum",
    merits: [
        { name: "Sanctum", cost: [1, 2, 3], summary: "Sanctum represents a degree of security or distinction for one's domicile above and beyond a place to sleep and prepare meals. • Small Sanctum, but more secure and private (basement apartment, book store backroom, warehouse store room). •• Good size, security or privacy (single family home, converted storefront, secure sewer tunnel). ••• Very Large, secure, or private (compound outside of town, bank building, decommissioned subway station)." },
        { name: "Hidden Armory", cost: [1, 2, 3], summary: "Each dot in this merit adds a stand of basic, mundane arms to your Sanctum's supply. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Panic Room", cost: [1, 2, 3], summary: "Your Sanctum has a dedicated locked place to house two individuals with a breach difficulty of 5. Each dot allows you to increase the panic room's occupancy to twice and raises its breach difficulty by 1 per dot. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Watchmen", cost: [1, 2, 3], summary: "Whether it's private security or criminal toughs, someone's guarding your Sanctum. If guards would be conspicuous here, buy this Merit cautiously. Note that the guards aren't themselves Mages, and are probably entirely unfamiliar with the supernatural. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Laboratory", cost: [1, 2, 3], summary: "Your sanctum has an equipped laboratory with a dedicated industrial sink, gas jet, reinforced floor, etc. Each dot of this Merit adds one to the dice pool for rolls related to one Science or Technology specialty. This Merit is not available in small sanctums. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Luxury", cost: [1, 2, 3], summary: "High-definition flat screens, designer furniture, memorable decor, or other distinctive details give you a two-dice bonus to Social tests dealing with guests in your sanctum. If you don't have at least three dots of Resources (•••), your décor was gained illegally. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Postern", cost: [1, 2, 3], summary: "Your sanctum has a rear exit, secret tunnel, grating in the cellar leading into the sewers, or other unobtrusive way out. For each dot of this Merit, add one die to your dice pools to evade or escape surveillance near your sanctum. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Security System", cost: [1, 2, 3], summary: "Your sanctum has a better-than-average security system. For each dot of this Merit, add one die to your dice pool to resist (or alert you to) unauthorized entry into your sanctum. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Surgery", cost: [1, 2, 3], summary: "Your sanctum has one room equipped as a field surgery or better. Add two dice to relevant dice pools, generally Medicine, for tests performed in your sanctum. This Merit is not available in small sanctums. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." },
        { name: "Warding", cost: [1, 2, 3], summary: "Your sanctum possesses some kind of magical ward barring supernatural forces. You may not be able to deactivate it, but it allows you to pass. Each dot of this Merit adds one to the dice pool to resist supernatural scrying, as well as whatever other entry the Storyteller allows it to prevent. The Storyteller may require you to possess Occult 3 or better to buy this Merit. You can only have an amount of dots on this merit equal to the amount of dots of your base sanctum." }
    ],
    flaws: [
        { name: "No Sanctum", cost: [1], summary: "You're not necessarily homeless but you have no expectation of security while 'at home'." },
        { name: "Compromised", cost: [2], summary: "Your sanctum has been raided once before, perhaps even before it was yours. It probably appears on someone's watchlist. Invaders or spies can add two dice to their pool to penetrate or surveil your sanctum." },
        { name: "Creepy", cost: [1], summary: "Your sanctum looks like the lair of the sorts of supernatural horrors. Unknowing neighbors might phone in a tip to the cops or just talk about the creepy place they saw. Your dice pools on Social tests to seduce or otherwise put human guests at ease while in your sanctum are at a two-dice penalty." },
        { name: "Haunted", cost: [1], summary: "Your sanctum has a supernatural manifestation in it that you don't control or really even understand. It might have a ghost, but a Haunted sanctum could hold a dimensional portal, a cursed meteorite, or anything else you can't get rid of. The risk is that someone who does understand the manifestation could use it to breach your sanctum's security. The Storyteller defines any other effect of the haunting, imposing at least a relevant one-die penalty or bonus to affected pools used in the sanctum per dot of Haunted taken as a Flaw." }
    ]
}

// Status Merits & Flaws
export const statusMeritsAndFlaws: MeritsAndFlaws = {
    title: "🏆 Status",
    merits: [
        { name: "Status", cost: [1, 2, 3, 4, 5], summary: "You have something of a reputation and standing (earned or not) amongst local mages. • Known: An acknowledged mage, welcomed and seen as an up-and-comer. •• Respected: You have responsibilities now, and rookies look up to you. ••• Influential: You hold authority over part of your community. •••• Powerful: You have an estimable title in your community. ••••• Luminary: You sit at the table of power in the group, a paragon of your community." }
    ],
    flaws: [
        { name: "Shunned", cost: [2], summary: "For some reason, you're completely loathed by one particular faction. You betrayed them, crossed a local leader, or even traded gunshots with them in the past. Members of this group will actively work against you if they can." },
        { name: "Suspect", cost: [2], summary: "You're not good with this faction at all. You weaseled out of an agreement, crossed a line, or did something similar. You can try to stay out of sight and out of mind, but unless you somehow make amends, you suffer a two-dice penalty to all Social tests involving the offended faction." }
    ]
}

// Main merits and flaws array
export const meritsAndFlaws: MeritsAndFlaws[] = [
    linguisticsMeritsAndFlaws,
    looksMeritsAndFlaws,
    hedgeMagicMeritsAndFlaws,
    psychologicalTraitsMeritsAndFlaws,
    substanceAbuseMeritsAndFlaws,
    supernaturalSituationsMeritsAndFlaws2,
    alliesMeritsAndFlaws,
    contactsMerits,
    fameMeritsAndFlaws,
    maskMeritsAndFlaws,
    mentorMeritsAndFlaws,
    resourcesMeritsAndFlaws,
    sanctumMeritsAndFlaws,
    statusMeritsAndFlaws,
    otherMeritsAndFlaws,
    safeHouseMerits,
    substanceAbuseFlaws,
    dayJobMerits
]
