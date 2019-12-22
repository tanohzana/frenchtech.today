import React, { useState } from 'react'
import data from './data/startups'
import info from './data/info'

export const FrenchTechContext = React.createContext()

export const FrenchTechState = ({ children }) => {
  const [startups] = useState(data)

  const getSections = () => Object.keys(startups)

  const getStartupsBySection = (section) => Object.keys(startups[section])

  const getAlternatives = (section, startup) => startups[section][startup]

  const getInfo = (startup) => info[startup]

  return (
    <FrenchTechContext.Provider value={{ startups, getAlternatives, getInfo, getSections, getStartupsBySection }}>
      {children}
    </FrenchTechContext.Provider>
  )
}
