import { Close } from '@mui/icons-material'
import { Chip, Box, List } from '@mui/material'
import { string, array, func } from 'prop-types'
import { connectCurrentRefinements } from 'react-instantsearch-dom'
import CustomClearRefinements from '../CustomClearRefinements'

const CurrentRefinements = ({
  testId = 'current-refinements',
  items,
  refine,
  createURL,
}) => {
  const renderLabel = (item) => {
    switch (item.label) {
      case 'pubissue':
        return 'publication'
      case 'pressRelease':
        return 'press release'
      default:
        return item.label
    }
  }
  return (
    <Box data-testid={testId}>
      <List
        sx={{
          listStyleType: 'none',
          paddingLeft: '0px',
        }}
        key={null}
      >
        {items.map((item, i) => (
          <Box key={i}>
            {item.items ? (
              <>
                {item.items.map((nested, i) => (
                  <li key={i}>
                    <Chip
                      label={renderLabel(nested)}
                      deleteIcon={<Close />}
                      onDelete={(event) => {
                        event.preventDefault()
                        refine(nested.value)
                      }}
                      sx={{
                        float: 'left',
                        listStylePosition: 'inside',
                        margin: 'auto',
                        marginRight: 1,
                        marginBottom: 1,
                        height: '28px',
                        backgroundColor: 'grey.extraLight',
                        color: 'text.primary',
                        '& .MuiChip-deleteIcon': {
                          width: '18px',
                          height: '18px',
                          '& path': {
                            fill: 'text.primary',
                          },
                          '&:hover, &:focus': {
                            backgroundColor: 'grey.medium',
                            borderRadius: '50%',
                            '& path': {
                              fill: 'text.secondary',
                            },
                          },
                        },
                      }}
                    />
                  </li>
                ))}
              </>
            ) : (
              <a
                href={createURL(item.value)}
                onClick={(event) => {
                  event.preventDefault()
                  refine(item.value)
                }}
              >
                {item.label}
              </a>
            )}
          </Box>
        ))}
        <li>
          <Box
            sx={{
              paddingTop: 0.5,
              paddingLeft: 1,
              '&:hover, &:focus': {
                '& a': {
                  color: 'hover.main',
                },
              },
            }}
          >
            <CustomClearRefinements />
          </Box>
        </li>
      </List>
    </Box>
  )
}

CurrentRefinements.propTypes = {
  testId: string,
  items: array,
  refine: func,
  createURL: func,
}

export const CustomCurrentRefinements =
  connectCurrentRefinements(CurrentRefinements)
export default CustomCurrentRefinements
