import Link from 'next/link'
import { Typography, Box, Divider } from '@mui/material'
import WriteForASCDAccordionItem from '../../../components/interactives/Accordion/AccordionComponents/WriteForASCDAccordionItem'
import BannerMessage from '../../Banners/BannerMessage'
import SearchAccordion from '../../interactives/Accordion/SearchAccordion'
import CtaButton from '../../interactives/Buttons/CtaButton'

export default function WriteForUsContent() {
  const list = [
    {
      key: 1,
      title: 'Write for EL Magazine',
      subtitle:
        'Contribute to our flagship magazine written by practitioners for practitioners',
      description: (
        <>
          <Typography variant='h5'>What we look for</Typography>
          <Typography variant='body2'>
            Educational Leadership® magazine is primarily written by
            practitioners for practitioners. We look for high-quality, original
            submissions that shed light on our monthly themes.
          </Typography>
          <Box my={5}>
            <Typography variant='h5'>Articles should:</Typography>
            <Typography variant='body2'>
              <ul>
                <li>Contain fresh information</li>
                <li>Be research-based</li>
                <li>Give practical guidance to improve practice</li>
              </ul>
            </Typography>
          </Box>
          <CtaButton
            variant='outlined'
            color='primary'
            label='View Full Guidelines'
            href={'/guidelines-for-el'}
          />
        </>
      ),
      ctaLink: 'https://elmagazine.submittable.com/submit',
    },
    {
      key: 2,
      title: 'Write a Blog Post',
      subtitle: 'Share your helpful tips and strategies with educators',
      description: (
        <>
          <Typography variant='h5'>What we look for</Typography>
          <Typography variant='body2'>
            We look for blog posts that are timely and topical, addressing
            current issues and problems of practice in the field in a concise,
            conversational manner. Pieces should be solution-oriented and
            grounded in authentic educational practice and evidence.
          </Typography>
          <Box my={5}>
            <Typography variant='h5'>
              Here are some examples of the types of online content we publish:{' '}
            </Typography>

            <Typography variant='body2'>
              <ul>
                <li>
                  Best practice pieces on instructional or leadership strategies
                  that offer immediate takeaways for readers.{' '}
                </li>
                <li>
                  Blog posts focused on specific problems of practice in a
                  school community (whether at the classroom or leadership
                  level) and proposed or attempted solutions.{' '}
                </li>
                <li>
                  Pieces highlighting or responding to recent developments,
                  controversies, or research findings in the field.{' '}
                </li>
                <li>
                  Blog posts responding to current events and their implications
                  for schools and educators.{' '}
                </li>
                <li>
                  Personal stories on professional challenges or successes.{' '}
                </li>
                <li>
                  Blog posts for school leaders (including teacher leaders)
                  highlighting ideas and approaches to systemwide change and
                  impact.{' '}
                </li>
                <li>
                  Blog posts focused on ideas and improvements in educator
                  professional development.{' '}
                </li>
              </ul>
            </Typography>
          </Box>
          <CtaButton
            variant='outlined'
            color='primary'
            href='/write-for-ascd-online'
            label='View Full Guidelines'
          />
        </>
      ),
      ctaLink: '/write-for-ascd-online',
    },
    {
      key: 3,
      title: 'Write a Book for ASCD',
      subtitle: 'Join our list of esteemed, diverse writers',
      description: (
        <>
          <Typography variant='body2'>
            Do you aspire to be a published author? Would you like to share your
            expertise and ideas, and innovative thinking with other educators
            around the world? The ASCD community of passionate thinkers and
            life-changing educators is your place. We welcome writers with new
            ideas, fresh voices, and diverse experiences and backgrounds.
          </Typography>
          <Box my={5}>
            <Typography variant='h5'>What we look for</Typography>

            <Typography variant='body2'>
              <ul>
                <li>
                  <strong>Original:</strong> The text reflects new ideas,
                  diverse perspectives, worldwide viewpoints, and fresh
                  information. It does not state the obvious, parrot
                  conventional wisdom, or rely too heavily on others&apos;
                  ideas.
                </li>
                <li>
                  <strong>Evidence-based:</strong> Assertions in the text are
                  supported by evidence and research, as necessary. References
                  are up-to-date, and sources reflect current thought in the
                  field.
                </li>
                <li>
                  <strong>Practical and actionable:</strong> The text provides
                  guidance and strategies that educators can use to improve
                  practice.
                </li>
                <li>
                  <strong>Specific:</strong> The author avoids generalities and
                  includes concrete examples, illustrations, and anecdotes.
                </li>
                <li>
                  <strong>Conversational:</strong> The text is engaging,
                  unpretentious, and free of jargon.
                </li>
              </ul>
            </Typography>
          </Box>
          <CtaButton
            variant='outlined'
            color='primary'
            href='/publish-a-book'
            label='View Full Guidelines'
          />
        </>
      ),
      ctaLink: 'https://mc04.manuscriptcentral.com/ascdproducts',
    },
  ]

  return (
    <Box mt={0} mb={[6, 10]} id='writeForAccordion'>
      <Divider />
      <Box my={[5, 6, 8]} textAlign='center'>
        <Box mb={3}>
          <Typography variant='h2'>
            Write for a wide variety of publications
          </Typography>
        </Box>
        <Typography variant='subtitle1'>
          Writers from diverse backgrounds are encouraged to submit articles and
          book proposals for publication consideration.
        </Typography>
      </Box>
      <SearchAccordion hits={list} SearchItem={WriteForASCDAccordionItem} />
      <Box
        mt={6}
        mb={11}
        alignItems='center'
        display='flex'
        justifyContent='center'
      >
        <BannerMessage variant='special'>
          <>
            <Typography variant='body2'>
              {'Interested in presenting at ASCD conferences? '}
              <Link href={'https://events.ascd.org/proposals'}>
                <a>
                  <Typography color='black' variant='large-link'>
                    {'Click for more details'}
                  </Typography>
                </a>
              </Link>
            </Typography>
          </>
        </BannerMessage>
      </Box>
    </Box>
  )
}
