import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@mui/material'
import { string } from 'prop-types'
import paths from '../../../paths/path'

export default function ImageTile({
  slug,
  imageUrl,
  title,
  testId = 'ImageTile',
}) {
  return (
    <Box
      sx={{
        display: 'block',
        marginRight: '16px',
        backgroundColor: 'common.white',
        padding: '0px !important',
        width: '210px',
        height: '296px',
      }}
      data-testid={testId}
    >
      <Link color='textPrimary' href={paths.el({ slug: slug })}>
        <a>
          <Image
            src={imageUrl || '/images/ASCDImageFiller.png'}
            alt={title}
            width={210}
            height={296}
            placeholder='blur'
            blurDataURL='/images/blurrImg.png'
            data-testid={`${testId}-image`}
          />
        </a>
      </Link>
    </Box>
  )
}

ImageTile.propTypes = {
  testId: string,
  slug: string,
  imageUrl: string,
  title: string,
}
