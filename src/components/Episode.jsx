import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import epList from '../assets/episodes.json'

const Episode = (props) => {
	const ep = require('../transcripts/' + props.props)
	let epName = props.props.replace('.json', '')
  let epTitle = epList.find((x) => x.ep === epName)

	return (
		<div>
    <div className="mx-6 my-4 text-2xl">
    {epName} - {epTitle.title}
    </div>
    
			{ep.map((item) => {
				if (item.line !== '') {
					return (
						<div
							id={`${item.time}`}
							className="flex flex-wrap w-full px-6 my-4"
						>
							<div className="w-20">
								<Link className="text-blue-700 border-b-2 border-dotted" smooth to={`#${item.time}`}>
									{item.time}
								</Link>
							</div>
							<div className="w-5/6">{item.line}</div>
						</div>
					)
				}
			})}
			{/* {JSON.stringify(ep)} */}
		</div>
	)
}

export default Episode
