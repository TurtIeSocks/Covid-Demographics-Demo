import * as React from 'react'
import { ReactElement } from 'react'

import { DataChartProps } from '@assets/types'

import Summary from './Summary'
import ByDate from './ByDate'
import ByState from './ByState'

export default function DataChart({
  data,
  tab,
  subTab,
}: DataChartProps): ReactElement {
  return (
    <div style={{ height: '65vh', width: '100%' }}>
      {{
        Summary: <Summary data={data} tab={tab} subTab={subTab} />,
        'By Date': <ByDate data={data} tab={tab} subTab={subTab} />,
        'By State': <ByState data={data} tab={tab} subTab={subTab} />,
      }[tab] || <div />}
    </div>
  )
}
