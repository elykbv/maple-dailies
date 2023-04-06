import { IDailyData } from '../../types/IDailyData'
import { Switch } from '@mantine/core'

interface Props {
  dailies: IDailyData
}

const DailiesList: React.FC<Props> = ({ dailies }) => {
  if (!dailies) return <>a</>
  return (
    <>
      {Object.keys(dailies).map((daily) => {
        return <Switch label={daily} color="green" />
      })}
    </>
  )
}

export default DailiesList
