import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { string, object, bool, array } from 'prop-types'
import { options } from '../../../const'
import CardGrid from '../../CardGrid'

/**
 * Component Grid from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.pageId Test Id String
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentGrid = ({
  testId,
  gridItems,
  title,
  gridBody,
  bodyCentered,
  layout,
  pageId,
}) => {
  return (
    <CardGrid
      testId={testId}
      items={gridItems}
      pageId={pageId}
      headerText={title}
      headerBody={documentToReactComponents(gridBody?.json, options())}
      bodyCentered={bodyCentered}
      gridLayout={layout}
    />
  )
}

ComponentGrid.propTypes = {
  testId: string,
  pageId: string,
  gridItems: array,
  title: string,
  gridBody: object,
  bodyCentered: bool,
  layout: string,
}

export default ComponentGrid
