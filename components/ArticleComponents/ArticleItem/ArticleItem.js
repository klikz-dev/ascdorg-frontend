import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import { string, bool } from 'prop-types'
import ArticleInfo from '../ArticleInfo'

export default function ArticleItem({
  testId,
  actionHref,
  mediaImg,
  title,
  premium,
  topicTag,
  authorName,
  datePublished,
  overlay = false,
  hasImage = false,
  firstSubItem,
}) {
  return (
    <Card
      sx={{
        backgroundColor: overlay ? 'primary.main' : 'common.white',
        borderRadius: '4px',
        width: '100%',
        height: { md: '100%' },
      }}
      square
      elevation={0}
      data-testid={testId}
    >
      <CardActionArea
        href={actionHref}
        sx={{
          height: { xs: overlay ? 242 : hasImage ? 390 : 180, md: '100%' },
          '&:hover .MuiCardActionArea-focusHighlight': {
            textDecoration: 'none',
            opacity: { md: 0 },
          },
        }}
        disableRipple
      >
        {(overlay || hasImage) && mediaImg && (
          <CardMedia
            image={mediaImg || '/images/ASCDImageFiller.png'}
            sx={
              overlay
                ? {
                    height: '100%',
                    width: '100%',
                    backgroundPosition: 'bottom',
                  }
                : {
                    height: { xs: '60%', md: '70%' },
                    width: '100%',
                  }
            }
            title={title}
          />
        )}
        {datePublished && (
          <CardContent
            sx={
              overlay
                ? {
                    display: 'flex',
                    justifyContent: 'flex-start',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    color: 'common.white',
                    height: '100%',
                    width: '100%',
                    padding: { md: '24px 32px', xs: '16px', sm: '16px' },
                    zIndex: 3,
                    backgroundColor: 'transparent',
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.6) 51.04%, rgba(0, 0, 0, 0.85) 100%)',
                    '&:hover': {
                      background:
                        'linear-gradient(0deg, rgba(12, 134, 113, 0.6), rgba(12, 134, 113, 0.6)), linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.6) 51.04%, rgba(0, 0, 0, 0.85) 100%)',
                      '& h3': {
                        textDecoration: 'underline',
                      },
                      '& .MuiChip-root': {
                        background: 'rgba(0, 0, 0, 0.2)',
                      },
                    },
                    '& > .MuiBox-root': {
                      justifyContent: 'flex-end',
                    },
                  }
                : {
                    height: {
                      xs: hasImage ? '40%' : '100%',
                      md: hasImage ? '30%' : '100%',
                    },
                    paddingLeft: '0px',
                    paddingTop: {
                      md: hasImage ? '2px' : !firstSubItem ? '12px' : '12px',
                    },
                    paddingBottom: { md: hasImage ? '2px' : '12px' },
                  }
            }
          >
            <ArticleInfo
              premium={premium}
              topicTag={topicTag}
              topicTagColor={overlay ? '' : 'black'}
              title={title}
              authorName={authorName}
              datePublished={datePublished}
            />
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  )
}

ArticleItem.propTypes = {
  testId: string,
  title: string,
  actionHref: string,
  mediaImg: string,
  premium: bool,
  topicTag: string,
  authorName: string,
  datePublished: string,
  overlay: bool,
  hasImage: bool,
  firstSubItem: bool,
}
