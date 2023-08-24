import dynamic from 'next/dynamic'
import {
  contentfulImageTransformation,
  contentfulThumbnailToImageHeight,
  contentfulThumbnailToImageWidth,
} from '../../lib/data-transformations'
/**
 * dynamic imports for code splitting purposes, avoids every component being loaded
 */
const ButtonLinkComponent = dynamic(() =>
  import('../../components/ContentfulComponents/ButtonLinkComponent')
)
const RegisterNowButton = dynamic(() =>
  import('../../components/ContentfulComponents/RegisterNowButton')
)
const ComponentBanner = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentBanner')
)
const ComponentButton = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentButton')
)
const ComponentCTA = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentCTA')
)
const ComponentGrid = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentGrid')
)
const ComponentQuote = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentQuote')
)
const ComponentRichText = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentRichText')
)
const ComponentTip = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentTip')
)
const ComponentTwoColumnContentList = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentTwoColumnContentList')
)
const ComponentTwoColumnCta = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentTwoColumnCta')
)
const Image = dynamic(() =>
  import('../../components/ContentfulComponents/Image')
)
const Profile = dynamic(() =>
  import('../../components/ContentfulComponents/Profile')
)
const ContentfulTable = dynamic(() =>
  import('../../components/ContentfulComponents/ContentfulTable')
)
const EmbeddedMedia = dynamic(() =>
  import('../../components/ContentfulComponents/EmbeddedMedia')
)
const ValuePropositionCta = dynamic(() =>
  import('../../components/ContentfulComponents/ValuePropositionCta')
)
const PodcastPlayer = dynamic(() =>
  import('../../components/VideoComponents/PodcastPlayer')
)
const VideoPlayer = dynamic(() =>
  import('../../components/VideoComponents/VideoPlayer')
)
const ContentfulHorizontalCarousel = dynamic(() =>
  import('../../components/ContentfulComponents/ContentfulHorizontalCarousel')
)
const ContentfulSpotlightCarousel = dynamic(() =>
  import('../../components/ContentfulComponents/ContentfulSpotlightCarousel')
)
const ContentfulSearchCarousel = dynamic(() =>
  import('../../components/ContentfulComponents/ContentfulSearchCarousel')
)
const ContentfulSubNav = dynamic(() =>
  import('../../components/ContentfulComponents/ContentfulSubNavComponent')
)

const FeaturedContentGrid = dynamic(() =>
  import('../../components/ContentfulComponents/FeaturedContentGrid')
)

const FeaturedContentHorizontal = dynamic(() =>
  import('../../components/ContentfulComponents/FeaturedContentHorizontal')
)

const ComponentTwoColCTAText = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentTwoColCTAText')
)

const ContentfulMemberPricing = dynamic(() =>
  import('../../components/ContentfulComponents/ContentfulMemberPricing')
)

const AnchorComponent = dynamic(() =>
  import('../../components/ContentfulComponents/AnchorComponent')
)

const SitewideMessage = dynamic(() =>
  import('../../components/ContentfulComponents/SitewideMessage')
)

const EmbedHtmlComponent = dynamic(() =>
  import('../../components/ContentfulComponents/EmbedHtmlComponent')
)

const ContentfulMemberPriceComponent = dynamic(() =>
  import('../../components/ContentfulComponents/ContentfulMemberPriceComponent')
)

const ComponentCartButton = dynamic(() =>
  import('../../components/ContentfulComponents/ComponentCartButton')
)

/**
 * this replaces components.js, and subsequent components
 * can be found in components/ContentfulComponents
 */
