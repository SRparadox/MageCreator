import { z } from "zod"
import { sphereNameSchema } from "./NameSchemas"

export type SphereName = z.infer<typeof sphereNameSchema>

export const spheresSchema = z.object({
    correspondence: z.number().min(0).max(5).int(),
    entropy: z.number().min(0).max(5).int(),
    forces: z.number().min(0).max(5).int(),
    life: z.number().min(0).max(5).int(),
    matter: z.number().min(0).max(5).int(),
    mind: z.number().min(0).max(5).int(),
    prime: z.number().min(0).max(5).int(),
    spirit: z.number().min(0).max(5).int(),
    time: z.number().min(0).max(5).int(),
})
export type Spheres = z.infer<typeof spheresSchema>

export const sphereSchema = z.object({
    name: sphereNameSchema,
    description: z.string(),
    field: z.string(),
})
export type Sphere = z.infer<typeof sphereSchema>

export const spheres: Sphere[] = [
    {
        name: "correspondence",
        field: "Connection between different things within space",
        description: "The element of connection between different things within space."
    },
    {
        name: "entropy",
        field: "Chance, Fate, and Mortality", 
        description: "The principle of Chance, Fate, and Mortality"
    },
    {
        name: "forces",
        field: "Elemental Energies",
        description: "Understanding Elemental Energies"
    },
    {
        name: "life",
        field: "Life and Death",
        description: "The mysteries of Life and Death"
    },
    {
        name: "matter",
        field: "Inanimate Objects",
        description: "The principles behind supposedly \"inanimate\" objects"
    },
    {
        name: "mind",
        field: "Consciousness",
        description: "The potentials of consciousness"
    },
    {
        name: "prime",
        field: "Primal Energy",
        description: "An understanding of the Primal Energy with all things"
    },
    {
        name: "spirit",
        field: "Otherworldly Forces",
        description: "Comprehension of Otherworldly forces and inhabitants"
    },
    {
        name: "time",
        field: "Chronological Forces",
        description: "The strange workings of chronological forces and perceptions"
    }
]

export const getEmptySpheres = (): Spheres => {
    return {
        correspondence: 0,
        entropy: 0,
        forces: 0,
        life: 0,
        matter: 0,
        mind: 0,
        prime: 0,
        spirit: 0,
        time: 0,
    }
}