import React from 'react'
import algoliasearch from 'algoliasearch'
import { InstantSearch, Hits, connectHighlight, connectSearchBox, connectRefinementList } from 'react-instantsearch-dom'
import epList from '../assets/episodes.json'
import { Link, withRouter } from 'react-router-dom'

const searchClient = algoliasearch('S2MS0LQ16O', '0bbeadbeb739b744820e282f0334dc99')

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

const Highlight = ({ highlight, attribute, hit }) => {
	const parsedHit = highlight({
		highlightProperty: '_highlightResult',
		attribute,
		hit
	})

	return (
		<span>
			{parsedHit.map(
				(part, index) =>
					part.isHighlighted ? (
						<span key={index} className="text-blue-700">
							{part.value}
						</span>
					) : (
						<span key={index}>{part.value}</span>
					)
			)}
		</span>
	)
}

const CustomHighlight = connectHighlight(Highlight)

const Hit = ({ hit }) => {
	let epClean = hit.episode.replace('.json', '')
	let epName = epList.find((x) => x.ep === epClean)
	return (
		<p>
			<div className="w-full px-4 pb-6 mb-6 shadow-md hover:bg-blue-100">
				<div className="flex flex-wrap items-center justify-between w-full mb-2">
					<div className="flex items-center">
						<div className="pt-1 mr-2 text-xs text-gray-700 uppercase">{epName.ep}</div>
						<div className="text-sm text-gray-800 md:text-base">{epName.title}</div>
					</div>
					<div className="flex items-center font-mono text-right text-gray-600">
						<div className="mr-2 font-sans text-black">{hit.speaker}</div>
						<div className="mr-2 font-sans text-right text-blue-600 border-b-2 border-dotted">
							<Link
								to={{
									pathname: `/ep/${epName.ep}`,
									hash: `#:~:text=${hit.time}`
								}}
							>
								go to transcript
							</Link>
						</div>
						{hit.time}&nbsp;
						{hit.edited ? (
							<span className="text-2xl text-green-400">✔</span>
						) : (
							<span className="text-2xl text-gray-400">&minus;</span>
						)}
					</div>
				</div>
				<div className="py-2 pl-4 mt-4 border-l-2 border-gray-400 md:text-lg">
					<CustomHighlight attribute="line" hit={hit} tagName="mark" />
				</div>
			</div>
		</p>
	)
}

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
	<form noValidate action="" role="search">
		<input
			type="search"
			className="w-full h-12 px-4 text-xl border border-gray-500 outline-none"
			value={currentRefinement}
			onChange={(event) => refine(event.currentTarget.value)}
		/>
		{isSearchStalled ? 'Loading...' : ''}
	</form>
)

const CustomSearchBox = connectSearchBox(SearchBox)

const RefinementList = ({ items, refine }) => (
	<ul className="flex flex-wrap justify-between mx-2 my-4 md:justify-start">
		{items.map((item) => {
			let cleanEp = item.label.replace('.json', '')

			return (
				<li key={item.label} className="px-1 py-1 mx-1 text-sm font-bold text-blue-700 border border-blue-500 rounded-lg">
					<button
						style={{ fontWeight: item.isRefined ? 'bold' : '' }}
						onClick={(event) => {
							event.preventDefault()
							refine(item.value)
						}}
					>
						{cleanEp} ({item.count})
					</button>
				</li>
			)
		})}
	</ul>
)

const CustomRefinementList = connectRefinementList(RefinementList)

const Algolia = () => {
	return (
    <div className="mx-2 md:mx-4 md:mt-8">

		<InstantSearch searchClient={searchClient} indexName="teachers">
			<CustomSearchBox
        reset="X"
				autoFocus
				showLoadingIndicator
				defaultRefinement={randomQuery[getRandomInt(randomQuery.length)]}
			/>
			<CustomRefinementList attribute="episode" />
			<Hits hitComponent={Hit} />
		</InstantSearch>
    </div>
	)
}

export default withRouter(Algolia)