export const CUSTOM_BLOCKS = {
  Asset: ({ item: { title, width, height, url }, testId = 'asset' }) => (
    <Image
      testId={testId}
      title={title}
      alternate={title}
      width={width || '100%'}
      height={height || '100%'}
      src={url}
    />
  ),
  Anchor: ({ item: { id }, testId = 'anchor' }) => (
    <AnchorComponent id={id} testId={testId} />
  ),
  ButtonLinkComponent: ({
    item: {
      buttonStyle,
      id,
      linkLabel,
      linkTarget,
      linkUrl,
      eventId,
      eventLinkLabel,
      eventLinkTarget,
      eventLinkUrl,
    },
    testId = 'button-link',
    ...otherProps
  }) => (
    <ButtonLinkComponent
      testId={testId}
      buttonStyle={buttonStyle}
      id={id || eventId}
      linkLabel={linkLabel || eventLinkLabel}
      linkTarget={linkTarget || eventLinkTarget}
      linkUrl={linkUrl || eventLinkUrl}
      {...otherProps}
    />
  ),
  ComponentBanner: ({
    item: {
      cta: { items: ctaItems = [] } = {},
      image,
      title,
      subtitle,
      titleAboveImage,
      titleCenterAlign,
      bannerBody,
      imagePlacement,
      imageBorderCornerPosition,
      imageMobilePosition,
      backgroundColor,
    },
    testId = 'component-banner',
  }) => (
    <ComponentBanner
      testId={testId}
      ctaItems={ctaItems}
      image={image}
      title={title}
      subtitle={subtitle}
      titleAboveImage={titleAboveImage}
      titleCenterAlign={titleCenterAlign}
      bannerBody={bannerBody}
      imagePlacement={imagePlacement}
      imageBorderCornerPosition={imageBorderCornerPosition}
      imageMobilePosition={imageMobilePosition}
      backgroundColor={backgroundColor}
    />
  ),
  /** @deprecated only used as an embedded component */
  ComponentButton: ({ item: { label, url } }) => (
    <ComponentButton label={label} url={url} />
  ),
  ComponentCartButton: ({
    item: {
      associatedProduct: {
        productNumber,
        title,
        priceNonMember,
        priceMember,
        taxJar,
        digitalFileGuid,
        royaltyFlag,
        dateRelease,
        linkedFrom: { bookCollection = {} } = {},
        memberDiscountedPrice,
        discountedPrice,
        slug,
        thumbnail,
        description,
      },
    },
  }) => {
    const {
      thumbnail: bvThumbnail,
      authors = [],
      slug: bvSlug = '',
      description: bvDescription = {},
    } = bookCollection?.items?.[0] ?? {}
    return (
      <ComponentCartButton
        slug={bvSlug || slug}
        thumbnail={bvThumbnail || thumbnail}
        authors={authors}
        productNumber={productNumber}
        title={title}
        priceMember={priceMember || memberDiscountedPrice}
        priceNonMember={priceNonMember || discountedPrice}
        taxJar={taxJar}
        description={bvDescription?.json || description?.json}
        digitalFileGuid={digitalFileGuid}
        royaltyFlag={royaltyFlag}
        dateRelease={dateRelease}
      />
    )
  },
  ComponentCta: ({
    item: {
      title,
      titleAlignment,
      ctaBody,
      bodyAlignment,
      ctaLink,
      backgroundColor,
      backgroundImage,
      roundedModule,
      ctaLinks: { items: ctaItems = [] } = {},
    },
    testId = 'component-cta',
  }) => (
    <ComponentCTA
      testId={testId}
      ctaItems={ctaItems}
      title={title}
      titleAlignment={titleAlignment}
      ctaBody={ctaBody}
      bodyAlignment={bodyAlignment}
      ctaLink={ctaLink}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      roundedModule={roundedModule}
    />
  ),
  ComponentGrid: ({
    item: {
      gridItems: { items },
      title,
      gridBody,
      bodyCentered,
      layout,
    },
    testId = 'component-grid',
    pageId,
  }) => (
    <ComponentGrid
      testId={testId}
      gridItems={items}
      title={title}
      gridBody={gridBody}
      bodyCentered={bodyCentered}
      layout={layout}
      pageId={pageId}
    />
  ),
  ComponentQuote: ({
    item: { description, thumbnail, expertise, name },
    testId = 'component-quote',
  }) => (
    <ComponentQuote
      testId={testId}
      description={description}
      thumbnail={thumbnail}
      expertise={expertise}
      name={name}
    />
  ),
  ComponentRichText: ({
    item: { title, centerTitle, centerBody, richTextBody },
    testId = 'rich-text',
  }) => (
    <ComponentRichText
      testId={testId}
      title={title}
      centerTitle={centerTitle}
      centerBody={centerBody}
      richTextBody={richTextBody}
    />
  ),
  ComponentTable: ({
    item: { title, tableRowContent },
    testId = 'component-table',
    ...otherProps
  }) => (
    <ContentfulTable
      testId={testId}
      title={title}
      item1={tableRowContent?.items?.[0]?.tableColumnContent?.items}
      item2={tableRowContent?.items}
      {...otherProps}
    />
  ),
  ComponentTableExtension: ({
    item: { title, data },
    testId = 'table-extension',
    ...otherProps
  }) => (
    <ContentfulTable
      testId={testId}
      title={title}
      item1={data?.tableData[0]}
      item2={data?.tableData.slice(1)}
      {...otherProps}
    />
  ),
  ComponentTip: ({ item: { title, tipBody }, testId = 'component-tip' }) => (
    <ComponentTip title={title} tipBody={tipBody} testId={testId} />
  ),
  ComponentTwoColumnContentList: ({
    item: { title, twoColContentListBody, listItem },
    testId = 'two-column-content-list',
  }) => (
    <ComponentTwoColumnContentList
      testId={testId}
      title={title}
      twoColContentListBody={twoColContentListBody}
      listItem={listItem}
    />
  ),
  ComponentTwoColumnCta: ({
    item: {
      title,
      twoColCtaBody,
      imagePosition,
      image,
      backgroundColor,
      imageFrameStyle,
      cta: { items: ctaItems },
    },
    testId = 'two-column-cta',
  }) => (
    <ComponentTwoColumnCta
      testId={testId}
      title={title}
      twoColCtaBody={twoColCtaBody}
      imagePosition={imagePosition}
      image={image}
      backgroundColor={backgroundColor}
      imageFrameStyle={imageFrameStyle}
      ctaItems={ctaItems}
    />
  ),
  EmbedHtmlComponent: ({
    item: {
      displayTitle,
      displayTitleTextAlignment,
      body,
      bodyTextAlignment,
      htmlCode,
      displayFormat,
      backgroundColor,
    },
    testId = 'embedded-html-component',
  }) => (
    <EmbedHtmlComponent
      testId={testId}
      displayTitle={displayTitle}
      displayTitleTextAlignment={displayTitleTextAlignment}
      body={body}
      bodyTextAlignment={bodyTextAlignment}
      htmlCode={htmlCode}
      displayFormat={displayFormat}
      backgroundColor={backgroundColor}
    />
  ),
  EmbeddedMedia: ({
    item: { displayTitle, wistiaId, radio },
    testId = 'embedded-media',
  }) => (
    <EmbeddedMedia
      testId={testId}
      displayTitle={displayTitle}
      wistiaId={wistiaId}
      radio={radio}
    />
  ),
  FeaturedContentGrid: ({
    item: {
      indexName,
      displayTitle,
      contentTypes,
      topics,
      keywords,
      authors,
      dateLowerRange,
      dateUpperRange,
      featured,
      premium,
      elArticleType,
      cta,
    },
    testId = 'featured-content-grid',
  }) => (
    <FeaturedContentGrid
      testId={testId}
      indexName={indexName}
      displayTitle={displayTitle}
      contentTypes={contentTypes}
      topics={topics}
      keywords={keywords}
      authors={authors}
      dateLowerRange={dateLowerRange}
      dateUpperRange={dateUpperRange}
      featured={featured}
      premium={premium}
      elArticleType={elArticleType}
      cta={cta}
    />
  ),
  FeaturedContentHorizontal: ({
    item: {
      indexName,
      displayTitle,
      contentTypes,
      topics,
      keywords,
      featuredAuthors,
      dateLowerRange,
      dateUpperRange,
      featured,
    },
    testId = 'featured-content-horizontal',
  }) => (
    <FeaturedContentHorizontal
      testId={testId}
      indexName={indexName}
      displayTitle={displayTitle}
      contentTypes={contentTypes}
      topics={topics}
      keywords={keywords}
      featuredAuthors={featuredAuthors}
      dateLowerRange={dateLowerRange}
      dateUpperRange={dateUpperRange}
      featured={featured}
    />
  ),
  HorizontalCarouselComponent: ({
    item: {
      horizontalCarouselItems,
      title,
      ctaUrlTarget,
      ctaUrlLink,
      ctaLabel,
      carouselButtonSize,
      scrollByAmount,
      type,
    },
    testId = 'horizontal-carousel',
  }) => (
    <ContentfulHorizontalCarousel
      testId={testId}
      horizontalCarouselItems={horizontalCarouselItems}
      title={title}
      ctaUrlTarget={ctaUrlTarget}
      ctaUrlLink={ctaUrlLink}
      ctaLabel={ctaLabel}
      carouselButtonSize={carouselButtonSize}
      scrollByAmount={scrollByAmount}
      type={type}
    />
  ),
  Image: ({
    item: { title, alternate, imageBynder, caption, imageContentful },
    testId = 'contentful-image',
  }) => (
    <Image
      testId={testId}
      title={title}
      alternate={alternate}
      copyright={imageBynder?.[0]?.copyright}
      caption={caption}
      width={contentfulThumbnailToImageWidth({ imageBynder, imageContentful })}
      height={contentfulThumbnailToImageHeight({
        imageBynder,
        imageContentful,
      })}
      src={contentfulImageTransformation({ imageBynder, imageContentful })}
    />
  ),
  MemberPricingComponent: ({
    item: { memberPricingItem, title, bodyCentered, memberPricingBody },
    testId = 'member-pricing-component',
  }) => (
    <ContentfulMemberPricing
      testId={testId}
      memberPricingBody={memberPricingBody}
      title={title}
      bodyCentered={bodyCentered}
      memberPricingItem={memberPricingItem}
    />
  ),
  MemberPriceComponent: ({
    item: { memberPriceCollection, toggleButton },
    testId = 'member-price',
  }) => {
    return (
      <ContentfulMemberPriceComponent
        testId={testId}
        memberPriceItem={memberPriceCollection}
        toggleButton={toggleButton}
      />
    )
  },
  Podcast: ({ item: { wistiaId }, testId = 'podcast' }) => (
    <PodcastPlayer testId={testId} podcast={wistiaId} autoplay />
  ),
  Profile: ({
    item: { title, slug, thumbnail, shortBio },
    testId = 'profile',
  }) => (
    <Profile
      testId={testId}
      title={title}
      slug={slug}
      thumbnail={thumbnail}
      shortBio={shortBio}
    />
  ),
  RegisterNowButton: ({
    item: { id, align, linkLabel, linkUrl, linkTarget },
    testId = 'register-now-button',
    ...otherProps
  }) => (
    <RegisterNowButton
      testId={testId}
      id={id}
      align={align}
      linkLabel={linkLabel}
      linkUrl={linkUrl}
      linkTarget={linkTarget}
      {...otherProps}
    />
  ),
  SearchCarouselComponent: ({
    item: {
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
    },
    testId = 'search-carousel',
  }) => (
    <ContentfulSearchCarousel
      testId={testId}
      indexName={indexName}
      title={title}
      ctaUrlLink={ctaUrlLink}
      ctaUrlTarget={ctaUrlTarget}
      ctaLabel={ctaLabel}
      scrollByAmount={scrollByAmount}
      type={type}
      topics={topics}
      keywords={keywords}
      dateLowerRange={dateLowerRange}
      dateUpperRange={dateUpperRange}
      authors={authors}
      featured={featured}
      premium={premium}
      memberBook={memberBook}
      quickRead={quickRead}
      elArticleType={elArticleType}
    />
  ),
  SiteWideMessageCollection: ({
    item: { items },
    testId = 'sitewide-message',
    ...otherProps
  }) => <SitewideMessage items={items} testId={testId} {...otherProps} />,
  SpotlightCarouselComponent: ({
    item: {
      spotlightCarouselItems,
      title,
      type,
      autoAdvance,
      autoAdvanceFrequency,
    },
    testId = 'spotlight-carousel',
  }) => (
    <ContentfulSpotlightCarousel
      testId={testId}
      spotlightCarouselItems={spotlightCarouselItems}
      title={title}
      type={type}
      autoAdvance={autoAdvance}
      autoAdvanceFrequency={autoAdvanceFrequency}
    />
  ),
  SubNavComponent: ({
    item: { ctaButton, subNavDropDown },
    testId = 'subnav-component',
  }) => (
    <ContentfulSubNav
      ctaButton={ctaButton}
      testId={testId}
      subNavDropDown={subNavDropDown}
    />
  ),
  TwoColumnCtaTextComponent: ({
    item: {
      titleOne,
      titleOneAlignment,
      titleTwo,
      titleTwoAlignment,
      bodyOne,
      bodyOneAlignment,
      bodyTwo,
      bodyTwoAlignment,
      ctaLinksOne,
      ctaLinksOneAlignment,
      ctaLinksTwo,
      ctaLinksTwoAlignment,
      backgroundColor,
      backgroundImage,
    },
    testId = 'two-col-cta-text',
  }) => (
    <ComponentTwoColCTAText
      testId={testId}
      titleOne={titleOne}
      titleOneAlignment={titleOneAlignment}
      titleTwo={titleTwo}
      titleTwoAlignment={titleTwoAlignment}
      bodyOne={bodyOne}
      bodyOneAlignment={bodyOneAlignment}
      bodyTwo={bodyTwo}
      bodyTwoAlignment={bodyTwoAlignment}
      ctaLinksOne={ctaLinksOne}
      ctaLinksOneAlignment={ctaLinksOneAlignment}
      ctaLinksTwo={ctaLinksTwo}
      ctaLinksTwoAlignment={ctaLinksTwoAlignment}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
    />
  ),
  ValuePropositionCta: ({
    item: { title, ctaTagline, ctaValuePropositionItems, ctaAdditionalInfo },
    testId = 'value-proposition-cta',
    ...otherProps
  }) => (
    <ValuePropositionCta
      testId={testId}
      title={title}
      ctaTagline={ctaTagline}
      ctaValuePropositionItems={ctaValuePropositionItems}
      ctaAdditionalInfo={ctaAdditionalInfo}
      {...otherProps}
    />
  ),
  Video: ({
    item: { videoId, topic, premium, title, date, url },
    testId = 'video',
  }) => (
    <VideoPlayer
      testId={testId}
      videoId={videoId}
      topic={topic}
      premium={premium}
      title={title}
      date={date}
      url={url}
      variant='green'
    />
  ),
}
