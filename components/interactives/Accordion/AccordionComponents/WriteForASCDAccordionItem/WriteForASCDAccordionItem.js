import { Box, Grid, Typography } from '@mui/material'
import { string, object } from 'prop-types'
import CtaButton from '../../../Buttons/CtaButton'
import AccordionItem from '../AccordionItem'

/**
 *
 * @param {string} testId optional string for test id
 * @param {object} item required item from hit list
 * @returns
 */
const WriteForASCDAccordionItem = ({
  testId = 'write-for-ascd-accordion-item',
  item,
}) => {
  return (
    <AccordionItem
      testId={testId}
      item={item}
      expandText={'More'}
      collapseText={'Less'}
      accordionSummaryContent={
        <>
          <Box>
            <Grid container wrap='nowrap' data-testid={`${testId}-summary`}>
              <Grid item xs>
                <Typography data-testid={`${testId}-title`} variant='h4'>
                  {item?.title}
                </Typography>
                <Typography
                  data-testid={`${testId}-subtitle`}
                  variant='subtitle1'
                >
                  {item?.subtitle}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <CtaButton
            testId={`${testId}-button`}
            variant='contained'
            color='primary'
            width='114'
            height='42'
            label='Submit'
            href={item?.ctaLink}
            target='_blank'
          />
        </>
      }
      accordionDetailsContent={
        <Grid item xs data-testid={`${testId}-details-content`}>
          {item.description}
        </Grid>
      }
    />
  )
}

WriteForASCDAccordionItem.propTypes = {
  testId: string,
  item: object.isRequired,
}

export default WriteForASCDAccordionItem
