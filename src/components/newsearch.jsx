import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
// import { throttle, debounce } from 'throttle-debounce'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import epList from '../assets/episodes.json'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs'

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
	"let's just say"
]

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

let seasonArr = [ 's01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 'min' ]

const Search = ({ history }) => {
	const [ results, setResults ] = useState([])
	const [ searchValue, setSearchValue ] = useState(randomQuery[getRandomInt(randomQuery.length)])
	const [ searchDetails, setSearchDetails ] = useState()
	const [ exact, setExact ] = useState(false)
	const [ usedExact, setUsedExact ] = useState(false)
	const [ filterSeason, setFilterSeason ] = useState(
		qs.parse(history.location.search)['s'] !== undefined
			? qs.parse(history.location.search)['s'].split(',')
			: [ 'all' ]
	)

	const goSearch = () => {
		exact ? searchExact() : searchFuzzy()
	}

	useEffect(() => {
		goSearch()
	}, [])

	const renderSuggestion = (suggestion, index) => {
		const suggestionText = suggestion.line
		const matches = AutosuggestHighlightMatch(suggestionText, searchValue)
		const parts = AutosuggestHighlightParse(suggestionText, matches)
		let epClean = suggestion.episode.replace('.json', '')
		let epName = epList.find((x) => x.ep === epClean)

		return (
			<LazyLoad key={index}>
				<div className="w-full px-4 pb-6 mb-6 shadow-md">
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

	const searchFuzzy = async () => {
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
				setUsedExact(false)
			})
	}

	const searchExact = async () => {
		await axios
			.post('https://search-seekerslounge-bfv6hl5b7dikv4ehjzd3gs4tsu.us-east-1.es.amazonaws.com/teach/_search', {
				from: 0,
				size: 99,
				query: {
					multi_match: {
						query: searchValue,
						fields: [ 'line', 'episode' ],
						type: 'phrase',
						operator: 'and'
					}
				}
			})
			.then((res) => {
				const results = res.data.hits.hits.map((h) => h._source)
				setResults(() => results)
				setSearchDetails(() => res.data.hits.total.value)
				setUsedExact(true)
			})
	}

	const handleSeasonFilter = (season) => {
		if (filterSeason.includes('all')) {
			setFilterSeason(() => [ season ])
		} else if (!filterSeason.includes(season)) {
			setFilterSeason((filterSeason) => [ ...filterSeason, season ])
		} else {
			setFilterSeason((filterSeason) => filterSeason.filter((p) => p !== season))
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		exact ? searchExact() : searchFuzzy()
	}

	const handleChange = (e) => {
		e.preventDefault()
		setSearchValue(e.target.value)
	}

	const handleCheckbox = () => {
		setExact((prev) => !prev)
		goSearch()
	}

	const sortSuggestions = (suggestions, index) => {
		if (suggestions) {
			if (filterSeason.includes('all')) {
				return renderSuggestion(suggestions, index)
			} else if (filterSeason.length === 0) {
				setFilterSeason([ 'all' ])
				return renderSuggestion(suggestions, index)
			} else {
				let currentSeason = suggestions.episode.slice(0, 3)
				if (filterSeason.includes(currentSeason)) {
					return renderSuggestion(suggestions, index)
				}
			}
		} else {
			return []
		}
	}

	return (
		<React.Fragment>
			<form className="flex flex-wrap items-center mb-4 md:m-4" onSubmit={handleSubmit}>
				<span className="inline mr-1 text-sm">
					Search exact matches (click 'Search' after ticking box):&nbsp;
					<input id="check" type="checkbox" className="inline" onChange={handleCheckbox} checked={exact} />
				</span>

				<input
					onChange={handleChange}
					type="text"
					className="w-full h-12 px-4 text-xl border border-gray-500 md:w-4/6"
					name="search"
					autoFocus
					value={searchValue}
				/>
				<button
					onClick={() => setSearchValue(randomQuery[getRandomInt(randomQuery.length)])}
					className="w-1/2 h-10 text-white bg-blue-400 border-r border-white md:h-12 md:w-1/6"
				>
					Random
				</button>
				<input type="submit" className="w-1/2 h-10 text-white bg-blue-400 md:h-12 md:w-1/6" value="Search" />
			</form>
			<div className="px-2 md:px-8">
				Filter by season:&nbsp;
				{filterSeason.includes('all') ? (
					<button className="px-1 mr-2 bg-blue-300 rounded-sm" onClick={() => setFilterSeason([ 'all' ])}>
						all
					</button>
				) : (
					<button className="px-1 mr-2" onClick={() => setFilterSeason([ 'all' ])}>
						all
					</button>
				)}
				{seasonArr.map((season) => {
					if (filterSeason.includes(season)) {
						return (
							<button
								className="px-1 mr-2 bg-blue-300 rounded-sm"
								onClick={() => handleSeasonFilter(season)}
								key={season}
							>
								{season === 'min' ? 'mini' : season}
							</button>
						)
					} else {
						return (
							<button className="px-1 mr-2" onClick={() => handleSeasonFilter(season)} key={season}>
								{season === 'min' ? 'mini' : season}
							</button>
						)
					}
				})}
			</div>
			<div className="md:px-4">
				<div className="px-4 my-4">
					{searchDetails !== 0 &&
						`${searchDetails} hits for "${searchValue}" using ${usedExact
							? 'exact'
							: 'fuzzy'} search in ${filterSeason.includes('all') ? 'all seasons' : filterSeason.map(s => s === 'min' ? ' mini' : ` ${s}`)}`}
				</div>

				{results.length !== 0 ? (
					results.map((hit, index) => sortSuggestions(hit, index))
				) : (
					<p>
						No results for "{searchValue}" in {filterSeason.includes('all') ? 'all seasons' : filterSeason}.
						Try searching phonetically or inserting spaces in the words.
					</p>
				)}
			</div>
		</React.Fragment>
	)
}

export default withRouter(Search)
