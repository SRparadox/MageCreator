import { z } from "zod"
import blackFuriesLogo from "../resources/tribeIcons/BlackFuries.webp"
import boneGnawersLogo from "../resources/tribeIcons/BoneGnawers.webp"
import childrenOfGaiaLogo from "../resources/tribeIcons/ChildrenofGaia.webp"
import galestalkersLogo from "../resources/tribeIcons/Galestalkers.webp"
import ghostCouncilLogo from "../resources/tribeIcons/GhostCouncil.webp"
import glassWalkersLogo from "../resources/tribeIcons/GlassWalkers.webp"
import hartWardensLogo from "../resources/tribeIcons/HartWardens.webp"
import redTalonsLogo from "../resources/tribeIcons/RedTalons.webp"
import shadowLordsLogo from "../resources/tribeIcons/ShadowLords.webp"
import silentStridersLogo from "../resources/tribeIcons/SilentStriders.webp"
import silverFangsLogo from "../resources/tribeIcons/SilverFangs.webp"
import { TribeName, tribeNameSchema, giftNameSchema } from "./NameSchemas"

export const tribeSchema = z.object({
    name: tribeNameSchema,
    description: z.string(),
    logo: z.string(),
    ban: z.string(),
    weakness: z.string(),
    gifts: giftNameSchema.array(),
    renown: z.string(),
})
export type Tribe = z.infer<typeof tribeSchema>
export const tribeKeySchema = tribeSchema.keyof()
export type TribeKey = z.infer<typeof tribeKeySchema>

export const tribes: Record<TribeName, Tribe> = {
    "Black Furies": {
        name: "Black Furies",
        description: "Fierce warrior-women who rage against patriarchal oppression and protect the sacred feminine",
        logo: blackFuriesLogo,
        ban: "Never harm those who are truly innocent or defenseless",
        weakness: "Struggle with modern technology and may fly into uncontrollable rage when witnessing injustice",
        gifts: ["Rage", "Luna's Armor", "Wyld"],
        renown: "Glory and Honor",
    },
    "Bone Gnawers": {
        name: "Bone Gnawers",
        description: "Urban survivors who live among the homeless and forgotten, masters of adaptation",
        logo: boneGnawersLogo,
        ban: "Never ignore the suffering of the downtrodden or homeless",
        weakness: "Often looked down upon by other tribes and struggle with formal social situations",
        gifts: ["City", "Rat", "Survival"],
        renown: "Wisdom and Honor",
    },
    "Children of Gaia": {
        name: "Children of Gaia",
        description: "Peaceful healers and mediators who seek harmony between all living things",
        logo: childrenOfGaiaLogo,
        ban: "Cannot kill humans except in the most dire circumstances",
        weakness: "Sometimes too trusting and may hesitate when decisive action is needed",
        gifts: ["Mother's Touch", "Resist Pain", "Luna"],
        renown: "Honor and Wisdom",
    },
    "Galestalkers": {
        name: "Galestalkers",
        description: "Former Get of Fenris who have embraced the modern world while maintaining their warrior spirit",
        logo: galestalkersLogo,
        ban: "Must always face challenges head-on, never retreat from a worthy fight",
        weakness: "Struggle with subtlety and may rush into situations without proper planning",
        gifts: ["Rage", "Strength", "War"],
        renown: "Glory and Honor",
    },
    "Ghost Council": {
        name: "Ghost Council",
        description: "Mysterious tribe that communes with the spirits of the dead and guards ancient secrets",
        logo: ghostCouncilLogo,
        ban: "Must respect the dead and never disturb ancestral burial grounds",
        weakness: "Often appear aloof and may become lost in communion with spirits",
        gifts: ["Death", "Spirits", "Wisdom"],
        renown: "Wisdom and Honor",
    },
    "Glass Walkers": {
        name: "Glass Walkers",
        description: "Tech-savvy urban werewolves who embrace human civilization and technology",
        logo: glassWalkersLogo,
        ban: "Cannot remain in the wilderness for extended periods without technology",
        weakness: "May become too dependent on technology and lose touch with natural instincts",
        gifts: ["City", "Glass", "Electricity"],
        renown: "Honor and Glory",
    },
    "Hart Wardens": {
        name: "Hart Wardens",
        description: "Former Fianna who serve as guardians of sacred groves and keepers of ancient lore",
        logo: hartWardensLogo,
        ban: "Must protect natural sacred sites and cannot refuse hospitality to those in need",
        weakness: "May become too caught up in revelry and struggle with modern responsibilities",
        gifts: ["Faerie", "Nature", "Storytelling"],
        renown: "Wisdom and Glory",
    },
    "Red Talons": {
        name: "Red Talons",
        description: "Fierce lupus-born werewolves who view humanity as a plague upon Gaia",
        logo: redTalonsLogo,
        ban: "Cannot use human technology or live among humans for extended periods",
        weakness: "Struggle to understand human society and may attack humans indiscriminately",
        gifts: ["Beast Speech", "Predator's Arsenal", "Wolf"],
        renown: "Glory and Wisdom",
    },
    "Shadow Lords": {
        name: "Shadow Lords",
        description: "Cunning political masterminds who believe they should lead the Garou Nation",
        logo: shadowLordsLogo,
        ban: "Must always seek to be in a position of leadership or influence",
        weakness: "Often create enemies through their political machinations and power-hungry nature",
        gifts: ["Dominance", "Shadow", "Persuasion"],
        renown: "Honor and Glory",
    },
    "Silent Striders": {
        name: "Silent Striders",
        description: "Nomadic messengers and scouts who roam between the worlds of the living and dead",
        logo: silentStridersLogo,
        ban: "Cannot stay in one place for more than a lunar month",
        weakness: "Often feel isolated and may have difficulty forming lasting relationships",
        gifts: ["Speed", "Silence", "Umbral"],
        renown: "Wisdom and Glory",
    },
    "Silver Fangs": {
        name: "Silver Fangs",
        description: "Noble-born leaders of the Garou, blessed with pure blood but cursed with madness",
        logo: silverFangsLogo,
        ban: "Must maintain their honor and never show cowardice in the face of danger",
        weakness: "Prone to madness and may become obsessed with bloodline purity",
        gifts: ["Inspiration", "Luna's Armor", "Nobility"],
        renown: "Glory and Honor",
    },
    "": {
        name: "",
        description: "",
        logo: "",
        ban: "",
        weakness: "",
        gifts: [],
        renown: "",
    },
}
