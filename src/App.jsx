import React from 'react'

import './App.css'
// import qs from 'qs'

import Sidebar from './components/Sidebar'
import Elastic from './Searchtest'

const App = () => {
	return (
		<div className="flex flex-col min-w-full md:flex-row">
			<Sidebar />

			<div className="w-full h-auto mt-0 md:w-3/4">
				<Elastic />
			</div>
		</div>
	)
}

export default App