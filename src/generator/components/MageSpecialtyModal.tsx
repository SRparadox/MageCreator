import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Divider, Group, Modal, Select, Stack, Text, TextInput } from "@mantine/core"
import { useState } from "react"
import { Character } from "../../data/Character"
import { Skills, SkillsKey, skillsKeySchema } from "../../data/Skills"
import { Specialty } from "../../data/Specialties"
import { globals } from "../../globals"
import { intersection, lowcase, upcase } from "../utils"

type MageSpecialtyModalProps = {
    modalOpened: boolean
    closeModal: () => void
    character: Character
    pickedSkillNames: SkillsKey[]
    skills: Skills
    setCharacter: (character: Character) => void
    nextStep: () => void
}

type SpecialtySkill = "academics" | "craft" | "performance" | "science"

export const MageSpecialtyModal = ({
    modalOpened,
    closeModal,
    setCharacter,
    nextStep,
    character,
    pickedSkillNames,
    skills,
}: MageSpecialtyModalProps) => {
    const smallScreen = globals.isSmallScreen
    const phoneScreen = globals.isPhoneScreen

    // Three free specialties for mages (academics, craft, performance, science + 2 additional)
    const [pickedSkillDisplay1, setPickedSkillDisplay1] = useState<string>("")
    const [pickedSkillSpecialty1, setPickedSkillSpecialty1] = useState("")
    
    const [pickedSkillDisplay2, setPickedSkillDisplay2] = useState<string>("")
    const [pickedSkillSpecialty2, setPickedSkillSpecialty2] = useState("")

    const [academicsSpecialty, setAcademicsSpecialty] = useState("")
    const [craftSpecialty, setCraftSpecialty] = useState("")
    const [performanceSpecialty, setPerformanceSpecialty] = useState("")
    const [scienceSpecialty, setScienceSpecialty] = useState("")

    const specialtySkills = ["academics", "craft", "performance", "science"]

    const specialtyStates: Record<SpecialtySkill, { value: string; setValue: (s: string) => void }> = {
        academics: { value: academicsSpecialty, setValue: setAcademicsSpecialty },
        craft: { value: craftSpecialty, setValue: setCraftSpecialty },
        performance: { value: performanceSpecialty, setValue: setPerformanceSpecialty },
        science: { value: scienceSpecialty, setValue: setScienceSpecialty },
    }

    const pickedSpecialtySkills = intersection(specialtySkills, pickedSkillNames) as SpecialtySkill[]
    const pickedSkill1 = lowcase(pickedSkillDisplay1)
    const pickedSkill2 = lowcase(pickedSkillDisplay2)

    const inputW = phoneScreen ? 140 : 200
    
    // Filter out specialty skills and already selected skills
    const availableSkillsForExtra = pickedSkillNames.filter((s) => 
        !specialtySkills.includes(s) && 
        s !== pickedSkill1 && 
        s !== pickedSkill2
    )

    const canProceed = () => {
        // Check if all specialty skills that were picked have specialties assigned
        const specialtySkillsComplete = pickedSpecialtySkills.every(skill => 
            specialtyStates[skill].value.trim() !== ""
        )
        
        // Check if both extra specialties are properly filled
        const extraSpecialty1Complete = !pickedSkill1 || pickedSkillSpecialty1.trim() !== ""
        const extraSpecialty2Complete = !pickedSkill2 || pickedSkillSpecialty2.trim() !== ""
        
        return specialtySkillsComplete && extraSpecialty1Complete && extraSpecialty2Complete
    }

    return (
        <Modal
            withCloseButton={false}
            size="lg"
            opened={modalOpened}
            onClose={closeModal}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            styles={{
                content: {
                    backgroundColor: 'var(--mantine-color-body)',
                },
                body: {
                    backgroundColor: 'var(--mantine-color-body)',
                },
                header: {
                    backgroundColor: 'var(--mantine-color-body)',
                },
                inner: {
                    backgroundColor: 'transparent',
                },
            }}
            title={
                <div>
                    <Text w={smallScreen ? "300px" : "600px"} fw={700} fz={"30px"} ta="center">
                        Mage Specialties
                    </Text>
                    <Text fw={400} fz={"md"} ta="center" mt={"md"} color="grey">
                        Mages get 2 extra free specialties in addition to the standard skill specialties
                    </Text>
                    <Text fw={400} fz={"md"} ta="center" mt={"md"} color="grey">
                        A specialty should not be so broad that it applies to most uses of the skill
                    </Text>
                </div>
            }
            centered
        >
            <Stack style={{ minHeight: "450px", display: "flex", flexDirection: "column" }}>
                <Divider my="sm" />
                
                {/* Standard skill specialties */}
                {pickedSpecialtySkills.length > 0 && (
                    <>
                        <Text fw={700} fz={"lg"}>
                            Standard Skill Specialties
                        </Text>
                        {pickedSpecialtySkills.map((s) => (
                            <div key={s}>
                                <Group position="apart">
                                    <Text fw={700} fz={phoneScreen ? "sm" : "md"}>
                                        {upcase(s)}:
                                    </Text>
                                    <TextInput
                                        w={inputW}
                                        placeholder="Enter specialty"
                                        value={specialtyStates[s].value}
                                        onChange={(event) => specialtyStates[s].setValue(event.currentTarget.value)}
                                    />
                                </Group>
                                <Divider my="sm" variant="dotted" />
                            </div>
                        ))}
                    </>
                )}

                {/* Extra mage specialties */}
                <Text fw={700} fz={"lg"}>
                    Bonus Mage Specialties (Choose 2)
                </Text>
                
                {/* First extra specialty */}
                <Group position="apart">
                    <Select
                        w={inputW}
                        label="First Specialty Skill"
                        placeholder="Pick one"
                        searchable
                        onSearchChange={setPickedSkillDisplay1}
                        searchValue={pickedSkillDisplay1}
                        nothingFound="No options"
                        dropdownPosition="bottom"
                        data={availableSkillsForExtra.map(upcase)}
                    />

                    <TextInput
                        w={inputW}
                        label="Specialty Name"
                        placeholder="Enter specialty"
                        value={pickedSkillSpecialty1}
                        onChange={(event) => setPickedSkillSpecialty1(event.currentTarget.value)}
                    />
                </Group>
                <Divider my="sm" variant="dotted" />

                {/* Second extra specialty */}
                <Group position="apart">
                    <Select
                        w={inputW}
                        label="Second Specialty Skill"
                        placeholder="Pick one"
                        searchable
                        onSearchChange={setPickedSkillDisplay2}
                        searchValue={pickedSkillDisplay2}
                        nothingFound="No options"
                        dropdownPosition="bottom"
                        data={pickedSkillNames.filter((s) => 
                            !specialtySkills.includes(s) && 
                            s !== pickedSkill1
                        ).map(upcase)}
                    />

                    <TextInput
                        w={inputW}
                        label="Specialty Name"
                        placeholder="Enter specialty"
                        value={pickedSkillSpecialty2}
                        onChange={(event) => setPickedSkillSpecialty2(event.currentTarget.value)}
                    />
                </Group>

                <Group position="apart" style={{ marginTop: "auto" }}>
                    <Button color="yellow" variant="subtle" leftIcon={<FontAwesomeIcon icon={faChevronLeft} />} onClick={closeModal}>
                        Back
                    </Button>

                    <Button
                        color="grape"
                        disabled={!canProceed()}
                        onClick={async () => {
                            let pickedSpecialties = specialtySkills.reduce<Specialty[]>((acc, s) => {
                                if (specialtyStates[s as SpecialtySkill].value.trim()) {
                                    return [...acc, { 
                                        skill: skillsKeySchema.parse(s), 
                                        name: specialtyStates[s as SpecialtySkill].value.trim() 
                                    }]
                                }
                                return acc
                            }, [])
                            
                            // Add the two extra specialties
                            if (pickedSkill1 && pickedSkillSpecialty1.trim()) {
                                pickedSpecialties.push({ 
                                    skill: skillsKeySchema.parse(pickedSkill1), 
                                    name: pickedSkillSpecialty1.trim() 
                                })
                            }
                            
                            if (pickedSkill2 && pickedSkillSpecialty2.trim()) {
                                pickedSpecialties.push({ 
                                    skill: skillsKeySchema.parse(pickedSkill2), 
                                    name: pickedSkillSpecialty2.trim() 
                                })
                            }

                            closeModal()
                            setCharacter({ ...character, skills: skills, skillSpecialties: pickedSpecialties })
                            nextStep()
                        }}
                    >
                        Confirm
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}

export default MageSpecialtyModal