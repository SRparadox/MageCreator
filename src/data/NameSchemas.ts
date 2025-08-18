import { z } from "zod"

// This file exists to break issues with circular imports

export const clanNameSchema = z.union([
    z.literal("Brujah"),
    z.literal("Gangrel"),
    z.literal("Nosferatu"),
    z.literal("Malkavian"),
    z.literal("Tremere"),
    z.literal("Ventrue"),
    z.literal("Toreador"),

    z.literal("Lasombra"),
    z.literal("Banu Haqim"),
    z.literal("Ministry"),
    z.literal("Ravnos"),
    z.literal("Tzimisce"),
    z.literal("Hecata"),
    z.literal("Salubri"),

    z.literal("Caitiff"),
    z.literal("Thin-blood"),

    z.literal(""),
])
export type ClanName = z.infer<typeof clanNameSchema>

export const tribeNameSchema = z.union([
    z.literal("Black Furies"),
    z.literal("Bone Gnawers"),
    z.literal("Children of Gaia"),
    z.literal("Galestalkers"),
    z.literal("Ghost Council"),
    z.literal("Glass Walkers"),
    z.literal("Hart Wardens"),
    z.literal("Red Talons"),
    z.literal("Shadow Lords"),
    z.literal("Silent Striders"),
    z.literal("Silver Fangs"),
    z.literal(""),
])
export type TribeName = z.infer<typeof tribeNameSchema>

export const disciplineNameSchema = z.union([
    z.literal("animalism"),
    z.literal("auspex"),
    z.literal("celerity"),
    z.literal("dominate"),
    z.literal("fortitude"),
    z.literal("obfuscate"),
    z.literal("potence"),
    z.literal("presence"),
    z.literal("protean"),
    z.literal("blood sorcery"),

    z.literal("oblivion"),
    z.literal("thin-blood alchemy"),

    z.literal(""),
])
export type DisciplineName = z.infer<typeof disciplineNameSchema>

export const giftNameSchema = z.union([
    z.literal("Rage"),
    z.literal("Luna's Armor"),
    z.literal("Wyld"),
    z.literal("City"),
    z.literal("Rat"),
    z.literal("Survival"),
    z.literal("Mother's Touch"),
    z.literal("Resist Pain"),
    z.literal("Luna"),
    z.literal("Strength"),
    z.literal("War"),
    z.literal("Death"),
    z.literal("Spirits"),
    z.literal("Wisdom"),
    z.literal("Glass"),
    z.literal("Electricity"),
    z.literal("Faerie"),
    z.literal("Nature"),
    z.literal("Storytelling"),
    z.literal("Beast Speech"),
    z.literal("Predator's Arsenal"),
    z.literal("Wolf"),
    z.literal("Dominance"),
    z.literal("Shadow"),
    z.literal("Persuasion"),
    z.literal("Speed"),
    z.literal("Silence"),
    z.literal("Umbral"),
    z.literal("Inspiration"),
    z.literal("Nobility"),
    z.literal(""),
])
export type GiftName = z.infer<typeof giftNameSchema>

export const predatorTypeNameSchema = z.union([
    z.literal("Alleycat"),
    z.literal("Extortionist"),
    z.literal("Roadside Killer"),
    z.literal("Montero"),
    z.literal("Cleaver"),
    z.literal("Consensualist"),
    z.literal("Osiris"),
    z.literal("Scene Queen"),
    z.literal("Siren"),
    z.literal("Sandman"),
    z.literal("Grim Reaper"),
    z.literal("Graverobber"),
    z.literal("Pursuer"),
    z.literal("Trapdoor"),
    z.literal("Bagger"),
    z.literal("Blood Leech"),
    z.literal("Farmer"),
    z.literal(""),
])
export type PredatorTypeName = z.infer<typeof predatorTypeNameSchema>
