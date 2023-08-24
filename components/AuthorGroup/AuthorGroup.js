import Link from 'next/link'
import { Box, Avatar, Typography, AvatarGroup } from '@mui/material'
import { string, arrayOf, shape } from 'prop-types'
import { contentfulImageTransformation } from '../../lib/data-transformations'

export default function AuthorGroup({ label, authors, link }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
      }}
    >
      <AvatarGroup max={4}>
        {authors &&
          authors
            .filter((author) => author.thumbnail)
            .slice(0, 3)
            .map((author, key) => (
              <Avatar
                key={`author-avatar-${key}`}
                src={contentfulImageTransformation(author.thumbnail)}
                alt='circle icon'
              />
            ))}
      </AvatarGroup>

      <Box pl={2}>
        <Link href={link}>
          <a>
            <Typography color='black' variant='medium-link'>
              {label}
            </Typography>
          </a>
        </Link>
      </Box>
    </Box>
  )
}

AuthorGroup.propTypes = {
  label: string,
  link: string,
  authors: arrayOf(
    shape({
      thumbnail: shape({
        imageBynder: arrayOf(
          shape({
            src: string,
          })
        ),
        imageContentful: shape({
          file: shape({
            url: string,
          }),
        }),
      }),
    })
  ),
}
