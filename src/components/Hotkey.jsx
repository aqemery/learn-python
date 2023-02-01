import { useEffect, useState } from 'react'

export function Hotkey({
  ...props
}) {

  let [modifierKey, setModifierKey] = useState()

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl '
    )
  }, [])


  return (
    <>
     {modifierKey}
    </>
  )
}
