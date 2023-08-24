import { useMutation } from '@apollo/client'
import GET_ANNOTATIONS_BY_CONTENT_ID_QUERY from '../schema/Annotation/getAnnotationsByContentId.graphql'
import GET_ANNOTATIONS_BY_USER_ID_QUERY from '../schema/Annotation/getAnnotationsByUserId.graphql'
import UPDATE_ANNOTATION_QUERY from '../schema/Annotation/updateAnnotation.graphql'

/**
 * Update Annotation
 *
 * @returns {Object}
 */
const useUpdateAnnotation = () => {
  const [updateAnnotation, { loading, error, data }] = useMutation(
    UPDATE_ANNOTATION_QUERY,
    {
      refetchQueries: [
        GET_ANNOTATIONS_BY_CONTENT_ID_QUERY,
        GET_ANNOTATIONS_BY_USER_ID_QUERY,
      ],
    }
  )

  return [
    updateAnnotation,
    {
      data: data,
      loading: loading,
      error: error,
    },
  ]
}

export default useUpdateAnnotation
