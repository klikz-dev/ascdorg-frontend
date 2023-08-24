import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { string, object } from 'prop-types'

export default function TableContent({ title, item1, item2, testId }) {
  const displayData = (data) => {
    if (typeof data !== 'object') {
      return data
    } else {
      return data?.title
    }
  }
  return (
    <TableContainer data-testid={testId}>
      <Box
        display='flex'
        justifyContent='center'
        data-testid={`${testId}-title`}
      >
        <Typography>{title}</Typography>
      </Box>
      <Table aria-label='simple table'>
        <TableHead data-testid={`${testId}-head`}>
          <TableRow
            sx={{
              backgroundColor: 'background.main',
            }}
          >
            {item1?.map((column, key) => (
              <TableCell key={key}>
                <Typography>{displayData(column)}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody data-testid={`${testId}-body`}>
          {item2?.map((row, Key) => (
            <TableRow key={Key}>
              {(row?.tableColumnContent
                ? row?.tableColumnContent?.items
                : row
              ).map((col, colKey) => (
                <TableCell key={colKey} align='left'>
                  {row?.tableColumnContent
                    ? documentToReactComponents(col?.columnContent?.json)
                    : displayData(col)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

TableContent.propType = {
  testId: string,
  title: string,
  item1: object,
  item2: object,
}
