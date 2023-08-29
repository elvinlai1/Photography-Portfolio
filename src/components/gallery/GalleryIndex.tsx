import React, { Component } from 'react'
import { GatsbyImage, GatsbyImageProps, getImage, IGatsbyImageData} from 'gatsby-plugin-image';

interface ImageNode {
    node: {
      name: string;
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      }
    };
  }

interface PopUpGalleryProps {
    gallery: ImageNode[];
    setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
    galleryIndexOpen: boolean;
    setGalleryIndexOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const GalleryIndex: React.FC<PopUpGalleryProps> = ({gallery, setCurrentImageIndex, setGalleryIndexOpen, galleryIndexOpen}) => {

    const getImageIndex = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        setCurrentImageIndex(parseInt(target.getAttribute('data-index')!));
        setGalleryIndexOpen(!galleryIndexOpen);
    }

    return (
        <>
            <div className={`fixed flex top-0 left-0 h-full w-full transition duration-1000 ease-in-out bg-black z-10
                ${galleryIndexOpen ? "opacity-80" : "pointer-events-none opacity-0"}
                `}
                onClick={()=>setGalleryIndexOpen(!galleryIndexOpen)}>
            </div>
            
            <div className={`gallery-index
                    ${ galleryIndexOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} 
                    `}>

                    <div className='flex justify-center items-center h-full'>
                        <div className='gallery-index-auto-fit gap-4 overflow-y-scroll py-4'>
                            {gallery?.map((image, index) => (
                                <div className='' key={index} onClick={getImageIndex}>
                                    <GatsbyImage
                                        key={index} 
                                        image={getImage(image.node.childImageSharp) as IGatsbyImageData} 
                                        alt="text" 
                                        data-index={index}
                                        />
                                </div>
                            ))}
                        </div>
                    </div>
            </div>


        </>
    )
}

export default GalleryIndex;
