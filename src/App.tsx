import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import CharacterCard from './components/CharacterCard/CharacterCard'
import { ActionIcon, Button, Tabs, TextInput } from '@mantine/core'
import { useCharactersStore } from './stores/charactersStore'
import { useDisclosure } from '@mantine/hooks'
import EditDailiesModal from './components/Modals/EditDailiesModal'
import DailiesList from './components/DailiesList/DailiesList'
import Timer from './components/Timer/Timer'

function App() {
  const { characters } = useCharactersStore((state) => state)
  const { control, getValues } = useForm()
  const [opened, { open, close }] = useDisclosure(false)
  const [activeCharacter, setActiveCharacter] = useState<string | null>(
    characters[0]?.charInfo.CharacterName
  )

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'end', gap: 0 }}>
        <Controller
          name="ign"
          defaultValue=""
          rules={{
            minLength: 4,
            maxLength: 12
          }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChange={onChange}
              placeholder="Enter your IGN"
              onKeyPress={e => e.key === 'Enter' && open()}
            />
          )}
        />
        <ActionIcon color="blue" size="lg" variant="filled" onClick={open}>
          +
        </ActionIcon>
      </div>
      <Tabs
        value={activeCharacter}
        onTabChange={setActiveCharacter}
        variant="outline"
      >
        <Tabs.List>
          {Object.keys(characters).map((character) => {
            return (
              <Tabs.Tab value={characters[character].charInfo.CharacterName}>
                <CharacterCard
                  ign={characters[character].charInfo.CharacterName}
                  key={characters[character].charInfo.CharacterName}
                  active={
                    activeCharacter ===
                    characters[character].charInfo.CharacterName
                  }
                  onClick={() =>
                    setActiveCharacter(
                      characters[character].charInfo.CharacterName
                    )
                  }
                />
              </Tabs.Tab>
            )
          })}
        </Tabs.List>
		</Tabs>
        <div style={{ display: 'flex'}}>
            <div>

        <Timer reset='daily'/>
        <DailiesList dailies={characters[activeCharacter!]?.dailies} />
        <EditDailiesModal opened={opened} close={close} ign={getValues().ign}/> 
        </div>
        <div>
            <Timer reset='weekly' />
        </div>
        </div>
    </div>
    )
}

export default App
