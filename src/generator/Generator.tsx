import { Center, Text } from "@mantine/core"
import { Character } from "../data/Character"
import { containsRituals } from "../data/Gifts"
import AttributePicker from "./components/AttributePicker"
import BasicsPicker from "./components/BasicsPicker"
import TribePicker from "./components/TribePicker"
import GiftsPicker from "./components/GiftsPicker"
import Final from "./components/Final"
import AuspicePicker from "./components/AuspicePicker"
import Intro from "./components/Intro"
import MeritsAndFlawsPicker from "./components/MeritsAndFlawsPicker"

import SkillsPicker from "./components/SkillsPicker"
import TouchstonePicker from "./components/TouchstonePicker"
import ErrorBoundary from "../components/ErrorBoundary"
import RitualsPicker from "./components/RitualsPicker"

export type GeneratorProps = {
    character: Character
    setCharacter: (character: Character) => void

    selectedStep: number
    setSelectedStep: (step: number) => void
}

const Generator = ({ character, setCharacter, selectedStep, setSelectedStep }: GeneratorProps) => {
    const getStepComponent = () => {
        // Unclean solution: Stepper in AsideBar only gives us an index to use here and if we don't have a blood-sorcery step (at 8) it breaks alignment of the steps. Ideally we'd get a string from the stepper rather than a number and then we wouldn't have to map things here
        const patchedSelectedStep = !containsRituals(character.gifts) && selectedStep >= 8 ? selectedStep + 1 : selectedStep
        switch (patchedSelectedStep) {
            case 0:
                return (
                    <Intro
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 1:
                return (
                    <TribePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 2:
                return (
                    <AttributePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 3:
                return (
                    <SkillsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 4:
                return (
                    <AuspicePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 5:
                return (
                    <BasicsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 6:
                return (
                    <AttributePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 7:
                return (
                    <SkillsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 8:
                return (
                    <GiftsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 9:
                return (
                    <RitualsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 10:
                return (
                    <TouchstonePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 11:
                return (
                    <MeritsAndFlawsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 12:
                return <Final character={character} setCharacter={setCharacter} setSelectedStep={setSelectedStep} />
            default:
                return <Text size={"xl"}>{`Error: Step ${selectedStep} is not implemented`}</Text>
        }
    }

    return (
        <Center h={"100%"}>
            <ErrorBoundary key={selectedStep}>{getStepComponent()}</ErrorBoundary>
        </Center>
    )
}

export default Generator
