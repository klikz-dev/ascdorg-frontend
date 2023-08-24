import { string, number, bool, arrayOf, shape, oneOfType } from 'prop-types'
import SearchItem from '../SearchItem'

export default function HitComponent({ testId = 'hit', hit }) {
  return <SearchItem testId={testId} hit={hit} />
}

HitComponent.propTypes = {
  testId: string,
  hit: oneOfType([
    /** book */
    shape({
      type: string,
      url: string,
      content: string,
      topic: arrayOf(string),
      yearPublished: number,
      language: arrayOf(string),
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      description: string,
      authorInfo: arrayOf(string),
      memberBook: string,
      quickRead: bool,
      title: string,
      priceMember: number,
      priceNonmember: number,
      taxJarId: string,
      royaltyFlag: bool,
      dateTimeStamp: string,
      unixTimeStamp: number,
      bookFilters: arrayOf(string),
      productNumber: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** collection */
    shape({
      type: string,
      url: string,
      productNumber: string,
      title: string,
      description: string,
      content: string,
      originalPrice: number,
      discountedPrice: number,
      memberOriginalPrice: number,
      memberDiscountedPrice: number,
      taxJarId: string,
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      topic: arrayOf(string),
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** event */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** press release */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      featured: bool,
      keywords: arrayOf(string),
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** page */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      dateTimeStamp: string,
      unixTimeStamp: number,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** podcast */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      dateTimeStamp: string,
      unixTimeStamp: number,
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      featured: bool,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** video */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      unixTimeStamp: null,
      author: arrayOf(string),
      thumbnail: string,
      featured: bool,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** article */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      grade: arrayOf(string),
      subject: arrayOf(string),
      role: arrayOf(string),
      keywords: arrayOf(string),
      premium: bool,
      author: arrayOf(string),
      featured: bool,
      thumbnail: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** book chapter */
    shape({
      type: string,
      topic: arrayOf(string),
      yearPublished: number,
      language: arrayOf(string),
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      freeChapter: bool,
      studyGuide: bool,
      bookFilters: arrayOf(string),
      url: string,
      title: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** pubissue */
    shape({
      type: string,
      url: string,
      title: string,
      thumbnail: string,
      shortDescription: string,
      description: string,
      volNo: number,
      issueNo: number,
      dateTimeStamp: string,
      unixTimeStamp: number,
      topic: arrayOf(string),
      podcast: arrayOf(string),
      video: arrayOf(string),
      featuredImage: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** blog */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      thumbnail: string,
      author: arrayOf(string),
      featured: bool,
      keywords: arrayOf(string),
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** webinar */

    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      dateTimeStamp: string,
      unixTimeStamp: number,
      premium: bool,
      author: arrayOf(string),
      thumbnail: string,
      featured: bool,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
    /** workshop */
    shape({
      type: string,
      url: string,
      title: string,
      content: string,
      topic: arrayOf(string),
      author: arrayOf(string),
      thumbnail: string,
      objectID: string,
      _highlightResult: shape({
        type: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        content: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
        title: shape({
          value: string,
          matchLevel: string,
          matchedWords: arrayOf(string),
        }),
      }),
      __position: number,
    }),
  ]),
}
