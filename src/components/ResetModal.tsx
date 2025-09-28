import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Divider, Group, Modal, Stack, Text } from "@mantine/core"
import { Character, getEmptyCharacter } from "../data/Character"

export type ResetModalProps = {
    setCharacter: (character: Character) => void
    setSelectedStep: (step: number) => void
    resetModalOpened: boolean
    closeResetModal: () => void
}

const ResetModal = ({ resetModalOpened, closeResetModal, setCharacter, setSelectedStep }: ResetModalProps) => {
    return (
        <Modal 
            opened={resetModalOpened} 
            onClose={closeResetModal} 
            title="" 
            centered 
            withCloseButton={false}
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
        >
            <Stack>
                <Text fz={"xl"} ta="center">
                    Reset current character?
                </Text>
                <Divider my="sm" />
                <Group position="apart">
                    <Button color="yellow" variant="subtle" leftIcon={<FontAwesomeIcon icon={faXmark} />} onClick={closeResetModal}>
                        Cancel
                    </Button>

                    <Button
                        color="red"
                        onClick={async () => {
                            setCharacter(getEmptyCharacter())
                            setSelectedStep(0)

                            closeResetModal()
                        }}
                    >
                        Reset character
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}

export default ResetModal
