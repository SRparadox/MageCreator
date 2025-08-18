import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Divider, Grid, ScrollArea, Stack, Tabs, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { Character, MeritFlaw } from "../../data/Character"
import { MeritOrFlaw, meritsAndFlaws, backgroundsData } from "../../data/MeritsAndFlaws"
import { globals } from "../../globals"

type MeritsAndFlawsPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const flawIcon = () => {
    return <FontAwesomeIcon icon={faPlay} rotation={90} style={{ color: "#e03131" }} />
}
const meritIcon = () => {
    return <FontAwesomeIcon icon={faPlay} rotation={270} style={{ color: "rgb(47, 158, 68)" }} />
}
const backgroundIcon = () => {
    return <FontAwesomeIcon icon={faPlay} rotation={0} style={{ color: "#228be6" }} />
}

const MeritsAndFlawsPicker = ({ character, setCharacter, nextStep }: MeritsAndFlawsPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Merits-and-flaws Picker" })
    }, [])

    const [activeTab, setActiveTab] = useState<string | null>("merits")

    const [pickedMeritsAndFlaws, setPickedMeritsAndFlaws] = useState<MeritFlaw[]>([...character.merits, ...character.flaws])
    const [pickedBackgrounds, setPickedBackgrounds] = useState<MeritFlaw[]>([])

    // Werewolf 5e uses 7 points for advantages (merits) and 7 points for backgrounds
    const usedMeritsLevel = character.merits.reduce((acc, { level }) => acc + level, 0)

    const [remainingMerits, setRemainingMerits] = useState(7 - usedMeritsLevel)
    const [remainingBackgrounds, setRemainingBackgrounds] = useState(7) // Starting with 7 background points

    const getMeritOrFlawLine = (meritOrFlaw: MeritOrFlaw, type: "flaw" | "merit" | "background"): JSX.Element => {
        const buttonColor = type === "flaw" ? "red" : type === "merit" ? "green" : "blue"
        const icon = type === "flaw" ? flawIcon() : type === "merit" ? meritIcon() : backgroundIcon()

        const relevantList = type === "background" ? pickedBackgrounds : pickedMeritsAndFlaws
        const alreadyPickedItem = relevantList.find((l) => l.name === meritOrFlaw.name)
        const wasPickedLevel = alreadyPickedItem?.level ?? 0

        const createButton = (level: number) => {
            const cost = level
            return (
                <Button
                    key={meritOrFlaw.name + level}
                    disabled={!!wasPickedLevel && wasPickedLevel >= level}
                    onClick={() => {
                        if (type === "flaw") {
                            // Flaws give back merit points
                            setRemainingMerits(remainingMerits - wasPickedLevel + cost)
                        } else if (type === "background") {
                            if (remainingBackgrounds + wasPickedLevel < cost) return
                            setRemainingBackgrounds(remainingBackgrounds + wasPickedLevel - cost)
                            setPickedBackgrounds([
                                ...pickedBackgrounds.filter((m) => m.name !== alreadyPickedItem?.name),
                                { name: meritOrFlaw.name, level, type: "merit", summary: meritOrFlaw.summary },
                            ])
                            return
                        } else {
                            if (remainingMerits + wasPickedLevel < cost) return
                            setRemainingMerits(remainingMerits + wasPickedLevel - cost)
                        }
                        
                        if (type !== "background") {
                            setPickedMeritsAndFlaws([
                                ...pickedMeritsAndFlaws.filter((m) => m.name !== alreadyPickedItem?.name),
                                { name: meritOrFlaw.name, level, type, summary: meritOrFlaw.summary },
                            ])
                        }
                    }}
                    style={{ marginRight: "5px" }}
                    compact
                    variant="outline"
                    color={buttonColor}
                >
                    {level}
                </Button>
            )
        }

        const bg = alreadyPickedItem ? { 
            background: type === "flaw" ? "rgba(255, 25, 25, 0.2)" : 
                       type === "merit" ? "rgba(50, 255, 100, 0.2)" : 
                       "rgba(25, 100, 255, 0.2)" 
        } : {}
        
        const cost = wasPickedLevel
        return (
            <Text style={{ ...bg, padding: "5px" }} key={meritOrFlaw.name}>
                {icon} &nbsp;
                <b>{meritOrFlaw.name}</b> - {meritOrFlaw.summary}
                <span>
                    &nbsp; {meritOrFlaw.cost.map((i) => createButton(i))}
                    {alreadyPickedItem ? (
                        <Button
                            onClick={() => {
                                if (type === "background") {
                                    setPickedBackgrounds([...pickedBackgrounds.filter((m) => m.name !== alreadyPickedItem?.name)])
                                    setRemainingBackgrounds(remainingBackgrounds + cost)
                                } else {
                                    setPickedMeritsAndFlaws([...pickedMeritsAndFlaws.filter((m) => m.name !== alreadyPickedItem?.name)])
                                    if (type === "flaw") {
                                        setRemainingMerits(remainingMerits + cost)
                                    } else {
                                        setRemainingMerits(remainingMerits + cost)
                                    }
                                }
                            }}
                            style={{ marginRight: "5px" }}
                            compact
                            variant="subtle"
                            color={"yellow"}
                        >
                            Unpick
                        </Button>
                    ) : null}
                </span>
            </Text>
        )
    }

    const height = globals.viewportHeightPx
    return (
        <Stack align="center" mt={100}>
            <Text fz={globals.largeFontSize} ta={"center"}>
                Remaining Merit points: {remainingMerits} <br /> Remaining Background points: {remainingBackgrounds}
            </Text>

            <Tabs color="grape" value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab maw={"50%"} value="merits">
                        Merits & Flaws
                    </Tabs.Tab>
                    <Tabs.Tab maw={"50%"} value="backgrounds">
                        Backgrounds
                    </Tabs.Tab>
                </Tabs.List>

                {/* Merits & Flaws */}
                <Tabs.Panel value="merits" pt="xs">
                    <ScrollArea h={height - 330} w={"100%"} p={20}>
                        <Grid m={0}>
                            {meritsAndFlaws.map((category) => {
                                return (
                                    <Grid.Col span={6} key={category.title}>
                                        <Stack spacing={"xs"}>
                                            <Text fw={700} size={"xl"}>
                                                {category.title}
                                            </Text>
                                            <Divider mt={0} w={"50%"} />

                                            {category.merits.map((merit) => getMeritOrFlawLine(merit, "merit"))}
                                            {category.flaws.map((flaw) => getMeritOrFlawLine(flaw, "flaw"))}
                                        </Stack>
                                    </Grid.Col>
                                )
                            })}
                        </Grid>
                    </ScrollArea>
                </Tabs.Panel>

                {/* Backgrounds */}
                <Tabs.Panel value="backgrounds" pt="xs">
                    <ScrollArea h={height - 330} w={"100%"} p={20}>
                        <Grid m={0}>
                            <Grid.Col span={12}>
                                <Stack spacing={"xs"}>
                                    <Text fw={700} size={"xl"}>
                                        {backgroundsData.title}
                                    </Text>
                                    <Divider mt={0} w={"50%"} />
                                    <Text size="sm" c="dimmed">
                                        Backgrounds represent your character&apos;s connections, resources, and supernatural advantages.
                                    </Text>

                                    {backgroundsData.backgrounds.map((background) => getMeritOrFlawLine(background, "background"))}
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </ScrollArea>
                </Tabs.Panel>
            </Tabs>

            <Button
                color="grape"
                onClick={() => {
                    setCharacter({
                        ...character,
                        merits: [
                            ...pickedMeritsAndFlaws.filter((l) => l.type === "merit"),
                            ...pickedBackgrounds
                        ],
                        flaws: pickedMeritsAndFlaws.filter((l) => l.type === "flaw"),
                    })

                    ReactGA.event({
                        action: "merits confirm clicked",
                        category: "merits",
                        label: [...pickedMeritsAndFlaws, ...pickedBackgrounds].map((m) => `${m.name}: ${m.level}`).join(", "),
                    })

                    nextStep()
                }}
            >
                Confirm
            </Button>
        </Stack>
    )
}

export default MeritsAndFlawsPicker
