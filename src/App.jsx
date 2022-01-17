/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { eps } from "./assets/episodelist";
import loadable from "@loadable/component";

import Sidebar from "./components/Sidebar";
// import Algolia from "./components/Algolia";
import toast, { Toaster } from "react-hot-toast";
// import Search from './components/newsearch'
// import Episode from './components/Episode'
// import Elastic from './components/Elastic'

const Transcribe = loadable(() => import("./components/Transcribe"));
const EpList = loadable(() => import("./components/EpList"));
const Episode = loadable(() => import("./components/Episode"));

const App = () => {
  useEffect(() => {
    toast.success(
      <div class="flex flex-col gap-2 ml-2 pl-2" style={{ padding: '6px', marginLeft: '4px' }}>
				<p class="p-2">
        Seekers' Lounge has moved! 
				</p>
        <p class="p-2 my-2">
        You will now be redirected to the new and improved site:

        </p>
        <a
          class="block text-blue-800 mt-2 text-xl underline"
          href="https://seekerslounge.pcast.site"
        >
          seekerslounge.pcast.site
        </a>
      </div>
    );
    setTimeout(() => {
      window.location.replace("https://seekerslounge.pcast.site");
    }, 5000);
  }, []);
  return (
    <div className="flex flex-col w-screen md:flex-row">
      <Sidebar />

      <Route exact path="/">
        <div className="w-full h-auto mt-0 mb-10 md:w-3/4">
          {/* <Algolia /> */}
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
        let epName = item.slice(0, -5);
        return (
          <Route path={`/ep/${epName}`} key={epName}>
            <div className="w-full h-auto mt-0 md:w-3/4">
              <Episode props={item} />
            </div>
          </Route>
        );
      })}
      <Toaster toastOptions={{
				position: 'top-center',
				duration: 9000,
				
				style: {
					border: '1px solid #1D4ED8',
					padding: '16px 3rem',
				},
				icon: '☕ ',
			}} />
    </div>
  );
};

export default App;
