import { connectRefinementList } from 'react-instantsearch-dom'
import FilterDropdown from '../../interactives/FilterDropdown'

/**
 * With this widget, the user can filter the dataset based on facet values.
 * Multiple options can be selected.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/
 * Used React Material UI library and connectRefinementList component to customize the UI.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/#connector
 */

const CustomDropDownSelect = connectRefinementList(FilterDropdown)
export default CustomDropDownSelect
