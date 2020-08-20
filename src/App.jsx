import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { eps } from './assets/episodelist'
import loadable from '@loadable/component'

import Sidebar from './components/Sidebar'
import Search from './components/newsearch'
// import Episode from './components/Episode'
// import Elastic from './components/Elastic'

const Transcribe = loadable(() => import('./components/Transcribe'))
const EpList = loadable(() => import('./components/EpList'))
const Episode = loadable(() => import('./components/Episode'))

const App = () => {
	return (
		<div className="flex flex-col w-screen md:flex-row">
			<Sidebar />

			<Route exact path="/">
				<div className="w-full h-auto mt-0 mb-10 md:w-3/4">
					<Search />
				</div>
			</Route>

			<Route path="/eplist/">
				<div className="w-full h-auto mt-0 mb-10 md:w-3/4">
					<EpList />
				</div>
			</Route>

			<Route path="/transcribe/">
				<div className="w-full h-auto mt-0 mb-10 md:w-3/4">
					<Transcribe />
				</div>
			</Route>

			{eps.map((item) => {
				let epName = item.slice(0, -5)
				return (
					<Route path={`/ep/${epName}`} key={epName}>
						<div className="w-full h-auto mt-0 md:w-3/4">
							<Episode props={item} />
						</div>
					</Route>
				)
			})}
		</div>
	)
}

export default App
