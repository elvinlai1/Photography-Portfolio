import React, {useState,useEffect} from 'react'
import MenuOverlay from './MenuOverlay';
import MenuButton from './MenuButton';

const Header: React.FC = ({}) => {
    const [ navbarOpen, setNavbarOpen ] = useState<boolean>(false);

    const[isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const breakpoint:number = 640;

    useEffect(() => {
        let handleResize = () => {
          setIsSmallScreen(window.innerWidth < breakpoint);
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <>
            <MenuButton 
                navbarOpen={navbarOpen} 
                setNavbarOpen={setNavbarOpen} 
                isSmallScreen={isSmallScreen} 
                />
            <MenuOverlay 
                navbarOpen={navbarOpen} 
                setNavbarOpen={setNavbarOpen}
                isSmallScreen={isSmallScreen} 
                 />
        </>
    )
}

export default Header;

