import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
  GlobalStyles,
} from '@mui/material'
import { string, object, element } from 'prop-types'

/**
 * Global styles attached to the component
 */
const accordionGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '& .MuiAccordionSummary-content .MuiTypography-h5': {
        fontWeight: 'normal',
      },
      '.MuiAccordion-root': {
        backgroundColor: `${theme.palette.background.main} !important`,
      },
      '.MuiAccordionSummary-root': {
        backgroundColor: `${theme.palette.grey.extraLight} !important`,
        minHeight: '120px !important',
      },
      '.MuiGrid-grid-xs-true > p': {
        marginTop: '0px',
      },
      '.MuiAccordionDetails-root': {
        padding: '12px 24px 12px',
        [theme.breakpoints.up('sm')]: {
          padding: '32px 32px 24px !important',
        },
      },
    })}
  />
)

/**
 * Base Accordion component to create other Accordion Items
 * @param {string} testId optional string for test id
 * @param {string} collapseText optional string for collapse button text
 * @param {string} expandText optional string for expand button text
 * @param {object} item required item from hit list
 * @param {ReactNode} accordionSummaryContent react components for summary content
 * @param {ReactNode} accordionDetailsContent react components for details content
 * @returns
 */
const AccordionItem = ({
  testId = 'accordion-item',
  collapseText,
  expandText,
  item,
  accordionSummaryContent,
  accordionDetailsContent,
}) => {
  const router = useRouter()
  const [expandPanel, setExpandPanel] = useState(false)

  useEffect(() => {
    if (router?.asPath?.split('#').pop() === item?.slug) {
      setExpandPanel(true)
    }
  }, [item?.slug, router?.asPath])

  return (
    <>
      {/* Global styles are applied here */}
      {accordionGlobalStyles}
      <Accordion
        sx={{
          backgroundColor: 'grey.extraLight',
          boxShadow: 'none',
          '& > *:first-of-type': {
            borderRadius: '4px',
          },
          '& > *:last-of-type': {
            borderRadius: '0 0 4px 4px',
          },
          '&.Mui-expanded': {
            '& > *:first-of-type': {
              borderRadius: '4px 4px 0 0',
            },
          },
          '& .MuiButton-endIcon': {
            marginLeft: 0,
          },
          '& .MuiButton-endIcon svg path': {
            fill: 'primary.main',
          },
        }}
        onChange={() => setExpandPanel(!expandPanel)}
        expanded={expandPanel}
        data-testid={testId}
        id={item?.slug}
      >
        <AccordionSummary
          expandIcon={
            <Box px={1}>
              <Button
                endIcon={expandPanel ? <ExpandLess /> : <ExpandMore />}
                data-testid={`${testId}-expand-icon-button`}
              >
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '32px',
                    letterSpacing: '0.2px',
                  }}
                  data-testid={`${testId}-expand-icon-text`}
                >
                  {expandPanel ? collapseText : expandText}
                </Typography>
              </Button>
            </Box>
          }
          aria-controls={item?.title}
          id={item?.title}
          sx={(theme) => ({
            height: '100%',
            alignContent: 'center',
            padding: 0,
            '& .MuiAccordionSummary-expandIcon': {
              marginRight: '24px',
            },
            '& .MuiAccordionSummary-content': {
              margin: '24px 16px',
              '& .MuiBox-root': {
                marginLeft: 0,
              },
              [theme.breakpoints.up('sm')]: {
                margin: '28px 32px 24px !important',
              },
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              transform: 'rotate(0deg) !important',
            },
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              '& .MuiAccordionSummary-expandIcon': {
                width: '100%',
                backgroundColor: theme.palette.background.main,
                padding: '0',
                borderRadius: '0 0 4px 4px!important',
              },
              '& .MuiAccordionSummary-expandIcon .MuiIconButton-label': {
                width: '100%',
              },
              '& .MuiAccordionSummary-expandIcon .MuiIconButton-label .MuiBox-root':
                {
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  marginRight: 0,
                },
            },
          })}
          classes={{
            expandIconWrapper: {
              disableRipple: true,
              style: {
                transform: 'none',
                transition: 'none',
                borderRadius: 0,
              },
            },
          }}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            style={{ width: '100%' }}
            marginLeft={2}
            data-testid={`${testId}-summary`}
          >
            {accordionSummaryContent}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container wrap='nowrap' data-testid={`${testId}-details`}>
            {accordionDetailsContent}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

AccordionItem.propTypes = {
  testId: string,
  collapseText: string,
  expandText: string,
  item: object,
  accordionSummaryContent: element,
  accordionDetailsContent: element,
}

export default AccordionItem
