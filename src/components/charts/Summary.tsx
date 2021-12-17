import * as React from 'react'
import { ReactElement } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useTheme } from '@mui/material'

import { RacialGroups, DataChartProps } from '@assets/types'

export default function Summary({
  data,
  subTab,
  isMobile,
}: DataChartProps): ReactElement {
  const theme = useTheme()
  const totals = [
    { name: 'White', Total: 0 },
    { name: 'Black', Total: 0 },
    { name: 'Asian', Total: 0 },
    { name: 'AIAN', Total: 0 },
    { name: 'NHPI', Total: 0 },
    { name: 'Multiracial', Total: 0 },
    { name: 'Other', Total: 0 },
  ]

  data.forEach((d) => {
    totals.forEach((group, i) => {
      totals[i].Total += d[subTab][group.name as keyof RacialGroups]
    })
    return d[subTab]
  })

  const localeFormat = new Intl.NumberFormat('en-US')
  const formatter = (value: number) => localeFormat.format(value)

  return (
    <ResponsiveContainer style={{ marginTop: 'auto', marginBottom: 'auto' }}>
      <BarChart
        data={totals}
        margin={{
          right: isMobile ? 0 : 30,
          left: isMobile ? 40 : 50,
          bottom: isMobile ? 0 : 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatter} />
        <Tooltip formatter={formatter} />
        <Bar dataKey="Total" fill={theme.palette.secondary.main} />
      </BarChart>
    </ResponsiveContainer>
  )
}
