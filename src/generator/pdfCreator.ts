import { notifications } from "@mantine/notifications"
import fontkit from "@pdf-lib/fontkit"
import { PDFBool, PDFDocument, PDFFont, PDFForm, PDFName } from "pdf-lib"
import { Character } from "../data/Character"
import { tribes } from "../data/Tribes"
import { SkillsKey, skillsKeySchema } from "../data/Skills"
import { attributesKeySchema } from "../data/Attributes"
import { Power, Ritual } from "../data/Disciplines"
import { Gift } from "../data/Gifts"
import base64Pdf_werewolf from "../resources/WerewolfSheet.base64?raw"
import { upcase } from "./utils"
import { DisciplineName } from "~/data/NameSchemas"

let customFont: PDFFont

const initPDFDocument = async (bytes: ArrayBufferLike): Promise<PDFDocument> => {
    const pdfDoc = await PDFDocument.load(bytes as ArrayBuffer)

    pdfDoc.registerFontkit(fontkit)
    const fontBytes = await fetch("fonts/Roboto-Regular.ttf").then((res) => res.arrayBuffer())
    customFont = await pdfDoc.embedFont(fontBytes) // enables writing characters like "старый"

    return pdfDoc
}

export const testTemplate = async (basePdf: string) => {
    let form
    try {
        const bytes = base64ToArrayBuffer(basePdf)
        const pdfDoc = await initPDFDocument(bytes)

        form = pdfDoc.getForm()
    } catch (err) {
        return { success: false, error: new Error("Can't get form from pdf - is it a fillable pdf?") }
    }
    try {
        form.getTextField("Name").setText("")
        form.getTextField("Concept").setText("")
        // Try werewolf fields first, fallback to vampire fields for compatibility
        try {
            form.getTextField("Tribe").setText("")
            form.getTextField("Chronicle").setText("")
        } catch (e) {
            form.getTextField("Predator").setText("")
            form.getTextField("Ambition").setText("")
        }
    } catch (err) {
        return {
            success: false,
            error: new Error("PDF doesn't contain required fields - is it the correct Werewolf character sheet?"),
        }
    }

    return { success: true, error: null }
}

const downloadPdf = (fileName: string, bytes: Uint8Array) => {
    const blob = new Blob([bytes], { type: "application/pdf" })
    const link = document.createElement("a")

    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
}

