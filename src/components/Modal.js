import React, { useState, useRef } from 'react'
import { Transition } from 'react-spring'
import Reward from 'react-rewards'
import Loading from './Loading'
import { Overlay, Input, SubmitButton, ModalContent } from './Elements'

const Modal = ({ open, close }) => {
  const rewardRef = useRef(null)
  const [startup, setStartup] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const submitStartup = async e => {
    e.preventDefault()
    setLoading(true)
    const request = await fetch(
      `${
        process.env.NODE_ENV === 'development'
          ? 'https://frenchtech.netlify.com'
          : ''
      }/.netlify/functions/airtable?startup=${startup}`
    )

    await request.json()
    setSubmitted(true)
    setStartup('')
    setLoading(false)
    rewardRef.current.rewardMe()
  }

  return (
    <Transition
      items={open}
      from={{ opacity: 0, y: 200 }}
      enter={{ opacity: 1, y: 0 }}
      leave={{ opacity: 0, y: -200 }}
    >
      {open => styles =>
        open && (
          <Overlay
            style={{ opacity: styles.opacity }}
            onDismiss={() => {
              setSubmitted(false)
              close()
            }}
          >
            <ModalContent
              style={{
                transform: `translate3d(0px, ${styles.y}px, 0px)`,
              }}
            >
              <h1>Ajouter une belle startup</h1>
              {submitted && <h2>T'es le/la meilleur(e)</h2>}
              <form onSubmit={submitStartup}>
                <Input
                  placeholder="Doctolib"
                  required
                  value={startup}
                  onChange={e => setStartup(e.target.value)}
                />
                <Reward type="confetti" ref={rewardRef}>
                  <SubmitButton type="submit ">
                    {!loading ? (
                      'Soumettre 🚀'
                    ) : (
                      <Loading style={{ margin: 0 }} />
                    )}
                  </SubmitButton>
                </Reward>
              </form>
            </ModalContent>
          </Overlay>
        )}
    </Transition>
  )
}

export default Modal
