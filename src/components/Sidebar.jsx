import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Pot from '../img/coffee.svg'
import '../App.css'


const Sidebar = () => {
	const [ infoView, setInfoView ] = useState(true)
	const [ moreInfo, setMoreInfo ] = useState(false)
	const [ copyright, setCopyright ] = useState(false)
	const handleInfoView = () => setInfoView((prev) => !prev)
	const handleMoreInfo = () => setMoreInfo((prev) => !prev)
	const handleCopyright = () => setCopyright((prev) => !prev)

	let width = window.innerWidth

	useEffect(
		() => {
			if (width > 768) {
				setInfoView(() => true)
			} else {
				setInfoView(() => false)
			}
		},
		[ width ]
	)
	
	return (
		<div className="sticky w-full py-0 mt-0 md:mb-0 md:w-1/4 md:max-w-sm ">
			<div className="flex items-end justify-end h-16 pr-3 mt-0 text-2xl text-gray-800 bg-blue-300 md:h-40">
				<Coffee />
				<div className="flex flex-col justify-end">
					<Link to="/" className="text-gray-700">
						Seekers&apos; Lounge
					</Link>
					<div className="text-xs text-blue-900">a Teachers' Lounge search engine</div>
				</div>
			</div>
			<div className="flex">
				<div className="w-1/3 px-3 py-2 text-center text-white bg-blue-600 border-r border-white">
					<Link to="/eplist">
						<button className="text-white border-b border-blue-600 border-dashed hover:border-white">Episodes</button>
					</Link>
				</div>
				<div className="w-1/3 px-3 py-2 text-center text-white bg-blue-600 border-l border-white">
					<Link to="/">
						<button className="text-white border-b border-blue-600 border-dashed hover:border-white">Search</button>
					</Link>
				</div>
				<div className="w-1/3 px-3 py-2 text-center bg-gray-100 border-l border-gray-700" onClick={handleInfoView}>
					{!infoView ? (
						<div className="flex justify-center">
							<p className="border-b border-white border-dashed cursor-pointer hover:border-black">Info&nbsp;&#9662;</p>
						</div>
					) : (
						<div className="flex justify-center">
						<p className="border-b border-white border-dashed cursor-pointer hover:border-black">
						Info&nbsp;&#9652;
						</p>
						</div>
					)}
				</div>
			</div>
			<div className="w-full h-auto px-4 py-4 font-sans leading-relaxed text-justify md:px-6">
				{infoView && (
					<div>
						<div>
							<p className="mb-4">Now includes ALL episodes!</p>
							<p className="my-4">
								Getting no results? Try adding spaces, e.g. cheetahman -{'>'} cheetah man
							</p>
							<p className="my-4">
								Transcripts are unedited. Speakers not identified. Intro has been removed so add ~30
								seconds for accurate timestamp. Uncommon phrases (e.g. "Podd Tadre") may not show up.
								Try searching phonetically.
							</p>
						</div>

						<div>
							Want to help out? Click{' '}
							<div
								onClick={handleMoreInfo}
								className="inline-block border-b border-dotted cursor-pointer"
							>
								here&nbsp;&#9662;
							</div>
						</div>
						{moreInfo && (
							<div className="text-sm">
								You can find the unedited transcripts here:{' '}
								<a
									className="text-xs text-blue-600"
									href="https://github.com/martenfrisk/seekerslounge/tree/master/src/transcripts"
								>
									github.com/martenfrisk/seekerslounge/tree/master/src/transcripts
								</a>
								<br />Edit the text and submit a pull request.<br />
								<br />
								<p className="italic">"What's a pull request?"</p>You can just save and edit the
								transcript and message me on reddit (u/martanor) with a link to a pastebin or google
								doc.<br />
								<br />
							</div>
						)}

						<div onClick={handleCopyright} className="inline-block border-b border-dotted cursor-pointer">
							Copyright information&nbsp;&#9662;
						</div>
						<br />
						{copyright && (
							<div>
								<p>
									No copyright infringement intended. All rights belong to their respective rights
									holders (probably Big Grande and Earwolf). Want to contact me? I'll see your ass in
									court (or message me on reddit, u/martanor)
								</p>
								<p>Build with React, powered by ElasticSearch, styled using Tailwind CSS.</p>
							</div>
						)}
					</div>
				)}
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
						<svg
							version="1.1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 28.1 80.6"
							style={{ enableBackground: 'new 0 0 28.1 80.6' }}
							xmlSpace="preserve"
						>
							<path
								className=""
								fill="none"
								strokeWidth="11"
								strokeLinecap="round"
								strokeMiterlimit="10"
								d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"
							/>
						</svg>
					</div>{' '}
					{/* <!-- end .squiggle--> */}
				</div>

				<div className="squiggle-container squiggle-container-2">
					<div className="squiggle">
						<svg
							version="1.1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 28.1 80.6"
							style={{ enableBackground: 'new 0 0 28.1 80.6' }}
							xmlSpace="preserve"
						>
							<path
								className=""
								fill="none"
								stroke="#fff"
								strokeWidth="11"
								strokeLinecap="round"
								strokeMiterlimit="10"
								d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"
							/>
						</svg>
					</div>{' '}
					{/* <!-- end .squiggle--> */}
				</div>
				<div className="squiggle-container squiggle-container-3">
					<div className="squiggle">
						<svg
							version="1.1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							viewBox="0 0 28.1 80.6"
							style={{ enableBackground: 'new 0 0 28.1 80.6' }}
							xmlSpace="preserve"
						>
							<path
								className=""
								fill="none"
								stroke="#fff"
								strokeWidth="11"
								strokeLinecap="round"
								strokeMiterlimit="10"
								d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1"
							/>
						</svg>
					</div>{' '}
					{/* <!-- end .squiggle--> */}
				</div>
			</div>

			<div className="coffee-cup-container">
				<img src={Pot} alt="Coffee pot" />
			</div>
		</div>
	)
}

export default withRouter(Sidebar)
