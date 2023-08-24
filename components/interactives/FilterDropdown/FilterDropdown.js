import { FormControl, Select, MenuItem, Typography } from '@mui/material'
import {
  string,
  arrayOf,
  shape,
  number,
  bool,
  func,
  oneOfType,
} from 'prop-types'

export default function FilterDropdown({
  testId = 'custom-drop-down-select',
  items,
  refine,
  currentRefinement,
  selectAllOption,
  isMultiple,
  customWidth,
  customHeight,
}) {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const handleChangeMultipleTopics = (event) => {
    if (event.target.value.includes('')) {
      refine([])
    } else {
      refine(event.target.value)
    }
  }

  const handleChangeTopics = (event) => {
    refine && refine(event.target.value)
  }

  return (
    <FormControl
      variant='outlined'
      sx={{
        width: customWidth || '250px',
        height: customHeight || 'auto',
      }}
      data-testid={testId}
    >
      <Select
        labelId='multiple-checkbox-label'
        data-testid={`${testId}-multiple-checkbox`}
        id='multiple-checkbox'
        multiple={!!isMultiple}
        value={currentRefinement || ''}
        onChange={isMultiple ? handleChangeMultipleTopics : handleChangeTopics}
        displayEmpty
        renderValue={
          isMultiple
            ? (selected) => selected.join(', ') || selectAllOption
            : null
        }
        MenuProps={MenuProps}
        sx={{
          height: customHeight || 'auto',
        }}
      >
        {selectAllOption && (
          <MenuItem value='' data-testid={`${testId}-selectAll`}>
            <Typography variant='buttonSmall'>{selectAllOption}</Typography>
          </MenuItem>
        )}
        {items.map((item, index) => (
          <MenuItem
            key={`${item.label}-${index}`}
            value={item.label}
            data-testid={`${testId}-item-${index}`}
          >
            <Typography variant='buttonSmall'>{item.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

FilterDropdown.propTypes = {
  testId: string,
  items: arrayOf(
    shape({
      label: string,
      count: number,
      isRefined: bool,
      value: oneOfType([arrayOf(string), string, number]),
    })
  ),
  isMultiple: bool,
  currentRefinement: oneOfType([arrayOf(string), string, number]),
  refine: func,
  customWidth: string,
  customHeight: string,
  selectAllOption: string,
}
