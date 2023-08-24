import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { string, array, shape, object } from 'prop-types'
import { options } from '../../../const'
import TwoColContentListing from '../../TwoColContentListing/TwoColContentListing'

/**
 * Component Two Column Content List from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentTwoColumnContentList = ({
  testId,
  title,
  twoColContentListBody,
  listItem,
}) => {
  return (
    <TwoColContentListing
      testId={testId}
      title={title}
      body={documentToReactComponents(twoColContentListBody?.json, options())}
      items={listItem?.items}
    />
  )
}

ComponentTwoColumnContentList.propTypes = {
  testId: string,
  title: string,
  twoColContentListBody: object,
  listItem: shape({ items: array }),
}

export default ComponentTwoColumnContentList
