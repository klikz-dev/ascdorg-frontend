import { INLINES, BLOCKS } from '@contentful/rich-text-types'
import { Link, Box, Typography } from '@mui/material'
import { imageoptimization } from '.'
import { convertToSlug } from '../lib/utils'
import CustomBlock from './CustomBlocks'

/** @todo: make into util */
export const navigateTo = (id) => {
  const el = window.document.getElementById(id)
  if (el) {
    const r = el.getBoundingClientRect()
    window.scrollTo({
      top: pageYOffset + r.top - 150,
      behavior: 'smooth',
    })
  }
}

export const defaultOptions = (links) => {
  const assetBlockMap = new Map()
  links?.assets?.block?.forEach((item) => {
    if (item?.sys?.id) {
      assetBlockMap.set(item.sys.id, item)
    }
  })

  const entryInlineMap = new Map()
  links?.entries?.inline?.forEach((item) => {
    if (item?.sys?.id) {
      entryInlineMap.set(item.sys.id, item)
    }
  })

  const entryBlockMap = new Map()
  links?.entries?.block?.forEach((item) => {
    if (item?.sys?.id) {
      entryBlockMap.set(item.sys.id, item)
    }
  })

  const entryHyperlinkMap = new Map()
  links?.entries?.hyperlink?.forEach((item) => {
    if (item?.sys?.id) {
      entryHyperlinkMap.set(item.sys.id, item)
    }
  })

  const assetHyperlinkMap = new Map()
  links?.asset?.hyperlink?.forEach((item) => {
    if (item?.sys?.id) {
      assetHyperlinkMap.set(item.sys.id, item)
    }
  })
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entryBlockMap.get(node?.data?.target?.sys?.id)
        return (
          <Box my={6}>
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        return (
          <Box my={6}>
            <CustomBlock item={node.data.target} />
          </Box>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <Link
            href={node.data.uri}
            target={
              node.data.uri?.toLowerCase().startsWith('https://www.ascd.org')
                ? ''
                : '_blank'
            }
            sx={{
              fontWeight: 700,
            }}
          >
            {children}
          </Link>
        )
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const entry = entryHyperlinkMap.get(node.data.target.sys.id)
        let prefix = ''
        switch (entry?.__typename) {
          case 'Blog':
            prefix = '/blogs/'
            break
          case 'Book':
            prefix = '/books/'
            break
          case 'Pubissue':
            prefix = '/el/'
            break
          case 'Article':
            prefix = '/el/articles/'
            break
          case 'Event':
            prefix = '/events/'
            break
          case 'Profile':
            prefix = '/people/'
            break
          case 'Podcast':
            prefix = '/podcasts/'
            break
          case 'Video':
            prefix = '/videos/'
            break
          case 'Webinar':
            prefix = '/webinars/'
            break
          default:
            break
        }
        return (
          <Link
            href={`${prefix}${entry?.slug}`}
            sx={{
              fontWeight: 700,
            }}
          >
            {children}
          </Link>
        )
      },
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        const entry = assetHyperlinkMap.get(node.data.target.sys.id)
        return (
          <Link
            href={`${entry?.url}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`}
            sx={{
              fontWeight: 700,
            }}
          >
            {children}
          </Link>
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetBlockMap.get(node?.data?.target?.sys?.id)
        return asset?.contentType === 'application/pdf' ? (
          <Link href={asset?.file?.url || ''}>
            <a
              target={
                asset?.file?.url?.toLowerCase().includes('https://www.ascd.org')
                  ? ''
                  : '_blank'
              }
            >
              <Typography variant='medium-link'>
                {asset.file?.fileName}
              </Typography>
            </a>
          </Link>
        ) : (
          <Box>
            <CustomBlock item={asset} />
          </Box>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Box my={2}>
          <Typography variant='body2'>{children}</Typography>
        </Box>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <Typography variant='h1'>{children}</Typography>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <Typography variant='h2'>{children}</Typography>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <Typography variant='h3'>{children}</Typography>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <Typography variant='h4'>{children}</Typography>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <Typography variant='h5'>{children}</Typography>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <Typography variant='h6'>{children}</Typography>
      ),
    },
    /** if any text paragraphs are blank i.e. Contentful hard returns, it replaces them with an &nbsp character */
    /** this finds any /n characters created by a Contentful soft return and creates a <br> element */
    renderText: (text) => {
      if (!text || text === ' ') {
        return '\u00A0'
      }
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, [])
    },
  }
}

