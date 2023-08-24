import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppBar, useMediaQuery } from '@mui/material'
import { string } from 'prop-types'
import useSWR from 'swr'
import paths from '../../../paths/path'
import NavigationBarDesktop from '../NavigationBarDesktop'
import NavigationBarMobile from '../NavigationBarMobile'

export default function Header({ testId = 'header' }) {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(`/api/get-search-categories`, fetcher)
  const mobileView = useMediaQuery((theme) =>
    theme.breakpoints.down('mobileCutoff')
  )
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchPopover, setSearchPopover] = useState(false)
  const [searchPopoverValue, setSearchPopoverValue] = useState('')
  const [topics, setTopics] = useState([])
  const [grades, setGrades] = useState([])
  const [subjects, setSubjects] = useState([])

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (data) {
      setTopics(data.topics)
      setGrades(data.grades)
      setSubjects(data.subjects)
    }
  }, [data])

  const selectedTopics = topics?.filter((currentElement) => {
    return [
      'Equity',
      'Leadership',
      'Assessment',
      'Technology',
      'Curriculum',
      'Social Emotional Learning',
    ].includes(currentElement.title)
  })

  const openSearchPopover = () => {
    setSearchPopover(true)
  }

  const closeSearchPopover = () => {
    setSearchPopover(false)
  }

  const triggerSearch = () => {
    setSearchPopover(false)
    router.push(
      paths.search({
        query: searchPopoverValue || '',
      })
    )
  }

  const onEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      triggerSearch()
    }
  }

  return (
    <AppBar
      elevation={0}
      sx={{
        bgcolor: 'background.light',
        height: { xs: '56px', md: '72px' },
        paddingLeft: { xs: '2vw', xl: '10vw' },
        paddingRight: { xs: '2vw', xl: '10vw' },
        color: 'text.primary',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
      }}
      data-testid={testId}
    >
      {mobileView ? (
        <NavigationBarMobile
          testId={`${testId}-mobile`}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          openSearchPopover={openSearchPopover}
          searchPopover={searchPopover}
          closeSearchPopover={closeSearchPopover}
          searchPopoverValue={searchPopoverValue}
          setSearchPopoverValue={setSearchPopoverValue}
          triggerSearch={triggerSearch}
          onEnterKeyPress={onEnterKeyPress}
          selectedTopics={selectedTopics}
          grades={grades}
          subjects={subjects}
        />
      ) : (
        <NavigationBarDesktop
          testId={`${testId}-desktop`}
          openSearchPopover={openSearchPopover}
          searchPopover={searchPopover}
          closeSearchPopover={closeSearchPopover}
          searchPopoverValue={searchPopoverValue}
          setSearchPopoverValue={setSearchPopoverValue}
          triggerSearch={triggerSearch}
          onEnterKeyPress={onEnterKeyPress}
          selectedTopics={selectedTopics}
          grades={grades}
          subjects={subjects}
        />
      )}
    </AppBar>
  )
}

Header.propTypes = {
  testId: string,
}
