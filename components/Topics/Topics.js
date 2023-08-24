import React from 'react'
import { Box, Typography } from '@mui/material'
import { string, arrayOf, bool, number, func, shape } from 'prop-types'
import paths from '../../paths/path'
import TopicTag from '../TopicTag'

/** @todo: Refactor again */
export default function Topics({
  testId = 'topics',
  title,
  topics,
  contentType,
  filter = 'topics',
  center,
  background,
  maxWidth,
  titleVariant,
  mt,
  onDelete,
  variant,
}) {
  const sortedTopics = [...new Set(topics)]
    .filter((topic) => !!topic)
    .sort((a, b) => a?.title?.localeCompare(b?.title))

  return (
    <Box
      sx={{
        display: center ? 'flex' : 'inline',
        justifyContent: center ? 'center' : 'flex-start',
        alignItems: center ? 'center' : 'flex-start',
        flexDirection: center ? 'column' : 'row',
        background: background,
        maxWidth: maxWidth,
      }}
      data-testid={testId}
    >
      <Box textAlign={center ? 'center' : 'left'}>
        <Typography variant={titleVariant ? titleVariant : 'h2'}>
          {title}
        </Typography>
      </Box>
      <Box
        mt={mt ? mt : 4}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: center ? 'center' : 'left',
          flexBasis: '100%',
          maxWidth: '90%',
        }}
      >
        {sortedTopics.map(({ title }, key) => (
          <Box key={key} p={0.5}>
            <TopicTag
              label={title}
              href={
                contentType
                  ? paths.search({
                      types: [contentType],
                      [filter]: [title],
                    })
                  : paths.search({
                      [filter]: [title],
                    })
              }
              onDelete={onDelete || null}
              deleteIcon={
                <Box
                  component='img'
                  src='/images/closeIcon.svg'
                  alt={'close icon'}
                />
              }
              variant={variant ? variant : 'basic'}
              textTransform='uppercase'
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

Topics.propTypes = {
  testId: string,
  title: string,
  topics: arrayOf(shape(string)),
  filter: string,
  contentType: string,
  center: bool,
  background: string,
  maxWidth: string,
  titleVariant: string,
  mt: number,
  onDelete: func,
  variant: string,
}
