import { useQuery } from '@apollo/client'
import CHAPTER_QUERY from '../schema/chapter.graphql'

/**
 * Retrieval of chapter data
 *
 * @returns {Object}
 */
const useChapterDetail = (chapterSlug) => {
  const { loading, error, data } = useQuery(CHAPTER_QUERY, {
    errorPolicy: 'all',
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      slug: chapterSlug || 'undefined',
    },
  })

  /**
   * @todo Decide how to log and/or handle errors
   */

  return {
    loading: loading,
    error: error,
    chapterDetails: data?.chapters?.items || [],
  }
}

export default useChapterDetail
