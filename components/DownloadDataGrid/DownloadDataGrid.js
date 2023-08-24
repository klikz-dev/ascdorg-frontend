import Link from 'next/link'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Container, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

const columns = [
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    renderCell: (params) => {
      const date = new Date(params.value)
      const day = `0${date.getDate()}`.slice(-2)
      const month = `0${date.getMonth() + 1}`.slice(-2)
      const year = date.getFullYear()
      return `${month}-${day}-${year}`
    },
  },
  {
    field: 'shortName',
    headerName: 'Title',
    width: 600,
    editable: true,
  },
  {
    field: 'url',
    headerName: 'Downloads',
    width: 200,
    renderCell: (params) => (
      <h4 style={{ fontWeight: '600' }}>
        <Link
          href={`${params.value}`}
          style={{
            color: '#0000ff',
          }}
        >
          <a style={{ marginLeft: '7px' }}>
            Download {<ArrowDownwardIcon style={{ verticalAlign: 'middle' }} />}
          </a>
        </Link>
      </h4>
    ),
  },
]

export default function DownloadDataGrid({ testId = 'download', downloads }) {
  const rows = downloads?.length && downloads

  return (
    <Container>
      <Box mt={13} mb={13} data-testId={`${testId}`}>
        {rows ? (
          <div style={{ height: '30vw', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              color='primary'
            />
          </div>
        ) : (
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: '17px',
            }}
          >
            You do not have any downloads. If you believe this to be incorrect,
            please{' '}
            <Link href='/contact'>
              <a style={{ textDecoration: 'underline' }}>contact us</a>
            </Link>{' '}
            for assistance.
          </Typography>
        )}
      </Box>
    </Container>
  )
}

DownloadDataGrid.proptypes = {
  testId: PropTypes.string,
  downloads: PropTypes.array,
}
