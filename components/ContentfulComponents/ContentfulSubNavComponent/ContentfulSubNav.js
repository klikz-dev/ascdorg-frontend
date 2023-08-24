import SubNav from '../../interactives/SubNav'

export default function ContentfulSubNav({ ctaButton, subNavDropDown }) {
  return (
    <SubNav
      items={ctaButton?.items}
      subNav={subNavDropDown?.ctaButton?.items}
    />
  )
}
