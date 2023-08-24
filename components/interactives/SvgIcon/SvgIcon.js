import { SvgIcon as MuiSvgIcon } from '@mui/material'
import { ICONS } from '../Icons'

export default function SvgIcon({ icon, testId, ...restProps }) {
  return (
    <MuiSvgIcon {...restProps} data-testid={testId}>
      {ICONS[`${icon}`]}
    </MuiSvgIcon>
  )
}
