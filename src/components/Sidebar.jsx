import React, { useState } from 'react'
import Pot from '../img/coffee.svg'
import '../App.css'

const Sidebar = () => {
	const [ infoView, setInfoView ] = useState(true)
	const [ moreInfo, setMoreInfo ] = useState(false)
	const [ copyright, setCopyright ] = useState(false)
	const handleInfoView = () => setInfoView((prev) => !prev)
	const handleMoreInfo = () => setMoreInfo((prev) => !prev)
	const handleCopyright = () => setCopyright((prev) => !prev)

	return (
		<div className="w-full py-0 mt-0 md:mb-0 md:w-1/4 md:max-w-sm ">
			<div className="flex items-end justify-end h-40 pr-3 mt-0 text-2xl text-gray-800 bg-blue-300">
				<Coffee />
				<div className="flex flex-col justify-end">
					<a href="/" className="text-gray-700">
						Seekers&apos; Lounge
					</a>
					<div className="text-xs text-blue-900">a Teachers' Lounge search engine</div>
				</div>
			</div>
			<div className="w-full h-auto px-4 py-4 font-sans leading-relaxed text-justify md:mt-4 md:px-6">
				<div
					onClick={handleInfoView}
					className="mb-4 text-xs text-center text-gray-700 border-b-2 border-gray-300 border-dashed cursor-pointer"
				>
					{!infoView ? <div>&#9662;&nbsp;show info</div> : <div>&#9652;&nbsp;hide info</div>}
				</div>
				{infoView && (
					<div>
						<p>
							Currently includes all episodes up to season 5. <br />
							<br />
							Transcripts are unedited and the speakers have not been correctly identified. Intro has been
							removed so add 30 seconds for accurate timestamp.
							<br />
							<br />
							Uncommon words and names such as "Podd Tadre" may not show up correctly because the results
							have been automatically transcribed.
						</p>
						<Timeline />

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
									href="https://github.com/martenfrisk/seekerslounge/tree/master/transcripts"
								>
									github.com/martenfrisk/seekerslounge/tree/master/transcripts
								</a>
								<br />Edit the text and submit a pull request.<br />
								<br />
								<p className="italic">"What's a pull request?"</p>You can just save and edit the
								transcript and message me on reddit (u/martanor) with a link to a pastebin or google
								doc.<br />
								<br />
								Remember that every line needs a unique objectID which is formatted as <br />
								<code>
									[season, one integer][episode, two integers starting at 01][incrementing number
									starting at 0]
								</code>. For season one, episode one, the objectID starts at 1010, then 1011 and so on.<br />
								<br /> ObjectID for minis are <br />
								<code>m[episode number, two integers][incrementing number starting at 00]</code>, for
								example m0700, m0701... for episode 7.{' '}
							</div>
						)}

						<div onClick={handleCopyright} className="inline-block border-b border-dotted cursor-pointer">
							Copyright information&nbsp;&#9662;
						</div>
						{copyright && (
							<div>
								<p>
									No copyright infringement intended. All rights belong to their respective rights
									holders (probably Big Grande and Earwolf). Want to contact me? I'll see your ass in
									court (or message me on reddit, u/martanor)
								</p>
								<p>Build with React, powered by Algolia Search, styled using Tailwind CSS.</p>
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

const Timeline = () => {
	return (
		<div>
			<p className="mt-4 text-sm">Progress (by season): </p>
			<p className="w-full mb-2 text-xs text-center">transcription</p>
			<ul className="progress-indicator">
				<li className="completed">
					<span className="bubble" />
					1
				</li>
				<li className="completed">
					<span className="bubble" />
					2
				</li>
				<li className="completed">
					<span className="bubble" />
					3
				</li>
				<li className="completed">
					<span className="bubble" />
					4
				</li>
				<li className="completed">
					<span className="bubble" />
					5
				</li>
				<li>
					<span className="bubble" />
					6
				</li>
				<li>
					<span className="bubble" />
					7
				</li>
				<li>
					<span className="bubble" />
					8
				</li>
				<li>
					<span className="bubble" />
					9
				</li>
				<li>
					<span className="bubble" />
					minis
				</li>
			</ul>
			<p className="w-full mb-2 text-xs text-center">editing</p>
			<ul className="mb-4 progress-indicator">
				<li>
					<span className="bubble" />
					1
				</li>
				<li>
					<span className="bubble" />
					2
				</li>
				<li>
					<span className="bubble" />
					3
				</li>
				<li>
					<span className="bubble" />
					4
				</li>
				<li>
					<span className="bubble" />
					5
				</li>
				<li>
					<span className="bubble" />
					6
				</li>
				<li>
					<span className="bubble" />
					7
				</li>
				<li>
					<span className="bubble" />
					8
				</li>
				<li>
					<span className="bubble" />
					9
				</li>
				<li>
					<span className="bubble" />
					minis
				</li>
			</ul>
		</div>
	)
}
export default Sidebar
