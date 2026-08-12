import React from 'react'
import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import About from './components/About'
import Contact from './components/Contact'
import ViewArticles from './components/ViewArticles'
import Home from './components/Home'
import NotFound from './components/404/NotFound'
import SignInPage from "./components/LoginComponent/SignInPage.jsx";
import SignUpPage from "./components/LoginComponent/SignUpPage.jsx";
import PublicRoute from "./components/customRoute/PublicRoute.jsx";

const App = () => {
    const [theme, setTheme] = useState("bg-light text-black");
    console.log("This is the app's theme", theme);

    return (
        <>
            <Header theme={theme} setTheme={setTheme} />
            <div className={`h-screen w-screen ${theme}`}>
                <Routes>
                    {/* Default route */}
                    <Route path="/" element={<Navigate to={'/home'} />} />

                    <Route path='/home' element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/getArticles" element={<ViewArticles />} />
                    <Route path="/loginPage" element={
                        <PublicRoute>
                            <SignInPage />
                        </PublicRoute>
                    } />

                    <Route path="/register" element={
                        <PublicRoute>
                            <SignUpPage />
                        </PublicRoute>
                    } />


                    <Route path='*' element={<NotFound />} />
                </Routes>


            </div>
        </>
    )
}

export default App