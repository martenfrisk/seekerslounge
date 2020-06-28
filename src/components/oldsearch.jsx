// import algoliasearch from 'algoliasearch/lite'
// import { InstantSearch, Hits, SearchBox, Pagination, Highlight, CurrentRefinements, RefinementList } from 'react-instantsearch-dom'
// import PropTypes from 'prop-types'



// const searchClient = algoliasearch('ZJ3KVLVEMJ', '06e8752d09f90a97299b0954aa15a635')

// const DEBOUNCE_TIME = 400;


// const createURL = state => `?${qs.stringify(state)}`;

// const searchStateToUrl = (props, searchState) =>
//   searchState ? `${props.location.pathname}/${createURL(searchState)}` : '';
	
// const urlToSearchState = location => qs.parse(location.search.slice(1));


	// const [searchState, setSearchState] = useState(urlToSearchState(location));
	// const [debouncedSetState, setDebouncedSetState] = useState(null);
	// const onSearchStateChange = updatedSearchState => {
  //   clearTimeout(debouncedSetState);

  //   setDebouncedSetState(
  //     setTimeout(() => {
  //       history.push(searchStateToUrl(updatedSearchState), updatedSearchState);
  //     }, DEBOUNCE_TIME)
  //   );

  //   setSearchState(updatedSearchState);
  // };
	// const randomQuery = ['guinness', 'ridiculous voice', 'bronco', 'lasagna', 'big nightmare', 'el chapo', 'cheetahman', 'see you in court', 'sully', 'bottomless piggybank','scarecrow', 'Wimberley', 'tricky dick', 'picasso', 'groteque genitals', 'bethany hart', 'morrissey', 'goths', 'famously']
	// function getRandomInt(max) {
	// 	return Math.floor(Math.random() * Math.floor(max));
	// }

/* <InstantSearch searchClient={searchClient} indexName="Teachers">
						<div className="pt-0 bg-gray-100 md:pt-10">
							<div className="search-panel__results">
								<SearchBox
									className="flex justify-center w-full pt-5 md:pt-10"
									defaultRefinement={randomQuery[getRandomInt(randomQuery.length)]}
									searchState={searchState}
									onSearchStateChange={onSearchStateChange}
									createURL={createURL}
									translations={{
										placeholder: 'Search...'
									}}
								/>
								<CurrentRefinements clearsQuery />
								<RefinementList showMore limit={6} attribute="episode" />
								<Hits hitComponent={Hit} />

								<div className="w-full">
									<Pagination />
								</div>
							</div>
						</div>
          </InstantSearch> */
          
          

// 	App.propTypes = {
// 		history: PropTypes.shape({
// 			push: PropTypes.func.isRequired,
// 		}),
// 		location: PropTypes.object.isRequired,
// 	};



// const Hit = (props) => {
// 	return (
// 		<div className="flex flex-wrap px-4 py-4 bg-white rounded-sm">
// 			<Highlight attribute="line" hit={props.hit} className="w-full mb-4" />
// 			<div className="w-1/4 text-sm">{props.hit.speaker}</div>
// 			<div className="w-1/4 text-sm">{props.hit.episode}</div>
// 			<div className="w-1/2 text-sm text-right">{props.hit.time}</div>
// 		</div>
// 	)
// }

// Hit.propTypes = {
// 	hit: PropTypes.object.isRequired
// }


// import React from 'react'
// import algoliasearch from 'algoliasearch'
// import { InstantSearch, SearchBox, Hits, Stats, SortBy, Pagination } from 'react-instantsearch-dom'
// import './Search.css'

// const searchClient = algoliasearch('ZJ3KVLVEMJ', '06e8752d09f90a97299b0954aa15a635')

// const Search = () => {
// 	return (
// 		<InstantSearch searchClient={searchClient} indexName="Teachers">
// 			<Header />
// 			<div className="body-content">
// 				<Content />
// 			</div>
// 		</InstantSearch>
// 	)
// }

// const Header = () => {
// 	return (
// 		<header className="header">
// 			<SearchBox className="search-bar" />
// 		</header>
// 	)
// }

// const Hit = ({ hit }) => {
//   return (
//     <a href={'/'}>
//       <div className="card">
//         <div className="card-contents">
//           <Highlight attribute="line" hit={hit} />
//           <div className="card-line">{hit}</div>
//         </div>
//       </div>
//     </a>
//   )
// }

// const Content = () => {
//   return (
// 		<main>
// 			<div className="information">
// 				<div className="stats">
// 					<Stats />
// 				</div>
// 				<div className="sort">
// 					<SortBy defaultRefinement="line" items={[ { value: 'line', label: 'Line' } ]} />
// 				</div>
// 			</div>
// 			<Hits />
// 			<div>
// 				<Pagination />
// 			</div>
// 		</main>
//   )
// }

// export default Search
