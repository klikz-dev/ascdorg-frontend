import MemberPricing from '../../interactives/MemberPricing'

export default function ContentfulMemberPricing({
  memberPricingItem,
  title,
  bodyCentered,
  memberPricingBody,
}) {
  if (!memberPricingItem) return null
  return (
    <MemberPricing
      items={memberPricingItem?.items}
      title={title}
      bodyCentered={bodyCentered}
      body={memberPricingBody}
    />
  )
}
