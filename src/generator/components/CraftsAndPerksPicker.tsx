import { Accordion, Badge, Button, Card, Grid, Group, ScrollArea, Stack, Text } from "@mantine/core"
import React, { useState, useEffect } from "react"
import ReactGA from "react-ga4"
import { Character, CraftPerk } from "../../data/Character"
import { crafts, perks, Craft, Perk } from "../../data/CraftsAndPerks"
import { globals } from "../../globals"

export type CraftsAndPerksPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const CraftsAndPerksPicker = ({ character, setCharacter, nextStep }: CraftsAndPerksPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Crafts and Perks Picker" })
    }, [])

    const smallScreen = globals.isSmallScreen
    const [selectedItems, setSelectedItems] = useState<CraftPerk[]>(character.craftsAndPerks || [])

    const isPicked = (item: Craft | Perk, type: 'craft' | 'perk') => {
        return selectedItems.some(selected => selected.name === item.name && selected.type === type)
    }

    const selectedCrafts = selectedItems.filter(item => item.type === 'craft').length
    const selectedPerks = selectedItems.filter(item => item.type === 'perk').length
    
    // Require exactly 2 crafts and 2 perks
    const maxCrafts = 2
    const maxPerks = 2
    const validToMove = selectedCrafts === maxCrafts && selectedPerks === maxPerks

    const createItemCard = (item: Craft | Perk, type: 'craft' | 'perk') => {
        const picked = isPicked(item, type)
        const canSelect = type === 'craft' ? selectedCrafts < maxCrafts : selectedPerks < maxPerks

        return (
            <Card key={`${type}-${item.name}`} withBorder shadow="sm" style={{ opacity: picked ? 1 : ((!canSelect && !picked) ? 0.5 : 1) }}>
                <Stack spacing="xs">
                    <Group position="apart" align="flex-start">
                        <Text weight={500} size="sm">
                            {item.name}
                        </Text>
                        <Group spacing="xs">
                            <Badge size="xs" color="blue" variant="outline">
                                Level {item.level}
                            </Badge>
                            {type === 'craft' && (
                                <Badge size="xs" color="green">
                                    Craft
                                </Badge>
                            )}
                            {type === 'perk' && (
                                <Badge size="xs" color="purple">
                                    Perk
                                </Badge>
                            )}
                        </Group>
                    </Group>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                    {item.prerequisites && (
                        <Text size="xs" color="orange">
                            Prerequisites: {item.prerequisites}
                        </Text>
                    )}
                    <Button
                        size="xs"
                        disabled={!canSelect && !picked}
                        onClick={() => {
                            const craftPerk: CraftPerk = {
                                name: item.name,
                                type,
                                level: item.level,
                                description: item.description
                            }

                            if (picked) {
                                // Remove the item
                                const newItems = selectedItems.filter(selected => !(selected.name === item.name && selected.type === type))
                                setSelectedItems(newItems)
                                setCharacter({
                                    ...character,
                                    craftsAndPerks: newItems,
                                })
                            } else {
                                // Add the item
                                const newItems = [...selectedItems, craftPerk]
                                setSelectedItems(newItems)
                                setCharacter({
                                    ...character,
                                    craftsAndPerks: newItems,
                                })
                            }

                            ReactGA.event({
                                action: picked ? `${type} unpicked` : `${type} picked`,
                                category: "character_creation",
                                label: item.name,
                            })
                        }}
                        color={picked ? "red" : "blue"}
                        variant={picked ? "outline" : "filled"}
                    >
                        {picked ? "✗ Remove" : `✓ Select ${type === 'craft' ? 'Craft' : 'Perk'}`}
                    </Button>
                </Stack>
            </Card>
        )
    }

    const createCategoryAccordion = (categoryName: string, items: (Craft | Perk)[], type: 'craft' | 'perk') => {
        const hasPickedItem = selectedItems.some(selected => selected.type === type && items.some(item => item.name === selected.name))

        return (
            <Accordion.Item key={categoryName} value={categoryName}>
                <Accordion.Control>
                    <Group position="apart">
                        <Text weight={500}>{categoryName}</Text>
                        <Badge color={hasPickedItem ? "green" : "blue"}>
                            {items.length} available
                        </Badge>
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>
                    <Grid>
                        {items.map((item) => (
                            <Grid.Col key={item.name} span={smallScreen ? 12 : 6}>
                                {createItemCard(item, type)}
                            </Grid.Col>
                        ))}
                    </Grid>
                </Accordion.Panel>
            </Accordion.Item>
        )
    }

    const height = globals.viewportHeightPx

    return (
        <div style={{ width: smallScreen ? "393px" : "810px", marginTop: globals.isPhoneScreen ? "60px" : "80px" }}>
            <Stack spacing="lg">
                <div>
                    <Text size="xl" weight={700} align="center">
                        Choose Your Crafts and Perks
                    </Text>
                    <Text size="sm" color="dimmed" align="center">
                        Select 2 crafts and 2 perks for your mage
                    </Text>
                </div>

                <Group position="center" spacing="lg">
                    <Badge size="lg" color={selectedCrafts === maxCrafts ? "green" : "blue"}>
                        Crafts: {selectedCrafts}/{maxCrafts}
                    </Badge>
                    <Badge size="lg" color={selectedPerks === maxPerks ? "green" : "blue"}>
                        Perks: {selectedPerks}/{maxPerks}
                    </Badge>
                </Group>

                <ScrollArea style={{ height: height - 250 }}>
                    <Accordion variant="contained" multiple>
                        {createCategoryAccordion("Crafts", crafts, 'craft')}
                        {createCategoryAccordion("Perks", perks, 'perk')}
                    </Accordion>
                </ScrollArea>

                <Group position="center" spacing="lg">
                    <Text size="sm" color="dimmed">
                        Selected: {selectedItems.length} / {maxCrafts + maxPerks}
                    </Text>
                    <Button
                        color="red"
                        onClick={() => {
                            setSelectedItems([])
                            setCharacter({
                                ...character,
                                craftsAndPerks: [],
                            })
                        }}
                        disabled={selectedItems.length === 0}
                    >
                        Reset Selection
                    </Button>
                    <Button
                        disabled={!validToMove}
                        onClick={() => {
                            ReactGA.event({
                                action: "crafts and perks completed",
                                category: "character_creation",
                            })
                            nextStep()
                        }}
                    >
                        Continue
                    </Button>
                </Group>
            </Stack>
        </div>
    )
}

export default CraftsAndPerksPicker