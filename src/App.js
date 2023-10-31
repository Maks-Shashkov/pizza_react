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




function App() {
    
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='*' element={<NotFound/>}></Route>
                    <Route path='/cart' element={<Card/>}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
