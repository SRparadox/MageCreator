import { notifications } from "@mantine/notifications"
import fontkit from "@pdf-lib/fontkit"
import { PDFBool, PDFDocument, PDFFont, PDFForm, PDFName } from "pdf-lib"
import { Character, CraftPerk } from "../data/Character"
import { SkillsKey, skillsKeySchema } from "../data/Skills"
import { attributesKeySchema } from "../data/Attributes"
import { Power, Ritual } from "../data/Disciplines"
import { Gift } from "../data/Gifts"
import base64Pdf_mage from "../resources/magesheet.base64?raw"
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
        // Try mage fields first
        try {
            form.getTextField("Player").setText("")
            form.getTextField("Coven").setText("")
            form.getTextField("Chronicle").setText("")
        } catch (e) {
            // Mage fields don't exist in this PDF
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
                    // Try different possible field name patterns for spheres
                    const capitalizedSphere = sphereName.charAt(0).toUpperCase() + sphereName.slice(1)
                    form.getCheckBox(`${capitalizedSphere}-${i}`)?.check() ||
                    form.getCheckBox(`Sphere_${capitalizedSphere}-${i}`)?.check() ||
                    form.getCheckBox(`${sphereName}-${i}`)?.check()
                } catch (e) {
                    // If sphere fields don't exist in PDF, skip
                }
            }
        })
    }

    // Top fields - Mage character info
    // Name
    form.getTextField("Name").setText(character.name)
    
    // Player Name
    try {
        form.getTextField("Player")?.setText(character.playerName || "")
    } catch (e) {
        // Fallback if Player field doesn't exist
        try {
            form.getTextField("PlayerName")?.setText(character.playerName || "")
        } catch (e2) {
            form.getTextField("pcDescription")?.setText(character.playerName || "")
        }
    }
    
    // Coven
    const covenName = character.coven
    try {
        form.getTextField("Coven")?.setText(covenName || "")
    } catch (e) {
        // Try alternative field names
        try {
            form.getTextField("Faction")?.setText(covenName || "")
        } catch (e2) {
            form.getTextField("Organization")?.setText(covenName || "")
        }
    }
    
    // Chronicle
    try {
        form.getTextField("Chronicle")?.setText(character.chronicle || "")
    } catch (e) {
        // Chronicle field doesn't exist in this PDF
    }
    
    // Concept (mage-specific field)
    try {
        form.getTextField("Concept")?.setText(character.concept || "")
    } catch (e) {
        // Concept field doesn't exist in this PDF
    }

    // Affinity Sphere
    try {
        form.getTextField("AffinitySphere")?.setText(character.affinitySphere || "")
    } catch (e) {
        try {
            form.getTextField("Affinity")?.setText(character.affinitySphere || "")
        } catch (e2) {
            // Affinity sphere field doesn't exist in this PDF
        }
    }

    // Gifts and Rites - using new field naming pattern
    const getGiftText = (power: Power | Ritual | Gift) => {
        let text = power.name + ": " + power.summary
        
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

    const getDicePoolText = (power: Power | Ritual | Gift) => {
        return power.dicePool || ""
    }

    // Combine gifts and rites into a single array for unified numbering
    const allGiftsAndRites = [
        ...(character.disciplines || []),
        ...(character.rituals || []),
        ...(character.gifts || []),
        ...(character.rites || [])
    ]

    // Fill gift/rite names and dice pools using the specified field pattern
    allGiftsAndRites.forEach((power, index) => {
        try {
            // Gift name goes into 0.X.Gift_Name-1 pattern
            const giftNameField = `0.${index}.Gift_Name-1`
            form.getTextField(giftNameField)?.setText(getGiftText(power))
            form.getTextField(giftNameField)?.disableRichFormatting()
            
            // Dice pool goes into 1.X.Gift_Name-1 pattern  
            const dicePoolField = `1.${index}.Gift_Name-1`
            const dicePoolText = getDicePoolText(power)
            if (dicePoolText) {
                form.getTextField(dicePoolField)?.setText(dicePoolText)
                form.getTextField(dicePoolField)?.disableRichFormatting()
            }
        } catch (e) {
            // If the specific field doesn't exist, continue with next
        }
    })

    // Fallback for older discipline-based system (keep for compatibility)
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
        try {
            form.getTextField(`Disc${di}`)?.setText(upcase(powers[0].discipline))
            for (const [powerIndex, power] of powers.entries()) {
                const pi = powerIndex + 1
                form.getTextField(`Disc${di}_Ability${pi}`)?.setText(getGiftText(power))
                form.getTextField(`Disc${di}_Ability${pi}`)?.disableRichFormatting()
                form.getCheckBox(`Disc${di}-${pi}`)?.check()
            }
            if (powers[0].discipline === "blood sorcery") {
                for (const [ritualIndex, ritual] of (character.rituals || []).entries()) {
                    const ri = powers.length + ritualIndex + 1
                    form.getTextField(`Disc${di}_Ability${ri}`)?.setText(getGiftText(ritual))
                    form.getTextField(`Disc${di}_Ability${ri}`)?.disableRichFormatting()
                }
            }
        } catch (e) {
            // If discipline fields don't exist, skip
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

    // Crafts & Perks - Add to merits section or dedicated fields
    const craftsAndPerks = character.craftsAndPerks || []
    const meritsStartIndex = meritsAndFlaws.length
    
    craftsAndPerks.forEach(({ name, level, description, type }, i) => {
        const fieldNum = meritsStartIndex + i + 1
        const displayText = `${name} (${type === 'craft' ? 'Craft' : 'Perk'}): ${description}`
        
        try {
            // Try to add to merit fields first
            form.getTextField(`Merit${fieldNum}`).setText(displayText)
            
            // Fill in the level dots
            for (let l = 1; l <= level; l++) {
                try {
                    form.getCheckBox(`Merit${fieldNum}-${l}`).check()
                } catch (e) {
                    // If checkbox doesn't exist, skip
                }
            }
        } catch (e) {
            // If merit fields are full, try alternative approaches
            try {
                // Try dedicated craft/perk fields if they exist
                const craftPerkFieldName = type === 'craft' ? `Craft${i + 1}` : `Perk${i + 1}`
                form.getTextField(craftPerkFieldName)?.setText(displayText)
            } catch (e2) {
                // If no dedicated fields exist, we'll add to notes section later
            }
        }
    })

    // Touchstones & Convictions - Enhanced with all details
    const touchstonesText = (character.touchstones || []).map(({ name, description, conviction }) => 
        `${name}: ${conviction}\n${description}`
    ).join("\n\n")
    
    form.getTextField("Convictions").setText(touchstonesText)

    // Additional character details for notes field
    let additionalDetailsText = ""
    
    // Add coven information if available
    if (covenName) {
        additionalDetailsText += `Coven: ${covenName}\n\n`
    }
    
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
    
    // Map specific fields according to PDF structure
    
    // Appearance
    try {
        form.getTextField("Appearance")?.setText(character.appearance || "")
    } catch (e) {
        try {
            form.getTextField("pcDescription")?.setText(character.appearance || "")
        } catch (e2) {
            // Fallback if appearance field doesn't exist
            if (character.appearance) {
                additionalDetailsText += `Appearance:\n${character.appearance}\n\n`
            }
        }
    }
    
    // History
    try {
        form.getTextField("History")?.setText(character.history || "")
    } catch (e) {
        try {
            form.getTextField("pcConcept")?.setText(character.history || "")
        } catch (e2) {
            // Fallback if History field doesn't exist
            if (character.history) {
                additionalDetailsText += `History:\n${character.history}\n\n`
            }
        }
    }
    
    // Notes
    try {
        form.getTextField("Notes")?.setText(character.notes || "")
    } catch (e) {
        try {
            form.getTextField("PC_Notes")?.setText(character.notes || "")
        } catch (e2) {
            // Fallback if Notes field doesn't exist
            if (character.notes) {
                additionalDetailsText += `Character Notes:\n${character.notes}\n\n`
            }
        }
    }
    
    // Set additional details in appropriate notes field
    try {
        form.getTextField("AdditionalNotes")?.setText(additionalDetailsText.trim())
    } catch (e) {
        try {
            form.getTextField("touchstoneNotes")?.setText(additionalDetailsText.trim())
        } catch (e2) {
            try {
                form.getTextField("Notes")?.setText(additionalDetailsText.trim())
            } catch (e3) {
                // If no notes field exists, append to convictions
                const combinedText = touchstonesText + (additionalDetailsText ? `\n\n--- Additional Info ---\n${additionalDetailsText.trim()}` : "")
                form.getTextField("Convictions").setText(combinedText)
            }
        }
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
