import * as React from 'react'
import { useState, useEffect, ReactElement } from 'react'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import '@assets/main.scss'
import { Covid19, Data } from '@assets/types'
import theme from '@assets/theme'
import fetchData from '@services/fetchData'
import fetchCovid from '@services/fetchCovid'

import NavBar from './NavBar'
import Home from './Home'

export default function App(): ReactElement {
  const [data, setData] = useState<Data[]>([])
  const [covidData, setCovidData] = useState<Covid19>({})
  const [showGraphs, setShowGraphs] = useState(false)

  const items = [
    'home',
    'locations',
    'blog',
    'sign-in',
    'register',
    'contact',
  ]

  useEffect(() => {
    (async () => {
      setData(await fetchData())
      setCovidData(await fetchCovid())
    })()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar items={items} activeLinks setShowGraphs={setShowGraphs} />
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                data={data}
                covidData={covidData}
                showGraphs={showGraphs}
                setShowGraphs={setShowGraphs}
              />
            )}
          />
          <Route path="/locations" element={<div>Locations</div>} />
          <Route path="/blog" element={<div>Blog</div>} />
          <Route path="/sign-in" element={<div>Sign In</div>} />
          <Route path="register" element={<div>Register</div>} />
          <Route path="contact" element={<div>Contact</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}
