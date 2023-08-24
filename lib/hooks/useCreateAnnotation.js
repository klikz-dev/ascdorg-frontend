import { useMutation } from '@apollo/client'
import CREATE_ANNOTATION_QUERY from '../schema/Annotation/createAnnotation.graphql'
import GET_ANNOTATIONS_BY_CONTENT_ID_QUERY from '../schema/Annotation/getAnnotationsByContentId.graphql'
import GET_ANNOTATIONS_BY_USER_ID_QUERY from '../schema/Annotation/getAnnotationsByUserId.graphql'

/**
 * Create a New Annotation
 *
 * @returns {Array}
 */
const useCreateAnnotation = () => {
  const [createAnnotation, { loading, error, data }] = useMutation(
    CREATE_ANNOTATION_QUERY,
    {
      refetchQueries: [
        GET_ANNOTATIONS_BY_CONTENT_ID_QUERY,
        GET_ANNOTATIONS_BY_USER_ID_QUERY,
      ],
    }
  )

  return [
    createAnnotation,
    {
      data: data,
      loading: loading,
      error: error,
    },
  ]
}

export default useCreateAnnotation
