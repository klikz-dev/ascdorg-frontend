import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { string, object, arrayOf } from 'prop-types'
import FilterDropdown from '../interactives/FilterDropdown'
import IssueGridItems from '../IssueGridItems'

export default function IssueGrid({ testId = 'issue-grid', issues }) {
  const [year, setYear] = useState('')
  const [topic, setTopic] = useState('')
  const [yearFilter, setYearFilter] = useState([])
  const [topicFilter, setTopicFilter] = useState([])

  useEffect(() => {
    const yearFilter = issues
      .map((issue) => {
        const year = issue.publicationDate?.substring(0, 4)

        return {
          value: year,
          label: year,
        }
      })
      .reduce((unique, o) => {
        if (!unique.some((obj) => obj.value === o.value)) {
          unique.push(o)
        }
        return unique
      }, [])

    setYearFilter(yearFilter)

    const topicFilter = issues
      .filter((issue) => issue.topics)
      .map((issue) => {
        return {
          value: issue.topics.title,
          label: issue.topics.title,
        }
      })
      .sort()
      .reduce((unique, o) => {
        if (!unique.some((obj) => obj.value === o.value)) {
          unique.push(o)
        }
        return unique
      }, [])

    setTopicFilter(topicFilter)
  }, [issues])

  useEffect(() => {
    if (yearFilter.length > 0) {
      setYear(yearFilter[0].value)
    }
  }, [yearFilter])

  return (
    <Box data-testid={testId}>
      <Box mb={5} display='flex' alignItems='center'>
        <Box mr={1}>
          <Typography variant='h5'>Filters:</Typography>
        </Box>
        <Box mr={1}>
          <FilterDropdown
            items={yearFilter}
            currentRefinement={year}
            refine={(filterVal) => setYear(filterVal)}
            customWidth={'5rem'}
          />
        </Box>
        <Box mr={1}>
          <FilterDropdown
            items={topicFilter}
            currentRefinement={topic}
            refine={(filterVal) => setTopic(filterVal)}
            selectAllOption={'All'}
            customWidth={'14rem'}
          />
        </Box>
      </Box>
      <IssueGridItems items={issues} year={year} topic={topic} />
    </Box>
  )
}

IssueGrid.propTypes = {
  testId: string,
  issues: arrayOf(object),
}