export const mainHeaderOptions = (links) => {
  const assetBlockMap = new Map()
  links?.assets?.block?.forEach((item) => {
    if (item?.sys?.id) {
      assetBlockMap.set(item.sys.id, item)
    }
  })

  const entryBlockMap = new Map()
  links?.entries?.block?.forEach((item) => {
    if (item?.sys?.id) {
      entryBlockMap.set(item.sys.id, item)
    }
  })

  const assetHyperlinkMap = new Map()
  links?.asset?.hyperlink?.forEach((item) => {
    if (item?.sys?.id) {
      assetHyperlinkMap.set(item.sys.id, item)
    }
  })
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entryBlockMap.get(node?.data?.target?.sys?.id)
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'center', md: 'left' },
            }}
          >
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        return (
          <Box>
            <CustomBlock item={node.data.target} />
          </Box>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <Link
            href={node.data.uri}
            target={
              node.data.uri?.toLowerCase().startsWith('https://www.ascd.org')
                ? ''
                : '_blank'
            }
            sx={{
              fontWeight: 700,
            }}
          >
            {children}
          </Link>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Box>
          <Typography variant='body2'>{children}</Typography>
        </Box>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <Typography variant='h1'>{children}</Typography>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <Typography variant='h2'>{children}</Typography>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <Typography variant='h3'>{children}</Typography>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <Typography variant='h4'>{children}</Typography>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <Typography variant='h5'>{children}</Typography>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <Typography variant='h6'>{children}</Typography>
      ),
    },
  }
}

export const articleEndNoteOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (children.length == 1 && children[0] == '') {
        return null
      }
      return (
        <Box my={2} display='flex'>
          <Box mr={1}>•</Box>{' '}
          <Typography variant='body2'>{children}</Typography>
        </Box>
      )
    },
  },
  renderText: (text) => {
    if (text == '<SUPSCRPT>') {
      return null
    } else if (text == '</SUPSCRPT>') {
      return null
    } else if (text.indexOf('<SUPSCRPT>') > 0) {
      let cleanedText = ''

      cleanedText = text.replace(/<\/SUPSCRPT>/g, '')

      return cleanedText
        .split('<SUPSCRPT>')
        .reduce((children, textSegment, index) => {
          return [
            ...children,
            index > 0 && <sup>{textSegment[0]}</sup>,
            textSegment.slice(1),
          ]
        }, [])
    } else {
      return text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
    }
  },
}

export const blogsOptions = (links) => {
  const assetBlockMap = new Map()
  links?.assets?.block?.forEach((item) => {
    if (item?.sys?.id) {
      assetBlockMap.set(item.sys.id, item)
    }
  })

  const entryInlineMap = new Map()
  links?.entries?.inline?.forEach((item) => {
    if (item?.sys?.id) {
      entryInlineMap.set(item.sys.id, item)
    }
  })

  const entryBlockMap = new Map()
  links?.entries?.block?.forEach((item) => {
    if (item?.sys?.id) {
      entryBlockMap.set(item.sys.id, item)
    }
  })
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetBlockMap.get(node?.data?.target?.sys?.id)
        return asset?.contentType === 'application/pdf' ? (
          <Link
            href={asset?.file?.url || ''}
            target={
              asset?.file?.url?.toLowerCase().includes('https://www.ascd.org')
                ? ''
                : '_blank'
            }
          >
            <Typography variant='medium-link'>
              {asset.file?.fileName}
            </Typography>
          </Link>
        ) : (
          <Box>
            <CustomBlock item={asset} />
          </Box>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Box my={2}>
          <Typography variant='articleBody'>{children}</Typography>
        </Box>
      ),
      [BLOCKS.HEADING_2]: (node, children) => {
        const slug = convertToSlug(node)
        return (
          <Typography
            id={slug}
            component='h2'
            variant='h3'
            style={{ marginBlockStart: '48px', marginBlockEnd: '16px' }}
          >
            {children[0]}
          </Typography>
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entry = entryInlineMap.get(node?.data?.target?.sys?.id)
        return (
          <Box my={6}>
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entryBlockMap.get(node?.data?.target?.sys?.id)
        return (
          <Box my={6}>
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <Link
            href={node?.data?.uri || ''}
            target={
              node.data.uri?.toLowerCase().startsWith('https://www.ascd.org')
                ? ''
                : '_blank'
            }
            sx={{ fontWeight: 700 }}
          >
            <Typography variant='large-link'>{children}</Typography>
          </Link>
        )
      },
    },
  }
}

