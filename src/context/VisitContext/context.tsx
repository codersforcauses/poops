import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export type VisitContextProps = {
  getCurrentForm: () => null | JSX.Element
  setCurrentForm: Dispatch<SetStateAction<JSX.Element | null>>
}

const VisitContext = createContext<VisitContextProps>({
  getCurrentForm: () => null,
  setCurrentForm: () => undefined
})

export const VisitContextProvider = VisitContext.Provider

export const useVisit = () => useContext(VisitContext)
