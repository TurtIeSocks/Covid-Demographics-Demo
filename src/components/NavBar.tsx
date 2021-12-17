import * as React from 'react'
import { ReactElement } from 'react'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'

import LinkWrapper from './helpers/LinkWrapper'

export interface NavbarProps {
  items: string[]
  activeLinks?: boolean
  setShowGraphs: (showGraphs: boolean) => void
}

export default function NavBar({
  items,
  activeLinks = false,
  setShowGraphs,
}: NavbarProps): ReactElement {
  return (
    <AppBar
      position="absolute"
      color="inherit"
      style={{ backgroundColor: 'black' }}
    >
      <Toolbar
        disableGutters
        variant="dense"
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 0.5,
        }}
      >
        {items.map((item, i) => {
          const NavButton = (
            <Button
              onClick={item === 'home' ? () => setShowGraphs(false) : undefined}
              key={item}
              color={item === 'contact' ? 'primary' : 'inherit'}
              variant={item === 'contact' ? 'contained' : 'text'}
              size="small"
              style={{ marginLeft: i ? '0.5rem' : 0 }}
            >
              <Typography variant="caption">
                {item.replace(/-/g, ' ')}
              </Typography>
            </Button>
          )
          return activeLinks ? (
            <LinkWrapper
              element={NavButton}
              link={i ? `/${item}` : '/'}
              key={item}
            />
          ) : (
            NavButton
          )
        })}
      </Toolbar>
    </AppBar>
  )
}
