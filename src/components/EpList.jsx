import React, { useState, useEffect } from 'react'
import { eps } from '../assets/neweplist'
import { Link, useLocation } from 'react-router-dom'

const EpList = () => {
	const [ filterSeason, setFilterSeason ] = useState([ 'all' ])
	let seasonArr = [ 's01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 'min' ]

	const toggleAll = () => {
		setFilterSeason([ 'all' ])
	}

	const Eps = () => {
		let suggestions = []
		if (eps) {
			if (filterSeason.includes('all')) {
				suggestions = eps
			} else if (filterSeason.length === 0) {
				toggleAll()
				suggestions = eps
			} else {
				eps.forEach((ep) => {
					let epSeason = ep.ep.slice(0, 3)
					if (filterSeason.includes(epSeason)) {
						suggestions.push(ep)
					}
				})
			}
			return suggestions.map((ep) => {
				return (
					<div className="px-4 py-2 my-2 border-l-4 border-white rounded-lg md:py-6 md:my-6 md:px-20 odd:bg-blue-100 hover:border-blue-300 even:bg-white">
						<Link
							to={{
								pathname: `/ep/${ep.ep}`
							}}
						>
							<div className="inline text-blue-600 border-b border-blue-400 border-dotted hover:border-b-2 hover:border-solid">
								<span className="text-xl">{ep.ep}</span><span>: {ep.title}</span>
								<p className="text-xs">(episode transcript)</p>
							</div>
						</Link>
						<div className="mt-3">{ep.desc}</div>
					</div>
				)
			})
		}
	}

	const { pathname, hash } = useLocation()

  useEffect(() => {
      // if not a hash link scroll to top
      if(hash===''){
          window.scrollTo(0, 0)
      }
      // else scroll to id
      else{
          setTimeout(
              () => {
                  const id = hash.replace('#:~:text=', '');
                  const element = document.getElementById(id);
                  if (element) {
                      element.scrollIntoView();
                  }
              },
              0
          );
      }
  }, [pathname, hash]) // do this on route change

	const handleSeasonFilter = (season) => {
		if (filterSeason.includes('all')) {
			setFilterSeason(() => [ season ])
		} else if (!filterSeason.includes(season)) {
      setFilterSeason(() => [ season ])
		} else if (filterSeason.includes(season)) {
			setFilterSeason(() => ['all'])
		}
	}

	return (
		<div className="w-full py-0 md:py-10">
			<div className="px-4 md:px-20">
      <h1 className="mb-2 text-3xl">Episode list</h1>
			  <div className="w-full text-2xl text-center">Filter by season</div>
        <div className="flex flex-wrap justify-between w-full mt-4">

  			{filterSeason.includes('all') ? (
  				<button className="w-16 py-1 mx-2 my-1 text-lg bg-blue-300 rounded-md md:my-0" onClick={() => toggleAll()}>
  					all
  				</button>
  			) : (
  				<button className="w-16 py-1 mx-2 my-1 text-lg bg-blue-100 rounded-md md:my-0" onClick={() => toggleAll()}>
  					all
  				</button>
  			)}
  			{seasonArr.map((season) => {
  				if (filterSeason.includes(season)) {
  					return (
  						<button
  							className="w-16 py-1 mx-2 my-1 text-lg bg-blue-300 rounded-md md:my-0"
  							onClick={() => handleSeasonFilter(season)}
  							key={season}
  						>
              {season === 'min' ? `mini` : season}
  						</button>
  					)
  				} else {
  					return (
  						<button className="w-16 py-1 mx-2 my-1 text-lg bg-blue-100 rounded-md md:my-0 hover:bg-blue-100" onClick={() => handleSeasonFilter(season)} key={season}>
              {season === 'min' ? `mini` : season}
  						</button>
  					)
  				}
  			})}
        </div>
			<div className="w-full mt-2 text-center text-blue-800">Season: {filterSeason.join(', ')}</div>
			</div>
			<Eps />
		</div>
	)
}

export default EpList
