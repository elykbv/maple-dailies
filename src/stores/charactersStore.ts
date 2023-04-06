import { create } from 'zustand'
import { ICharacterData } from '../types/ICharacterData'
import { IDailyData } from '../types/IDailyData'

interface IDailiesData {
  charInfo: ICharacterData
  dailies: IDailyData
}

interface CharactersState {
  characters: { [ign: string]: IDailiesData }
  addCharacter: (charInfo: ICharacterData, dailies: IDailyData) => void
  //   updateDailyStatus: (ign: string, daily: string, status: boolean) => void
  //   removeCharacter: (ign: string) => void
}

export const useCharactersStore = create<CharactersState>()((set) => ({
  characters: {},
  addCharacter: (charInfo, dailies) => {
    set((state) => ({
      characters: {
        ...state.characters,
        [charInfo.CharacterName]: { charInfo: charInfo, dailies: dailies }
      }
      //   characters: [
      //     ...state.characters,
      //     { charInfo: charInfo, dailies: dailies }
      //   ]
    }))
  }
  //   updateDailyStatus: (ign, daily, status) => {
  //     set((state) => ({
  //       characters: {
  //         ...state.characters,
  //         [ign]: {
  //           ...state.characters[ign],
  //           dailies: {
  //             ...state.characters[ign].dailies
  //           }
  //         }
  //       }
  //     }))
  //   }

  //   removeCharacter: (ign) => set((state) => state)
}))
