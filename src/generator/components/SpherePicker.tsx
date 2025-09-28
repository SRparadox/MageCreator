import { Box, Button, Card, Center, Group, Image, Stack, Text, Title, Alert, ActionIcon, Grid, useMantineTheme, ScrollArea } from "@mantine/core"
import React, { useState, useEffect } from "react"
import { Character } from "../../data/Character"
import { spheres, Sphere, getEmptySpheres, Spheres, SphereName } from "../../data/Spheres"
import { IconInfoCircle } from "@tabler/icons-react"

export type SpherePickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const SpherePicker = ({ character, setCharacter, nextStep }: SpherePickerProps) => {
    const theme = useMantineTheme()
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
            <Group justify="center" gap={6}>
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
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor: isSelected ? theme.colors.blue[6] : 'rgba(255,255,255,0.1)',
                                border: `2px solid ${isSelected ? theme.colors.blue[4] : theme.colors.gray[5]}`,
                                cursor: (canSelect || isSelected) ? 'pointer' : 'not-allowed',
                                opacity: (!canSelect && !isSelected) ? 0.4 : 1,
                                transition: 'all 0.2s ease',
                                boxShadow: isSelected ? `0 0 8px ${theme.colors.blue[4]}` : 'none',
                            }}
                        />
                    )
                })}
                <Text size="sm" c="dimmed" ml={4}>
                    {currentValue}/5
                </Text>
            </Group>
        )
    }

    const getSphereGradientColor = (sphereName: string) => {
        const colorMap: { [key: string]: string } = {
            'correspondence': theme.colors.violet[7],
            'entropy': theme.colors.gray[7], 
            'forces': theme.colors.red[7],
            'life': theme.colors.green[7],
            'matter': theme.colors.orange[7],
            'mind': theme.colors.blue[7],
            'prime': theme.colors.yellow[7],
            'spirit': theme.colors.teal[7],
            'time': theme.colors.indigo[7],
        }
        return colorMap[sphereName] || theme.colors.gray[7]
    }

    const SphereCard = ({ sphereName }: { sphereName: string }) => {
        const sphere = getSphereByName(sphereName)
        if (!sphere) return null

        const currentValue = selectedSpheres[sphere.name as keyof Spheres]
        const isAffinitySelected = affinity === sphere.name
        const isAffinityDisabled = affinity !== null && affinity !== sphere.name
        
        const c1 = "rgba(26, 27, 30, 0.90)"
        const c2 = getSphereGradientColor(sphere.name)
        const bgColor = theme.fn.linearGradient(0, c1, theme.fn.rgba(c2, 0.9))

        return (
            <Card
                className="hoverCard"
                shadow="sm"
                padding="lg"
                radius="md"
                h={320}
                style={{ 
                    background: bgColor, 
                    cursor: "pointer",
                    border: isAffinitySelected ? `3px solid ${theme.colors.blue[4]}` : 'none'
                }}
            >
                <Card.Section>
                    <Center pt={10}>
                        <Image 
                            fit="contain" 
                            withPlaceholder 
                            src={getSphereImage(sphere.name)} 
                            height={100} 
                            width={100} 
                            alt={sphere.name}
                        />
                    </Center>
                </Card.Section>

                <Center>
                    <Title order={4} p="md" tt="capitalize" c="white">
                        {sphere.name}
                    </Title>
                </Center>

                <Text size="xs" ta="center" c="dimmed" style={{ minHeight: '60px' }}>
                    {sphere.description}
                </Text>
                
                <Center mt="sm">
                    <Button
                        variant={isAffinitySelected ? "filled" : "outline"}
                        color={isAffinitySelected ? "blue" : "gray"}
                        size="xs"
                        onClick={(e: any) => {
                            e.stopPropagation()
                            handleAffinityToggle(sphere.name as SphereName)
                        }}
                        disabled={isAffinityDisabled}
                        style={{
                            opacity: isAffinityDisabled ? 0.5 : 1
                        }}
                    >
                        {isAffinitySelected ? "★ Affinity" : "Set Affinity"}
                    </Button>
                </Center>
                
                <Center mt="md">
                    <DotSelector sphereName={sphere.name as SphereName} currentValue={currentValue} />
                </Center>
            </Card>
        )
    }

    return (
        <Box style={{ height: 'calc(100vh - 250px)' }}>
            <Text fz={"30px"} ta={"center"}>
                Choose Your <Text component="span" fw={700}>Spheres</Text>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="grape">
                Spheres
            </Text>
            <Box component="hr" style={{ color: "#be4bdb" }} />
            
            <Center mb="md">
                <Alert icon={<IconInfoCircle size={16} />} title="Sphere Distribution" color="blue" maw={400}>
                    <Text size="sm">
                        Points remaining: {remainingPoints} / {maxPoints}
                        {affinity && (
                            <Text component="span" style={{ display: 'block', marginTop: 4 }}>
                                Affinity: <Text component="span" fw={500} tt="capitalize">{affinity}</Text>
                            </Text>
                        )}
                    </Text>
                </Alert>
            </Center>

            <ScrollArea h={'calc(100vh - 400px)'} w={"100%"} p={20}>
                <Text ta="center" fz="xl" fw={700} mb="sm" mt="md" c={theme.colors.violet[6]}>
                    Mind & Matter
                </Text>
                <Grid grow m={0} gutter="md">
                    {['correspondence', 'entropy', 'forces'].map((sphereName) => (
                        <Grid.Col key={sphereName} span={4}>
                            <SphereCard sphereName={sphereName} />
                        </Grid.Col>
                    ))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb="sm" mt="md" c={theme.colors.green[6]}>
                    Life & Reality  
                </Text>
                <Grid grow m={0} gutter="md">
                    {['life', 'matter', 'mind'].map((sphereName) => (
                        <Grid.Col key={sphereName} span={4}>
                            <SphereCard sphereName={sphereName} />
                        </Grid.Col>
                    ))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb="sm" mt="md" c={theme.colors.yellow[6]}>
                    Prime Forces
                </Text>
                <Grid grow m={0} gutter="md">
                    {['prime', 'spirit', 'time'].map((sphereName) => (
                        <Grid.Col key={sphereName} span={4}>
                            <SphereCard sphereName={sphereName} />
                        </Grid.Col>
                    ))}
                </Grid>
            </ScrollArea>

                <Center mt="xl">
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={!affinity || totalPoints !== maxPoints}
                    >
                        Continue ({totalPoints}/7 points used)
                    </Button>
                </Center>
        </Box>
    )
}

export default SpherePicker