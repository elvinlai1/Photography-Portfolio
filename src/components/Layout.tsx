import React from 'react'
import Header from './ui/Header';

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({children}) => {

    return (
        <>
        <div className='container mx-auto'>
            <Header />
            
            {children}
        </div>
        </>
    )
}

export default Layout;

