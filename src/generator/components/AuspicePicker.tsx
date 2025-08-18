import { Card, Center, Grid, Image, ScrollArea, Text, Title, useMantineTheme } from "@mantine/core"
import { useEffect } from "react"
import ReactGA from "react-ga4"
import { AuspiceName, auspiceNameSchema, PredatorTypeName } from "~/data/NameSchemas"
import { Character } from "../../data/Character"
import { auspices } from "../../data/Auspices"
import { globals } from "../../globals"

type AuspicePickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const AuspicePicker = ({ character, setCharacter, nextStep }: AuspicePickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Auspice Picker" })
    }, [])

    const theme = useMantineTheme()

    const c1 = "rgba(26, 27, 30, 0.90)"

    const createAuspicePick = (auspice: AuspiceName, c2: string) => {
        const bgColor = theme.fn.linearGradient(0, c1, c2)

        return (
            <Grid.Col key={auspice} span={6}>
                <Card
                    className="hoverCard"
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    h={300}
                    style={{ background: bgColor, cursor: "pointer" }}
                    onClick={() => {
                        setCharacter({
                            ...character,
                            generation: 0, // Reset generation since it's not relevant for Werewolf
                            // Store auspice in predatorType temporarily for compatibility
                            predatorType: {
                                ...character.predatorType,
                                name: auspice as string as PredatorTypeName, // Temporary type assertion for compatibility
                                pickedDiscipline: "",
                                pickedMeritsAndFlaws: [],
                            }
                        })

                        ReactGA.event({
                            action: "auspice clicked",
                            category: "auspices",
                            label: auspice,
                        })
                        nextStep()
                    }}
                >
                    <Card.Section>
                        <Center pt={10}>
                            <Image fit="contain" withPlaceholder src={auspices[auspice].logo} height={120} width={120} alt={auspice} />
                        </Center>
                    </Card.Section>

                    <Center>
                        <Title order={3} p="md">{auspice}</Title>
                    </Center>
                    
                    <Center>
                        <Text size="sm" c="blue" fw={500} mb="xs">
                            {auspices[auspice].moonPhase}
                        </Text>
                    </Center>

                    <Text size="sm" color="dimmed" ta="center" h={40}>
                        {auspices[auspice].description}
                    </Text>
                </Card>
            </Grid.Col>
        )
    }

    const height = globals.viewportHeightPx
    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"}>
                Choose the <b>Auspice</b> you were born under
            </Text>

            <Text ta="center" fz="xl" fw={700} c="red">
                Auspice
            </Text>
            <hr color="#e03131" />

            <ScrollArea h={height - 215} w={"100%"} p={20}>
                <Grid grow m={0}>
                    {["Ragabash", "Theurge", "Philodox", "Galliard", "Ahroun"]
                        .map((a) => auspiceNameSchema.parse(a))
                        .map((auspice) => createAuspicePick(auspice, theme.fn.rgba(theme.colors.grape[8], 0.9)))}
                </Grid>
            </ScrollArea>
        </div>
    )
}

export default AuspicePicker
