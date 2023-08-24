import { useQuery } from '@apollo/client'
import GET_BOOK_BY_PRODUCT_ID_QUERY from '../../lib/schema/bookByProductId.graphql'

export const useBookByProductId = (productId) => {
  const { loading, error, data } = useQuery(GET_BOOK_BY_PRODUCT_ID_QUERY, {
    variables: { productId: productId },
  })

  return {
    loading: loading,
    error: error,
    data: data?.book,
  }
}
