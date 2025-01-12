import { makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'

class RootStore {
  constructor() {
    makeAutoObservable(this)
  }
}

const StoreContext = createContext<RootStore | undefined>(undefined)
export const StoreProvider = StoreContext.Provider

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('Store not found')
  }
  return store
}

export const store = new RootStore()
