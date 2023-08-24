import { useMutation } from '@apollo/client'
import DELETE_ANNOTATION_QUERY from '../schema/Annotation/deleteAnnotation.graphql'
import DELETE_ANNOTATIONS_BY_CONTENT_ID_QUERY from '../schema/Annotation/deleteAnnotationsByContentId.graphql'
import GET_ANNOTATIONS_BY_CONTENT_ID_QUERY from '../schema/Annotation/getAnnotationsByContentId.graphql'
import GET_ANNOTATIONS_BY_USER_ID_QUERY from '../schema/Annotation/getAnnotationsByUserId.graphql'

/**
 * Delete 1 Annotation
 */
export const useDeleteAnnotation = () => {
  const [deleteAnnotation, { loading, error, data }] = useMutation(
    DELETE_ANNOTATION_QUERY,
    {
      refetchQueries: [
        GET_ANNOTATIONS_BY_CONTENT_ID_QUERY,
        GET_ANNOTATIONS_BY_USER_ID_QUERY,
      ],
    }
  )

  return [
    deleteAnnotation,
    {
      data: data,
      loading: loading,
      error: error,
    },
  ]
}

/**
 * Delete Annotations by Content Id
 */
export const useDeleteAnnotationsByContentId = () => {
  const [deleteAnnotationsByContentId, { loading, error, data }] = useMutation(
    DELETE_ANNOTATIONS_BY_CONTENT_ID_QUERY,
    {
      refetchQueries: [
        GET_ANNOTATIONS_BY_CONTENT_ID_QUERY,
        GET_ANNOTATIONS_BY_USER_ID_QUERY,
      ],
    }
  )

  return [
    deleteAnnotationsByContentId,
    {
      data: data,
      loading: loading,
      error: error,
    },
  ]
}
