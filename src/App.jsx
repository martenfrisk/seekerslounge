import React, { useEffect } from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css'
// import qs from 'qs'
import { eps } from './assets/episodelist'

import Sidebar from './components/Sidebar'
import Episode from './components/Episode'
import Elastic from './Searchtest'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	useEffect(() => {
		toast.info('Search optimization in progress. Getting no results? Try adding spaces, e.g. cheetahman -> cheetah man')
	}, [])

	
	return (
		<Switch>
			
			<div className="flex flex-col min-w-full md:flex-row">
				<Sidebar />
	
				<Route exact path="/">
				<ToastContainer />

				<div className="w-full h-auto mt-0 mb-10 md:w-3/4">
					<div className="px-8 pt-2 text-sm md:mt-8">Search here:</div>
						<Elastic />
					</div>
				</Route>
				
			{eps.map(item => {
				let epName = item.slice(0, -5)
				return (
				<Route path={`/ep/${epName}`}>
				<div className="w-full h-auto mt-0 md:w-3/4">
					<Episode props={item} />
					</div>
				</Route>
				)
			})}
			</div>
		</Switch>
	)
}

export default App
