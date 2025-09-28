import { notifications } from "@mantine/notifications"
import fontkit from "@pdf-lib/fontkit"
import { PDFBool, PDFDocument, PDFFont, PDFForm, PDFName } from "pdf-lib"
import { Character } from "../data/Character"
import { SkillsKey, skillsKeySchema } from "../data/Skills"
import { attributesKeySchema } from "../data/Attributes"
import base64Pdf_mage from "../resources/magesheet.base64?raw"
import { upcase } from "./utils"

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
        // Try mage fields
        try {
            form.getTextField("Player").setText("")
            form.getTextField("Conven").setText("")
            form.getTextField("Chronicle").setText("")
            form.getTextField("Concept").setText("")
            form.getTextField("Affinity").setText("")
        } catch (e) {
            // Some mage fields don't exist in this PDF
        }
    } catch (err) {
        return {
            success: false,
            error: new Error("PDF doesn't contain required fields - is it the correct Mage character sheet?"),
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
    const bytes = base64ToArrayBuffer(base64Pdf_mage)

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
            .filter((s: any) => s.skill === skillName)
            .filter((s: any) => s.name !== "")
            .map((s: any) => s.name)

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

    // Health - Standard calculation
    const health = 3 + character.attributes["stamina"]
    for (let i = 1; i <= health; i++) {
        form.getCheckBox(`Health-${i}`).check()
    }

    // Willpower
    const willpower = character.attributes["composure"] + character.attributes["resolve"]
    for (let i = 1; i <= willpower; i++) {
        form.getCheckBox(`WP-${i}`).check()
    }

    // Spheres (Mage magic system)
    if (character.spheres) {
        const sphereNames = ["correspondence", "entropy", "forces", "life", "matter", "mind", "prime", "spirit", "time"] as const
        
        sphereNames.forEach((sphereName) => {
            const sphereLevel = character.spheres![sphereName]
            for (let i = 1; i <= sphereLevel; i++) {
                try {
                    // Use exact field pattern: Life-1, Forces-2, etc.
                    const capitalizedSphere = sphereName.charAt(0).toUpperCase() + sphereName.slice(1)
                    form.getCheckBox(`${capitalizedSphere}-${i}`)?.check()
                } catch (e) {
                    // If sphere fields don't exist in PDF, skip
                }
            }
        })
    }

    // Arete (starts at 1 dot)
    try {
        form.getCheckBox("Arete-1")?.check()
    } catch (e) {
        // If Arete field doesn't exist, skip
    }

    // Top fields - Mage character info using exact field names
    form.getTextField("Name").setText(character.name)
    form.getTextField("Concept").setText(character.concept || "")
    form.getTextField("Chronicle").setText(character.chronicle || "")
    form.getTextField("Ambition").setText(character.ambition || "")
    form.getTextField("Desire").setText(character.desire || "")
    form.getTextField("Player").setText(character.playerName || "")
    
    // Status field - using pack for now, could be customized
    form.getTextField("Status").setText(character.pack || "")
    
    // Affinity Sphere
    form.getTextField("Affinity").setText(character.affinitySphere || "")
    
    // Coven (note: field is "Conven" not "Coven")
    form.getTextField("Conven").setText(character.coven || "")

    // Gifts and Rites - using new field naming pattern


    // Mage spells/powers (if any) - can be handled in future versions
    // For now, mage character sheets focus on spheres rather than specific powers

    // Initialize additional details text for fallback notes
    let additionalDetailsText = ""
    
    // Add coven information if available
    if (character.coven) {
        additionalDetailsText += `Coven: ${character.coven}\n\n`
    }

    // Merits & Flaws (Merit1 to Merit8)
    const meritsAndFlaws = [...character.merits, ...character.flaws]
    meritsAndFlaws.slice(0, 8).forEach((item: any, i: number) => {
        const fieldNum = i + 1
        form.getTextField(`Merit${fieldNum}`).setText(item.name + ": " + item.summary)
        for (let l = 1; l <= item.level; l++) {
            try {
                form.getCheckBox(`Merit${fieldNum}-${l}`).check()
            } catch (e) {
                // If checkbox doesn't exist, skip
            }
        }
    })

    // Crafts and Perks handling
    const craftsAndPerks = character.craftsAndPerks || []
    
    // Separate crafts and perks
    const perks = craftsAndPerks.filter((item: any) => item.type === 'perk')
    const crafts = craftsAndPerks.filter((item: any) => item.type === 'craft')
    
    // Perks go under Perk1 to Perk9
    perks.slice(0, 9).forEach((perk: any, i: number) => {
        const fieldNum = i + 1
        form.getTextField(`Perk${fieldNum}`).setText(perk.name + ": " + perk.description)
        for (let l = 1; l <= perk.level; l++) {
            try {
                form.getCheckBox(`Perk${fieldNum}-${l}`).check()
            } catch (e) {
                // If checkbox doesn't exist, skip
            }
        }
    })
    
    // Crafts go under Merit9 to Merit16
    crafts.slice(0, 8).forEach((craft: any, i: number) => {
        const fieldNum = i + 9 // Merit9 to Merit16
        form.getTextField(`Merit${fieldNum}`).setText(craft.name + ": " + craft.description)
        for (let l = 1; l <= craft.level; l++) {
            try {
                form.getCheckBox(`Merit${fieldNum}-${l}`).check()
            } catch (e) {
                // If checkbox doesn't exist, skip
            }
        }
    })

    // Touchstones & Convictions
    const touchstonesText = (character.touchstones || []).map((item: any) => 
        `${item.name}: ${item.conviction}\n${item.description}`
    ).join("\n\n")
    
    try {
        form.getTextField("Convictions").setText(touchstonesText)
    } catch (e) {
        // If Convictions field doesn't exist, add to notes
        additionalDetailsText += `Convictions:\n${touchstonesText}\n\n`
    }

    // Additional character details for notes field (already declared above)
    
    // Add Crafts and Perks to notes as fallback/additional info
    if (craftsAndPerks.length > 0) {
        additionalDetailsText += "=== CRAFTS & PERKS ===\n"
        
        const craftsList = craftsAndPerks.filter((item: any) => item.type === 'craft')
        const perksList = craftsAndPerks.filter((item: any) => item.type === 'perk')
        
        if (craftsList.length > 0) {
            additionalDetailsText += "\nCRAFTS:\n"
            craftsList.forEach((craft: any) => {
                additionalDetailsText += `• ${craft.name} (Level ${craft.level}): ${craft.description}\n`
            })
        }
        
        if (perksList.length > 0) {
            additionalDetailsText += "\nPERKS:\n"
            perksList.forEach((perk: any) => {
                additionalDetailsText += `• ${perk.name} (Level ${perk.level}): ${perk.description}\n`
            })
        }
        
        additionalDetailsText += "\n"
    }
    
    // Map specific fields according to PDF structure
    
    // Character details using exact field names
    // pcDescription is appearance
    form.getTextField("pcDescription").setText(character.appearance || "")
    
    // History is history  
    form.getTextField("History").setText(character.history || "")
    
    // PC_Notes is notes
    form.getTextField("PC_Notes").setText(character.notes || "")
    
    // If there are additional details that couldn't be placed in specific fields,
    // they can be added to PC_Notes as supplementary information
    if (additionalDetailsText.trim()) {
        const currentNotes = character.notes || ""
        const combinedNotes = currentNotes + (currentNotes ? "\n\n" : "") + "=== ADDITIONAL INFO ===\n" + additionalDetailsText.trim()
        form.getTextField("PC_Notes").setText(combinedNotes)
    }

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
        title: "Mage Character Sheet Generated!",
        message: "Your mage character sheet is ready for download.",
        autoClose: 10000,
        color: "grape",
    })

    downloadPdf(`mage_${character.name}.pdf`, pdfBytes)
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
    fields.forEach((field: any) => {
        const type = field.constructor.name
        const name = field.getName()

        outFields[name] = type
    })

    return outFields
}

export const printFieldNames = async () => {
    const basePdf = base64Pdf_mage
    const bytes = base64ToArrayBuffer(basePdf)

    const pdfDoc = await initPDFDocument(bytes)
    const form = pdfDoc.getForm()

    console.log(JSON.stringify(getFields(form), null, 2))
}
