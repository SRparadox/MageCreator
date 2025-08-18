import { List, Stack, Text, Title } from "@mantine/core"
import { auspices } from "../../data/Auspices"
import { AuspiceName } from "../../data/NameSchemas"

export type AuspiceDisplayProps = {
    auspiceName: string
}

const AuspiceDisplay = ({ auspiceName }: AuspiceDisplayProps) => {
    const auspice = auspices[auspiceName as AuspiceName]
    
    if (!auspice || !auspiceName) {
        return null
    }

    const textStyle: React.CSSProperties = {
        fontFamily: "Courier New",
    }

    return (
        <Stack>
            <Title order={2}>Auspice</Title>
            <Text style={textStyle}>
                <b>{auspice.name}</b> ({auspice.moonPhase})
            </Text>
            <Text c="dimmed" style={textStyle}>
                {auspice.role}
            </Text>
            <Text size="sm" style={textStyle}>
                Primary Renown: <b>{auspice.renown}</b>
            </Text>
            {auspice.gifts && auspice.gifts.length > 0 && (
                <>
                    <Text size="sm" style={textStyle}>
                        <b>Available Gifts:</b>
                    </Text>
                    <List size="sm">
                        {auspice.gifts.map((gift) => (
                            <List.Item key={gift}>
                                <Text size="sm" style={textStyle}>
                                    {gift}
                                </Text>
                            </List.Item>
                        ))}
                    </List>
                </>
            )}
        </Stack>
    )
}

export default AuspiceDisplay
