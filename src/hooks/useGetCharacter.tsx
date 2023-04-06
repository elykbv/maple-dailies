import { useState, useEffect } from 'react'
import { ICharacterData } from '../types/ICharacterData'

interface State {
  data?: ICharacterData
  loading: boolean
}

export const useGetCharacter = (ign: string): State => {
  const baseUrl = 'http://localhost:3000/gms/character/'
  const [data, setData] = useState<ICharacterData>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetch(baseUrl + ign)
      .then((res) => res.json())
      .then((data) => setData(data[0]))
      .finally(() => setLoading(false))
  }, [ign])

  return { data, loading }
}
