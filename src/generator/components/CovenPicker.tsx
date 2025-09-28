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
    const [selectedCoven, setSelectedCoven] = useState<string>(character.coven || "")
    
    // Debug: log covens to console
    console.log("Covens array:", covens)
    console.log("Covens length:", covens.length)

    // Image mapping with correct case - using relative paths from public directory
    const covenImages: Record<string, string> = {
        independent: "src/resources/magestatus/Independent.webp",
        marauder: "src/resources/magestatus/marauder.webp", 
        technocracy: "src/resources/magestatus/technocracy.webp",
        traditions: "src/resources/magestatus/traditions.webp"
    }

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
        return covenImages[covenName] || "src/resources/magestatus/Independent.webp"
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