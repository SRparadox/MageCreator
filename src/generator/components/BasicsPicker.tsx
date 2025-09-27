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
    const [playerName, setPlayerName] = useState(character.playerName || "")
    const [chronicle, setChronicle] = useState(character.chronicle)
    const [appearance, setAppearance] = useState(character.appearance || "")
    const [history, setHistory] = useState(character.history || "")
    const [notes, setNotes] = useState(character.notes || "")

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
                    label="Character Name"
                />

                <TextInput
                    style={{ width: "300px" }}
                    value={playerName}
                    onChange={(event) => setPlayerName(event.currentTarget.value)}
                    placeholder="Your Name"
                    label="Player Name"
                    description="Your real name as the player"
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
                    value={appearance}
                    onChange={(event) => setAppearance(event.currentTarget.value)}
                    placeholder="Tall and lean with silver-streaked hair, piercing blue eyes, and ritual scars across their arms"
                    label="Appearance"
                    description="Physical description of your character"
                    autosize
                    minRows={3}
                />

                <Textarea
                    style={{ width: "300px" }}
                    value={history}
                    onChange={(event) => setHistory(event.currentTarget.value)}
                    placeholder="Born in the city but called to the wild during their First Change. Trained by the Ghost Council elders..."
                    label="History"
                    description="Your character's background and past"
                    autosize
                    minRows={3}
                />

                <Textarea
                    style={{ width: "300px" }}
                    value={notes}
                    onChange={(event) => setNotes(event.currentTarget.value)}
                    placeholder="Has a fear of silver, prefers to hunt at night, speaks to spirits regularly..."
                    label="Notes"
                    description="Additional character notes and details"
                    autosize
                    minRows={3}
                />



                <Button
                    color="grape"
                    onClick={() => {
                        setCharacter({ 
                            ...character, 
                            name, 
                            playerName, 
                            chronicle, 
                            appearance, 
                            history, 
                            notes
                        })
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
