import React from 'react'; 
import SlideGallery from './gallery/SlideGallery';
import Header from './ui/Header';

const LandingPage: React.FC = ({}) => {
    return (
        <>
        <div className='container mx-auto'>
            <Header/>
            <SlideGallery />
        </div>
        </>
    );
}

export default LandingPage;