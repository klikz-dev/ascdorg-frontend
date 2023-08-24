import { string, object } from 'prop-types'
import CtaButton from '../../interactives/Buttons/CtaButton'
import SnipcartButton from '../../Snipcart/SnipcartButton'

/**
 * RegisterNowButton Component from Contentful as Embedded Component
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
export default function RegisterNowButton({
  testId,
  id,
  align,
  linkLabel,
  linkUrl,
  linkTarget,
  color,
  snipcartData,
}) {
  const alignment = align?.includes('right')
    ? 'flex-end'
    : align?.includes('center')
    ? 'center'
    : 'flex-start'

  return (
    <>
      {linkTarget !== 'hide' &&
        ((id && linkTarget === 'piano') ||
        (linkUrl && linkTarget === 'webinar') ? (
          <CtaButton
            testId={testId}
            variant='contained'
            color={color || 'primary'}
            size='large'
            label={linkLabel}
            href={linkTarget === 'webinar' ? linkUrl : null}
            target={linkTarget}
            align={alignment}
            id={linkTarget === 'piano' ? id : null}
            backgroundColor='#3C64B1'
            styles={{
              border: '2px solid #fff',
              borderRadius: '2px',
              width: '100%',
            }}
          />
        ) : (
          <SnipcartButton
            sx={{
              color: 'common.white',
              backgroundColor: 'primary.main',
              border: '2px solid #fff',
              borderRadius: '2px',
              minWidth: { xs: '100%', md: '104px' },
              height: '38px',
              padding: '0px 16px',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(51, 126, 109, 0.8)',
                textDecoration: 'underline',
              },
            }}
            snipcart={snipcartData}
          />
        ))}
    </>
  )
}

RegisterNowButton.propTypes = {
  testId: string,
  id: string,
  align: string,
  linkLabel: string,
  linkUrl: string,
  linkTarget: string,
  color: string,
  /** @todo: define shape */
  snipcartData: object,
}
