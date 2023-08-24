import { useEffect, useState } from 'react'
import { Box, Button, Typography, List, ListItem } from '@mui/material'
import { arrayOf, shape, string, number, oneOfType, bool } from 'prop-types'

/** @todo: refactor */
export default function TOCNav({
  toc_items,
  activeBorderWidth,
  activeBorderColor,
  maxWidth,
  backgroundColor,
  borderLeft,
  fontSize,
}) {
  const [active, setActive] = useState()

  useEffect(() => {
    window.addEventListener('scroll', (e) => debounce(handleScroll(e), 1000))
    return function cleanupListener() {
      window.removeEventListener('scroll', (e) => handleScroll(e))
    }
  }, [])

  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        timeout = null
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const handleScroll = () => {
    let itemInView = false
    toc_items?.map((toc) => {
      const el = document.getElementById(toc.id)
      if (el) {
        if (isElementVisible(el)) {
          if (!itemInView) {
            itemInView = true
            setActive(toc.id)
          }
        }
      }
    })

    function isElementVisible(el) {
      if (el) {
        const rect = el.getBoundingClientRect()
        const vWidth = window.innerWidth || document.documentElement.clientWidth
        const vHeight =
          window.innerHeight || document.documentElement.clientHeight
        const efp = (x, y) => {
          return document.elementFromPoint(x, y)
        }

        // Return false if it's not in the viewport
        if (
          rect.right < 0 ||
          rect.bottom < 0 ||
          rect.left > vWidth ||
          rect.top > vHeight
        )
          return false

        // Return true if any of its top corners are visible
        return (
          el.contains(efp(rect.left, rect.top)) ||
          el.contains(efp(rect.right, rect.top))
        )
      }
      /** if no element */
      return false
    }
  }

  const navigateTo = (id) => {
    const el = window.document.getElementById(id)
    if (el) {
      const r = el.getBoundingClientRect()
      window.scrollTo({
        top: scrollY + r.top - 150,
        behavior: 'smooth',
      })
    }
  }

  const _renderMenuItems = (menuItems) => {
    if (!menuItems) return <></>

    return menuItems.map(({ label, id }) => (
      <ListItem
        key={label}
        sx={
          active === id
            ? {
                color: 'common.black',
                borderLeftWidth: activeBorderWidth ? activeBorderWidth : '0',
                borderLeftColor: activeBorderColor
                  ? activeBorderColor
                  : 'primary.main',
                borderLeftStyle: 'solid',
                padding: 0,
                paddingLeft: activeBorderWidth
                  ? `calc(20px - ${activeBorderWidth}) !important`
                  : '0',
              }
            : { padding: 0 }
        }
      >
        <Button onClick={() => navigateTo(id)} variant='text'>
          <Typography variant='subtitle3'>{label}</Typography>
        </Button>
      </ListItem>
    ))
  }

  return (
    <Box
      aria-label='Article Table of Contents'
      sx={{
        maxWidth: maxWidth,
        bgcolor: backgroundColor,
        borderLeft: borderLeft ? '1px solid #C4C4C4' : '',
        '& *': {
          fontSize: fontSize
            ? (theme) => theme.typography.pxToRem(fontSize)
            : (theme) => theme.typography.pxToRem(14),
          lineHeight: '18px',
          fontWeight: 400,
          letterSpacing: '0.02px',
        },
        '& ul': {
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          '& li': {
            mt: 1,
            mb: 1,
            paddingLeft: '20px',
            color: 'grey.medium',
            '& *': {
              textAlign: 'left',
            },
          },
        },
      }}
      ml={0}
      pl={0}
    >
      <List>{_renderMenuItems(toc_items)}</List>
    </Box>
  )
}

TOCNav.propTypes = {
  toc_items: arrayOf(
    shape({
      id: string,
      label: string,
    })
  ),
  activeBorderWidth: string,
  activeBorderColor: string,
  backgroundColor: string,
  borderLeft: bool,
  fontSize: number,
  maxWidth: oneOfType([string, number]),
}
