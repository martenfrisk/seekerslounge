import React, { useState, useReducer, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
// import { throttle, debounce } from 'throttle-debounce'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import './Search.css'
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
	'let\'s just say'
]
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const Elastic = (props) => {
	let initValue = randomQuery[getRandomInt(randomQuery.length)]
	const { history } = props
	const [ value, setValue ] = useState(history.location.search ? qs.parse(history.location.search)['q'] : initValue)
	const [ suggestions, setSuggestions ] = useState([])
	const [ exact, setExact ] = useState(false)
	const [ showExactInfo, setShowExactInfo ] = useState(false)
	const [ filterSeason, setFilterSeason ] = useState(
		qs.parse(history.location.search)['s'] !== undefined ? 
		qs.parse(history.location.search)['s'].split(',') : ['all']
	)
	const [ , forceUpdate ] = useReducer((x) => x + 1, 0)

	useEffect(
		() => {

				setValue(() => 
				qs.parse(history.location.search)['?q'] !== undefined ?
				qs.parse(history.location.search)['?q'] : value
				)
				setFilterSeason(() =>
				qs.parse(history.location.search)['s'] !== undefined ? 
				qs.parse(history.location.search)['s'].split(',') : ['all'])
				setExact(() => 
				qs.parse(history.location.search)['exact'] ? true : false			
				)
			// let seasons = history.location.pathname
			// seasons.slice(1).split(',').forEach((seas) => {
			// 	if (seas !== 'all') {
			// 		handleSeasonFilter(seas)
			// 	}
			// })
			// forceUpdate()
		},
		[history, value]
	)
	useEffect(() => {
			let seasons = filterSeason.join(',')
			let setValue = value !== 'undefined' ? value : ''
			let isExact = exact ? 'exact' : 'fuzzy'
			
			history.replace({
				search: '?' + isExact + '&' + new URLSearchParams({q: setValue}) + '&s=' + seasons
			})
			
		},
		[value, filterSeason, exact, history]
	)
	
	const toggleAll = () => {
		setFilterSeason(['all'])
	}
	
	const handleSeasonFilter = (season) => {
		if (filterSeason.includes('all')) {
			setFilterSeason(() => [season])
		} else if (!filterSeason.includes(season)) {
			setFilterSeason(filterSeason => [...filterSeason, season])
		} else {
			setFilterSeason(filterSeason => filterSeason.filter(p => p !== season))	
		}
	}

	const sortSuggestions = (suggestions) => {
		if (suggestions) { 
			if (filterSeason.includes('all')) {
				return suggestions
			} else if (filterSeason.length === 0) {
				toggleAll()
				return suggestions
			} else {
				let filteredSuggestions = []
				suggestions.forEach((ep) => {
					let epSeason = ep.episode.slice(0, 3)
					if (filterSeason.includes(epSeason)) {
						filteredSuggestions.push(ep)
					}
				})
				return filteredSuggestions
			} 
		} else {
			return []
		}
	}



	const onSuggestionFetchFuzzy = async ({ value }) => {
		await axios.post('https://search-seekerslounge-bfv6hl5b7dikv4ehjzd3gs4tsu.us-east-1.es.amazonaws.com/teach/_search', {
			from: 0,
			size: 99,
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
	
	const onSuggestionFetchExact = async ({ value }) => {
				await axios.post('https://search-seekerslounge-bfv6hl5b7dikv4ehjzd3gs4tsu.us-east-1.es.amazonaws.com/teach/_search', {
				from: 0,
				size: 99,
				query: {
					multi_match: {
						query: value,
						fields: [ 'line', 'episode' ],
						type: 'phrase',
						operator: 'and'
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

	const renderSuggestion = (suggestion, { query }) => {
		const suggestionText = suggestion.line
		const matches = AutosuggestHighlightMatch(suggestionText, query)
		const parts = AutosuggestHighlightParse(suggestionText, matches)
		let epClean = suggestion.episode.replace('.json', '')
		let epName = epList.find((x) => x.ep === epClean)

		return (
			<LazyLoad>
			<div className="min-w-full px-4 pb-6 mb-6 shadow-md">
				<div className="flex flex-wrap items-center justify-between w-full mb-2 hover:translate-y-1 hover:border-gray-200 hover:border-2">
					<div className="flex items-center">
						<div className="pt-1 mr-2 text-xs text-gray-700 uppercase">{epName.ep}</div>
						<div className="text-sm text-gray-800 md:text-base">{epName.title}</div>
					</div>
					<div className="flex items-center font-mono text-right text-gray-600">
						<div className="mr-2 font-sans text-right text-blue-600 border-b-2 border-dotted">
							<Link
								to={{
									pathname: `/ep/${epName.ep}`,
									hash: `#${suggestion.time}`
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
						const className = part.highlight ? 'highlight' : null

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
	const getSuggestionValue = suggestions => value

	const inputProps = {
		placeholder: 'Search',
		value,
		autoFocus: true,
		onChange: (_, { newValue }) => setValue(() => newValue)
	}

	const handleCheckbox = () => {
		setExact((prev) => !prev)
		forceUpdate()
		setShowExactInfo(() => true)
		setTimeout(() => {
			setShowExactInfo(() => false)
		}, 2000)
	}

	const handleRandom = () => {
		setValue(() => randomQuery[getRandomInt(randomQuery.length)])
		setShowExactInfo(() => true)
		setTimeout(() => {
			setShowExactInfo(() => false)
		}, 2000)
	}

	let seasonArr = [ 's01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 'min' ]

	
	return (
		<div>
			<div className="flex flex-wrap items-center px-8 md:mt-8">
				<button className="px-2 mr-2 text-sm text-white bg-blue-700 rounded" onClick={handleRandom}>
					Get random query
				</button>
				<label className="mr-1 text-sm" htmlFor="check">
					Search exact matches:{' '}
				</label>
				<input id="check" type="checkbox" onChange={handleCheckbox} checked={exact} />
				{showExactInfo && (
					<div className="px-2 my-2 text-sm text-white bg-red-700 rounded md:mx-2 md:my-0">Click the search bar. Might take a second to get fetch new results.</div>
				)}
			</div>
			<div className="flex flex-wrap w-full px-8 mt-2 mb-2 text-sm">
				{suggestions && <p>{sortSuggestions(suggestions).length} results for&nbsp;</p>}
				{value && <p>'{value}'&nbsp;</p>}
				{exact ? <p>(exact search)</p> : <p>(fuzzy search)</p>}
				{filterSeason.includes('all') ? <p>&nbsp;all seasons</p> : <p>&nbsp;in {filterSeason.join(', ')}</p>}
			</div>
			<div className="px-8">
			{/* {JSON.stringify(filterSeason)} */}
				Filter by season:&nbsp;
				{filterSeason.includes('all') ? (
					<button className="px-1 mr-2 bg-blue-300 rounded-sm" onClick={() => toggleAll()}>
						all
					</button>
				) : (
					<button className="px-1 mr-2" onClick={() => toggleAll()}>
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
								{season}
							</button>
						)
					} else {
						return (
							<button className="px-1 mr-2" onClick={() => handleSeasonFilter(season)} key={season}>
								{season}
							</button>
						)
					}
				})}
			</div>
{/* <form> */}
			<Autosuggest
				suggestions={sortSuggestions(suggestions)}
				onSuggestionsFetchRequested={exact ? onSuggestionFetchExact : onSuggestionFetchFuzzy}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
				focusInputOnSuggestionClick={false}
				alwaysRenderSuggestions={true}
				autoFocus={true}
			/>

{/* </form> */}
		</div>
	)
}

export default withRouter(Elastic)
