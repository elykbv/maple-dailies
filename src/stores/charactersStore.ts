import { create } from 'zustand'

interface CharactersState {
  characters: string[]
  addCharacter: (ign: string) => void
  removeCharacter: (ign: string) => void
}

export const useCharactersStore = create<CharactersState>()((set) => ({
  characters: [],
  addCharacter: (ign) =>
    set((state) => ({ characters: [...state.characters, ign] })),
  removeCharacter: (ign) => set((state) => state)
}))
