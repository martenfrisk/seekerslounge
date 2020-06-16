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
    {epName} - {epTitle.title}<br />
		<div className="text-base">{epTitle.desc}</div>
    </div>
    
			{ep.map((item) => {
				if (item.line !== '') {
					return (
						<div
							id={`${item.time}`}
							className="flex flex-wrap justify-between w-full px-8 py-4 border-b border-blue-200"
						>
							<div className="w-2/5">
								<Link className="text-blue-700 border-b-2 border-dotted" smooth to={`#${item.time}`}>
									{item.time}
								</Link>
							</div>
							<div className="w-3/5 text-right">
							{item.edited ? (
							<span className="mr-2 text-green-400">✔</span>
						) : (
							<span className="mr-2 text-gray-400"> &minus;</span>
						)}
							{item.speaker}</div>
							<div className="w-full">{item.line}</div>
						</div>
					)
				}
				return null
			})}
			{/* {JSON.stringify(ep)} */}
		</div>
	)
}

export default Episode
