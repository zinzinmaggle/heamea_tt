import React from 'react'

// Création du context
const HemeattContext = React.createContext({})
// Définition du Provider
export const HemeattProvider = HemeattContext.Provider
//Définition du Consumer (que je n'utilise pas dans cette application)
export const HemeattConsumer = HemeattContext.Consumer

export default HemeattContext;