import { useEffect, useState, useRef } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Input, Grid, InputAdornment, Divider } from '@mui/material'
import { string, node, func, bool, object, number } from 'prop-types'
import { connectSearchBox } from 'react-instantsearch-dom'
/**
 * The SearchBox widget is used to let the user perform a text-based query.
 * https://www.algolia.com/doc/api-reference/widgets/search-box/react/
 * Used React Material UI library and connectSearchBox component to customize the UI.
 * https://www.algolia.com/doc/api-reference/widgets/search-box/react/#connector
 */

function SearchBox({
  testId = 'custom-search-box',
  currentRefinement,
  refine,
  defaultValue,
  disableUnderline,
  placeholderText,
  customContainerSx,
  customInputSx,
  endAdornment,
  startAdornment,
  delay = 0,
}) {
  const timerRef = useRef(null)
  const [value, setValue] = useState(currentRefinement)

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (defaultValue?.length >= 0) {
      refine(defaultValue)
    }
  }, [defaultValue])

  //add debouncing
  //https://www.algolia.com/doc/guides/building-search-ui/going-further/improve-performance/react/
  const onChangeDebounced = (e) => {
    clearTimeout(timerRef.current)
    const currentValue = e.target.value
    timerRef.current = setTimeout(() => refine(currentValue), delay)
    setValue(currentValue)
  }

  const handleClear = () => {
    refine('')
    setValue('')
  }

  return (
    <Grid item xs={12} md={10} data-testid={testId} sx={customContainerSx}>
      <Input
        disableUnderline={disableUnderline}
        placeholder={placeholderText}
        value={value}
        onChange={onChangeDebounced}
        sx={customInputSx}
        endAdornment={
          endAdornment ? (
            endAdornment
          ) : (
            <InputAdornment position='end'>
              {value.length > 0 && (
                <Box onClick={handleClear} sx={{ padding: '20px' }}>
                  <ClearIcon sx={{ color: 'white', fontSize: 30 }} />
                </Box>
              )}
              <Divider
                orientation='vertical'
                variant='middle'
                flexItem
                sx={{
                  backgroundColor: 'white',
                  height: '40px',
                  marginTop: '-25px',
                }}
              />
              <Box sx={{ padding: '20px' }}>
                <SearchIcon sx={{ color: 'white', fontSize: 30 }} />
              </Box>
            </InputAdornment>
          )
        }
        startAdornment={startAdornment}
        inputProps={{ 'data-testid': `${testId}-custom-searchbox` }}
      />
    </Grid>
  )
}

SearchBox.propTypes = {
  testId: string,
  currentRefinement: string,
  refine: func,
  defaultValue: string,
  disableUnderline: bool,
  placeholderText: string,
  customContainerSx: object,
  customInputSx: object,
  endAdornment: node,
  startAdornment: node,
  delay: number,
}

const CustomSearchBox = connectSearchBox(SearchBox)
export default CustomSearchBox
