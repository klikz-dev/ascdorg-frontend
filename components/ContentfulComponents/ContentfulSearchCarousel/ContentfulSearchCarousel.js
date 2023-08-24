import SearchCarousel from '../../interactives/Carousel/variant/SearchCarousel'

export default function ContentfulSearchCarousel({
  indexName,
  title,
  ctaUrlLink,
  ctaUrlTarget,
  ctaLabel,
  scrollByAmount,
  type,
  topics,
  keywords,
  dateLowerRange,
  dateUpperRange,
  authors,
  featured,
  premium,
  memberBook,
  quickRead,
  elArticleType,
}) {
  if (!indexName) return null
  return (
    <SearchCarousel
      indexName={indexName}
      title={title}
      ctaTarget={ctaUrlTarget}
      ctaLink={ctaUrlLink}
      ctaLabel={ctaLabel}
      scrollByAmount={scrollByAmount}
      type={type}
      topics={topics}
      keywords={keywords}
      dateLowerRange={dateLowerRange}
      dateUpperRange={dateUpperRange}
      authors={authors}
      featured={featured}
      elArticleType={elArticleType}
      premium={premium}
      memberBook={memberBook}
      quickRead={quickRead}
    />
  )
}
