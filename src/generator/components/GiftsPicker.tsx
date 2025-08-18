import { Accordion, Badge, Button, Card, Grid, Group, ScrollArea, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { Character } from "../../data/Character"
import { Gift, getGiftsByCategory } from "../../data/Gifts"
import { globals } from "../../globals"
import { upcase } from "../utils"

type GiftsPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const getAvailableGifts = (character: Character): Gift[] => {
    // Get all gifts that are available based on character's auspice and tribe
    const availableGifts: Gift[] = []
    
    // Add gifts based on auspice
    if (character.auspice) {
        availableGifts.push(...getGiftsByCategory(character.auspice))
    }
    
    // Add gifts based on tribe  
    if (character.tribe) {
        availableGifts.push(...getGiftsByCategory(character.tribe))
    }
    
    // Add native gifts (available to all Garou)
    availableGifts.push(...getGiftsByCategory("Native"))
    
    return availableGifts
}

const GiftsPicker = ({ character, setCharacter, nextStep }: GiftsPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Gifts Picker" })
    }, [])

    const smallScreen = globals.isSmallScreen
    const [pickedGifts, setPickedGifts] = useState<Gift[]>([])

    const allPickedGifts = pickedGifts

    const availableGifts = getAvailableGifts(character)

    const isPicked = (gift: Gift) => {
        return allPickedGifts.map((gift) => gift.name).includes(gift.name)
    }

    const maxGiftsPerCategory = 2 // Werewolf characters typically start with 2 gifts per category
    const canPickMoreGifts = (giftCategory: string) => {
        const currentCount = allPickedGifts.filter((p) => p.category === giftCategory).length
        return currentCount < maxGiftsPerCategory
    }

    const validToMove = pickedGifts.length >= 3 // Minimum 3 gifts to start

    const createGiftCard = (gift: Gift) => {
        const picked = isPicked(gift)
        const disabled = picked || !canPickMoreGifts(gift.category)

        return (
            <Card key={gift.name} withBorder shadow="sm" style={{ opacity: disabled ? 0.5 : 1 }}>
                <Stack spacing="xs">
                    <Group position="apart" align="flex-start">
                        <Text weight={500} size="sm">
                            {gift.name}
                        </Text>
                        <Badge size="xs" color={picked ? "green" : "gray"}>
                            {gift.renown}
                        </Badge>
                    </Group>
                    <Text size="xs" color="dimmed">
                        {gift.summary}
                    </Text>
                    {gift.dicePool && (
                        <Text size="xs" color="blue">
                            Dice Pool: {gift.dicePool}
                        </Text>
                    )}
                    <Group position="apart">
                        <Text size="xs" color="orange">
                            Cost: {gift.cost}
                        </Text>
                        <Text size="xs" color="gray">
                            Duration: {gift.duration}
                        </Text>
                    </Group>
                    <Button
                        size="xs"
                        disabled={disabled}
                        onClick={() => {
                            if (picked) return
                            
                            const newGifts = [...pickedGifts, gift]
                            setPickedGifts(newGifts)
                            
                            // Convert gifts to disciplines format for backward compatibility
                            const giftToDisciplineMap = {
                                "Native": "potence",
                                "Ragabash": "obfuscate", 
                                "Theurge": "auspex",
                                "Philodox": "dominate",
                                "Galliard": "presence",
                                "Ahroun": "potence",
                                "Black Furies": "celerity",
                                "Bone Gnawers": "animalism",
                                "Children of Gaia": "fortitude",
                                "Galestalkers": "obfuscate",
                                "Ghost Council": "auspex",
                                "Glass Walkers": "obfuscate",
                                "Hart Wardens": "animalism",
                                "Red Talons": "animalism",
                                "Shadow Lords": "dominate",
                                "Silent Striders": "celerity",
                                "Silver Fangs": "presence",
                            } as const
                            
                            const disciplinesFormat = newGifts.map(g => ({
                                name: g.name,
                                description: g.description,
                                summary: g.summary,
                                dicePool: g.dicePool,
                                level: 1, // Default level for gifts
                                discipline: giftToDisciplineMap[g.category] || "potence",
                                rouseChecks: 0, // Gifts don't use rouse checks
                                amalgamPrerequisites: [],
                            }))
                            
                            setCharacter({
                                ...character,
                                gifts: disciplinesFormat, // Store as Power objects for compatibility
                                disciplines: disciplinesFormat, // Keep for compatibility
                            })

                            ReactGA.event({
                                action: "gift picked",
                                category: "character_creation",
                                label: gift.name,
                            })
                        }}
                        color={picked ? "green" : "blue"}
                    >
                        {picked ? "✓ Selected" : "Select Gift"}
                    </Button>
                </Stack>
            </Card>
        )
    }

    const createCategoryAccordion = (categoryName: string, categoryGifts: Gift[]) => {
        if (!categoryGifts.length) return null

        const pickedCount = allPickedGifts.filter((p) => p.category === categoryName).length
        const maxCount = maxGiftsPerCategory

        return (
            <Accordion.Item key={categoryName} value={categoryName}>
                <Accordion.Control>
                    <Group position="apart">
                        <Text weight={500}>{upcase(categoryName)} Gifts</Text>
                        <Badge color={pickedCount >= maxCount ? "green" : "blue"}>
                            {pickedCount}/{maxCount}
                        </Badge>
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>
                    <Grid>
                        {categoryGifts.map((gift) => (
                            <Grid.Col key={gift.name} span={smallScreen ? 12 : 6}>
                                {createGiftCard(gift)}
                            </Grid.Col>
                        ))}
                    </Grid>
                </Accordion.Panel>
            </Accordion.Item>
        )
    }

    // Group gifts by category
    const giftsByCategory: Record<string, Gift[]> = {}
    availableGifts.forEach(gift => {
        if (!giftsByCategory[gift.category]) {
            giftsByCategory[gift.category] = []
        }
        giftsByCategory[gift.category].push(gift)
    })

    const height = globals.viewportHeightPx

    return (
        <div style={{ width: smallScreen ? "393px" : "810px", marginTop: globals.isPhoneScreen ? "60px" : "80px" }}>
            <Stack spacing="lg">
                <div>
                    <Text size="xl" weight={700} align="center">
                        Choose Your Gifts
                    </Text>
                    <Text size="sm" color="dimmed" align="center">
                        Select supernatural abilities from your tribe&apos;s gift traditions
                    </Text>
                </div>

                <ScrollArea style={{ height: height - 200 }}>
                    <Accordion variant="contained" multiple>
                        {Object.entries(giftsByCategory).map(([categoryName, categoryGifts]) =>
                            createCategoryAccordion(categoryName, categoryGifts)
                        )}
                    </Accordion>
                </ScrollArea>

                <Group position="center" spacing="lg">
                    <Text size="sm" color="dimmed">
                        Selected: {pickedGifts.length} gifts
                    </Text>
                    <Button
                        color="red"
                        onClick={() => {
                            setPickedGifts([])
                            setCharacter({
                                ...character,
                                gifts: [],
                                disciplines: [], // Keep for compatibility
                            })
                        }}
                        disabled={pickedGifts.length === 0}
                    >
                        Reset Selection
                    </Button>
                    <Button
                        disabled={!validToMove}
                        onClick={() => {
                            ReactGA.event({
                                action: "gifts completed",
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

export default GiftsPicker
