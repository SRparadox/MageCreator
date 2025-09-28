import { Box, Card, Center, Grid, Image, ScrollArea, Text, Title, useMantineTheme } from "@mantine/core"
import { useState, useEffect } from "react"
import React from "react"
import { Character } from "../../data/Character"
import { covens, Coven } from "../../data/Covens"
import { covenNameSchema, CovenName } from "../../data/NameSchemas"
import { globals } from "../../globals"
import ReactGA from "react-ga4"

export type CovenPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const CovenPicker = ({ character, setCharacter, nextStep }: CovenPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Coven Picker" })
    }, [])

    const theme = useMantineTheme()
    const c1 = "rgba(26, 27, 30, 0.90)"

    const handleCovenClick = (coven: CovenName) => {
        setCharacter({
            ...character,
            coven,
        })
        ReactGA.event({ action: "coven clicked", category: "covens", label: coven });
        nextStep();
    }

    const createCovenPick = (coven: Coven, c2: string) => {
        const bgColor = theme.fn.linearGradient(0, c1, c2)
        return (
            <Grid.Col key={coven.name} span={6}>
                <Card
                    className="hoverCard"
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    h={275}
                    style={{ background: bgColor, cursor: "pointer" }}
                    onClick={() => handleCovenClick(coven.name)}
                >
                    <Card.Section>
                        <Center pt={10}>
                            <Image 
                                fit="contain" 
                                withPlaceholder 
                                src={coven.logo} 
                                height={120} 
                                width={120} 
                                alt={coven.name} 
                            />
                        </Center>
                    </Card.Section>

                    <Center>
                        <Title p="md" tt="capitalize">{coven.name}</Title>
                    </Center>

                    <Text h={55} size="sm" color="dimmed" ta="center">
                        {coven.description}
                    </Text>
                </Card>
            </Grid.Col>
        )
    }

    const height = globals.viewportHeightPx
    return (
        <Box style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"}>
                Choose your <Text component="span" fw={700}>Coven</Text>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="grape">
                Coven
            </Text>
            <Box component="hr" style={{ borderColor: "#9c36b5" }} />

            <ScrollArea h={height - 215} w={"100%"} p={20}>
                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.blue[6]}>
                    Independent Mages
                </Text>
                <Grid grow m={0}>
                    {["independent"]
                        .map((c) => covenNameSchema.parse(c))
                        .map((covenName) => createCovenPick(covens[covenName], theme.fn.rgba(theme.colors.blue[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.red[8]}>
                    Chaotic Forces
                </Text>
                <Grid grow m={0}>
                    {["marauder"]
                        .map((c) => covenNameSchema.parse(c))
                        .map((covenName) => createCovenPick(covens[covenName], theme.fn.rgba(theme.colors.red[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.gray[7]}>
                    Order and Science
                </Text>
                <Grid grow m={0}>
                    {["technocracy"]
                        .map((c) => covenNameSchema.parse(c))
                        .map((covenName) => createCovenPick(covens[covenName], theme.fn.rgba(theme.colors.gray[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.grape[7]}>
                    Ancient Wisdom
                </Text>
                <Grid grow m={0}>
                    {["traditions"]
                        .map((c) => covenNameSchema.parse(c))
                        .map((covenName) => createCovenPick(covens[covenName], theme.fn.rgba(theme.colors.grape[8], 0.9)))}
                </Grid>
            </ScrollArea>
        </Box>
    )
}

export default CovenPicker