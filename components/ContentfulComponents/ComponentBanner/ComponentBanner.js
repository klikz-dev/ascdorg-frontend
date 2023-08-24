import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  string,
  shape,
  arrayOf,
  object,
  number,
  bool,
  oneOfType,
} from 'prop-types'
import { options } from '../../../const'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import HeroHalfHalf from '../../Banners/HeroHalfHalf'
import IssueBannerTitle from '../../Banners/IssueBannerTitle'
/**
 * Component Banner from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */

const ComponentBanner = ({
  testId,
  ctaItems,
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
}) => {
  if (image) {
    /** this hardsets styles for the banner */
    const presetLinkStyles = (ctaItems) => {
      const first = ctaItems[0]
      const second = ctaItems[1]
      return [
        {
          ...first,
          buttonStyle: first?.buttonStyle || ['Large'],
        },
        {
          ...second,
          buttonStyle: second?.buttonStyle || [
            'Color: White w/gray border and black text',
            'Large',
          ],
        },
        ...ctaItems?.slice(2), // in case there is ever more than 2 buttons
      ]
    }
    return (
      <HeroHalfHalf
        testId={testId}
        title={title}
        subtitle={subtitle}
        titleAboveImage={titleAboveImage}
        titleCenterAlign={titleCenterAlign}
        description={documentToReactComponents(bannerBody?.json, options())}
        imagePos={imagePlacement}
        imageBorderCornerPosition={imageBorderCornerPosition}
        imageMobilePosition={imageMobilePosition}
        backgroundColor={backgroundColor}
        image={contentfulImageTransformation(image)}
        imageAlt={title}
        ctaItems={presetLinkStyles(ctaItems)}
      />
    )
  } else {
    return (
      <IssueBannerTitle
        testId={testId}
        landing={{
          title: title,
          subtitle: documentToReactComponents(bannerBody?.json, options()),
        }}
        align='center'
      />
    )
  }
}

ComponentBanner.propTypes = {
  testId: string,
  ctaItems: arrayOf(
    oneOfType([
      shape({
        __typename: string,
        associatedProduct: oneOfType([
          shape({
            productNumber: number,
            title: string,
            priceNonMember: number,
            priceMember: number,
            taxJar: shape({
              taxJarId: number,
            }),
            digitalFileGuid: string,
            royaltyFlag: bool,
            bookType: shape({
              title: string,
            }),
            dateRelease: string,
            linkedFrom: {
              items: arrayOf(
                shape({
                  slug: string,
                  description: shape({
                    json: string,
                  }),
                  thumbnail: shape({
                    thumbnail: shape({
                      imageBynder: arrayOf(
                        shape({
                          src: string,
                        })
                      ),
                      imageContentful: shape({
                        file: shape({
                          url: string,
                        }),
                      }),
                    }),
                  }),

                  authors: shape({
                    items: arrayOf(
                      shape({
                        title: string,
                        email: string,
                      })
                    ),
                  }),
                })
              ),
            },
          }),
        ]),
      }),
      shape({
        __typename: string,
        id: string,
        buttonStyle: arrayOf(string),
        linkUrl: string,
        linkLabel: string,
        linkTarget: string,
      }),
    ])
  ),
  image: shape({
    alternate: string,
    title: string,
    imageBynder: arrayOf(
      shape({
        src: string,
        width: number,
        height: number,
        copyright: string,
      })
    ),
    imageContentful: shape({
      url: string,
      width: number,
      height: number,
    }),
  }),
  title: string,
  subtitle: string,
  titleAboveImage: bool,
  titleCenterAlign: bool,
  bannerBody: object,
  imagePlacement: string,
  imageBorderCornerPosition: string,
  imageMobilePosition: string,
  backgroundColor: string,
}

export default ComponentBanner
