import { useEffect, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  Close,
  ExpandLess,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material'
import {
  Box,
  Modal,
  Grid,
  Typography,
  Avatar,
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  GlobalStyles,
} from '@mui/material'
import { options } from '../../const'
import { contentfulImageTransformation } from '../../lib/data-transformations'

const directoryGlobalStyles = (
  <GlobalStyles
    styles={{
      '.MuiInputBase-input': {
        fontWeight: '400',
        fontFamily: 'Poppins',
        fontSize: '16px',
      },
      '.MuiGrid-spacing-xs-1 > .MuiGrid-item': {
        padding: { xs: '0px !important', md: '6px' },
      },
      '.MuiGrid-spacing-xs-1': {
        width: {
          xs: 'calc(97% + 0px) !important',
          sm: 'calc(97% + 3px) !important',
          md: 'calc(100% + 5px)',
        },
      },
      '.MuiGrid-spacing-xs-4 > .MuiGrid-item': {
        padding: { xs: '6px 5vw !important', sm: 'initial' },
      },
    }}
  />
)
/** @todo: refactor, create tests/storybook */
export default function Directory({ items }) {
  const [open, setOpen] = useState(null)
  const [expand, setExpand] = useState(false)
  const [itemsTS, setItemsTS] = useState([])

  useEffect(() => {
    setItemsTS(items.slice(0, 8))
  }, [items])

  const clickItem = (slug) => {
    const clickedItem = items.filter((item) => item.slug === slug)[0]
    setOpen(clickedItem)
  }

  const clickNext = () => {
    const currentItemIndex = items.findIndex(
      (item) => item.sys.id === open.sys.id
    )
    let next = items
      .slice(currentItemIndex + 1, items.length)
      .find((item) => item)
    if (!next) {
      next = items.find((item) => item)
    }
    setOpen(next)
  }

  const clickPrevious = () => {
    const currentItemIndex = items.findIndex(
      (item) => item.sys.id === open.sys.id
    )
    let previous = null
    for (let i = currentItemIndex - 1; i > -1; i--) {
      if (previous) break
      if (items[i]) {
        previous = items[i]
      }
    }

    if (!previous) {
      for (let i = items.length - 1; i > -1; i--) {
        if (previous) break
        if (items[i]) {
          previous = items[i]
        }
      }
    }
    setOpen(previous)
  }

  return (
    <>
      {directoryGlobalStyles}

      <Box
        mb={10}
        sx={{
          '& .MuiButtonBase-root': {
            justifyContent: { xs: 'flex-start', sm: 'center' },
          },
        }}
      >
        <Grid container spacing={3}>
          {itemsTS.map((subitem, i) => {
            const avatarTitle =
              subitem.firstName && subitem.lastName
                ? subitem.firstName + ' ' + subitem.lastName
                : subitem.title

            return (
              <Grid item key={i} xs={12} sm={4} md={3}>
                <Card
                  variant='outlined'
                  sx={{
                    '&:hover': {
                      boxShadow:
                        '0px 16px 24px rgba(0, 0, 0, 0.03), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)',
                    },
                  }}
                  style={{ borderRadius: '8px' }}
                >
                  <CardActionArea
                    sx={{
                      display: 'flex',
                      '&:hover': {
                        '& .MuiCardActionArea-focusHighlight': {
                          opacity: 0,
                        },
                      },
                    }}
                    onClick={
                      subitem.__typename === 'Affiliate'
                        ? () => clickItem(subitem.slug)
                        : undefined
                    }
                    href={
                      subitem.__typename === 'Affiliate' ? null : subitem.slug
                    }
                  >
                    <CardContent>
                      <Box
                        p={2}
                        sx={{
                          display: { xs: 'flex', sm: 'block' },
                          alignItems: { xs: 'center', sm: 'normal' },
                          padding: { xs: '0', sm: '16px' },
                        }}
                      >
                        <Box
                          mb={[0, 1]}
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Avatar
                            alt={
                              subitem.thumbnail?.title
                                ? subitem.thumbnail?.title
                                : subitem.thumbnail?.imageContentful?.title
                            }
                            src={contentfulImageTransformation(
                              subitem?.thumbnail,
                              true
                            )}
                            sx={{
                              width: { xs: '56px', sm: '120px' },
                              height: { xs: '56px', sm: '120px' },
                              border: {
                                xs: '2px solid rgba(255, 255, 255, 0.8)',
                                md: '4px solid rgba(255, 255, 255, 0.8)',
                              },
                              boxShadow: { xs: 4, md: 8 },
                            }}
                          />
                        </Box>
                        <Box
                          mt={[0, 3]}
                          ml={[2, 0]}
                          sx={{
                            textAlign: 'center',
                            lineHeight: { xs: '1.3125rem', md: '1.5rem' },
                            height: {
                              xs: '1.3125rem',
                              sm: '2.625rem',
                              md: '3rem',
                            },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            minHeight: { xs: '1.3125rem', md: '1.5rem' },
                            WebkitLineClamp: {
                              xs: '1',
                              sm: '2',
                            } /* number of lines to show */,
                            WebkitBoxOrient: 'vertical',
                          }}
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Typography variant='h5'>{avatarTitle}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        {items.length > 8 && (
          <Box my={2}>
            <Button
              endIcon={
                expand ? (
                  <ExpandLess />
                ) : (
                  <Box
                    component='img'
                    src='/images/expandmore.svg'
                    alt={'expand more icon'}
                  />
                )
              }
              onClick={() => {
                setExpand(!expand)
                setItemsTS(itemsTS.length > 8 ? items.slice(0, 8) : items)
              }}
            >
              <Typography variant='h5'>
                {expand ? 'View less' : 'View more'}
              </Typography>
            </Button>
          </Box>
        )}
        <Modal
          open={open}
          onClose={() => setOpen(null)}
          aria-labelledby={`item-modal-${open?.title}`}
          aria-describedby={`item-modal-description-${open?.title}`}
        >
          <Box
            sx={{
              color: 'common.white',
              width: { xs: '90vw', sm: '70vw', md: '56vw', lg: '45vw' },
              height: 'auto',
              backgroundColor: '#14223C',
              position: 'fixed',
              top: '12%',
              left: '50%',
              transform: 'translate(-50%, -10%)',
              boxShadow: 5,
              padding: (theme) => theme.spacing(2, 1, 3),
              '& a': {
                color: 'common.white',
              },
            }}
          >
            <Grid
              container
              sx={{
                background: '#222F47',
                padding: '0 2.5vw',
                marginTop: '-18px',
                width: 'calc(100% + 16px)',
                marginLeft: '-8px',
              }}
              spacing={3}
            >
              <Grid item xs={12} style={{ marginLeft: '-2.5vw' }}>
                <Box display='flex' alignItems='center'>
                  <IconButton
                    aria-label='Close modal button'
                    sx={{
                      marginRight: '5px',
                      color: 'common.white',
                    }}
                    size='large'
                  >
                    <Close size='small' onClick={() => setOpen(null)} />
                  </IconButton>
                  <Typography variant='body1'>
                    ASCD Affiliate Directory
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display='flex'
                  alignItems='center'
                  pb={3}
                  style={{ paddingBottom: '0px' }}
                >
                  <Box pr={2}>
                    <Avatar
                      alt={open?.thumbnail?.imageContentful?.title}
                      src={contentfulImageTransformation(open?.thumbnail, true)}
                      sx={{
                        width: '60px',
                        height: '60px',
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant='h5' id={`item-modal-${open?.slug}`}>
                      {open?.title + ' ASCD'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  {documentToReactComponents(
                    open?.description?.json,
                    options()
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid
                item
                xs={1}
                sx={{
                  display: 'flex',
                  alignItems: 'normal',
                }}
              >
                {items.length > 1 && (
                  <IconButton
                    aria-label='go to previous item'
                    sx={{
                      bgcolor: 'common.white',
                      '&:hover': {
                        bgcolor: 'common.white',
                      },
                      width: 44,
                      height: 44,
                    }}
                    onClick={() => clickPrevious()}
                    size='large'
                  >
                    <NavigateBefore
                      sx={{
                        width: 44,
                        height: 44,
                      }}
                    />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={10}>
                <Box mt={2}>
                  <Box id={`chapter-modal-description-${open?.slug}`}>
                    <Box pt={2}>
                      {documentToReactComponents(
                        open?.contactInfo?.json,
                        options()
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: 'flex',
                  alignItems: 'normal',
                }}
              >
                {items.length > 1 && (
                  <IconButton
                    aria-label='go to next item'
                    sx={{
                      bgcolor: 'common.white',
                      '&:hover': {
                        bgcolor: 'common.white',
                      },
                      width: 44,
                      height: 44,
                    }}
                    onClick={() => clickNext()}
                    size='large'
                  >
                    <NavigateNext
                      sx={{
                        width: 44,
                        height: 44,
                      }}
                    />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </>
  )
}
