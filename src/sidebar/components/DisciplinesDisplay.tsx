import { Grid, List, Stack, Title } from "@mantine/core"
import { Power, Ritual } from "../../data/Disciplines"
import { Gift } from "../../data/Gifts"
import { upcase } from "../../generator/utils"


export type DisciplinesProps = {
    powers: (Power | Gift)[]
    rituals: Ritual[]
}

const DisciplineDisplay = ({ powers, rituals }: DisciplinesProps) => {
    const powersByDisciplines = new Map<string, (Power | Gift)[]>()
    
    // Helper function to get the category from either Power or Gift
    const getCategory = (power: Power | Gift): string => {
        if ('discipline' in power) {
            return power.discipline // It's a Power
        } else {
            return power.gift // It's a Gift
        }
    }
    
    powers.forEach((power) => {
        const category = getCategory(power)
        if (!powersByDisciplines.has(category)) {
            powersByDisciplines.set(category, [power])
        } else {
            powersByDisciplines.set(category, [...powersByDisciplines.get(category)!, power])
        }
    })

    return (
        <Stack>
            <Grid>
                {Array.from(powersByDisciplines.entries()).map(([categoryName, powers]) => {
                    return (
                        <Grid.Col span={6} key={categoryName}>
                            <Title order={4}>{upcase(categoryName)}</Title>
                            <List>
                                {powers.map((power) => {
                                    return <List.Item key={power.name}>{power.name}</List.Item>
                                })}
                                {categoryName === "spirit" // Show rituals for spirit gifts
                                    ? rituals.map((ritual) => {
                                          return (
                                              <List.Item ml={"-3px"} icon={"⛤"} key={ritual.name}>
                                                  {ritual.name}
                                              </List.Item>
                                          )
                                      })
                                    : null}
                            </List>
                        </Grid.Col>
                    )
                })}
            </Grid>
        </Stack>
    )
}

export default DisciplineDisplay
