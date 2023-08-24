import { useQuery } from '@apollo/client'
import GET_ANNOTATIONS_BY_CONTENT_ID_QUERY from '../schema/Annotation/getAnnotationsByContentId.graphql'
import GET_ANNOTATIONS_BY_USER_ID_QUERY from '../schema/Annotation/getAnnotationsByUserId.graphql'

/**
 * Get Annotations By Content Id
 */
export const useGetAnnotationsByContentId = (userId, contentId) => {
  const { loading, error, data } = useQuery(
    GET_ANNOTATIONS_BY_CONTENT_ID_QUERY,
    {
      variables: {
        userId: userId,
        contentId: contentId,
        deleted: false,
      },
      context: { clientName: 'realm' },
    }
  )

  return {
    loading: loading,
    error: error,
    data: data?.annotations,
  }
}

/**
 * Get Annotations By User Id
 */
export const useGetAnnotationsByUserId = (userId) => {
  const { loading, error, data } = useQuery(GET_ANNOTATIONS_BY_USER_ID_QUERY, {
    variables: {
      userId: userId,
      deleted: false,
    },
    context: { clientName: 'realm' },
  })

  return {
    loading: loading,
    error: error,
    data: data?.annotations,
  }
}
