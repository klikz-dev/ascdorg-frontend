import {
  Grid,
  Box,
  Card,
  CardActionArea,
  GlobalStyles,
  Typography,
} from '@mui/material'
import { string, array, node, bool } from 'prop-types'
import paths from '../../paths/path'
import CardGridContent from '../CardGridContent'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'

const cardGridGlobalStyles = (
  <GlobalStyles
    styles={{
      '.MuiCardActions-root': {
        padding: '16px 0px 0px 0px !important',
      },
    }}
  />
)

export default function CardGrid({
  testId,
  items,
  gridLayout,
  headerBody,
  headerText,
  bgColor,
  underlined,
  pageId,
  bodyCentered,
}) {
  const showAvatar = [
    'three-col-avatar',
    'four-col-avatar',
    'two-col-left-avatar',
  ].includes(gridLayout)

  const leftAlignment = ['two-col-left', 'two-col-left-avatar'].includes(
    gridLayout
  )

  const viewAllAuthors =
    headerBody &&
    headerBody[0]?.props?.children &&
    headerBody[0]?.props?.children.length > 0
      ? headerBody[0].props?.children?.find(
          (child) => child?.props?.href == '/people/all'
        )
      : null

  let gridMd = 4
  switch (gridLayout) {
    case 'four-col':
    case 'four-col-avatar':
      gridMd = 3
      break
    case 'three-col':
    case 'three-col-avatar':
      gridMd = 4
      break
    case 'two-col':
    case 'two-col-left':
    case 'two-col-left-avatar':
      gridMd = 6
      break
  }
  return (
    <>
      {cardGridGlobalStyles}
      <Box data-testid={testId}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          textAlign='center'
          maxWidth={675}
          mx='auto'
        >
          <Box pb={2}>
            <Typography
              variant={items ? 'h2' : 'h4'}
              data-testid={`header-text-${testId}`}
            >
              {headerText}
            </Typography>
          </Box>
          {viewAllAuthors ? (
            <ViewAllCTA
              href={paths.author({ slug: 'all ' })}
              label='View all'
            />
          ) : (
            <Box>
              <Typography
                variant='h3'
                data-testid={`header-body-${testId}`}
                sx={{
                  textAlign: bodyCentered ? 'center' : 'left',
                }}
              >
                {headerBody}
              </Typography>
            </Box>
          )}
        </Box>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            background: bgColor === 'blue' ? 'secondary.main' : '',
            paddingTop: { md: 4 },
          }}
          data-testid={`grid-${testId}`}
        >
          {items?.map(
            (
              {
                adminTitle,
                thumbnail,
                title,
                titleAlignment,
                bodyAlignment,
                body,
                linkButton,
                gridItemButtonLink,
                link,
                cta,
              },
              key
            ) => (
              <Grid
                item
                key={key}
                md={gridMd}
                xs={12}
                sx={{
                  '&.MuiGrid-item': {
                    paddingBottom: { xs: 0, sm: 0 },
                  },
                }}
                data-testid={`card-${testId}`}
              >
                <Card
                  elevation={0}
                  sx={
                    showAvatar
                      ? {
                          borderRadius: '8px',
                          height: '100%',
                          border: '1px solid rgba(0,0,0,0.1)',
                          '&:hover': {
                            boxShadow:
                              '0px 16px 24px rgba(0, 0, 0, 0.03), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)',
                          },
                        }
                      : undefined
                  }
                >
                  {link ? (
                    <CardActionArea
                      sx={
                        link
                          ? {
                              display: { md: 'flex' },
                              '&:hover': {
                                textDecoration: 'none',
                                '& .MuiCardActionArea-focusHighlight': {
                                  opacity: { md: 0 },
                                },
                              },
                            }
                          : {
                              display: { md: 'flex' },
                              '&:hover': {
                                textDecoration: 'none',
                                '& .MuiCardActionArea-focusHighlight': {
                                  opacity: { md: 0 },
                                },
                              },
                              cursor: 'auto',
                            }
                      }
                      href={link || ''}
                    >
                      <CardGridContent
                        adminTitle={adminTitle}
                        thumbnail={thumbnail}
                        title={title}
                        titleAlignment={titleAlignment}
                        bodyAlignment={bodyAlignment}
                        body={body}
                        linkButton={linkButton}
                        buttonLink={gridItemButtonLink}
                        link={link}
                        cta={cta}
                        showAvatar={showAvatar}
                        gridMd={gridMd}
                        underlined={underlined}
                        pageId={pageId}
                        leftAlignment={leftAlignment}
                      />
                    </CardActionArea>
                  ) : (
                    <CardGridContent
                      adminTitle={adminTitle}
                      thumbnail={thumbnail}
                      title={title}
                      titleAlignment={titleAlignment}
                      bodyAlignment={bodyAlignment}
                      body={body}
                      linkButton={linkButton}
                      buttonLink={gridItemButtonLink}
                      link={link}
                      cta={cta}
                      showAvatar={showAvatar}
                      gridMd={gridMd}
                      underlined={underlined}
                      pageId={pageId}
                      leftAlignment={leftAlignment}
                    />
                  )}
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </>
  )
}

CardGrid.propTypes = {
  testId: string,
  items: array,
  gridLayout: string,
  headerBody: node,
  headerText: string,
  bgColor: string,
  underlined: bool,
  pageId: string,
  bodyCentered: bool,
}
