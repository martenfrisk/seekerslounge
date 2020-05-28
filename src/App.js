import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Hits, SearchBox, Pagination, Highlight, CurrentRefinements, RefinementList } from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
import './App.css'
import Pot from './img/coffee.svg'

const searchClient = algoliasearch('ZJ3KVLVEMJ', '06e8752d09f90a97299b0954aa15a635')


// const RefinementList = ({ currentRefinement, searchForItems, isFromSearch, items, createURL, refine }) => (
// 	<div>
// 	<ul className="flex flex-wrap w-3/4 mx-auto my-0">
// 		{items.map(item => (
// 			<li key={item.label} className="h-6 px-3 py-1 mt-2 mr-2 text-xs bg-blue-200 rounded-lg">
		
// 				<a href={createURL(item.value)} style={{ fontWeight: item.isRefined ? 'bold' : '' }}    onClick={event => {
// 					event.preventDefault();
// 					refine(item.value);
// 				}}>
// 			{item.label}{' '}({item.count})
// 				</a>
// 			</li>
// 		))}
// 	</ul>
// 	</div>
// );

// const CustomRefinementList = connectRefinementList(RefinementList);

const App = () => {
	const [ infoView, setInfoView ] = useState(true)
	const [ moreInfo, setMoreInfo ] = useState(false)
	const [ copyright, setCopyright ] = useState(false)
	const handleInfoView = () => setInfoView((prev) => !prev)
	const handleMoreInfo = () => setMoreInfo((prev) => !prev)
	const handleCopyright = () => setCopyright((prev) => !prev)
		return (
			<div className="flex flex-col py-0 md:flex-row">
				<div className="w-full py-0 mt-0 md:mb-0 md:w-1/4 md:max-w-sm ">
					<div className="flex items-end justify-end h-40 pr-3 mt-0 text-2xl text-gray-800 bg-blue-300">
					<Coffee />
					<div className="flex flex-col justify-end">
						<a href="/" className="text-gray-700">Seekers&apos; Lounge</a>
						<div className="text-xs text-blue-900">a Teachers' Lounge search engine</div>

					</div>
					</div>
					<div className="w-full h-auto px-4 py-4 font-sans leading-relaxed text-justify md:mt-4 md:px-6">
										<div onClick={handleInfoView} className="mb-4 text-xs text-center text-gray-700 border-b-2 border-gray-300 border-dashed cursor-pointer">{!infoView ? <div>&#9662;&nbsp;show info</div> : <div>&#9652;&nbsp;hide info</div>}</div>
					{infoView && 
					<>
					<p>
							Currently includes all episodes up to season 5. <br />
							<br />
							Transcripts are unedited and the speaker has not been identified. Intro has been removed so add 30 seconds for accurate timestamp.
						</p>
						<Timeline />
						

						<p>
							Want to help out? Click <div onClick={handleMoreInfo} className="inline-block border-b border-dotted cursor-pointer">here&nbsp;&#9662;</div></p>{moreInfo && <div className="text-sm">You can find the unedited transcripts here: <br />Edit the text and
							submit a pull request.<br />
							<p className="italic">"What's a pull request?"</p>Just edit the transcript and message me on reddit, at u/martanor. </div>}
						
						<div onClick={handleCopyright} className="inline-block border-b border-dotted cursor-pointer">Copyright information&nbsp;&#9662;</div>
						{copyright && <><p>No copyright infringement intended. All rights belong to their respective rights holders (probably Big Grande and Earwolf). Want to contact me? I'll see your ass in court (or message me on reddit, u/martanor)</p>
						<p>Build with React, powered by Algolia Search, styled using Tailwind CSS.</p></>}
						</>}
					</div>
				</div>

				<div className="w-full h-auto mt-0 md:w-3/4">
					<InstantSearch searchClient={searchClient} indexName="Teachers">
						<div className="pt-0 bg-gray-100 md:pt-10">
							<div className="search-panel__results">
								<SearchBox
									className="flex justify-center w-full pt-5 md:pt-10"
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
					</InstantSearch>
				</div>
			</div>
		)
	}






