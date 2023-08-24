import Image from 'next/image'

const NextImageWrapper = ({
  testId = 'next-image-wrapper',
  src,
  priority,
  ...restProps
}) => {
  return (
    <Image
      priority={priority}
      data-testid={testId}
      src={src || '/images/ASCDImageFiller.png'}
      placeholder='blur'
      blurDataURL={
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMT6/eDwAEkAIKgUV8iQAAAABJRU5ErkJggg=='
      }
      {...restProps}
    />
  )
}

export default NextImageWrapper
