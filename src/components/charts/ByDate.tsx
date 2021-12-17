import * as React from 'react'
import { ReactElement } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { DataChartProps } from '@assets/types'

export default function Summary({
  data,
  subTab,
}: DataChartProps): ReactElement {
  const totals: { [key: string]: { [key: string]: number } } = {}

  data.forEach((d) => {
    if (!totals[d.date]) {
      totals[d.date] = {}
    }
    Object.entries(d[subTab]).forEach(([key, value]) => {
      if (key !== 'total') {
        if (!totals[d.date][key]) {
          totals[d.date][key] = 0
        }
        totals[d.date][key] += value
      }
    })
  })

  const finalTotals = Object.entries(totals).map(([date, each]) => ({
    date,
    ...each,
  }))
  const localeFormat = new Intl.NumberFormat('en-US')
  const formatter = (value: number) => localeFormat.format(value)

  return (
    <ResponsiveContainer
      width="100%"
      height={600}
      style={{ textAlign: 'center' }}
    >
      <LineChart
        data={finalTotals}
        margin={{
          top: 5,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={formatter} />
        <Tooltip formatter={formatter} />
        <Legend />
        <Line type="monotone" dataKey="White" stroke="#64b5f6" />
        <Line type="monotone" dataKey="Black" stroke="#4dd0e1" />
        <Line type="monotone" dataKey="Latinx" stroke="#aed581" />
        <Line type="monotone" dataKey="Asian" stroke="#f06292" />
        <Line type="monotone" dataKey="AIAN" stroke="#82ca9d" />
        <Line type="monotone" dataKey="NHPI" stroke="#ba68c8" />
        <Line type="monotone" dataKey="Multiracial" stroke="#ff8a65" />
        <Line type="monotone" dataKey="Other" stroke="#fff176" />
      </LineChart>
    </ResponsiveContainer>
  )
}
