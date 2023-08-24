import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Grid, Typography } from '@mui/material'
import { string, object } from 'prop-types'
import { options } from '../../../../../const'
import CtaButton from '../../../../interactives/Buttons/CtaButton'
import AccordionItem from '../AccordionItem'

/**
 *
 * @param {string} testId optional string for test id
 * @param {object} item required item from hit list
 * @returns
 */
const ELAccordionItem = ({ testId = 'el-accordion-item', item }) => {
  return (
    <AccordionItem
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
              </Grid>
            </Grid>
            {item.deadline && (
              <Typography
                data-testid={`${testId}-subtitle`}
                variant='subtitle1'
              >
                Deadline: {item.deadline}
              </Typography>
            )}
          </Box>
          {!item.hideCtaButon && (
            <CtaButton
              data-testid={`${testId}-button`}
              variant='contained'
              color='primary'
              width='114'
              height='42'
              label='Submit'
              href={
                item?.submissionUrl
                  ? item.submissionUrl
                  : 'https://elmagazine.submittable.com/submit'
              }
              target='_blank'
            />
          )}
        </>
      }
      accordionDetailsContent={
        <Grid item xs data-testid={`${testId}-details-content`}>
          {documentToReactComponents(item?.details, options())}
        </Grid>
      }
    />
  )
}

ELAccordionItem.propTypes = {
  testId: string,
  item: object.isRequired,
}

export default ELAccordionItem
