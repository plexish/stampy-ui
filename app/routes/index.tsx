import {useState, useEffect} from 'react'
import {useLoaderData} from 'remix'
import type {LoaderFunction} from 'remix'
import AutoHeight from 'react-auto-height'
import {getInitialQuestions} from '~/stampy'
import logo1x from '~/assets/stampy-logo.png'
import logo2x from '~/assets/stampy-logo-2x.png'
import logo3x from '~/assets/stampy-logo-3x.png'

type QuestionsType = Awaited<ReturnType<typeof getInitialQuestions>>

export const loader: LoaderFunction = getInitialQuestions

export default function App() {
  const content = useLoaderData<QuestionsType>()

  useRerenderOnResize() // to recalculate AutoHeight

  return (
    <>
      <header>
        <img
          alt="logo"
          width="201"
          height="200"
          src={logo1x}
          srcSet={`${logo2x} 2x, ${logo3x} 3x`}
        />
        <div>
          <h1>Hi, I'm Stampy!</h1>
          <div>I can answer questions about AI Alignment.</div>
          <div>
            This is my testing playground, see also{' '}
            <a href="https://stampy.ai/read/Get_involved">stampy.ai</a>.
          </div>
        </div>
      </header>
      <main>
        {content.map((props, i) => (
          <Question key={props.question} {...props} defaultExpanded={i === 0} />
        ))}
      </main>
      <footer>
        <span>© 2022 Peter Hozák</span>
        <a href="https://github.com/Aprillion/stampy-ui">GitHub</a>
      </footer>
    </>
  )
}

function Question({
  question,
  questionContent,
  answerContent,
  answerHtml = '¯\\_(ツ)_/¯',
  defaultExpanded,
}: QuestionsType[0] & {defaultExpanded?: boolean}) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <article>
      <h2
        className={expanded ? 'expanded' : ''}
        onClick={() => setExpanded(!expanded)}
        title={`${questionContent}\n\n${answerContent}`}
      >
        {question}
      </h2>
      <AutoHeight>
        {expanded && <div className="answer" dangerouslySetInnerHTML={{__html: answerHtml}} />}
      </AutoHeight>
    </article>
  )
}

function useRerenderOnResize() {
  const [, set] = useState<{}>()

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const forceRerender = (e: unknown) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        set({})
      }, 100)
    }
    addEventListener('orientationchange', forceRerender)
    addEventListener('resize', forceRerender)

    return () => {
      removeEventListener('orientationchange', forceRerender)
      removeEventListener('resize', forceRerender)
    }
  }, [])
}
