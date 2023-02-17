import { Children, useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { loadPyodide } from 'pyodide'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import Confetti from 'react-confetti'

let pyodide = null

function runIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  )
}

async function main() {
  let pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full',
    stdin: () => {
      console.log('fire stdin')
      const r = prompt(pyprompt)
      pyprompt = null
      return r
    },
    stderr: (text) => {
      console.log('does this error?')
      console.log(text)
    },
  })

  console.log(
    pyodide.runPython(`
    import sys
    sys.version
  `)
  )

  return pyodide
}

function reset() {
  pyodide.runPython(`
    globals().clear()
    import asyncio
    import js
    old_input_123 = input
    def input(prompt=None):
      js.pyprompt = prompt
      return old_input_123(prompt)
    input.__doc__ = old_input_123.__doc__
    _test_print_list = []
    old_print_123 = print
    def print(*args, **kwargs):
      sep = kwargs.get('sep', ' ')
      end = kwargs.get('end', '\\n')
      if 'end' in kwargs:
        kwargs['flush'] = True
      old_print_123(*args, **kwargs)
      _test_print_list.append(sep.join(str(x) for x in args)+end)

    print.__doc__ = old_print_123.__doc__
  `)
}

main().then((result) => {
  pyodide = result
  reset()
})

function CodeGroupHeader({ title, children, selectedIndex }) {
  const hasTabs = true
  if (!title && !hasTabs) {
    return null
  }

  return (
    <div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
      {title && (
        <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
          {title}
        </h3>
      )}
      {hasTabs && (
        <Tab.List className="-mb-px flex gap-4 text-xs font-medium">
          <Tab
            className={clsx(
              'border-b py-3 transition focus:[&:not(:focus-visible)]:outline-none',
              0 === selectedIndex
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-300'
            )}
          >
            Code
          </Tab>
          <Tab
            className={clsx(
              'border-b py-3 transition focus:[&:not(:focus-visible)]:outline-none',
              1 === selectedIndex
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-300'
            )}
          >
            Output
          </Tab>
          {/* 
          <Tab
            className={clsx(
              'border-b py-3 transition focus:[&:not(:focus-visible)]:outline-none ',
              2 === selectedIndex
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-300'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
              <path
                fillRule="evenodd"
                d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z"
                clipRule="evenodd"
              />
            </svg>
          </Tab> */}
        </Tab.List>
      )}
    </div>
  )
}

