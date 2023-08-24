import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Grid, Typography } from '@mui/material'
import { string, object } from 'prop-types'
import { options } from '../../../../../const'
import AccordionItem from '../AccordionItem'

/**
 *
 * @param {string} testId optional string for test id
 * @param {object} item required item from hit list
 * @returns
 */
const FAQAccordionItem = ({ testId = 'faq-accordion-item', item }) => {
  return (
    <AccordionItem
      item={item}
      expandText={'View Answer'}
      collapseText={'Hide Answer'}
      accordionSummaryContent={
        <Box>
          <Grid container wrap='nowrap' data-testid={`${testId}-summary`}>
            <Grid item>
              <Typography
                sx={{
                  marginTop: '0',
                  fontSize: '200%',
                  marginRight: '29px',
                  fontWeight: '700',
                  alignItems: 'center',
                }}
                data-testid={`${testId}-summary-typo`}
              >
                {'Q'}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography data-testid={`${testId}-title`} variant='h5'>
                {item?.title}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      }
      accordionDetailsContent={
        <>
          <Grid item>
            <Typography
              sx={{
                marginTop: '1rem',
                fontSize: '200%',
                marginRight: '29px',
                fontWeight: '700',
                alignItems: 'center',
              }}
              data-testid={`${testId}-details-typo`}
            >
              {'A'}
            </Typography>
          </Grid>

          <Grid item xs data-testid={`${testId}-details-content`}>
            {documentToReactComponents(item?.details, options())}
          </Grid>
        </>
      }
    />
  )
}

FAQAccordionItem.propTypes = {
  testId: string,
  item: object.isRequired,
}

export default FAQAccordionItem
