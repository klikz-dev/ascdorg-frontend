import { useState } from 'react'
import { Box, Divider } from '@mui/material'
import Toggle from '../../Toggle'
import MemberPrice from '../MemberPrice/MemberPrice'

export default function MemberPriceComponent({
  testId = 'memberPriceComponent',
  memberPriceItem,
  toggleButton,
}) {
  const [toggle, setToggle] = useState(false)
  return (
    <Box data-testid={testId} sx={{ width: '100%', position: 'relative' }}>
      <Divider sx={{ marginBottom: '28px' }} />
      <Toggle
        leftTitle={toggleButton?.leftTitle}
        rightTitle={toggleButton?.rightTitle}
        setToggle={setToggle}
        toggle={toggle}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row', md: 'row' },
          width: '100%',
          marginTop: '40px',
          justifyContent: 'center',
        }}
        data-testid={`${testId}-memberPricePlan`}
      >
        {toggle &&
          memberPriceItem?.slice(3)?.map((item, idx) => {
            return (
              <MemberPrice
                key={idx}
                title={item?.title}
                price={item?.price}
                priceCaption={item?.priceCaption}
                popular={item?.popular}
                popularTitle={item?.popularTitle}
                button={item?.button}
                memberPriceItemCollection={
                  item?.memberPriceItemCollection?.items
                }
              />
            )
          })}
        {!toggle &&
          memberPriceItem?.slice(0, 3)?.map((item, idx) => {
            return (
              <MemberPrice
                key={idx}
                title={item?.title}
                price={item?.price}
                priceCaption={item?.priceCaption}
                popular={item?.popular}
                popularTitle={item?.popularTitle}
                button={item?.button}
                memberPriceItemCollection={
                  item?.memberPriceItemCollection?.items
                }
              />
            )
          })}
      </Box>
    </Box>
  )
}