export function PyEditor({
  children,
  title,
  defaultCode,
  checkCode,
  preValidation,
  preRunCode,
  validation,
}) {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState()
  const [hint, setHint] = useState()
  const [done, setDone] = useState()
  const [confetti, setConfetti] = useState(false)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let running = false

  let hasTabs = true

  function onChange(value) {
    setCode(value)
  }

  function resetDefualt(selectedIndex) {
    if (selectedIndex == 0) {
      setCode(defaultCode)
    } else {
      setOutput(undefined)
    }
  }

  function captureStdout(text) {
    setOutput((prevOuput) => (prevOuput ? prevOuput + '\n' + text : text))
  }

  function interruptExecution() {
    pyodide.runPythonAsync('import os; os._exit(0)')
    pyodide = null
    main().then((result) => {
      pyodide = result
      reset()
    })
  }

  async function callMultipleAsyncFunctions() {
    const [result1, result2] = await Promise.all([fetchData1(), fetchData2()])
    console.log(result1)
    console.log(result2)
  }

  async function fetchData1() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('This is the result of fetchData1')
      }, 1000)
    })
  }

  async function fetchData2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('This is the result of fetchData2')
      }, 500)
    })
  }

  async function validate(preCode, setOut, validate) {
    console.log('validate', preCode, setOut, validate)
    if (setOut) {
      pyodide.setStdout({
        batched: captureStdout,
      })
    } else {
      pyodide.setStdout({
        batched: null,
      })
    }
    const tOut = setTimeout(() => {
      interruptExecution()
      captureStdout('Error: Time limit exceeded')
      resolve({ error: 'Time limit exceeded' })
    }, 5000)
    reset()
    running = true
    if (preCode != undefined) {
      pyodide.runPython(preCode)
    }

    const out = await pyodide
      .runPythonAsync(code)
      .then(() => {
        console.log('done')
        clearTimeout(tOut)
        running = false

        pyodide.runPython(`_output = _test_print_list`)

        if (validate == false) {
          return
        }
        let status = pyodide.runPython(validation)
        status = status.toJs()
        return status
      })
      .catch((err) => {
        clearTimeout(tOut)
        var lines = err.message.split('\n')
        let to = 1
        for (const [i, l] of lines.entries()) {
          if (l.includes('File "<exec>"')) {
            to = i
            break
          }
        }
        lines.splice(1, to - 1)
        var newtext = lines.join('\n')
        captureStdout(newtext)
        return { error: newtext }
      })
    return out
  }

  async function run() {
    if (code == undefined) {
      return
    }
    setDone(undefined)

    let doVal = validation != undefined

    if (preValidation != undefined) {
      doVal = false
    }
    running = true
    setSelectedIndex(1)
    let status = await validate(preRunCode, true, doVal)

    if (status != undefined && status.error != undefined) {
      setHint('Encountered an error while running your code.')
      return
    }


    console.log(preValidation)
    for (let c in preValidation) {
      console.log('running validate', preValidation[c])
      status = await validate(preValidation[c], false, true) 
      console.log('status: ', status)

      if (!status.get('done')) {
        break
      }
    }
    running = false

    if (validation == undefined) {
      return
    }

    if (!status.get('done')) {
      console.log(status.get('message'))
      // set message
      setHint(status.get('message'))
    } else if (checkCode != undefined) {
      const message = checkCode(code)

      console.log('running', checkCode, code, message)

      if (message != undefined) {
        console.log(message)

        setHint(message)
      } else {
        console.log('checkCode passed')
        setHint(undefined)
        setDone(status.get('message'))
      }
    } else {
      setHint(undefined)
      setDone(status.get('message'))
    }

    // if x > 0:
    //     print('x is positive')
    // elif x < 0:
    //     print('x is negative')
    // else:
    //     print('x is 0')
  }

  function clearCode() {
    setCode('')
  }

  function useTabGroupProps(availableLanguages) {
    let languageIndex = availableLanguages.indexOf(0)
    let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
    if (newSelectedIndex !== selectedIndex) {
      setSelectedIndex(newSelectedIndex)
    }

    return {
      as: 'div',
      // ref: positionRef,
      selectedIndex,
      onChange: (newSelectedIndex) => {
        setSelectedIndex(newSelectedIndex)
      },
    }
  }

  const languages = [
    'Average',
    'Insert',
    'Get Length',
    'Get Length 2',
    'Get Length 3',
    'Code',
  ]
  let tabGroupProps = useTabGroupProps(languages)

  return (
    <>
      <div className="not-prose relative my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
        <Tab.Group {...tabGroupProps}>
          <CodeGroupHeader
            title={title}
            selectedIndex={tabGroupProps.selectedIndex}
          ></CodeGroupHeader>

          <Tab.Panels>
            <Tab.Panel className="relative bg-[#1E1E1E]">
              <div className="h-96 w-full">
                <Editor
                  defaultLanguage="python"
                  theme="vs-dark"
                  onChange={onChange}
                  value={code}
                  className="h-[96%]"
                />
              </div>
            </Tab.Panel>
            <Tab.Panel className="relative ">
              <div className="block h-96 w-full resize-y overflow-auto overscroll-contain whitespace-pre-wrap border-gray-300 bg-neutral-800 p-4 font-mono text-zinc-300 shadow-sm transition-opacity duration-1000 sm:text-sm">
                {output}
              </div>
              <div className="overflow-auto whitespace-pre-wrap bg-neutral-800 pl-2 text-orange-500">
                {hint}
              </div>
              <div className="overflow-auto whitespace-pre-wrap bg-neutral-800 pl-2 text-green-500">
                {done}
              </div>
              {done && (
                <Confetti
                  className="relative top-0 left-0"
                  numberOfPieces={1000}
                  recycle={false}
                />
              )}
            </Tab.Panel>

            <Tab.Panel>
              <div className="h-96">
                - Settings - perserve log - return - editor style - size -
                popout output - timeout
              </div>
            </Tab.Panel>
          </Tab.Panels>

          {/* <div className="bg-[#1e1e1e] ">
            <div className="flex justify-end ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
                onClick={run}
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div> */}
        </Tab.Group>

        <div className="absolute bottom-2 right-6 float-right flex items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 fill-gray-500 hover:fill-gray-300"
            onClick={() => {
              resetDefualt(tabGroupProps.selectedIndex)
            }}
          >
            <path d="M2.25,12C2.25,6.615 6.615,2.25 12,2.25C17.385,2.25 21.75,6.615 21.75,12C21.75,17.385 17.385,21.75 12,21.75C6.615,21.75 2.25,17.385 2.25,12ZM14.51,8.228L13.125,9.766L18.2,10.861L16.581,5.928L15.748,6.853C14.698,6.088 13.405,5.637 12.007,5.637C8.495,5.637 5.644,8.488 5.644,12C5.644,15.512 8.495,18.363 12.007,18.363C15.372,18.363 18.13,15.747 18.356,12.439L16.481,12.048C16.455,14.54 14.457,16.555 12,16.555C9.527,16.555 7.519,14.514 7.519,12C7.519,9.486 9.527,7.445 12,7.445C12.93,7.445 13.794,7.734 14.51,8.228Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 fill-green-500 hover:fill-green-200"
            onClick={run}
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  )
}

;<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="h-6 w-6"
>
  <path
    fill-rule="evenodd"
    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
    clip-rule="evenodd"
  />
</svg>
