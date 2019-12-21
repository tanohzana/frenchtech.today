import React, { useState } from 'react'
import data from './data/startups'

export const FrenchTechContext = React.createContext()

export const FrenchTechState = ({ children }) => {
  const [startups] = useState(data)

  const getSections = () => Object.keys(startups)

  const getStartupsBySection = (section) => Object.keys(startups[section])

  const getAlternatives = (section, startup) => startups[section][startup]

  return (
    <FrenchTechContext.Provider value={{ startups, getAlternatives, getSections, getStartupsBySection }}>
      {children}
    </FrenchTechContext.Provider>
  )
}
