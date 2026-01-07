import Link from 'next/link'

function AnchorIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3" />
    </svg>
  )
}

function Anchor({ id, children }) {
  return (
    <Link
      href={`#${id}`}
      className="group text-inherit no-underline hover:text-inherit"
    >
      {children}
    </Link>
  )
}

export function Heading({
  level = 2,
  children,
  id,
  anchor = true,
  ...props
}) {
  let Component = `h${level}`

  return (
    <Component
      id={anchor ? id : undefined}
      className="scroll-mt-24"
      {...props}
    >
      {anchor && id ? (
        <Anchor id={id}>
          {children}
        </Anchor>
      ) : (
        children
      )}
    </Component>
  )
}
