import HorziontalCarousel from '../../interactives/Carousel/variant/HorizontalCarousel'

export default function ContentfulHorziontalCarousel({
  horizontalCarouselItems,
  title,
  ctaUrlTarget,
  ctaUrlLink,
  ctaLabel,
  carouselButtonSize,
  scrollByAmount,
  type,
}) {
  return (
    <HorziontalCarousel
      content={horizontalCarouselItems.items}
      title={title}
      ctaTarget={ctaUrlTarget}
      ctaLink={ctaUrlLink}
      ctaLabel={ctaLabel}
      carouselButtonSize={carouselButtonSize}
      scrollByAmount={scrollByAmount}
      type={type}
    />
  )
}
