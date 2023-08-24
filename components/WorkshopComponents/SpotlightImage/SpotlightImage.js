import { string, number } from 'prop-types'
import NextImageWrapper from '../../images/NextImageWrapper'

export default function SpotlightImage({ imgUrl, imgTitle }) {
  return (
    <NextImageWrapper
      src={imgUrl}
      alt={imgTitle}
      style={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '16px 16px 16px 64px',
      }}
      height={388}
      width={800}
      layout='responsive'
      priority
    />
  )
}

SpotlightImage.propTypes = {
  imgUrl: string.isRequired,
  imgTitle: string,
  height: number,
  width: number,
}
