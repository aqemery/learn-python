import Link from 'next/link'
import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'
import { Prose } from '@/components/Prose'
import { SectionProvider } from '@/components/SectionProvider'

export function Layout({ children, sections = [] }) {
  return (
      <div>
        {children}
      </div>
  )
}
