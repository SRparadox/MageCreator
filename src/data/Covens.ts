import { CovenName } from "./NameSchemas"

// Import coven logos
import independentLogo from "../resources/magestatus/Independent.webp"
import marauderLogo from "../resources/magestatus/marauder.webp"
import technocracyLogo from "../resources/magestatus/technocracy.webp"
import traditionsLogo from "../resources/magestatus/traditions.webp"

export type { CovenName }

export type Coven = {
    name: CovenName,
    description: string,
    philosophy: string,
    logo: string,
}

// Convert to Record format like clans/tribes
export const covens: Record<CovenName, Coven> = {
    "independent": {
        name: "independent",
        description: "Mages who operate outside the major factions, following their own path to enlightenment.",
        philosophy: "Self-reliance and personal discovery guide the independent mage's journey.",
        logo: independentLogo
    },
    "marauder": {
        name: "marauder",
        description: "Chaotic mages whose reality has become unstable, bending the world around them in unpredictable ways.",
        philosophy: "Reality is subjective and should be shaped by will and madness.",
        logo: marauderLogo
    },
    "technocracy": {
        name: "technocracy",
        description: "A hierarchical organization that seeks to control reality through science and technology.",
        philosophy: "Order through science, progress through control.",
        logo: technocracyLogo
    },
    "traditions": {
        name: "traditions",
        description: "Nine ancient traditions of mages who preserve mystical knowledge and fight against the Technocracy.",
        philosophy: "Ancient wisdom and mystical traditions hold the keys to true understanding.",
        logo: traditionsLogo
    },
    "": {
        name: "",
        description: "",
        philosophy: "",
        logo: ""
    }
}