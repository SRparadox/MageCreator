import { Box, Button, Card, Center, Grid, Group, Image, Stack, Text, Title, NumberInput, Alert } from "@mantine/core"
import { useState, useEffect } from "react"
import { Character } from "../../data/Character"
import { spheres, Sphere, getEmptySpheres, Spheres } from "../../data/Spheres"
import { IconInfoCircle } from "@tabler/icons-react"

export type SpherePickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const SpherePicker = ({ character, setCharacter, nextStep }: SpherePickerProps) => {
    const [selectedSpheres, setSelectedSpheres] = useState<Spheres>(character.spheres || getEmptySpheres())
    const [affinityChosen, setAffinityChosen] = useState<boolean>(false)
    
    const totalPoints = Object.values(selectedSpheres).reduce((sum, value) => sum + value, 0)
    const maxPoints = 7
    const remainingPoints = maxPoints - totalPoints

    useEffect(() => {
        // Check if any sphere has points assigned (indicating affinity chosen)
        const hasAffinity = Object.values(selectedSpheres).some(value => value > 0)
        setAffinityChosen(hasAffinity)
    }, [selectedSpheres])

    const handleSphereChange = (sphereName: string, value: number) => {
        if (value < 0) return
        
        const newSpheres = { ...selectedSpheres, [sphereName]: value }
        const newTotal = Object.values(newSpheres).reduce((sum, val) => sum + val, 0)
        
        if (newTotal <= maxPoints) {
            setSelectedSpheres(newSpheres)
            setCharacter({
                ...character,
                spheres: newSpheres,
            })
        }
    }

    const handleNext = () => {
        if (affinityChosen && totalPoints <= maxPoints) {
            nextStep()
        }
    }

    const getSphereImage = (sphereName: string) => {
        return `/src/resources/spheres/${sphereName}.webp`
    }

    const canIncrease = (currentValue: number) => {
        return currentValue < 5 && remainingPoints > 0
    }

    return (
        <Center>
            <Stack align="center" gap="xl" w="100%" maw={1200}>
                <Title order={1} ta="center">Choose Your Spheres</Title>
                <Text size="lg" ta="center" c="dimmed" maw={800}>
                    At the beginning of your mage journey, you choose an affinity among the 9 spheres. 
                    You may distribute 7 dots amongst the spheres of your choosing.
                </Text>
                
                <Alert icon={<IconInfoCircle size={16} />} title="Sphere Distribution" color="blue">
                    <Text size="sm">
                        Points remaining: <strong>{remainingPoints}</strong> / {maxPoints}
                    </Text>
                </Alert>
                
                <Grid w="100%" gutter="lg" justify="center">
                    {spheres.map((sphere: Sphere) => {
                        const currentValue = selectedSpheres[sphere.name as keyof Spheres]
                        return (
                            <Grid.Col key={sphere.name} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                                <Card
                                    shadow="md"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    h="100%"
                                >
                                    <Stack align="center" gap="md" h="100%">
                                        <Image
                                            src={getSphereImage(sphere.name)}
                                            alt={sphere.name}
                                            w={60}
                                            h={60}
                                            style={{ objectFit: "contain" }}
                                        />
                                        <Title order={4} ta="center" tt="capitalize">
                                            {sphere.name}
                                        </Title>
                                        <Text size="sm" fw={500} ta="center" c="blue">
                                            {sphere.field}
                                        </Text>
                                        <Text size="xs" ta="center" c="dimmed" style={{ flex: 1 }}>
                                            {sphere.description}
                                        </Text>
                                        <NumberInput
                                            value={currentValue}
                                            onChange={(value) => handleSphereChange(sphere.name, Number(value) || 0)}
                                            min={0}
                                            max={5}
                                            size="md"
                                            w="100%"
                                            label="Dots"
                                            disabled={currentValue === 0 && remainingPoints === 0}
                                        />
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        )
                    })}
                </Grid>

                <Group justify="center" mt="xl">
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={!affinityChosen || remainingPoints < 0}
                    >
                        Continue
                    </Button>
                </Group>
            </Stack>
        </Center>
    )
}

export default SpherePicker