export const articleOptions = (links) => {
  const assetBlockMap = new Map()
  links?.assets?.block?.forEach((item) => {
    if (item?.sys?.id) {
      assetBlockMap.set(item.sys.id, item)
    }
  })

  const entryInlineMap = new Map()
  links?.entries?.inline?.forEach((item) => {
    if (item?.sys?.id) {
      entryInlineMap.set(item.sys.id, item)
    }
  })

  const entryBlockMap = new Map()
  links?.entries?.block?.forEach((item) => {
    if (item?.sys?.id) {
      entryBlockMap.set(item.sys.id, item)
    }
  })
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetBlockMap.get(node?.data?.target?.sys?.id)
        return asset?.contentType === 'application/pdf' ? (
          <Link href={asset?.file?.url || ''}>
            <a
              target={
                asset?.file?.url?.toLowerCase().includes('https://www.ascd.org')
                  ? ''
                  : '_blank'
              }
            >
              <Typography variant='medium-link'>
                {asset.file?.fileName}
              </Typography>
            </a>
          </Link>
        ) : (
          <Box>
            <CustomBlock item={asset} />
          </Box>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Box my={2}>
          <Typography variant='articleBody'>{children}</Typography>
        </Box>
      ),
      [BLOCKS.HEADING_2]: (node, children) => {
        const slug = convertToSlug(node)
        return (
          <Typography
            id={slug}
            component='h2'
            variant='h3'
            style={{ marginBlockStart: '48px', marginBlockEnd: '16px' }}
          >
            {children[0]}
          </Typography>
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entry = entryInlineMap.get(node?.data?.target?.sys?.id)
        return (
          <Box my={6}>
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entryBlockMap.get(node?.data?.target?.sys?.id)
        return (
          <Box my={6}>
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        if (node.data.uri.includes('#')) {
          const domId = node.data.uri.split('#')[1]
          return (
            <button onClick={() => navigateTo(domId)}>
              <Typography variant='large-link'>{children}</Typography>
            </button>
          )
        } else {
          return (
            <Link
              href={node?.data?.uri || ''}
              target={
                node.data.uri?.toLowerCase().includes('https://www.ascd.org') ||
                !node.data.uri?.toLowerCase().includes('https://')
                  ? ''
                  : '_blank'
              }
              sx={{ fontWeight: 700 }}
            >
              <Typography variant='large-link'>{children}</Typography>
            </Link>
          )
        }
      },
    },

    renderText: (text) => {
      if (text == '<SUPSCRPT>') {
        return null
      } else if (text == '</SUPSCRPT>') {
        return null
      } else if (text.indexOf('<SUPSCRPT>') > 0) {
        let cleanedText = ''

        cleanedText = text.replace(/<\/SUPSCRPT>/g, '')

        return cleanedText
          .split('<SUPSCRPT>')
          .reduce((children, textSegment, index) => {
            return [
              ...children,
              index > 0 && <sup>{textSegment[0]}</sup>,
              textSegment.slice(1),
            ]
          }, [])
      } else {
        return text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
      }
    },
  }
}

/**
 * Refer to https://www.contentful.com/developers/docs/concepts/rich-text/ for custom function
 * to resolve the links of Rich Text json from graphql API
 */
export const chapterPreviewOptions = (links) => {
  const assetBlockMap = new Map()
  links?.assets?.block?.forEach((item) => {
    if (item?.sys?.id) {
      assetBlockMap.set(item.sys.id, item)
    }
  })

  const entryInlineMap = new Map()
  links?.entries?.inline?.forEach((item) => {
    if (item?.sys?.id) {
      entryInlineMap.set(item.sys.id, item)
    }
  })

  const entryBlockMap = new Map()
  links?.entries?.block?.forEach((item) => {
    if (item?.sys?.id) {
      entryBlockMap.set(item.sys.id, item)
    }
  })

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entryBlockMap.get(node?.data?.target?.sys?.id)
        return (
          <Box my={6}>
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entry = entryInlineMap.get(node?.data?.target?.sys?.id)
        return (
          <Box my={6}>
            <CustomBlock item={entry} />
          </Box>
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetBlockMap.get(node?.data?.target?.sys?.id)
        return asset?.contentType === 'application/pdf' ? (
          <Link
            href={asset?.url || ''}
            target={
              asset?.url?.toLowerCase().includes('https://www.ascd.org')
                ? ''
                : '_blank'
            }
            sx={{ fontWeight: 700 }}
          >
            <Typography variant='medium-link'>{asset?.fileName}</Typography>
          </Link>
        ) : (
          <Box>
            <CustomBlock item={asset} />
          </Box>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Box my={2}>
          <Typography variant='body2'>{children}</Typography>
        </Box>
      ),
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <Typography
            component='h2'
            variant='h3'
            sx={{
              marginBlockStart: 6,
              marginBlockEnd: 2,
            }}
          >
            {children[0]}
          </Typography>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <Link
            href={node?.data?.uri || ''}
            target={
              node.data.uri?.toLowerCase().includes('https://www.ascd.org')
                ? ''
                : '_blank'
            }
          >
            <Typography variant='medium-link'>{children}</Typography>
          </Link>
        )
      },
    },
  }
}

export default defaultOptions
