import Head from 'next/head'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { SimpleLayout } from '@/components/SimpleLayout'
import * as mdxComponents from '@/components/mdx'

import '@/styles/tailwind.css'

export default function App({ Component, pageProps }) {
  let router = useRouter()

  return (
    <>
      <Head>
        {router.pathname === '/' ? (
          <title>Learn Python - Interactive Programming Course</title>
        ) : (
          <title>{`${pageProps.title || 'Lesson'} - Learn Python`}</title>
        )}
        <meta name="description" content={pageProps.description || 'Learn Python programming with interactive exercises'} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <SimpleLayout>
          <Component {...pageProps} />
        </SimpleLayout>
      </MDXProvider>
    </>
  )
}
