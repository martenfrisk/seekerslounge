import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
// import { debounce } from 'throttle-debounce'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import './Search.css'




const Elastic = () => {
	const [ value, setValue ] = useState('')
	const [ suggestions, setSuggestions ] = useState([])

	const renderSuggestion = (suggestion, { query }) => {
		const suggestionText = suggestion.line
		const matches = AutosuggestHighlightMatch(suggestionText, query)
		const parts = AutosuggestHighlightParse(suggestionText, matches)
		return (
				<div className="min-w-full px-6 py-6 my-1 shadow-md">
        {suggestion.episode}&nbsp;
        ({suggestion.time})&nbsp;
        {suggestion.edited ? 
          <span className="text-2xl text-green-400">✔</span> :
          <span className="text-2xl text-gray-400"> &minus;</span>}
        <p>
					{parts.map((part, index) => {
						const className = part.highlight ? 'highlight' : null

						return (
                <span className={className} key={index}>
                {part.text}
                </span>
						)
					})}
          </p>
				</div>
		)
	}

	const onSuggestionsFetchRequested = ({ value }) => {
		axios
			.post(
				'https://search-seekerslounge-bfv6hl5b7dikv4ehjzd3gs4tsu.us-east-1.es.amazonaws.com/teacher/_search',
				{
					query: {
						multi_match: {
							query: value,
              fields: [ 'line', 'episode' ],
              fuzziness: "AUTO"
						}
					}
				}
			)
			.then((res) => {
				const results = res.data.hits.hits.map((h) => h._source)
				setSuggestions(() => results)
			})
	}

	const onSuggestionsClearRequested = () => {
		return null
	}

	const getSuggestionValue = (suggestion) => {
		return suggestion.line
	}

	const inputProps = {
		placeholder: 'Search',
		value,
		onChange: (_, { newValue, method }) => {
			setValue(newValue)
		}
	}

	return (
		<div>
			<h1>AutoComplete Demo</h1>
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
				alwaysRenderSuggestions={true}
			/>
		</div>
	)
}

export default Elastic
