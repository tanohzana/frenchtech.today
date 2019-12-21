import React, { useState } from 'react'
import { WelcomeCard, Button } from './Elements'
import Modal from './Modal'

const Welcome = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <WelcomeCard>
      <div>
        <h1>Bonjour mon ami(e) !</h1>
        <h2>Bienvenue sur FTT</h2>
        <p>Notre bot connais de belles startups de la FrenchTech, pouvant servir d'alternatives aux géants US.</p>
      </div>
      <div>
        <p>
          Créé par{' '}
          <a
            href="https://twitter.com/florian_adonis"
            target="_blank"
            rel="noopener noreferrer"
          >
            Florian Adonis
          </a>{' '}
        </p>
        <p>
          Le code sur{' '}
          <a
            href="https://github.com/SaraVieira/bored.inc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </p>
        <p>
          <Button onClick={() => setModalOpen(true)}>Ajouter une entreprise</Button>
        </p>
      </div>
      <Modal open={modalOpen} close={() => setModalOpen(false)} />
    </WelcomeCard>
  )
}

export default Welcome
