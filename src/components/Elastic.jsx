import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
// import { debounce } from 'throttle-debounce'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import './Search.css'
import epList from '../assets/episodes.json'

const randomQuery = [
	'guinness',
	'ridiculous voice',
	'bronco',
	'lasagna',
	'big nightmare',
	'el chapo',
	'cheetahman',
	'see you in court',
	'sully',
	'bottomless piggybank',
	'scarecrow',
	'Wimberley',
	'tricky dick',
	'picasso',
	'groteque genitals',
	'bethany hart',
	'morrissey',
	'goths',
	'famously'
]
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

const Elastic = () => {
	let initValue = randomQuery[getRandomInt(randomQuery.length)]
	const [ value, setValue ] = useState(initValue)
	const [ suggestions, setSuggestions ] = useState([])

	const renderSuggestion = (suggestion, { query }) => {
		const suggestionText = suggestion.line
		const matches = AutosuggestHighlightMatch(suggestionText, query)
		const parts = AutosuggestHighlightParse(suggestionText, matches)
		let epClean = suggestion.episode.replace('.json', '')
		let epName = epList.find((x) => x.ep === epClean)

		console.log(epName)
		return (
			<div className="min-w-full px-6 py-6 my-1 shadow-md">
				<div className="flex flex-wrap items-center justify-between w-full mb-2">
					<div className="flex items-center">
						<div className="mr-2 text-xs text-gray-700 uppercase">{epName.ep}:</div>
						<div>{epName.title}</div>
					</div>
					<div className="flex items-center font-mono text-right text-gray-600">
						{suggestion.time}&nbsp;
						{suggestion.edited ? (
							<span className="text-2xl text-green-400">✔</span>
						) : (
							<span className="text-2xl text-gray-400"> &minus;</span>
						)}
					</div>
				</div>
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
			.post('https://search-seekerslounge-bfv6hl5b7dikv4ehjzd3gs4tsu.us-east-1.es.amazonaws.com/teach/_search', {
				query: {
					multi_match: {
						query: value,
						fields: [ 'line', 'episode' ],
						fuzziness: 'AUTO'
					}
				}
			})
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
		autoFocus: true,
		onChange: (_, { newValue, method }) => {
			setValue(newValue)
		}
	}

	return (
		<div>
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
