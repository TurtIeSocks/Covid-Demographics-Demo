import * as React from 'react'
import { ReactElement, Dispatch, SetStateAction } from 'react'
import { AppBar, Tab, Tabs } from '@mui/material'
import {
  LocalHospitalOutlined,
  CoronavirusOutlined,
  SickOutlined,
  BiotechOutlined,
} from '@mui/icons-material'

export interface SubTab {
  index: number
  name: string
}

export interface FloatingNavProps {
  subTab: SubTab
  setSubTab: Dispatch<SetStateAction<SubTab>>
  isMobile: boolean
}

export default function FloatingNav({
  subTab,
  setSubTab,
  isMobile,
}: FloatingNavProps): ReactElement {
  const items = [
    { text: 'Cases', Icon: CoronavirusOutlined },
    { text: 'Tests', Icon: BiotechOutlined },
    { text: 'Hospitalized', Icon: LocalHospitalOutlined },
    { text: 'Deaths', Icon: SickOutlined },
  ]

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: isMobile ? 0 : 3,
        borderBottomRightRadius: isMobile ? 0 : 3,
        width: isMobile ? '100%' : '60%',
        position: 'absolute',
        bottom: isMobile ? 0 : 10,
        left: 0,
        right: 0,
        margin: 'auto',
      }}
    >
      <Tabs
        value={subTab.index}
        onChange={(_, v) => setSubTab({ index: v, name: items[v].text.toLowerCase() })}
        indicatorColor="primary"
        variant="fullWidth"
      >
        {items.map(({ text, Icon }) => (
          <Tab
            key={text}
            label={text}
            icon={<Icon fontSize={isMobile ? 'small' : 'large'} color="secondary" />}
          />
        ))}
      </Tabs>
    </AppBar>
  )
}
