import { useState, useEffect } from 'react'
import { ICharacterData } from '../../types/ICharacterData'
import classNames from 'classnames'
import './CharacterCard.css'

interface Props {
  ign: string
  active: boolean
  onClick: () => void
}

const CharacterCard: React.FC<Props> = ({ ign, active, onClick }) => {
  const [data, setData] = useState<ICharacterData>({} as ICharacterData)

  useEffect(() => {
    fetch(`http://localhost:3000/gms/character/${ign}`)
      .then((res) => res.json())
      .then((res) => setData(res[0]))
  }, [])

  return (
    <div className="character-card" onClick={onClick}>
      <div>
        <img
          src={data.CharacterImgUrl}
          className={classNames({ grayscale: !active })}
        />
      </div>
      <div>{data.CharacterName}</div>
      <div>
        Lv. {data.Level} {data.JobName}
      </div>
    </div>
  )
}

export default CharacterCard
