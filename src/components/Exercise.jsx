import { PyEditor } from './Editor'

/**
 * Exercise component that loads exercise configuration from folders
 * Each exercise folder contains:
 * - config.json: Basic configuration (title, etc.)
 * - default.py: Default code in the editor
 * - validation.py: Python validation code (optional)
 * - prerun.py: Code to run before student's code (optional)
 * - check.js: JavaScript code checking function (optional)
 *
 * Usage: <Exercise src="basics/print-exercise" />
 */
export function Exercise({ src }) {
  // Import files from the exercise folder
  const config = require(`../../exercises/${src}/config.json`)

  // Load Python files as raw text
  let defaultCode = ''
  let validation = undefined
  let preRunCode = undefined
  let checkCodeFn = undefined

  try {
    defaultCode = require(`!!raw-loader!../../exercises/${src}/default.py`).default
  } catch (e) {
    console.warn(`No default.py found for exercise ${src}`)
  }

  try {
    validation = require(`!!raw-loader!../../exercises/${src}/validation.py`).default
  } catch (e) {
    // Validation is optional
  }

  try {
    preRunCode = require(`!!raw-loader!../../exercises/${src}/prerun.py`).default
  } catch (e) {
    // PreRunCode is optional
  }

  try {
    const checkCodeStr = require(`!!raw-loader!../../exercises/${src}/check.js`).default
    checkCodeFn = new Function('code', checkCodeStr)
  } catch (e) {
    // CheckCode is optional
  }

  return (
    <PyEditor
      title={config.title}
      defaultCode={defaultCode}
      preRunCode={preRunCode}
      validation={validation}
      preValidation={config.preValidation}
      checkCode={checkCodeFn}
    />
  )
}
