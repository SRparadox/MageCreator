import { Aside, Center, ScrollArea, Stepper } from "@mantine/core"
import { Character } from "../data/Character"
import { isDefault, upcase } from "../generator/utils"
import { globals } from "../globals"

export type AsideBarProps = {
    selectedStep: number
    setSelectedStep: (step: number) => void
    character: Character
}

const AsideBar = ({ selectedStep, setSelectedStep, character }: AsideBarProps) => {
    // const smallScreen = globals.isSmallScreen
    const stepperKeys = [
        "clan", // Maps to tribe
        "attributes",
        "skills", 
        "auspice", // Werewolf auspice selection
        "name",
        "disciplines", // Maps to gifts
        "touchstones",
        "merits",
    ] as (keyof Character)[]

    const isHigherLevelAccessible = (character: Character, key: keyof Character) => {
        const index = Math.max(0, stepperKeys.indexOf(key) - 1) // if n-1 is not default then we can jump to n

        for (let i = index; i < stepperKeys.length; i++) {
            if (!isDefault(character, stepperKeys[i])) return true
        }
        return false
    }

    const getStepper = () => {
        return (
            <Stepper
                color="grape"
                orientation="vertical"
                active={selectedStep}
                onStepClick={(x) => {
                    setSelectedStep(x)
                }}
                breakpoint="sm"
            >
                <Stepper.Step key={"Intro"} label={"Intro"} description="">
                    {" "}
                </Stepper.Step>
                {stepperKeys.map((title) => {
                    let displayTitle = title === "clan" ? "Tribe" : upcase(title)
                    if (title === "auspice") displayTitle = "Auspice"
                    if (title === "disciplines") displayTitle = "Gifts"
                    
                    return (
                        <Stepper.Step
                            key={title}
                            label={displayTitle}
                            description=""
                            disabled={!isHigherLevelAccessible(character, title)}
                        >
                            {" "}
                        </Stepper.Step>
                    )
                })}
                <Stepper.Step key={"Final"} label={"Final"} description="" disabled={isDefault(character, "disciplines")}>
                    {" "}
                </Stepper.Step>
            </Stepper>
        )
    }

    const height = globals.viewportHeightPx
    const scrollerHeight = 940
    return (
        <Aside p="md" hiddenBreakpoint="sm" width={{ xs: 200 }} style={{ zIndex: 0 }}>
            <Center h={"100%"}>
                {height <= scrollerHeight ? <ScrollArea h={height - 100}>{getStepper()}</ScrollArea> : <>{getStepper()}</>}
            </Center>
        </Aside>
    )
}

export default AsideBar
