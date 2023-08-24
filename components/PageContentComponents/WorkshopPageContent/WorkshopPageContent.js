import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Container, Box } from '@mui/material'
import { options } from '../../../const'
import CustomBlock from '../../../const/CustomBlocks'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import HeroBanner from '../../Banners/HeroBanner'

export default function WorkshopPageContent({ content }) {
  return (
    content &&
    content.map(({ __typename, body, image, title, cta, ...item }, key) => {
      if (__typename === 'componentBanner') {
        return (
          <HeroBanner
            key={key}
            title={title}
            description={documentToReactComponents(body, options())}
            imagePos='right'
            image={contentfulImageTransformation(image)}
            imageAlt={title}
            ctaLabel1={
              cta && cta?.[0]?.linkLabel ? cta?.[0]?.linkLabel : cta?.[0]?.label
            }
            ctaLink1={
              cta && cta?.[0]?.linkUrl ? cta?.[0]?.linkUrl : cta?.[0]?.url
            }
            ctaTarget1={cta && cta?.[0]?.linkTarget}
            ctaLabel2={
              cta && cta.length > 1 && cta?.[1]?.linkLabel
                ? cta?.[1]?.linkLabel
                : cta?.[1]?.label
            }
            ctaLink2={
              cta && cta.length > 1 && cta?.[1]?.linkUrl
                ? cta?.[1]?.linkUrl
                : cta?.[1]?.url
            }
            ctaTarget2={cta && cta?.[1]?.linkTarget}
          />
        )
      } else {
        return (
          <Container key={key} maxWidth='lg'>
            <Box mt={[5, 10]} key={key}>
              <CustomBlock
                item={{ __typename, body, image, title, cta, ...item }}
              />
            </Box>
          </Container>
        )
      }
    })
  )
}
