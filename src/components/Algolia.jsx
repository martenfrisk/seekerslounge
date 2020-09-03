import React from 'react'
import algoliasearch from 'algoliasearch'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('S2MS0LQ16O', '0bbeadbeb739b744820e282f0334dc99');

const Algolia = () => {

  return (
    <InstantSearch searchClient={searchClient} indexName="teachers">
    <SearchBox />
    <Hits />
  </InstantSearch>
  )
}

export default Algolia