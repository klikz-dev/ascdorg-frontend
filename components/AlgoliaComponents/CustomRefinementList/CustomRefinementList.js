import { Box, Autocomplete, Paper, Popper, TextField } from '@mui/material'
import { string, array, func } from 'prop-types'
import { connectRefinementList } from 'react-instantsearch-dom'

const RefinementList = ({ testId = 'custom-refinement', items, refine }) => (
  <Box className={`ais-RefinementList`} data-testid={testId}>
    <Autocomplete
      multiple={true}
      options={items}
      noOptionsText='No results'
      open={true}
      disableClearable
      freeSolo
      renderTags={() => null}
      disableCloseOnSelect
      PaperComponent={(props) => <Paper elevation={0} {...props} />}
      PopperComponent={({ style, ...props }) => (
        <Popper {...props} style={{ ...style, height: 0, zIndex: 0 }} />
      )}
      disablePortal={true}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <label
          className={`ais-RefinementList-label`}
          key={`${option.label}-${option.count}`}
          data-testid={`${testId}-option-${option.label}`}
        >
          <input
            type='checkbox'
            checked={option.isRefined}
            className={`ais-RefinementList-checkbox`}
            onChange={() => {
              refine(option.value)
            }}
            data-testid={`${testId}-checkbox-${option.label}`}
          />
          <span
            className={`ais-RefinementList-labelText`}
            data-testid={`${testId}-label-${option.label}`}
          >
            {option.label}
          </span>
          <span
            className={`ais-RefinementList-count`}
            data-testid={`${testId}-count-${option.label}`}
          >
            {option.count}
          </span>
        </label>
      )}
      sx={{ width: 300, zIndex: 0 }}
      renderInput={(params) => (
        <TextField {...params} placeholder='Search' size='small' />
      )}
    />
  </Box>
)

RefinementList.propTypes = {
  testId: string,
  items: array,
  refine: func,
}

export const CustomRefinementList = connectRefinementList(RefinementList)
export default CustomRefinementList
