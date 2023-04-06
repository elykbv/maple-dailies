import { useState, useEffect } from 'react'

interface Props {
  ign: string
}

interface ICharacterData {
  CharacterName: string
  CharacterImgUrl: string
  JobName: string
  Level: number
}

const CharacterCard: React.FC<Props> = ({ ign }) => {
  const [data, setData] = useState<ICharacterData>({} as ICharacterData)

  useEffect(() => {
    fetch(`http://localhost:3000/gms/character/Satsu`)
      .then((res) => res.json())
      .then((res) => setData(res[0]))
  }, [])

  return (
    <div className="character-card">
      <div>
        <img src={data.CharacterImgUrl} />
      </div>
      <div>{data.CharacterName}</div>
      <div>
        Lv. {data.Level} {data.JobName}
      </div>
    </div>
  )
}

export default CharacterCard
