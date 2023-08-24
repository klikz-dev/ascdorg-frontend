import { string } from 'prop-types'
import ActivateTwoColumnFooter from './ActivateTwoColumnFooter'
import ContactForm from './ContactForm'
import ServicesTwoColumnFooter from './ServicesTwoColumnFooter'

export default function GreyTwoColumnFooter({
  variant = 'activate',
  buttonLink,
}) {
  function renderVariant(variant) {
    switch (variant) {
      case 'activate':
        return (
          <ActivateTwoColumnFooter
            title={'Want to know more about ASCD Activate?'}
            variant={variant}
          />
        )
      case 'services':
        return (
          <ServicesTwoColumnFooter
            title={"Let's Talk"}
            variant={variant}
            buttonLink={buttonLink}
          />
        )
      case 'contact':
        return <ContactForm />
      default:
        return null
    }
  }

  return renderVariant(variant)
}

GreyTwoColumnFooter.propTypes = {
  variant: string,
}
