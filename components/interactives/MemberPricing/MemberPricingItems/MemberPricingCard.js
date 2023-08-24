import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { options } from '../../../../const'
import MemberPricingTile from './MemberPricingTile'

export default function MemberPricingCard({ items }) {
  if (!items?.length) return null
  return items?.map(
    ({
      memberPricingBody,
      ctaButton,
      label,
      popular,
      price,
      title,
      symbol,
      titleCentered,
      bodyCentered,
      term,
      bulletPoint,
    }) => (
      <>
        <MemberPricingTile
          body={documentToReactComponents(memberPricingBody?.json, options())}
          ctaButton1={
            ctaButton?.items?.length ? ctaButton?.items[0] : undefined
          }
          ctaButton2={
            ctaButton?.items?.length ? ctaButton?.items[1] : undefined
          }
          label={label}
          popular={popular}
          price={price}
          title={title}
          priceSymbol={symbol}
          popularLabel={label}
          titleCentered={titleCentered}
          bodyCentered={bodyCentered}
          term={term}
          bulletPoint={bulletPoint}
          amountOfItems={items?.length}
        />
      </>
    )
  )
}
