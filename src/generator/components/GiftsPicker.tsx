import { Accordion, Badge, Button, Card, Grid, Group, ScrollArea, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { Character } from "../../data/Character"
import { Gift, GiftType, gifts } from "../../data/Gifts"
import { globals } from "../../globals"
import { upcase } from "../utils"
import { GiftName } from "~/data/NameSchemas"

type GiftsPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const getAvailableGifts = (character: Character): Record<GiftName, GiftType> => {
    const availableGifts: Record<string, GiftType> = {}
    for (const n of character.availableGiftNames) {
        availableGifts[n] = gifts[n]
    }

    return availableGifts
}

const GiftsPicker = ({ character, setCharacter, nextStep }: GiftsPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Gifts Picker" })
    }, [])

    const smallScreen = globals.isSmallScreen
    const [pickedGifts, setPickedGifts] = useState<Gift[]>([])

    const allPickedGifts = pickedGifts

    const giftsForTribe = getAvailableGifts(character)

    const isPicked = (gift: Gift) => {
        return allPickedGifts.map((gift) => gift.name).includes(gift.name)
    }

    const maxGiftsPerType = 2 // Werewolf characters typically start with 2 gifts per type
    const canPickMoreGifts = (giftType: GiftName) => {
        const currentCount = allPickedGifts.filter((p) => p.gift === giftType).length
        return currentCount < maxGiftsPerType
    }

    const validToMove = pickedGifts.length >= 3 // Minimum 3 gifts to start

    const createGiftCard = (gift: Gift) => {
        const picked = isPicked(gift)
        const disabled = picked || !canPickMoreGifts(gift.gift)

        return (
            <Card key={gift.name} withBorder shadow="sm" style={{ opacity: disabled ? 0.5 : 1 }}>
                <Stack spacing="xs">
                    <Group position="apart" align="flex-start">
                        <Text weight={500} size="sm">
                            {gift.name}
                        </Text>
                        <Badge size="xs" color={picked ? "green" : "gray"}>
                            Level {gift.level}
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
                                "rage": "potence",
                                "wisdom": "auspex", 
                                "war": "potence",
                                "nature": "animalism",
                                "technology": "obfuscate",
                                "spirit": "auspex",
                                "shadow": "obfuscate",
                                "": ""
                            } as const
                            
                            const disciplinesFormat = newGifts.map(g => ({
                                name: g.name,
                                description: g.description,
                                summary: g.summary,
                                dicePool: g.dicePool,
                                level: g.level,
                                discipline: giftToDisciplineMap[g.gift] || "",
                                rouseChecks: 0, // Gifts don't use rouse checks
                                amalgamPrerequisites: [],
                            }))
                            
                            setCharacter({
                                ...character,
                                gifts: newGifts,
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

    const createGiftTypeAccordion = (giftTypeName: GiftName, giftType: GiftType) => {
        if (!giftType.powers.length) return null

        const pickedCount = allPickedGifts.filter((p) => p.gift === giftTypeName).length
        const maxCount = maxGiftsPerType

        return (
            <Accordion.Item key={giftTypeName} value={giftTypeName}>
                <Accordion.Control>
                    <Group position="apart">
                        <Text weight={500}>{upcase(giftTypeName)} Gifts</Text>
                        <Badge color={pickedCount >= maxCount ? "green" : "blue"}>
                            {pickedCount}/{maxCount}
                        </Badge>
                    </Group>
                    <Text size="sm" color="dimmed">
                        {giftType.summary}
                    </Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <Grid>
                        {giftType.powers.map((gift) => (
                            <Grid.Col key={gift.name} span={smallScreen ? 12 : 6}>
                                {createGiftCard(gift)}
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
                        Choose Your Gifts
                    </Text>
                    <Text size="sm" color="dimmed" align="center">
                        Select supernatural abilities from your tribe&apos;s gift traditions
                    </Text>
                </div>

                <ScrollArea style={{ height: height - 200 }}>
                    <Accordion variant="contained" multiple>
                        {Object.entries(giftsForTribe).map(([giftTypeName, giftType]) =>
                            createGiftTypeAccordion(giftTypeName as GiftName, giftType)
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
