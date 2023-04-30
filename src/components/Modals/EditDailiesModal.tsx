import {
  Checkbox,
  Modal,
  Button,
  Title,
  Flex,
  Center,
  Image
} from '@mantine/core'
import { useForm, Controller } from 'react-hook-form'
import { useGetCharacter } from '../../hooks/useGetCharacter'
import { useCharactersStore } from '../../stores/charactersStore'
import { IDailyData } from '../../types/IDailyData'
import { dailyList } from '../../constants/DailyList.const'
import { dailyCategories } from '../../constants/DailyCategories.const'

interface Props {
  opened: boolean
  close: () => void
  ign: string
}

const EditDailiesModal: React.FC<Props> = ({ opened, close, ign }) => {
  const { handleSubmit, control, getValues } = useForm()
  const { data, loading } = useGetCharacter(ign)
  const addCharacter = useCharactersStore((state) => state.addCharacter)

  const onSubmit = () => {
    let dailies = {} as IDailyData
    for (const [key, value] of Object.entries(getValues())) {
      if (value) dailies[key] = false
    }
    addCharacter(data!, dailies)
    console.log(getValues())
  }

  return (
    <Modal opened={opened} onClose={close}>
      <Center>
        <Image src={data?.CharacterImgUrl} width={150} mb={30} />
      </Center>
      <Flex wrap="wrap" gap="xl">
        {dailyCategories.map((category) => {
          return (
            <div style={{ width: '40%' }}>
              <Title order={4}>{category.title}</Title>
              {dailyList
                .filter((daily) => daily.type === category.category)
                .map((daily, index) => {
                  return (
                    <Controller
                      key={index}
                      control={control}
                      defaultValue={false}
                      name={`${daily.name}-${daily.type}`}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label={daily.name}
                          onChange={onChange}
                          checked={value}
                        />
                      )}
                    />
                  )
                })}
            </div>
          )
        })}
      </Flex>
      <Button onClick={onSubmit}>Submit</Button>
    </Modal>
  )
}

export default EditDailiesModal
