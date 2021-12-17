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
}

export default function FloatingNav({
  subTab,
  setSubTab,
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
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        width: '60%',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        margin: 'auto',
      }}
    >
      <Tabs
        value={subTab.index}
        onChange={(e, v) => setSubTab({ index: v, name: items[v].text.toLowerCase() })}
        indicatorColor="primary"
        variant="fullWidth"
      >
        {items.map(({ text, Icon }) => (
          <Tab
            key={text}
            label={text}
            icon={<Icon fontSize="large" color="secondary" />}
            style={{ width: 40, minWidth: 40 }}
          />
        ))}
      </Tabs>
    </AppBar>
  )
}
