import { Stack, Text } from "@mantine/core"
import { Rite } from "../../data/Rites"

type RitesDisplayProps = {
    rites: Rite[]
}

const RitesDisplay = ({ rites }: RitesDisplayProps) => {
    if (!rites || rites.length === 0) return null

    return (
        <div style={{ background: "rgba(0, 0, 0, 0.6)", padding: "10px" }}>
            <Text fz={"lg"} fw={700}>
                Rites
            </Text>
            <Stack spacing="xs">
                {rites.map((rite) => (
                    <div key={rite.name}>
                        <Text fz="sm" fw={600} color="blue">
                            {rite.name}
                        </Text>
                        <Text fz="xs" color="dimmed">
                            {rite.summary}
                        </Text>
                        <Text fz="xs" color="green">
                            Pool: {rite.pool} | Difficulty: {rite.difficulty}
                        </Text>
                        {rite.renown && (
                            <Text fz="xs" color="yellow">
                                Renown: {rite.renown}
                            </Text>
                        )}
                    </div>
                ))}
            </Stack>
        </div>
    )
}

export default RitesDisplay