const createPdf_nerdbert = async (character: Character): Promise<Uint8Array> => {
    const bytes = base64ToArrayBuffer(base64Pdf_werewolf)

    const pdfDoc = await initPDFDocument(bytes)
    const form = pdfDoc.getForm()

    // Attributes
    const attributes = character.attributes
    ;["strength", "dexterity", "stamina", "charisma", "manipulation", "composure", "intelligence", "wits", "resolve"]
        .map((a) => attributesKeySchema.parse(a))
        .forEach((attr) => {
            const lvl = attributes[attr]
            for (let i = 1; i <= lvl; i++) {
                form.getCheckBox(`${upcase(attr).slice(0, 3)}-${i}`).check()
            }
        })

    // Skills
    const setSpecialty = (skillName: SkillsKey, textFieldKey: string) => {
        const specialties = (character.skillSpecialties || [])
            .filter((s) => s.skill === skillName)
            .filter((s) => s.name !== "")
            .map((s) => s.name)

        if (specialties.length > 0) form.getTextField(textFieldKey).setText(specialties.join(", "))
    }

    const skills = character.skills
    ;["athletics", "brawl", "craft", "drive", "melee", "larceny", "survival"]
        .map((s) => skillsKeySchema.parse(s))
        .forEach((skill) => {
            const lvl = skills[skill]
            for (let i = 1; i <= lvl; i++) {
                form.getCheckBox(`${upcase(skill).slice(0, 3)}-${i}`).check()
            }
            setSpecialty(skill, `spec${upcase(skill).slice(0, 3)}`)
        })

    const aniKenLvl = skills["animal ken"]
    for (let i = 1; i <= aniKenLvl; i++) {
        form.getCheckBox(`AniKen-${i}`).check()
    }
    setSpecialty("animal ken", "specAniKen")

    // PDF-issue: Lead-1, but specLea  (4 letters vs 3 letters)
    const leadLvl = skills["leadership"]
    for (let i = 1; i <= leadLvl; i++) {
        form.getCheckBox(`Lead-${i}`).check()
    }
    setSpecialty("leadership", "specLea")

    const stealthLvl = skills["stealth"]
    for (let i = 1; i <= stealthLvl; i++) {
        form.getCheckBox(`Ste-${i}`).check()
    }
    setSpecialty("stealth", "specStea")

    // PDF-issue: "Fri-1" instead of "Fir-1"
    const fireLvl = skills["firearms"]
    for (let i = 1; i <= fireLvl; i++) {
        form.getCheckBox(`Fri-${i}`).check()
    }
    setSpecialty("firearms", "specFir")

    // PDF-issue: Stre-1-1, but specStree  (4 letters vs 5 letters)
    const streeLvl = skills["streetwise"]
    for (let i = 1; i <= streeLvl; i++) {
        form.getCheckBox(`Stre-${i}`).check()
    }
    setSpecialty("streetwise", "specStree")
    ;[
        "etiquette",
        "insight",
        "intimidation",
        "performance",
        "persuasion",
        "subterfuge",
        "academics",
        "awareness",
        "finance",
        "investigation",
        "medicine",
        "occult",
        "politics",
        "science",
        "technology",
    ]
        .map((s) => skillsKeySchema.parse(s))
        .forEach((skill) => {
            const lvl = skills[skill]
            for (let i = 1; i <= lvl; i++) {
                form.getCheckBox(`${upcase(skill).slice(0, 4)}-${i}`).check()
            }

            setSpecialty(skill, `spec${upcase(skill).slice(0, 4)}`)
        })

    // Health - Werewolf health calculation
    const health = 3 + character.attributes["stamina"]
    for (let i = 1; i <= health; i++) {
        form.getCheckBox(`Health-${i}`).check()
    }

    // Willpower
    const willpower = character.attributes["composure"] + character.attributes["resolve"]
    for (let i = 1; i <= willpower; i++) {
        form.getCheckBox(`WP-${i}`).check()
    }

    // Rage (Werewolf stat)
    const rage = character.rage || 1
    for (let i = 1; i <= rage; i++) {
        try {
            form.getCheckBox(`Rage-${i}`).check()
        } catch (e) {
            // If Rage fields don't exist in PDF, skip
        }
    }

    // Gnosis (Werewolf stat) 
    const gnosis = character.gnosis || 1
    for (let i = 1; i <= gnosis; i++) {
        try {
            form.getCheckBox(`Gnosis-${i}`).check()
        } catch (e) {
            // If Gnosis fields don't exist in PDF, skip
        }
    }

    // Top fields - Werewolf character info
    form.getTextField("Name").setText(character.name)
    form.getTextField("pcDescription").setText(character.description)
    
    // New Werewolf fields replacing vampire fields
    try {
        form.getTextField("Concept").setText(character.concept || "")
    } catch (e) {
        // Fallback if Concept field doesn't exist
        form.getTextField("Predator type")?.setText(character.concept || "")
    }
    
    try {
        form.getTextField("Chronicle").setText(character.chronicle || "")
    } catch (e) {
        // Fallback if Chronicle field doesn't exist  
        form.getTextField("Ambition")?.setText(character.chronicle || "")
    }

    // Set tribe name - try "Tribe" field first, fallback to "Clan"
    const tribeName = character.tribe || character.clan
    try {
        form.getTextField("Tribe")?.setText(tribeName)
    } catch (e) {
        form.getTextField("Clan")?.setText(tribeName)
    }
    
    // Set auspice - try "Auspice" field first, fallback to predator type field
    const auspiceName = character.auspice || character.predatorType.name
    try {
        form.getTextField("Auspice")?.setText(auspiceName)
    } catch (e) {
        form.getTextField("Predator")?.setText(auspiceName)
    }
    
    // For werewolf, we use ban and favor instead of bane and compulsion
    if (tribeName && tribes[tribeName as keyof typeof tribes]) {
        const tribe = tribes[tribeName as keyof typeof tribes]
        const banText = tribe.ban
        const favorText = tribe.favor
        const patronText = tribe.patron || ""
        
        // Try to set tribe-specific fields, fall back to clan fields if werewolf sheet doesn't have them yet
        try {
            form.getTextField("TribeBan")?.setText(banText)
            form.getTextField("TribeFavor")?.setText(favorText)
            form.getTextField("Patron")?.setText(patronText)
        } catch (e) {
            // Fallback to original clan fields if werewolf sheet isn't ready
            try {
                form.getTextField("ClanBane")?.setText(banText)
                form.getTextField("ClanCompulsion")?.setText(favorText)
                form.getTextField("Sire")?.setText(patronText)
            } catch (e2) {
                // If neither work, just continue
            }
        }
        
        // Try to set renown information
        try {
            const renownField = `${tribe.renownType}Renown`
            const existingRenown = form.getTextField(renownField)?.getText() || "0"
            const newRenown = parseInt(existingRenown) + tribe.renownDots
            form.getTextField(renownField)?.setText(newRenown.toString())
        } catch (e) {
            // If renown fields don't exist yet, continue
        }
    }

    // Pack info instead of sire
    try {
        form.getTextField("Pack").setText(character.pack || "")
    } catch (e) {
        // Fallback to Sire field if Pack doesn't exist
        form.getTextField("Sire")?.setText(character.pack || "")
    }

    // Gifts (mapped to disciplines for PDF compatibility)
    const getGiftText = (power: Power | Ritual | Gift) => {
        let text = power.name + ": " + power.summary
        if (power.dicePool !== "") {
            text += ` // ${power.dicePool}`
        }
        
        // Handle different power types
        if ('cost' in power) {
            // It's a Gift
            text += ` // ${power.cost}`
        } else if ('rouseChecks' in power && power.rouseChecks > 0) {
            // It's a Discipline Power
            text += ` // ${power.rouseChecks} rouse check${power.rouseChecks > 1 ? "s" : ""}`
        }

        if ('requiredTime' in power && 'ingredients' in power) {
            // It's a ritual
            text += ` // requires: ${power.ingredients}; ${power.requiredTime}`
        }

        return text
    }

    const powersByDiscipline = (character.disciplines || []).reduce(
        (acc, p) => {
            if (!acc[p.discipline]) acc[p.discipline] = []
            acc[p.discipline].push(p)
            return acc
        },
        {} as Record<DisciplineName, Power[]>
    )
    for (const [disciplineIndex, powers] of Object.values(powersByDiscipline).entries()) {
        const di = disciplineIndex + 1
        form.getTextField(`Disc${di}`).setText(upcase(powers[0].discipline))
        for (const [powerIndex, power] of powers.entries()) {
            const pi = powerIndex + 1
            form.getTextField(`Disc${di}_Ability${pi}`).setText(getGiftText(power))
            form.getTextField(`Disc${di}_Ability${pi}`).disableRichFormatting()
            form.getCheckBox(`Disc${di}-${pi}`).check()
        }
        if (powers[0].discipline === "blood sorcery") {
            for (const [ritualIndex, ritual] of (character.rituals || []).entries()) {
                const ri = powers.length + ritualIndex + 1
                form.getTextField(`Disc${di}_Ability${ri}`).setText(getGiftText(ritual))
                form.getTextField(`Disc${di}_Ability${ri}`).disableRichFormatting()
            }
        }
    }

    // Merits & flaws - simplified for Werewolf
    const meritsAndFlaws = [...character.merits, ...character.flaws]
    meritsAndFlaws.forEach(({ name, level, summary }, i) => {
        const fieldNum = i + 1
        form.getTextField(`Merit${fieldNum}`).setText(name + ": " + summary)
        for (let l = 1; l <= level; l++) {
            try {
                form.getCheckBox(`Merit${fieldNum}-${l}`).check()
            } catch (e) {
                // If checkbox doesn't exist, skip
            }
        }
    })

    // Touchstones & Convictions
    form.getTextField("Convictions").setText(
        (character.touchstones || []).map(({ name, description, conviction }) => `${name}: ${conviction}\n${description}`).join("\n\n")
    )

    // Experience - use character experience value directly
    const experience = character.experience || 0
    form.getTextField("tEXP").setText(`${experience} XP`)

    // Fixes bug where text that is too long for field doesn't show until clicked
    // see https://github.com/Hopding/pdf-lib/issues/569#issuecomment-1087328416 and https://stackoverflow.com/questions/73058238/some-pdf-textfield-content-not-visible-until-clicked
    // TODO: This breaks embedding the png in humanity-tracker!
    form.acroForm.dict.set(PDFName.of("NeedAppearances"), PDFBool.True)

    // Fixes embedded font not being applied on form fields
    form.updateFieldAppearances(customFont)

    return await pdfDoc.save({ updateFieldAppearances: true })
}

export const downloadCharacterSheet = async (character: Character) => {
    const pdfBytes = await createPdf_nerdbert(character)
    notifications.show({
        title: "PDF base kindly provided by Nerdbert!",
        message: "https://linktr.ee/nerdbert",
        autoClose: 10000,
        color: "grape",
    })

    downloadPdf(`progeny_${character.name}.pdf`, pdfBytes)
}

function base64ToArrayBuffer(base64: string) {
    const binary_string = window.atob(base64)
    const len = binary_string.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
}

const getFields = (form: PDFForm): Record<string, string> => {
    const fields = form.getFields()

    const outFields: Record<string, string> = {}
    fields.forEach((field) => {
        const type = field.constructor.name
        const name = field.getName()

        outFields[name] = type
    })

    return outFields
}

export const printFieldNames = async () => {
    const basePdf = base64Pdf_werewolf
    const bytes = base64ToArrayBuffer(basePdf)

    const pdfDoc = await initPDFDocument(bytes)
    const form = pdfDoc.getForm()

    console.log(JSON.stringify(getFields(form), null, 2))
}
