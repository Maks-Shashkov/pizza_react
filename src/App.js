import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Card from "./pages/Card";
import NotFound from "./pages/NotFound";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link, BrowserRouter, Routes,
} from "react-router-dom";

import './scss/app.scss'

export const SearchContext = React.createContext();
console.log(SearchContext)

function App() {
    const [searchValue, setSearchValue] = React.useState('');
    console.log(searchValue, setSearchValue)
    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='*' element={<NotFound/>}></Route>
                        <Route path='/cart' element={<Card/>}></Route>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
