import { Box, Button, Card, Center, Group, Image, Stack, Text, Title, Alert, ActionIcon, Grid } from "@mantine/core"
import { useState, useEffect } from "react"
import { Character } from "../../data/Character"
import { spheres, Sphere, getEmptySpheres, Spheres, SphereName } from "../../data/Spheres"
import { IconInfoCircle } from "@tabler/icons-react"

export type SpherePickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const SpherePicker = ({ character, setCharacter, nextStep }: SpherePickerProps) => {
    const [selectedSpheres, setSelectedSpheres] = useState(character.spheres || getEmptySpheres())
    const [affinity, setAffinity] = useState(character.affinitySphere || null)
    
    const totalPoints = (Object.values(selectedSpheres) as number[]).reduce((sum, value) => sum + value, 0)
    const maxPoints = 7
    const remainingPoints = maxPoints - totalPoints

    // Organize spheres by columns as requested
    const sphereColumns = [
        ['correspondence', 'entropy', 'forces'],
        ['life', 'matter', 'mind'],
        ['prime', 'spirit', 'time']
    ]

    const handleSphereChange = (sphereName: SphereName, dots: number) => {
        if (dots < 0 || dots > 5) return
        
        const currentValue = selectedSpheres[sphereName]
        const pointDifference = dots - currentValue
        
        // Check if we have enough points
        if (pointDifference > remainingPoints) return
        
        const newSpheres = { ...selectedSpheres, [sphereName]: dots }
        setSelectedSpheres(newSpheres)
        setCharacter({
            ...character,
            spheres: newSpheres,
        })
    }

    const handleAffinityToggle = (sphereName: SphereName) => {
        if (affinity === sphereName) {
            // Unselect affinity if clicking the same one
            setAffinity(null)
            setCharacter({
                ...character,
                affinitySphere: undefined,
            })
        } else {
            // Select new affinity
            setAffinity(sphereName)
            setCharacter({
                ...character,
                affinitySphere: sphereName,
            })
        }
    }

    const handleNext = () => {
        if (affinity && totalPoints === maxPoints) {
            nextStep()
        }
    }

    const getSphereImage = (sphereName: string) => {
        return `./spheres/${sphereName}.webp`
    }

    const getSphereByName = (name: string): Sphere | undefined => {
        return spheres.find(sphere => sphere.name === name)
    }

    const DotSelector = ({ sphereName, currentValue }: { sphereName: SphereName, currentValue: number }) => {
        return (
            <Group justify="center" gap={4}>
                {[1, 2, 3, 4, 5].map((dotValue) => {
                    const canSelect = dotValue <= currentValue || (dotValue === currentValue + 1 && remainingPoints > 0)
                    const isSelected = dotValue <= currentValue
                    
                    return (
                        <Box
                            key={dotValue}
                            onClick={() => {
                                if (isSelected) {
                                    // If clicking on a filled dot, set to that value minus 1
                                    handleSphereChange(sphereName, dotValue - 1)
                                } else if (canSelect) {
                                    // If clicking on an empty dot we can select, set to that value
                                    handleSphereChange(sphereName, dotValue)
                                }
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: isSelected ? 'var(--mantine-color-blue-6)' : 'transparent',
                                border: '2px solid var(--mantine-color-gray-5)',
                                cursor: (canSelect || isSelected) ? 'pointer' : 'not-allowed',
                                opacity: (!canSelect && !isSelected) ? 0.3 : 1,
                            }}
                        />
                    )
                })}
            </Group>
        )
    }

    const SphereCard = ({ sphereName }: { sphereName: string }) => {
        const sphere = getSphereByName(sphereName)
        if (!sphere) return null

        const currentValue = selectedSpheres[sphere.name as keyof Spheres]
        const isAffinitySelected = affinity === sphere.name
        const isAffinityDisabled = affinity !== null && affinity !== sphere.name

        return (
            <Card
                shadow="md"
                padding="lg"
                radius="md"
                withBorder
                h="100%"
                style={{
                    backgroundColor: 'var(--mantine-color-body)',
                    opacity: 1,
                }}
            >
                <Stack align="center" gap="md" h="100%">
                    <Image
                        src={getSphereImage(sphere.name)}
                        alt={sphere.name}
                        w={80}
                        h={80}
                        style={{ objectFit: "contain" }}
                    />
                    <Title order={4} ta="center" tt="capitalize">
                        {sphere.name}
                    </Title>
                    <Text size="xs" ta="center" c="dimmed" style={{ minHeight: '60px' }}>
                        {sphere.description}
                    </Text>
                    
                    <Button
                        variant={isAffinitySelected ? "filled" : "outline"}
                        color={isAffinitySelected ? "blue" : "gray"}
                        size="sm"
                        onClick={() => handleAffinityToggle(sphere.name as SphereName)}
                        disabled={isAffinityDisabled}
                        style={{
                            opacity: isAffinityDisabled ? 0.5 : 1
                        }}
                    >
                        {isAffinitySelected ? "Affinity Selected" : "Set as Affinity"}
                    </Button>
                    
                    <DotSelector sphereName={sphere.name as SphereName} currentValue={currentValue} />
                </Stack>
            </Card>
        )
    }

    return (
        <Center>
            <Stack align="center" gap="xl" w="100%" maw={1200}>
                <Title order={1} ta="center">Choose Your Spheres</Title>
                <Text size="lg" ta="center" c="dimmed" maw={800}>
                    Choose one sphere as your affinity and distribute 7 dots among all spheres.
                </Text>
                
                <Alert icon={<IconInfoCircle size={16} />} title="Sphere Distribution" color="blue">
                    <Text size="sm">
                        Points remaining: {remainingPoints} / {maxPoints}
                        {affinity && (
                            <Text component="span" style={{ display: 'block', marginTop: 4 }}>
                                Affinity: <Text component="span" fw={500} tt="capitalize">{affinity}</Text>
                            </Text>
                        )}
                    </Text>
                </Alert>
                
                <Grid w="100%" gutter="lg">
                    {sphereColumns.map((column, columnIndex) => (
                        <Grid.Col key={columnIndex} span={4}>
                            <Stack gap="md">
                                {column.map((sphereName) => (
                                    <SphereCard sphereName={sphereName} />
                                ))}
                            </Stack>
                        </Grid.Col>
                    ))}
                </Grid>

                <Group justify="center" mt="xl">
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={!affinity || totalPoints !== maxPoints}
                    >
                        Continue ({totalPoints}/7 points used)
                    </Button>
                </Group>
            </Stack>
        </Center>
    )
}

export default SpherePicker