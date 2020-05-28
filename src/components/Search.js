import React from 'react'
import algoliasearch from 'algoliasearch'
import { InstantSearch, SearchBox, Hits, Highlight, Stats, SortBy, Pagination } from 'react-instantsearch-dom'
import './Search.css'

const searchClient = algoliasearch('ZJ3KVLVEMJ', '06e8752d09f90a97299b0954aa15a635')

const Search = () => {
	return (
		<InstantSearch searchClient={searchClient} indexName="Teachers">
			<Header />
			<div className="body-content">
				<Content />
			</div>
		</InstantSearch>
	)
}

const Header = () => {
	return (
		<header className="header">
			<SearchBox className="search-bar" />
		</header>
	)
}

const Hit = ({ hit }) => {
  return (
    <a href={'/'}>
      <div className="card">
        <div className="card-contents">
          <Highlight attribute="line" hit={hit} />
          <div className="card-line">{hit}</div>
        </div>
      </div>
    </a>
  )
}

const Content = () => {
  return (
		<main>
			<div className="information">
				<div className="stats">
					<Stats />
				</div>
				<div className="sort">
					<SortBy defaultRefinement="line" items={[ { value: 'line', label: 'Line' } ]} />
				</div>
			</div>
			<Hits />
			<div>
				<Pagination />
			</div>
		</main>
  )
}

export default Search
