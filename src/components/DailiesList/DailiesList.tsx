import { dailyCategories } from '../../constants/DailyCategories.const'
import { IDailyData } from '../../types/IDailyData'
import { Switch } from '@mantine/core'

interface Props {
  dailies: IDailyData
}

const DailiesList: React.FC<Props> = ({ dailies }) => {
  if (!dailies) return <></>
  return (
    <>
      {dailyCategories.map((category) => {
        return (
          <>
            {Object.keys(dailies)
            .filter(daily => daily.includes(category.category))
            .map((daily) => {
              return <Switch label={daily.split('-')[0]} color="green" />
            })}
          </>
        )
      })}
    </>
  )
}

export default DailiesList
