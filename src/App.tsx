import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Nav from "./components/Nav/Nav";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import { ActionIcon, Button, Tabs, TextInput } from "@mantine/core";
import { useCharactersStore } from "./stores/charactersStore";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import EditDailiesModal from "./components/Modals/EditDailiesModal";
import DailiesList from "./components/DailiesList/DailiesList";
import Timer from "./components/Timer/Timer";
import { IgnFormValues } from "./types/IgnFormValues";

function App() {
    const [dailies, setDailies] = useLocalStorage<any>({
        key: "maple-dailies-list",
        defaultValue: [],
    });
    const { characters } = useCharactersStore((state) => state);
    const { control, getValues } = useForm<IgnFormValues>();
    const [opened, { open, close }] = useDisclosure(false);
    const [activeCharacter, setActiveCharacter] = useState<any>(
        dailies[0]// TODO
    );

    console.log(dailies);

    return (
        <div>
            <Nav control={control} open={open} />
            <Tabs
                value={activeCharacter}
                onTabChange={setActiveCharacter}
                variant="outline"
            >
                <Tabs.List>
                    {dailies.map((daily) => {
                        console.log(daily)
                        return (
                            <Tabs.Tab value={daily.ign}>
                                <CharacterCard
                                    ign={daily.ign}
                                    key={daily.ign}
                                    active={activeCharacter?.ign === daily.ign}
                                    onClick={() =>
                                        setActiveCharacter({
                                            ign: daily.ign,
                                        })
                                    }
                                />
                            </Tabs.Tab>
                        );
                    })}
                </Tabs.List>
            </Tabs>
            <div style={{ display: "flex" }}>
                <div>
                    <Timer reset="daily" />
                    <DailiesList
                        dailies={characters[activeCharacter!]?.dailies}
                    />
                    <EditDailiesModal
                        opened={opened}
                        close={close}
                        ign={getValues().ign}
                        localStorageDailies={dailies}
                        setLocalStorageDailies={setDailies}
                    />
                </div>
                <div>
                    <Timer reset="weekly" />
                </div>
            </div>
        </div>
    );
}

export default App;
