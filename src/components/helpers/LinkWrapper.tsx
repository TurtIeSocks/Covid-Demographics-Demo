import * as React from 'react'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export interface LinkWrapperProps {
  element: ReactElement
  link: string
}

export default function LinkWrapper({
  element,
  link,
}: LinkWrapperProps): ReactElement {
  return (
    <Link
      to={link}
      style={{ textDecoration: 'none', color: 'rgb(100, 100, 100)' }}
    >
      {element}
    </Link>
  )
}
