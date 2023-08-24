import { CUSTOM_BLOCKS } from './blocks'

/**
 * This component replaces the components function from components.js
 * instead of components(item, key) it is now <CustomBlock item={item} />
 * notice that key is removed as it is not needed. Any other props need to be specifically passed in
 * through here and in blocks.js
 */
const CustomBlock = ({ item, pageId, ...otherProps }) => {
  const contentType = () => {
    if (
      item?.__typename === 'Asset' ||
      item?.sys?.type === 'Asset' ||
      item?.sys?.linkType === 'Asset'
    ) {
      return 'Asset'
    }
    return item?.__typename || item?.sys?.contentType?.sys?.id
  }

  const CustomBlockComponent = CUSTOM_BLOCKS[contentType()]

  if (!CustomBlockComponent) {
    return null
  }

  return <CustomBlockComponent item={item} pageId={pageId} {...otherProps} />
}

export default CustomBlock
