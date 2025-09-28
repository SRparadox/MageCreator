import { Button, Divider, Grid, Group, ScrollArea, Space, Text, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { Character } from "../../data/Character"
import { Skills, SkillsKey, emptySkills, skillsDescriptions, skillsKeySchema } from "../../data/Skills"
import { globals } from "../../globals"
import { upcase } from "../utils"
import { MageSpecialtyModal } from "./MageSpecialtyModal"

type MageSkillsPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

type SkillsSetting = {
    special: SkillsKey[]
    strongest: SkillsKey[]
    decent: SkillsKey[]
    acceptable: SkillsKey[]
}

type DistributionKey = "Jack of All Trades" | "Balanced" | "Specialist"

type SkillDistribution = { strongest: number; decent: number; acceptable: number; special: number }

const distributionDescriptions: Record<DistributionKey, string> = {
    "Jack of All Trades": "Decent at many things, good at none (1/8/10)",
    Balanced: "Best default choice (3/5/7)",
    Specialist: "Uniquely great at one thing, bad at most (1/3/3/3)",
}

const distributionByType: Record<DistributionKey, SkillDistribution> = {
    "Jack of All Trades": {
        special: 0,
        strongest: 1,
        decent: 8,
        acceptable: 10,
    },
    Balanced: {
        special: 0,
        strongest: 3,
        decent: 5,
        acceptable: 7,
    },
    Specialist: {
        special: 1,
        strongest: 3,
        decent: 3,
        acceptable: 3,
    },
}

const MageSkillsPicker = ({ character, setCharacter, nextStep }: MageSkillsPickerProps) => {
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false)
    const [pickedDistribution, setPickedDistribution] = useState<DistributionKey | null>(null)
    const [pickedSkills, setPickedSkills] = useState<SkillsSetting>({
        special: [],
        strongest: [],
        decent: [],
        acceptable: [],
    })

    const phoneScreen = globals.isPhoneScreen
    const smallScreen = globals.isSmallScreen
    const height = globals.height
    const heightBreakPoint = 900

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/skills" })
    }, [])

    const distr = pickedDistribution ? distributionByType[pickedDistribution] : { strongest: 0, decent: 0, acceptable: 0, special: 0 }

    const skills: Skills = (() => {
        let s = { ...emptySkills }
        pickedSkills.special.forEach((skill) => (s[skill] = 4))
        pickedSkills.strongest.forEach((skill) => (s[skill] = 3))
        pickedSkills.decent.forEach((skill) => (s[skill] = 2))
        pickedSkills.acceptable.forEach((skill) => (s[skill] = 1))
        return s
    })()

    const getAll = (pickedSkills: SkillsSetting): SkillsKey[] => [
        ...pickedSkills.special,
        ...pickedSkills.strongest,
        ...pickedSkills.decent,
        ...pickedSkills.acceptable,
    ]

    const skillLabels = Object.keys(emptySkills) as SkillsKey[]

    const createSkillButton = (skill: SkillsKey, i: number) => {
        const alreadyPicked = getAll(pickedSkills).includes(skill)

        const onClick = () => {
            if (alreadyPicked) return
            if (pickedSkills.special.length < distr.special) {
                setPickedSkills({ ...pickedSkills, special: [...pickedSkills.special, skill] })
            } else if (pickedSkills.strongest.length < distr.strongest) {
                setPickedSkills({ ...pickedSkills, strongest: [...pickedSkills.strongest, skill] })
            } else if (pickedSkills.decent.length < distr.decent) {
                setPickedSkills({ ...pickedSkills, decent: [...pickedSkills.decent, skill] })
            } else if (pickedSkills.acceptable.length < distr.acceptable) {
                setPickedSkills({ ...pickedSkills, acceptable: [...pickedSkills.acceptable, skill] })
                openModal()
            }
        }

        const dots = (() => {
            if (pickedSkills.special.includes(skill)) return "🚀"
            if (pickedSkills.strongest.includes(skill)) return "🥇"
            if (pickedSkills.decent.includes(skill)) return "🥈"
            if (pickedSkills.acceptable.includes(skill)) return "🥉"
            return ""
        })()

        const trackClick = () => {
            ReactGA.event({
                action: "skill clicked",
                category: "skills",
                label: skill,
            })
        }

        return (
            <Grid.Col key={skill} span={4}>
                <Tooltip
                    disabled={alreadyPicked}
                    label={skillsDescriptions[skill]}
                    transitionProps={{ transition: "slide-up", duration: 200 }}
                    events={globals.tooltipTriggerEvents}
                >
                    <Button
                        p={phoneScreen ? 0 : "default"}
                        variant={alreadyPicked ? "outline" : "filled"}
                        leftIcon={dots}
                        disabled={pickedDistribution === null}
                        color="grape"
                        fullWidth
                        onClick={() => {
                            trackClick()
                            onClick()
                        }}
                    >
                        <Text fz={phoneScreen ? 12 : "inherit"}>{upcase(skill)}</Text>
                    </Button>
                </Tooltip>
                {i % 3 === 0 || i % 3 === 1 ? <Divider size="xl" orientation="vertical" /> : null}
            </Grid.Col>
        )
    }

    const toPick = (() => {
        if (pickedSkills.special.length < distr.special) return "special"
        if (pickedSkills.strongest.length < distr.strongest) return "strongest"
        if (pickedSkills.decent.length < distr.decent) return "decent"
        else return "acceptable"
    })()

    const specialStyle = toPick === "special" ? { fontSize: globals.largeFontSize } : { fontSize: globals.smallFontSize, color: "grey" }
    const strongestStyle = toPick === "strongest" ? { fontSize: globals.largeFontSize } : { fontSize: globals.smallFontSize, color: "grey" }
    const decentStyle = toPick === "decent" ? { fontSize: globals.largeFontSize } : { fontSize: globals.smallFontSize, color: "grey" }
    const acceptableStyle =
        toPick === "acceptable" ? { fontSize: globals.largeFontSize } : { fontSize: globals.smallFontSize, color: "grey" }

    const closeModalAndUndoLastPick = () => {
        setPickedSkills({ ...pickedSkills, acceptable: pickedSkills.acceptable.slice(0, -1) })
        closeModal()
    }

    const createSkillButtons = () => (
        <Group>
            <Grid grow m={0}>
                <Grid.Col span={4}>
                    <Text fs="italic" fw={700} ta="center">
                        Physical
                    </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Text fs="italic" fw={700} ta="center">
                        Social
                    </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Text fs="italic" fw={700} ta="center">
                        Mental
                    </Text>
                </Grid.Col>
                {[
                    "athletics",
                    "animal ken",
                    "academics",
                    "brawl",
                    "etiquette",
                    "awareness",
                    "craft",
                    "insight",
                    "finance",
                    "drive",
                    "intimidation",
                    "investigation",
                    "firearms",
                    "leadership",
                    "medicine",
                    "melee",
                    "performance",
                    "occult",
                    "larceny",
                    "persuasion",
                    "politics",
                    "stealth",
                    "streetwise",
                    "science",
                    "survival",
                    "subterfuge",
                    "technology",
                ].map((skill, i) => createSkillButton(skill as SkillsKey, i))}
            </Grid>
        </Group>
    )

    return (
        <div style={{ width: smallScreen ? "100%" : "50%" }}>
            {!pickedDistribution && (
                <>
                    <Text mt={"xl"} ta="center" fz="xl" fw={700} c="red">
                        Select Distribution
                    </Text>
                    <hr color="#e03131" />

                    <Space h="sm" />
                    <Grid grow m={0}>
                        {(Object.keys(distributionByType) as DistributionKey[]).map((distribution) => {
                            return (
                                <Grid.Col key={distribution} span={4}>
                                    <Tooltip
                                        disabled={pickedDistribution !== null}
                                        label={distributionDescriptions[distribution]}
                                        transitionProps={{ transition: "slide-up", duration: 200 }}
                                        events={globals.tooltipTriggerEvents}
                                    >
                                        <Button
                                            p={phoneScreen ? 0 : "default"}
                                            disabled={pickedDistribution !== null}
                                            color="red"
                                            fullWidth
                                            onClick={() => {
                                                setPickedDistribution(distribution)
                                            }}
                                        >
                                            <Text fz={phoneScreen ? 12 : "inherit"}>{distribution}</Text>
                                        </Button>
                                    </Tooltip>
                                </Grid.Col>
                            )
                        })}
                    </Grid>
                    <Space h="xl" />
                </>
            )}

            {pickedDistribution && (
                <div>
                    <Text ta="center" fw={700} fz="lg" c="red" mb="md">
                        {pickedDistribution} Distribution
                    </Text>
                    <Text ta="center" fz="sm" c="orange" mb="sm">
                        🚀 = Special (4 dots) | 🥇 = Strongest (3 dots) | 🥈 = Decent (2 dots) | 🥉 = Acceptable (1 dot)
                    </Text>
                    <Group position="center" spacing="xs" mb="md">
                        <Text style={specialStyle}>
                            {toPick === "special" ? ">" : ""} Pick your <b>{distr.special - pickedSkills.special.length} specialty</b> skill
                        </Text>
                        <Text style={strongestStyle}>
                            {toPick === "strongest" ? ">" : ""} Pick your <b>{distr.strongest - pickedSkills.strongest.length} strongest</b> skills
                        </Text>
                        <Text style={decentStyle}>
                            {toPick === "decent" ? ">" : ""} Pick your <b>{distr.decent - pickedSkills.decent.length} decent</b> skills
                        </Text>
                        <Text style={acceptableStyle}>
                            {toPick === "acceptable" ? ">" : ""} Pick your <b>{distr.acceptable - pickedSkills.acceptable.length} acceptable</b> skills
                        </Text>
                    </Group>
                </div>
            )}

            <Text mt={"xl"} ta="center" fz="xl" fw={700} c="red">
                Skills
            </Text>
            <hr color="#e03131" />

            <Space h="sm" />

            {height < heightBreakPoint ? <ScrollArea h={height - 340}>{createSkillButtons()}</ScrollArea> : createSkillButtons()}

            <MageSpecialtyModal
                modalOpened={modalOpened}
                closeModal={closeModalAndUndoLastPick}
                setCharacter={setCharacter}
                nextStep={nextStep}
                character={character}
                pickedSkillNames={getAll(pickedSkills)}
                skills={skills}
            />
        </div>
    )
}

export default MageSkillsPicker