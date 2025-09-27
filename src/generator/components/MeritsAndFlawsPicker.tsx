import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Divider, Grid, Group, NumberInput, ScrollArea, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { Character, MeritFlaw } from "../../data/Character"
import { MeritOrFlaw, meritsAndFlaws } from "../../data/MeritsAndFlaws"
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

const MeritsAndFlawsPicker = ({ character, setCharacter, nextStep }: MeritsAndFlawsPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Merits-and-flaws Picker" })
    }, [])

    const [pickedMeritsAndFlaws, setPickedMeritsAndFlaws] = useState<MeritFlaw[]>([...character.merits, ...character.flaws])

    // Calculate current totals
    const usedMeritsLevel = pickedMeritsAndFlaws.filter(m => m.type === "merit").reduce((acc: number, { level }) => acc + level, 0)
    const usedFlawsLevel = pickedMeritsAndFlaws.filter(f => f.type === "flaw").reduce((acc: number, { level }) => acc + level, 0)

    // Merit points available = 7 normally, 9 if you take 2 dots in flaws
    const maxMerits = usedFlawsLevel === 2 ? 9 : 7
    const remainingMerits = maxMerits - usedMeritsLevel
    
    // Maximum 2 dots in flaws (optional)
    const maxFlaws = 2
    const remainingFlaws = maxFlaws - usedFlawsLevel
    const canProceed = usedMeritsLevel <= maxMerits && usedFlawsLevel <= maxFlaws

    const getMeritOrFlawLine = (meritOrFlaw: MeritOrFlaw, type: "flaw" | "merit"): JSX.Element => {
        const buttonColor = type === "flaw" ? "red" : "green"
        const icon = type === "flaw" ? flawIcon() : meritIcon()

        const alreadyPickedItem = pickedMeritsAndFlaws.find((l: MeritFlaw) => l.name === meritOrFlaw.name)
        const wasPickedLevel = alreadyPickedItem?.level ?? 0

        const createButton = (level: number) => {
            const cost = level
            const canAfford = type === "merit" ? 
                (remainingMerits + wasPickedLevel >= cost) : 
                (remainingFlaws + wasPickedLevel >= cost && usedFlawsLevel - wasPickedLevel + cost <= maxFlaws)
                
            return (
                <Button
                    key={meritOrFlaw.name + level}
                    disabled={(!canAfford) || (!!wasPickedLevel && wasPickedLevel >= level)}
                    onClick={() => {
                        setPickedMeritsAndFlaws([
                            ...pickedMeritsAndFlaws.filter((m: MeritFlaw) => m.name !== alreadyPickedItem?.name),
                            { name: meritOrFlaw.name, level, type, summary: meritOrFlaw.summary },
                        ])
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
            background: type === "flaw" ? "rgba(255, 25, 25, 0.2)" : "rgba(50, 255, 100, 0.2)"
        } : {}
        
        return (
            <Text style={{ ...bg, padding: "5px" }} key={meritOrFlaw.name}>
                {icon} &nbsp;
                <b>{meritOrFlaw.name}</b> - {meritOrFlaw.summary}
                <span>
                    &nbsp; {meritOrFlaw.cost.map((i) => createButton(i))}
                    {alreadyPickedItem ? (
                        <Button
                            onClick={() => {
                                setPickedMeritsAndFlaws([...pickedMeritsAndFlaws.filter((m: MeritFlaw) => m.name !== alreadyPickedItem?.name)])
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
            <div>
                <Text fz={globals.largeFontSize} ta={"center"}>
                    Merit Points: {usedMeritsLevel} / {maxMerits} {usedFlawsLevel === 2 ? "(Bonus from 2 flaws)" : ""}
                </Text>
                <Text fz={globals.largeFontSize} ta={"center"}>
                    Flaw Points: {usedFlawsLevel} / {maxFlaws} (Optional - taking 2 flaws gives +2 merit points)
                </Text>
                {usedMeritsLevel > maxMerits && (
                    <Text fz={globals.largeFontSize} ta={"center"} color="red">
                        Too many merit points! Remove {usedMeritsLevel - maxMerits} points
                    </Text>
                )}
            </div>

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

            <Button
                color="grape"
                disabled={!canProceed}
                onClick={() => {
                    setCharacter({
                        ...character,
                        merits: pickedMeritsAndFlaws.filter((l: MeritFlaw) => l.type === "merit"),
                        flaws: pickedMeritsAndFlaws.filter((l: MeritFlaw) => l.type === "flaw"),
                    })

                    ReactGA.event({
                        action: "merits confirm clicked",
                        category: "merits",
                        label: pickedMeritsAndFlaws.map((m: MeritFlaw) => `${m.name}: ${m.level}`).join(", "),
                    })

                    nextStep()
                }}
            >
                {canProceed ? "Confirm" : 
                 usedMeritsLevel > maxMerits ? `Too many merits (${usedMeritsLevel}/${maxMerits})` :
                 usedFlawsLevel > maxFlaws ? `Too many flaws (${usedFlawsLevel}/${maxFlaws})` : 
                 "Confirm"}
            </Button>
        </Stack>
    )
}

export default MeritsAndFlawsPicker
