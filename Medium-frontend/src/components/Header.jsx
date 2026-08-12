import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserCircle} from "lucide-react";
import {useState} from 'react'

import ThemeButton from './ThemeButton/ThemeButton.jsx'
import {useAuth} from "../context/AuthContext.jsx";
import {toast} from "react-toastify";


const Header = ({theme, setTheme}) => {

    const {user} = useAuth();
    const [showProfile, setShowProfile] = useState(false);

    const {logout} = useAuth();

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        toast.success("Logged out successfully")
        navigate('/home', {
            replace : true
        })
    }

    return (<div className='bg-emerald-600 flex justify-between p-2 '>
        <Link to={"/home"}><h1 className='font-bold text-3xl text-white hover:text-green-100'>ArtiPod</h1></Link>
        <div className="navigations flex justify-between space-x-4">
            <Link to="/home">Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/getArticles'>Explore</Link>
            <ThemeButton theme={theme} setTheme={setTheme}/>
            {user ? (
                <div className="relative">
                    <UserCircle size={30} onClick={() => setShowProfile(!showProfile)} className="cursor-pointer bg-gray-300 rounded-full"/>
                    {showProfile && (
                        <div
                            className="absolute right-0 top-10 w-64 bg-white rounded-lg shadow-lg p-4 z-50"> {/* User information */}
                            <div className="border-b pb-3 mb-3"><p className="font-bold text-gray-800"> {user.username} </p>
                                <p className="text-sm text-gray-500"> {user.email} </p></div>
                            <button
                                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-700"> Profile
                            </button>
                            <button
                                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-700"> Settings
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-500" onClick={handleLogout}> Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link to={'/loginPage'}> Login </Link>
        )}
    </div>
</div>
)
}

export default Header
