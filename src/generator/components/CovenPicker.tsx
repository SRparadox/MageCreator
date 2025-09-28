import { Box, Button, Card, Center, Grid, Group, Image, Stack, Text, Title } from "@mantine/core"
import { useState } from "react"
import { Character } from "../../data/Character"
import { covens, Coven } from "../../data/Covens"
import { covenNameSchema } from "../../data/NameSchemas"

export type CovenPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const CovenPicker = ({ character, setCharacter, nextStep }: CovenPickerProps) => {
    const [selectedCoven, setSelectedCoven] = useState(character.coven || "")
    
    // Image mapping using public directory paths
    const covenImages: Record<string, string> = {
        independent: "/images/factions/Independent.webp",
        marauder: "/images/factions/marauder.webp", 
        technocracy: "/images/factions/technocracy.webp",
        traditions: "/images/factions/traditions.webp"
    }

    // Debug: log covens to console
    console.log("Covens array:", covens)
    console.log("Covens length:", covens.length)
    console.log("Selected coven:", selectedCoven)
    console.log("Coven images:", covenImages)

    const handleCovenSelect = (covenName: string) => {
        setSelectedCoven(covenName)
        const parsedCovenName = covenNameSchema.parse(covenName)
        setCharacter({
            ...character,
            coven: parsedCovenName,
        })
    }

    const handleNext = () => {
        if (selectedCoven) {
            nextStep()
        }
    }

    const getCovenImage = (covenName: string) => {
        return covenImages[covenName] || "/images/factions/Independent.webp"
    }

    return (
        <Center>
            <Stack align="center" gap="xl" w="100%" maw={1200}>
                <Title order={1} ta="center">Choose Your Faction</Title>
                <Text size="lg" ta="center" c="dimmed" maw={600}>
                    Select the faction your mage belongs to. Each faction has different philosophies and approaches to magic.
                </Text>
                
                <Grid w="100%" gutter="lg" justify="center">
                    {covens.map((coven: Coven) => (
                        <Grid.Col key={coven.name} span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
                            <Card
                                shadow="md"
                                padding="lg"
                                radius="md"
                                withBorder
                                style={{
                                    cursor: "pointer",
                                    border: selectedCoven === coven.name ? "2px solid #228be6" : "1px solid #dee2e6",
                                    backgroundColor: selectedCoven === coven.name ? "#e7f5ff" : "white"
                                }}
                                onClick={() => handleCovenSelect(coven.name)}
                            >
                                <Stack align="center" gap="md" h="100%">
                                    <Image
                                        src={getCovenImage(coven.name)}
                                        alt={coven.name}
                                        w={80}
                                        h={80}
                                        style={{ objectFit: "contain" }}
                                        fallbackSrc="data:image/svg+xml,%3csvg%20width='100'%20height='100'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='100'%20height='100'%20fill='%23ddd'/%3e%3ctext%20x='50'%20y='50'%20font-size='14'%20text-anchor='middle'%20dy='.3em'%3eImage%3c/text%3e%3c/svg%3e"
                                    />
                                    <Title order={3} ta="center" tt="capitalize">
                                        {coven.name}
                                    </Title>
                                    <Text size="sm" ta="center" c="dimmed" style={{ flex: 1 }}>
                                        {coven.description}
                                    </Text>
                                    <Box mt="auto">
                                        <Text size="xs" fw={500} c="blue" ta="center">
                                            {coven.philosophy}
                                        </Text>
                                    </Box>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>

                <Group justify="center" mt="xl">
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={!selectedCoven}
                    >
                        Continue
                    </Button>
                </Group>
            </Stack>
        </Center>
    )
}

export default CovenPicker