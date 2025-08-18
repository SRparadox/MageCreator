import { Button, Stack, Text, TextInput, Textarea } from "@mantine/core"
import { useEffect, useState } from "react"
import { Character } from "../../data/Character"
import ReactGA from "react-ga4"

type BasicsPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const BasicsPicker = ({ character, setCharacter, nextStep }: BasicsPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Basics Picker" })
    }, [])

    const [name, setName] = useState(character.name)
    const [concept, setConcept] = useState(character.concept)
    const [chronicle, setChronicle] = useState(character.chronicle)
    const [description, setDescription] = useState(character.description)

    return (
        <div>
            <Text fw={700} fz={"30px"} ta="center">
                Character Details
            </Text>

            <Stack mt={"xl"} align="center" spacing="xl">
                <TextInput
                    style={{ width: "300px" }}
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    placeholder="Luna Nightclaw"
                    label="Full name"
                />

                <TextInput
                    style={{ width: "300px" }}
                    value={concept}
                    onChange={(event) => setConcept(event.currentTarget.value)}
                    placeholder="Urban Shaman"
                    label="Concept"
                    description="A brief description of your character's role"
                />

                <TextInput
                    style={{ width: "300px" }}
                    value={chronicle}
                    onChange={(event) => setChronicle(event.currentTarget.value)}
                    placeholder="The Howling Stones Chronicle"
                    label="Chronicle"
                    description="The name of your story/campaign"
                />

                <Textarea
                    style={{ width: "300px" }}
                    value={description}
                    onChange={(event) => setDescription(event.currentTarget.value)}
                    placeholder="A fierce warrior with ritual scars and traditional tattoos, carrying the wisdom of the spirits"
                    label="Description & appearance of your character"
                    autosize
                    minRows={4}
                />

                <Button
                    color="grape"
                    onClick={() => {
                        setCharacter({ ...character, name, concept, chronicle, description })
                        nextStep()
                    }}
                >
                    Confirm
                </Button>
            </Stack>
        </div>
    )
}

export default BasicsPicker
