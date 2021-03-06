import * as React from 'react'
import { ReactElement } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Typography } from '@mui/material'

import { DataChartProps } from '@assets/types'

export default function Summary({
  data,
  subTab,
  isMobile,
}: DataChartProps): ReactElement {
  const totals: { [key: string]: { [key: string]: number } } = {}

  data.forEach((d) => {
    if (!totals[d.state]) {
      totals[d.state] = {}
    }
    Object.entries(d[subTab]).forEach(([key, value]) => {
      if (key !== 'total') {
        if (!totals[d.state][key]) {
          totals[d.state][key] = 0
        }
        totals[d.state][key] += value
      }
    })
  })

  const finalTotals = Object.entries(totals)
    .map(([state, each]) => ({
      state,
      ...each,
    }))
    .sort((a, b) => a.state.localeCompare(b.state))
  const localeFormat = new Intl.NumberFormat('en-US')
  const formatter = (value: number) => localeFormat.format(value)

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        style={{ color: 'white' }}
        gutterBottom={!isMobile}
      >
        Demographics by State
      </Typography>
      <ResponsiveContainer>
        <BarChart
          data={finalTotals}
          margin={{
            right: isMobile ? 0 : 30,
            left: isMobile ? 40 : 50,
            bottom: isMobile ? 0 : 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis tickFormatter={formatter} />
          <Tooltip formatter={formatter} />
          <Legend />
          <Bar dataKey="White" stackId="a" fill="#64b5f6" />
          <Bar dataKey="Black" stackId="a" fill="#4dd0e1" />
          <Bar dataKey="Latinx" stackId="a" fill="#aed581" />
          <Bar dataKey="Asian" stackId="a" fill="#f06292" />
          <Bar dataKey="AIAN" stackId="a" fill="#82ca9d" />
          <Bar dataKey="NHPI" stackId="a" fill="#ba68c8" />
          <Bar dataKey="Multiracial" stackId="a" fill="#ff8a65" />
          <Bar dataKey="Other" stackId="a" fill="#fff176" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
