import * as React from 'react'
import { ReactElement } from 'react'
import { Button } from '@mui/material'

import { Data } from '@assets/types'

interface DownloadProps {
  data: Data[]
}

export default function Download({ data }: DownloadProps): ReactElement {
  const exportSettings = () => {
    const el = document.createElement('a')
    el.setAttribute(
      'href',
      `data:application/json;chartset=utf-8,${encodeURIComponent(
        JSON.stringify(data),
      )}`,
    )
    el.setAttribute('download', 'data.json')
    el.style.display = 'none'
    document.body.appendChild(el)
    el.click()
    document.body.removeChild(el)
  }

  return (
    <Button onClick={exportSettings} color="primary" variant="contained" size="small">
      Download Data
    </Button>
  )
}
