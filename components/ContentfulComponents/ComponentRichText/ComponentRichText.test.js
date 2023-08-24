import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { componentRichTextItem } from '../../../__mocks__/componentRichTextMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentRichText from './ComponentRichText'

describe('<ComponentRichText />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentRichText testId='jest' {...componentRichTextItem} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
