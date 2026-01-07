// MDX Components for v3
// This file is automatically picked up by @mdx-js/react in Next.js

import { Button } from './src/components/Button'
import { CodeGroup, Code, Pre } from './src/components/Code'
import { Row, Col, Properties, Property } from './src/components/mdx'
import { Note } from './src/components/mdx'
import { Heading } from './src/components/Heading'
import { PyEditor } from './src/components/Editor'
import { Exercise } from './src/components/Exercise'

export function useMDXComponents(components) {
  return {
    ...components,
    Button,
    CodeGroup,
    pre: Pre,  // Map standard HTML elements to custom components
    code: Code,
    Row,
    Col,
    Properties,
    Property,
    Note,
    Heading,
    PyEditor,
    Exercise,
  }
}
