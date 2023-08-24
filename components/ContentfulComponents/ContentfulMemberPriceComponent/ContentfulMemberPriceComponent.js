import MemberPriceComponent from '../../interactives/MemberPriceComponent'

export default function ContentfulMemberPriceComponent({
  memberPriceItem,
  toggleButton,
}) {
  if (!memberPriceItem) return null
  return (
    <MemberPriceComponent
      memberPriceItem={memberPriceItem.items}
      toggleButton={toggleButton}
    />
  )
}
