import { string, array } from 'prop-types'
import TableContent from '../../TableContent'
export default function ContentfulTable({
  title,
  item1,
  item2,
  testId = 'contentful-table',
}) {
  return (
    <TableContent title={title} item1={item1} item2={item2} testId={testId} />
  )
}

ContentfulTable.propTypes = {
  testId: string,
  title: string,
  item1: array,
  item2: array,
}
