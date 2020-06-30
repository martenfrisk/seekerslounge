import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { eps } from './assets/episodelist'
import loadable from '@loadable/component'

import Sidebar from './components/Sidebar'
// import Episode from './components/Episode'
import Elastic from './components/Elastic'
const Episode = loadable(() => import('./components/Episode'))

const App = () => {
	return (
		<div className="flex flex-col min-w-full md:flex-row">
		{/* // <Switch> */}
				<Sidebar />

				<Route exact path="/">
					<div className="w-full h-auto mt-0 mb-10 md:w-3/4">
						<Elastic />
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
				{/* </Switch> */}
			</div>
	)
}

export default App