const Coffee = () => {
	// steam adapted from Alex Martinez https://codepen.io/alxmrtnz/pen/jWZbey
	// coffe pot by Creaticca Creative Agency (https://www.flaticon.com/authors/creaticca-creative-agency) from www.flaticon.com
	return (
		<div className="aligner-item coffee-container">

    	<div className="steam-container">
      	<div className="squiggle-container squiggle-container-1">
      		<div className="squiggle">
        		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 28.1 80.6" style={{enableBackground: "new 0 0 28.1 80.6;"}} xmlSpace="preserve">
        			<path className="" fill="none" stroke-width="11" stroke-linecap="round" stroke-miterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"/>
        		</svg>
      		</div> {/* <!-- end .squiggle--> */}
    		</div>

				<div className="squiggle-container squiggle-container-2">
					<div className="squiggle">
					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 28.1 80.6" style={{enableBackground: "new 0 0 28.1 80.6;"}} xmlSpace="preserve">
						<path className="" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-miterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"/>
					</svg>
					</div> {/* <!-- end .squiggle--> */}
				</div>
				<div className="squiggle-container squiggle-container-3">
					<div className="squiggle">
					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 28.1 80.6" style={{enableBackground: "new 0 0 28.1 80.6;"}} xmlSpace="preserve">
						<path className="" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-miterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"/>
					</svg>
				</div> {/* <!-- end .squiggle--> */}
    	</div>
    </div>

    <div className="coffee-cup-container">
      <img src={Pot} alt="Coffee pot" />
    </div>
  </div>  
	)
}

const Timeline = () => {
	return (
		<>
		<p className="mt-4 text-sm">Progress (by season): </p>
		<p className="w-full mb-2 text-xs text-center">transcription</p>
		<ul className="progress-indicator">
			<li className="completed">
					<span className="bubble"></span>
					1
			</li>
			<li className="completed">
					<span className="bubble"></span>
					2
			</li>
			<li className="completed">
					<span className="bubble"></span>
					3
			</li>
			<li className="completed">
					<span className="bubble"></span>
					4
			</li>
			<li>
					<span className="bubble"></span>
					5
			</li>
			<li>
					<span className="bubble"></span>
					6
			</li>
			<li>
					<span className="bubble"></span>
					7
			</li>
			<li>
					<span className="bubble"></span>
					8
			</li>
			<li>
					<span className="bubble"></span>
					9
			</li>
			<li>
					<span className="bubble"></span>
					minis
			</li>
		</ul>
		<p className="w-full mb-2 text-xs text-center">editing</p>
		<ul className="mb-4 progress-indicator">
			<li>
					<span className="bubble"></span>
					1
			</li>
			<li>
					<span className="bubble"></span>
					2
			</li>
			<li>
					<span className="bubble"></span>
					3
			</li>
			<li>
					<span className="bubble"></span>
					4
			</li>
			<li>
					<span className="bubble"></span>
					5
			</li>
			<li>
					<span className="bubble"></span>
					6
			</li>
			<li>
					<span className="bubble"></span>
					7
			</li>
			<li>
					<span className="bubble"></span>
					8
			</li>
			<li>
					<span className="bubble"></span>
					9
			</li>
			<li>
					<span className="bubble"></span>
					minis
			</li>
		</ul>
		</>
	)
}


const Hit = (props) => {
	return (
		<div className="flex flex-wrap px-4 py-4 bg-white rounded-sm">
			<Highlight attribute="line" hit={props.hit} className="w-full mb-4" />
			<div className="w-1/4 text-sm">{props.hit.speaker}</div>
			<div className="w-1/4 text-sm">{props.hit.episode}</div>
			<div className="w-1/2 text-sm text-right">{props.hit.time}</div>
		</div>
	)
}

Hit.propTypes = {
	hit: PropTypes.object.isRequired
}

export default App
