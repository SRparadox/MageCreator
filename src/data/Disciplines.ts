import { z } from "zod"

// Minimal Disciplines file for backward compatibility
// This supports old Vampire character saves that might still use disciplines

export const powerSchema = z.object({
    name: z.string(),
    summary: z.string(),
    description: z.string(),
    dicePool: z.string(),
    level: z.number().min(0).int(),
    discipline: z.string(),
    rouseChecks: z.number().min(0).int(),
    amalgamPrerequisites: z.object({
        discipline: z.string(),
        level: z.number().min(0).int(),
    }).array(),
})
export type Power = z.infer<typeof powerSchema>

export const ritualSchema = z.object({
    name: z.string(),
    level: z.number().min(0).int(),
    description: z.string(),
    dicePools: z.string(),
    system: z.string(),
    duration: z.string(),
    ingredients: z.string(),
})
export type Ritual = z.infer<typeof ritualSchema>

// Empty arrays for backward compatibility
export const powers: Power[] = []
export const rituals: Ritual[] = []
