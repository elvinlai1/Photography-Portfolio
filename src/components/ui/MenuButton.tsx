import { navigate } from 'gatsby';
import React from 'react'

interface MenuOverlayProps{
    navbarOpen: boolean;
    setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSmallScreen: boolean;
}

const MenuButton: React.FC<MenuOverlayProps> = ({navbarOpen, setNavbarOpen, isSmallScreen}) => {
    
    return (
        <>
        <button
            className="absolute top-0 left-0 menu-button z-50 w-16 h-16 text-black focus:outline-none"
            onClick={() => setNavbarOpen(!navbarOpen)}
            >
            <div className="">
                <span
                className={`absolute h-1 w-6 bg-stone-700  transform -translate-x-1/2 transition duration-150 ease-in-out ${
                    navbarOpen ? "rotate-45 delay-100 bg-opacity-100" : "-translate-y-2 bg-opacity-50"
                }`}
                ></span>
                <span
                className={`absolute h-1 bg-stone-700  transform -translate-x-1/2  transition-all duration-150 ease-in-out ${
                    navbarOpen ? "w-0 opacity-50" : "w-6 delay-200 bg-opacity-50"
                }`}
                ></span>
                <span
                className={`absolute h-1 w-6 bg-stone-700  transform -translate-x-1/2  transition duration-150 ease-in-out ${
                    navbarOpen ? "-rotate-45 delay-100 bg-opacity-100 " : "translate-y-2 bg-opacity-50"
                }`}
                ></span>
            </div>
        </button>


        {/* Main Logo */}
        <div className={`absolute top-0 right-0 z-30 p-4 transform transition duration-500 text-end ease-in-out pr-10`}>
            <a href="#" className={`my-auto font-bold text-stone text-2xl transform transition delay-100 duration-300 ease-in-out hover:opacity-80
                    ${navbarOpen ? (isSmallScreen ? "opacity-100" : "opacity-0") : "opacity-30" }
                `} onClick={() => {
                    setNavbarOpen(false);
                    setTimeout(() => {
                        navigate("/")
                  
                    }, 800)}}>  
                ELVIN
            </a>
        </div>

          
        </>
    )
}

export default MenuButton;



