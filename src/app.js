import React, { Fragment, useContext, useEffect, useState, useRef } from 'react'
import { FrenchTechContext } from './FrenchTechContext'
import Chat from './components/Chat'
import { Button, ButtonChoicesContainer } from './components/Button'
import Reward from 'react-rewards'
import Loading from './components/Loading'
import Welcome from './components/Welcome'
import {
  Card,
  ChatContainer,
  Mobile,
  MobileBg,
  SrOnly,
} from './components/Elements'
import mobileBg from './images/mobile-bg.svg'
import { format } from 'date-fns'

export default () => {
  let reward
  const mobilePhone = useRef(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const { getAlternatives, getSections, getStartupsBySection } = useContext(FrenchTechContext)
  const newTime = () => ({ time: format(new Date(), 'HH:mm') })
  const defaultMessages = [
    {
      user: 'Je cherche une alternative dans la FrenchTech.',
      bot: 'Dans quel secteur cherchez vous ?',
      ...newTime(),
    },
  ]
  const sections = getSections()
  const [messages, setMessages] = useState(defaultMessages)
  const [step, setStep] = useState('sections')
  const [currentAnswers, setCurrentAnswers] = useState(sections)
  const [currentText, setCurrentText] = useState()
  const [currentSection, setCurrentSection] = useState()

  const updateStep = () => {
    if (step === 'sections') {
      setStep('startups')
    } else if (step === 'startups') {
      setStep('alternatives')
    } else if (step === 'alternatives') {
      setStep('end')
      setDone(true)
    }
  }

  const updateCurrentAnswers = () => {
    if (step === 'sections') {
      const answers = getSections()
      setCurrentAnswers(answers)
    } else if (step === 'startups') {
      const answers = getStartupsBySection(currentText)
      setCurrentSection(currentText)
      setCurrentAnswers(answers)
    } else if (step === 'alternatives') {
      const answers = getAlternatives(currentSection, currentText)
      setCurrentAnswers(answers)
    }
  }

  const getBotAnswer = () => {
    switch(step) {
      case 'sections':
        return 'Vous cherchez une alternative à ... 🧐'
      case 'startups':
        return 'Voilà ce que j\'ai trouvé 😁'
      case 'alternatives':
        return 'Voilà toutes les infos 🕵️‍♀️'
      default:
        return ''
    }
  }

  const answer = (text) => {
    setLoading(true)
    setCurrentText(text)
    setMessages([
      ...messages,
      {
        user: text,
        bot: getBotAnswer(),
        ...newTime(),
      },
    ])
    updateStep()

    setTimeout(() => {
      setLoading(false)
    }, 500)

    setTimeout(() => {
      mobilePhone.current.scrollTop = mobilePhone.current.scrollHeight
    }, 0)
  }

  const confetti = () => reward.rewardMe()

  const restart = () => {
    setMessages(defaultMessages)
    setStep('sections')
    setCurrentAnswers(sections)
    setCurrentText('')
    setCurrentSection('')
    setDone(false)
  }

  useEffect(() => {
    updateCurrentAnswers()
  }, [step, currentText])

  return (
    <Fragment>
      <Card>
        <Welcome />
        <ChatContainer>
          <SrOnly as="h2">Chat</SrOnly>
          <MobileBg alt="background" src={mobileBg} />
          <Mobile ref={mobilePhone}>
            <Chat messages={messages}>
              {done ?
                <>
                  <Reward
                    type="confetti"
                    ref={ref => {
                      reward = ref
                    }}
                  >
                    <Button onClick={() => confetti()}>
                      Génial
                    </Button>
                  </Reward>
                  <Button onClick={() => restart()}>Recommencer</Button>
                </> :
                <ButtonChoicesContainer>
                  {!loading && currentAnswers.map((text) => (
                    <Button key={text} onClick={() => answer(text)}>
                      <span role="img" aria-label={text}>
                        {text}
                      </span>
                    </Button>
                  ))}
                </ButtonChoicesContainer>
              }
              {loading && !done ? <Loading /> : null}
            </Chat>
          </Mobile>
        </ChatContainer>
      </Card>
    </Fragment>
  )
}
