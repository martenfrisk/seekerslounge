import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
// import { throttle, debounce } from 'throttle-debounce'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import epList from '../assets/episodes.json'
import { Link, withRouter } from 'react-router-dom'

const randomQuery = [
	'guinness',
	'ridiculous voice',
	'bronco',
	'lasagna',
	'big nightmare',
	'el chapo',
	'cheetah man',
	'see you in court',
	'beef diaper',
	'bottomless piggy bank',
	'scarecrow',
	'south pole santa',
	'Wimberley',
	'tricky dick',
	'picasso',
	'grotesque genitals',
	'bethany hart',
	'morrissey',
	'goths',
	'famously',
	'oj simpson',
	'let\'s just say'
]
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

const Search = () => {
	const [ results, setResults ] = useState()
	const [ searchValue, setSearchValue ] = useState(randomQuery[getRandomInt(randomQuery.length)])
	const [ searchDetails, setSearchDetails ] = useState()

  useEffect(() => {
    onSuggestionFetchFuzzy()
  }, [])
  
	const renderSuggestion = (suggestion, query, index) => {
		const suggestionText = suggestion.line
		const matches = AutosuggestHighlightMatch(suggestionText, query)
		const parts = AutosuggestHighlightParse(suggestionText, matches)
		let epClean = suggestion.episode.replace('.json', '')
		let epName = epList.find((x) => x.ep === epClean)


		return (
			<LazyLoad key={index}>
				<div className="min-w-full px-4 pb-6 mb-6 shadow-md md:mx-4">
					<div className="flex flex-wrap items-center justify-between w-full mb-2">
						<div className="flex items-center">
							<div className="pt-1 mr-2 text-xs text-gray-700 uppercase">{epName.ep}</div>
							<div className="text-sm text-gray-800 md:text-base">{epName.title}</div>
						</div>
						<div className="flex items-center font-mono text-right text-gray-600">
							<div className="mr-2 font-sans text-black">{suggestion.speaker}</div>
							<div className="mr-2 font-sans text-right text-blue-600 border-b-2 border-dotted">
								<Link
									to={{
										pathname: `/ep/${epName.ep}`,
										hash: `#:~:text=${suggestion.time}`
									}}
								>
									go to transcript
								</Link>
							</div>
							{suggestion.time}&nbsp;
							{suggestion.edited ? (
								<span className="text-2xl text-green-400">✔</span>
							) : (
								<span className="text-2xl text-gray-400">&minus;</span>
							)}
						</div>
					</div>
					<div className="py-2 pl-4 mt-4 border-l-2 border-gray-400 md:text-lg">
						{parts.map((part, index) => {
							const className = part.highlight ? 'text-blue-600 font-bold' : null

							return (
								<span className={className} key={index}>
									{part.text}
								</span>
							)
						})}
					</div>
				</div>
			</LazyLoad>
		)
	}

	const onSuggestionFetchFuzzy = async () => {
		await axios
			.post('https://search-seekerslounge-bfv6hl5b7dikv4ehjzd3gs4tsu.us-east-1.es.amazonaws.com/teach/_search', {
				from: 0,
				size: 99,
				query: {
					multi_match: {
						query: searchValue,
						fields: [ 'line', 'episode' ],
						fuzziness: 'AUTO'
					}
				}
			})
			.then((res) => {
				console.log(res)
				const results = res.data.hits.hits.map((h) => h._source)
				setResults(() => results)
				setSearchDetails(() => res.data.hits.total.value)
				console.log(results)
			})
  }
  
	const handleSubmit = (e) => {
		e.preventDefault()
		onSuggestionFetchFuzzy()
	}

	const handleChange = (e) => {
		e.preventDefault()
		setSearchValue(e.target.value)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					type="text"
					className="w-full h-8 mx-4 border border-gray-500"
					name="search"
					value={searchValue}
				/>
				<input type="submit" value="Search" />
			</form>
			<div>{results && results.map((hit, index) => renderSuggestion(hit, searchValue, index) )}</div>
			<p>Search value: {searchValue}</p>
		</>
	)
}

export default withRouter(Search)
