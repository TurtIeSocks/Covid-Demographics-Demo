import * as React from 'react'
import { useState, ReactElement, Fragment } from 'react'
import { Paper, Button, Grid, Typography } from '@mui/material'
import { ArrowRightAlt, Coronavirus } from '@mui/icons-material'

import { Data, Covid19 } from '@assets/types'

import DataChart from './charts/ChartWrapper'
import FloatingNav from './FloatingNav'
import Download from './Download'

export interface HomeProps {
  data: Data[]
  covidData: Covid19
  showGraphs: boolean
  setShowGraphs: (showGraphs: boolean) => void
}

export default function Home({
  data,
  covidData,
  showGraphs,
  setShowGraphs,
}: HomeProps): ReactElement {
  const [tab, setTab] = useState('Summary')
  const [subTab, setSubTab] = useState({ index: 0, name: 'cases' })
  const items = ['Summary', 'By Date', 'By State', 'Raw Data']
  const covidIterable = [
    { title: 'Total Cases', nums: covidData.cases },
    { title: 'Cases Today', nums: covidData.todayCases },
    { title: 'Total Deaths', nums: covidData.deaths },
    { title: 'Deaths Today', nums: covidData.todayDeaths },
    { title: 'Total Tests', nums: covidData.totalTests },
  ]
  const Formatter = new Intl.NumberFormat('en-US')

  return (
    <Paper
      elevation={0}
      style={{
        backgroundImage: showGraphs ? '' : 'url(/images/bg.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '85vh',
        width: '99vw',
      }}
    >
      <Grid
        container
        sx={{
          position: 'absolute',
          top: 75,
          left: 0,
        }}
      >
        {showGraphs && (
          <Grid container item xs={12} sm={6} sx={{ textAlign: 'left' }}>
            <Grid item>
              <Typography variant="h4" color="secondary">
                COVID-19 Demographics
              </Typography>
            </Grid>
            <Grid item>
              <Coronavirus color="primary" fontSize="large" />
            </Grid>
          </Grid>
        )}
        {showGraphs &&
          items.map((item) => (
            <Grid item xs="auto" key={item} sx={{ textAlign: 'right' }}>
              {item === 'Raw Data' ? (
                <Download data={data} />
              ) : (
                <Button
                  sx={{ textTransform: 'none' }}
                  onClick={() => setTab(item)}
                >
                  <Typography variant="subtitle2" sx={{ color: 'white' }}>
                    {item.replace('-', ' ')}
                  </Typography>
                </Button>
              )}
            </Grid>
          ))}
        {showGraphs ? (
          <Grid item xs={10} sx={{ paddingTop: 7, textAlign: 'center' }}>
            <DataChart
              tab={tab}
              subTab={
                subTab.name as 'cases' | 'tests' | 'hospitalized' | 'deaths'
              }
              data={data}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={11} sx={{ height: 100, color: 'white' }} />
            <Grid
              container
              item
              xs={11}
              sm={7}
              md={5}
              lg={3}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.75)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                borderRadius: 2.5,
              }}
            >
              <Grid item xs={12} sx={{ paddingTop: 5, color: 'white' }}>
                <Typography variant="h3" align="center">
                  The State of COVID-19
                </Typography>
                <Typography variant="caption">
                  View Various COVID-19 Demographics in the United States
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={8}
                sx={{ paddingTop: 2, paddingBottom: 4 }}
              >
                {covidIterable.map(({ title, nums }) => (
                  <Fragment key={title}>
                    <Grid item xs={6}>
                      <Typography color="secondary" variant="h6">
                        {title}:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="primary" variant="h6">
                        {Formatter.format(nums as number)}
                      </Typography>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: 5 }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowGraphs(true)}
                  size="large"
                >
                  <Typography variant="caption" sx={{ color: 'white' }}>
                    See the Graphs
                  </Typography>
                  &nbsp;&nbsp;
                  <ArrowRightAlt />
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      {showGraphs && <FloatingNav subTab={subTab} setSubTab={setSubTab} />}
    </Paper>
  )
}
