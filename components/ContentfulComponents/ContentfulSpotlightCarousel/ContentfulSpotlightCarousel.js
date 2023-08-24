import SpotlightCarousel from '../../interactives/Carousel/variant/SpotlightCarousel'

export default function ContentfulSpotlightCarousel({
  spotlightCarouselItems,
  title,
  type,
  autoAdvance,
  autoAdvanceFrequency,
}) {
  return (
    <SpotlightCarousel
      content={spotlightCarouselItems.items}
      title={title}
      type={type}
      autoAdvanceFrequency={autoAdvanceFrequency}
      autoAdvance={autoAdvance}
    />
  )
}
