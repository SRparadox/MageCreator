import { Box, Button, Card, Center, Grid, Group, Stack, Text, Title, Checkbox, Alert } from "@mantine/core"
import React, { useState, useEffect } from "react"
import { Character, CraftPerk } from "../../data/Character"
import { crafts, perks, Craft, Perk } from "../../data/CraftsAndPerks"
import { IconInfoCircle } from "@tabler/icons-react"

export type CraftsAndPerksPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const CraftsAndPerksPicker = ({ character, setCharacter, nextStep }: CraftsAndPerksPickerProps) => {
    const [selectedItems, setSelectedItems] = useState(character.craftsAndPerks || [])
    const [mode, setMode] = useState(null as '2crafts1perk' | '1craft2perks' | null)
    
    const maxCrafts = mode === '2crafts1perk' ? 2 : 1
    const maxPerks = mode === '2crafts1perk' ? 1 : 2
    
    const selectedCrafts = selectedItems.filter((item: CraftPerk) => item.type === 'craft').length
    const selectedPerks = selectedItems.filter((item: CraftPerk) => item.type === 'perk').length

    useEffect(() => {
        setCharacter({
            ...character,
            craftsAndPerks: selectedItems,
        })
    }, [selectedItems, setCharacter])

    const handleModeSelect = (selectedMode: '2crafts1perk' | '1craft2perks') => {
        setMode(selectedMode)
        setSelectedItems([]) // Clear selections when changing mode
    }

    const handleItemToggle = (item: Craft | Perk, type: 'craft' | 'perk') => {
        const selection: CraftPerk = {
            name: item.name,
            type,
            level: item.level,
            description: item.description
        }

        const isSelected = selectedItems.some((selected: CraftPerk) => selected.name === item.name)
        
        if (isSelected) {
            setSelectedItems(selectedItems.filter((selected: CraftPerk) => selected.name !== item.name))
        } else {
            // Check if we can add more of this type
            const currentCount = selectedItems.filter((selected: CraftPerk) => selected.type === type).length
            const maxCount = type === 'craft' ? maxCrafts : maxPerks
            
            if (currentCount < maxCount) {
                setSelectedItems([...selectedItems, selection])
            }
        }
    }

    const handleNext = () => {
        if (mode && selectedCrafts === maxCrafts && selectedPerks === maxPerks) {
            nextStep()
        }
    }

    const canSelectItem = (type: 'craft' | 'perk') => {
        const currentCount = selectedItems.filter((selected: CraftPerk) => selected.type === type).length
        const maxCount = type === 'craft' ? maxCrafts : maxPerks
        return currentCount < maxCount
    }

    const isItemSelected = (itemName: string) => {
        return selectedItems.some((selected: CraftPerk) => selected.name === itemName)
    }

    if (!mode) {
        return (
            <Center>
                <Stack align="center" gap="xl" w="100%" maw={600}>
                    <Title order={1} ta="center">Choose Your Combination</Title>
                    <Text size="lg" ta="center" c="dimmed">
                        Choose a combination of crafts and perks for your mage.
                    </Text>
                    
                    <Grid w="100%" gutter="lg">
                        <Grid.Col span={6}>
                            <Card
                                shadow="md"
                                padding="xl"
                                radius="md"
                                withBorder
                                style={{ 
                                    cursor: "pointer", 
                                    height: "100%", 
                                    backgroundColor: 'var(--mantine-color-body)' 
                                }}
                                onClick={() => handleModeSelect('2crafts1perk')}
                            >
                                <Stack align="center" gap="md" h="100%">
                                    <Title order={3} ta="center">2 Crafts + 1 Perk</Title>
                                    <Text size="sm" ta="center" c="dimmed">
                                        Focus on magical techniques and one enhancement
                                    </Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Card
                                shadow="md"
                                padding="xl"
                                radius="md"
                                withBorder
                                style={{ 
                                    cursor: "pointer", 
                                    height: "100%", 
                                    backgroundColor: 'var(--mantine-color-body)' 
                                }}
                                onClick={() => handleModeSelect('1craft2perks')}
                            >
                                <Stack align="center" gap="md" h="100%">
                                    <Title order={3} ta="center">1 Craft + 2 Perks</Title>
                                    <Text size="sm" ta="center" c="dimmed">
                                        One magical technique with two enhancements
                                    </Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Center>
        )
    }

    return (
        <Center>
            <Stack align="center" gap="xl" w="100%" maw={1200}>
                <Title order={1} ta="center">Crafts and Perks</Title>
                <Text size="lg" ta="center" c="dimmed" maw={800}>
                    {mode === '2crafts1perk' 
                        ? 'Select 2 crafts and 1 perk for your mage.'
                        : 'Select 1 craft and 2 perks for your mage.'
                    }
                </Text>
                
                <Alert icon={<IconInfoCircle size={16} />} title="Selection Progress" color="blue">
                    <Text size="sm">
                        Crafts: {selectedCrafts}/{maxCrafts} | Perks: {selectedPerks}/{maxPerks}
                    </Text>
                </Alert>

                <Button variant="outline" onClick={() => setMode(null)}>
                    Change Combination
                </Button>
                
                {/* Crafts Section */}
                <Box w="100%">
                    <Title order={2} ta="center" mb="md">Crafts</Title>
                    <Grid gutter="md">
                        {crafts.map((craft: Craft) => (
                            <Grid.Col key={craft.name} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                                <Card
                                    shadow="sm"
                                    padding="md"
                                    radius="md"
                                    withBorder
                                    style={{
                                        cursor: canSelectItem('craft') || isItemSelected(craft.name) ? "pointer" : "not-allowed",
                                        opacity: (!canSelectItem('craft') && !isItemSelected(craft.name)) ? 0.6 : 1,
                                        border: isItemSelected(craft.name) ? "2px solid #228be6" : "1px solid #dee2e6",
                                        backgroundColor: 'var(--mantine-color-body)',
                                    }}
                                    onClick={() => (canSelectItem('craft') || isItemSelected(craft.name)) && handleItemToggle(craft, 'craft')}
                                >
                                    <Stack gap="sm">
                                        <Group justify="space-between" align="flex-start">
                                            <Title order={4}>{craft.name}</Title>
                                            <Checkbox
                                                checked={isItemSelected(craft.name)}
                                                readOnly
                                            />
                                        </Group>
                                        <Text size="sm" c="dimmed">
                                            {craft.description}
                                        </Text>
                                        <Text size="xs" c="blue" fw={500}>
                                            Level {craft.level}
                                        </Text>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Box>

                {/* Perks Section */}
                <Box w="100%">
                    <Title order={2} ta="center" mb="md">Perks</Title>
                    <Grid gutter="md">
                        {perks.map((perk: Perk) => (
                            <Grid.Col key={perk.name} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                                <Card
                                    shadow="sm"
                                    padding="md"
                                    radius="md"
                                    withBorder
                                    style={{
                                        cursor: canSelectItem('perk') || isItemSelected(perk.name) ? "pointer" : "not-allowed",
                                        opacity: (!canSelectItem('perk') && !isItemSelected(perk.name)) ? 0.6 : 1,
                                        border: isItemSelected(perk.name) ? "2px solid #228be6" : "1px solid #dee2e6",
                                        backgroundColor: 'var(--mantine-color-body)',
                                    }}
                                    onClick={() => (canSelectItem('perk') || isItemSelected(perk.name)) && handleItemToggle(perk, 'perk')}
                                >
                                    <Stack gap="sm">
                                        <Group justify="space-between" align="flex-start">
                                            <Title order={4}>{perk.name}</Title>
                                            <Checkbox
                                                checked={isItemSelected(perk.name)}
                                                readOnly
                                            />
                                        </Group>
                                        <Text size="sm" c="dimmed">
                                            {perk.description}
                                        </Text>
                                        <Text size="xs" c="blue" fw={500}>
                                            Level {perk.level}
                                        </Text>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Box>

                <Group justify="center" mt="xl">
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={!(selectedCrafts === maxCrafts && selectedPerks === maxPerks)}
                    >
                        Continue
                    </Button>
                </Group>
            </Stack>
        </Center>
    )
}

export default CraftsAndPerksPicker