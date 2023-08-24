import { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Box, IconButton, Popover, Typography } from '@mui/material'

export default function Highlight({
  domId,
  annotations,
  setNewAnnotation,
  setSidebar,
  selection,
  setSelection,
  selectedAnnotationId,
  setSelectedAnnotationId,
  createAnnotationAction,
  deleteAnnotationAction,
  reload,
  holdOff,
  setHoldOff,
  refresherKey,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mousePosition, setMousePosition] = useState({
    clientX: null,
    clientY: null,
  })

  let key = 0
  let allNodesCount = 0

  useEffect(() => {
    reload()

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleHighlightAction)
      window.addEventListener('mouseup', handleHighlightAction)
      window.addEventListener('click', handleClickAction)
      window.addEventListener('touchend', handleHighlightAction)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleHighlightAction)
        window.removeEventListener('mouseup', handleHighlightAction)
        window.removeEventListener('click', handleClickAction)
        window.removeEventListener('touchend', handleHighlightAction)
      }
    }
  }, [annotations])

  useEffect(() => {
    if (annotations && !holdOff) {
      prepareArticleBody()
    } else {
      setHoldOff(false)
    }
  }, [refresherKey])

  const prepareArticleBody = () => {
    key = 0
    allNodesCount = 0

    const node = document.getElementById(domId)

    if (node) {
      allNodesCount =
        node.getElementsByTagName('*').length -
        node.getElementsByTagName('mark').length

      addKey(node, () => applyExistingHighlights())
    }
  }

  const addKey = (element, callback) => {
    if (key < allNodesCount) {
      if (element.children.length > 0) {
        Array.prototype.forEach.call(element.children, function (each) {
          each.dataset.key = key++
          addKey(each, () => applyExistingHighlights())
        })
      }
    } else {
      callback()
    }
  }

  const applyExistingHighlights = () => {
    let notesCounter = 0

    annotations.map((annotation) => {
      const range = objToRange(annotation)

      if (range) {
        const mark = markTag(annotation)

        mark.appendChild(range.extractContents())
        range.insertNode(mark)

        if (!annotation.deleted && annotation.note) {
          notesCounter++

          mark.insertBefore(
            numberBall(annotation._id, notesCounter, false),
            mark.childNodes[0]
          )
        }
      }
    })
  }

  const rangeToObj = (range) => {
    return {
      startKey: range.startContainer.parentNode.dataset.key,
      endKey: range.endContainer.parentNode.dataset.key,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
      startTextIndex: Array.prototype.indexOf.call(
        range.startContainer.parentNode.childNodes,
        range.startContainer
      ),
      endTextIndex: Array.prototype.indexOf.call(
        range.endContainer.parentNode.childNodes,
        range.endContainer
      ),
    }
  }

  const objToRange = (rangeObj) => {
    const range = document.createRange()

    try {
      range.setStart(
        document.querySelector('[data-key="' + rangeObj.startKey + '"]')
          .childNodes[rangeObj.startTextIndex],
        rangeObj.startOffset
      )

      range.setEnd(
        document.querySelector('[data-key="' + rangeObj.endKey + '"]')
          .childNodes[rangeObj.endTextIndex],
        rangeObj.endOffset
      )
      return range
    } catch (e) {
      return null
    }
  }

  const markTag = (annotation = null) => {
    const mark = document.createElement('mark')
    mark.style.cursor = 'pointer'
    mark.setAttribute('highlight', '')
    mark.style.background =
      'linear-gradient(to right, transparent 25px, #8DD1C1 10px)'

    if (annotation) {
      mark.setAttribute('annotation-id', annotation._id)
      if (annotation.deletedAt) {
        mark.removeAttribute('highlight')
        mark.style.cursor = 'auto'
        mark.style.background = 'transparent'
      } else {
        if (annotation.note) {
          mark.setAttribute('annotation', '')
          mark.style.background =
            'linear-gradient(to right, transparent 25px, rgba(141, 209, 193, 0.6) 10px)'
        } else {
          mark.style.background = 'none'
          mark.style.backgroundColor = 'rgba(255, 235, 131, 0.6)'
        }
        mark.id = `annotation-line-${annotation._id}`
      }
    } else {
      mark.setAttribute('temporary', '')
    }

    return mark
  }

  const numberBall = (id, number, temporary = false) => {
    const span = document.createElement('span')
    span.style.display = 'inline-block'
    span.style.margin = '2px'
    span.style.color = 'white'
    span.style.width = '22px'
    span.style.height = '22px'
    span.style.borderRadius = '11px'
    span.style.backgroundColor = '#005E47'
    span.style.textAlign = 'center'
    span.style.padding = 0
    span.style.border = 0
    span.style.cursor = 'pointer'
    span.style.lineHeight = '1.4rem'
    span.style.fontFamily = 'Poppins'
    span.innerText = number
    span.setAttribute('highlight', '')
    span.setAttribute('annotation', '')

    if (id) span.setAttribute('annotation-id', id)

    if (temporary) span.setAttribute('temporary', '')

    return span
  }

  const handleHighlightAction = (e) => {
    const targetNode = e.target

    const sidebarEl = document.getElementById('annotations-sidebar')
    const annotationBtnEl = document.getElementById('annotation-button')
    const actionBtnsEl = document.getElementById('action-buttons')

    if (
      (!sidebarEl || (sidebarEl && !sidebarEl.contains(targetNode))) &&
      targetNode.parentNode !== annotationBtnEl &&
      targetNode.parentNode !== actionBtnsEl
    ) {
      setNewAnnotation(null)
    } else {
      return null
    }

    const node = document.getElementById(domId)
    const highlightedText = document.getSelection()

    if (
      !node ||
      highlightedText.isCollapsed ||
      !highlightedText.anchorNode ||
      !node.contains(highlightedText.anchorNode) ||
      !highlightedText.rangeCount > 0
    ) {
      return null
    }

    const range = highlightedText.getRangeAt(0)
    const htString = highlightedText.toString()

    const fragment = range.cloneContents()
    const div = document.createElement('div')
    div.appendChild(fragment.cloneNode(true))

    if (
      fragment.querySelector('p') ||
      div.innerHTML.startsWith('<') ||
      div.innerHTML.endsWith('>')
    ) {
      return null
    }

    setSelectedAnnotationId(null)

    setSelection({
      range: range,
      highlightedText: htString,
    })

    setAnchorEl(e.target)
    setMousePosition({ clientX: e.clientX, clientY: e.clientY })
  }

  const handleClickAction = (e) => {
    const nodeClicked = e.target

    if (
      nodeClicked.hasAttribute('highlight') ||
      nodeClicked.parentNode?.hasAttribute('highlight')
    ) {
      if (nodeClicked.hasAttribute('annotation')) {
        const annotationid = nodeClicked.getAttribute('annotation-id')
        setSelectedAnnotationId(annotationid)

        setSidebar(true)

        const annotationBox = document.getElementById(
          `annotation-sidelist-${annotationid}`
        )
        annotationBox?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        setAnchorEl(
          nodeClicked.hasAttribute('highlight')
            ? nodeClicked
            : nodeClicked.parentNode
        )
        setMousePosition({ clientX: e.clientX, clientY: e.clientY })
      }
    }
  }

  const highlightAction = () => {
    const { highlightedText, range } = selection

    if (!range.cloneContents().querySelector('p')) {
      const highlight = {
        highlightedText: highlightedText,
        ...rangeToObj(range),
      }
      const note = ''

      createAnnotationAction(highlight, note)
    }

    setAnchorEl(null)
  }

  const makeNewAnnotation = () => {
    setSidebar(true)

    const nextNumber =
      annotations.filter((a) => a.note && !a.deleted).length + 1

    if (anchorEl.hasAttribute('highlight')) {
      const item = annotations.find(
        (annotation) => annotation._id == anchorEl.getAttribute('annotation-id')
      )

      const add = {
        id: item._id,
        number: nextNumber,
        highlightedText: item.highlightedText,
        startKey: item.startKey,
        endKey: item.endKey,
        startOffset: item.startOffset,
        endOffset: item.endOffset,
        startTextIndex: item.startTextIndex,
        startEndIndex: item.startEndIndex,
        isUpdate: true,
      }

      setNewAnnotation(add)

      const button = numberBall(null, nextNumber, true)
      anchorEl.insertBefore(button, anchorEl.childNodes[0])
    } else {
      const { range, highlightedText } = selection

      if (!range.cloneContents().querySelector('p')) {
        const objRange = rangeToObj(range)

        const add = {
          number: nextNumber,
          highlightedText: highlightedText,
          ...objRange,
        }

        setNewAnnotation(add)

        const button = numberBall(null, nextNumber, true)

        const mark = markTag()
        mark.appendChild(button)
        mark.appendChild(range.extractContents())
        range.insertNode(mark)
      }
    }

    setAnchorEl(null)
  }

  return (
    <Popover
      id={selectedAnnotationId}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorReference='anchorPosition'
      anchorPosition={{
        top: mousePosition.clientY + 15,
        left: mousePosition.clientX,
      }}
      PaperProps={{ style: { borderRadius: 8 } }}
    >
      <Box
        id='action-buttons'
        display='flex'
        justifyContent='center'
        sx={{
          minWidth: '190px',
          height: '71px',
          backgroundColor: 'background.main',
          borderRadius: '8px',
        }}
      >
        {anchorEl && anchorEl.hasAttribute('highlight') && (
          <IconButton
            id='popover-btn-annotate'
            size='small'
            sx={{
              margin: 1,
              width: '75px',
              height: '56px',
              borderRadius: '7px',
              boxShadow: 'none',
              color: 'common.black',
              bgcolor: 'background.main',
              '&:hover, &:active': {
                bgcolor: 'hover.main',
                color: 'common.white',
              },
              '& span': {
                display: 'block',
              },
            }}
            onClick={() => {
              deleteAnnotationAction(
                anchorEl.getAttribute('annotation-id'),
                true
              )
              setAnchorEl(null)
            }}
            disableRipple
          >
            <FormatQuoteIcon />
            <Typography
              sx={{
                fontSize: '12px',
                lineHeight: '20px',
                letterSpacing: '0.2px',
                fontWeight: '500',
              }}
            >
              Remove
            </Typography>
          </IconButton>
        )}
        <IconButton
          id='popover-btn-annotate'
          size='small'
          sx={{
            margin: 1,
            width: '75px',
            height: '56px',
            borderRadius: '7px',
            boxShadow: 'none',
            color: 'common.black',
            bgcolor: 'background.main',
            '&:hover, &:active': {
              bgcolor: 'hover.main',
              color: 'common.white',
            },
            '& span': {
              display: 'block',
            },
          }}
          onClick={() => makeNewAnnotation()}
          disableRipple
        >
          <FormatQuoteIcon />
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '20px',
              letterSpacing: '0.2px',
              fontWeight: '500',
            }}
          >
            Add Note
          </Typography>
        </IconButton>

        {anchorEl && !anchorEl.hasAttribute('highlight') && (
          <IconButton
            id='popover-btn-highlight'
            size='small'
            sx={{
              margin: 1,
              width: '75px',
              height: '56px',
              borderRadius: '7px',
              boxShadow: 'none',
              color: 'common.black',
              bgcolor: 'background.main',
              '&:hover, &:active': {
                bgcolor: 'hover.main',
                color: 'common.white',
              },
              '& span': {
                display: 'block',
              },
            }}
            onClick={highlightAction}
            disableRipple
          >
            <BorderColorIcon />
            <Typography
              sx={{
                fontSize: '12px',
                lineHeight: '20px',
                letterSpacing: '0.2px',
                fontWeight: '500',
              }}
            >
              Highlight
            </Typography>
          </IconButton>
        )}
      </Box>
    </Popover>
  )
}
