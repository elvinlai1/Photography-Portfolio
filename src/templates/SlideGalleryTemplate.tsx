import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData} from 'gatsby-plugin-image';
import GalleryIndex from '../components/gallery/GalleryIndex';
import Header from '../components/ui/Header';

interface HeaderProps{
    pageContext:{
        category: string;
    }
}

interface GalleryIndexState {
  galleryIndexOpen: boolean;
  setGalleryIndexOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


interface ImageNode {
  node: {
    name: string;
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    }
  };
}

interface ImageQueryResult {
  allFile: {
      edges: ImageNode[];
    };
}

interface SlideGalleryProps {
    data: ImageQueryResult;
    pageContext: {
      category: string;
      queryPath: string;
    };
    GalleryIndexState: GalleryIndexState;
  }

const SlideGalleryTemplate: React.FC<SlideGalleryProps> = ({data, pageContext}) => {

  const [galleryIndexOpen, setGalleryIndexOpen] = useState(false);
  // handle slide images
  const images = data.allFile.edges.map((edge) => edge.node);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const currentImage = images[currentImageIndex]

  const handlePrevious = () => {
    setTimeout(() => {
    }, 400)
      if (currentImageIndex === 0) { return}
      setCurrentImageIndex(index => index === 0 ? images.length - 1 : index - 1)
    }
  const handleNext = () => {
    setTimeout(() => {
    }, 400)
      if (currentImageIndex === images.length - 1) { return}
      setCurrentImageIndex(index => index === images.length - 1 ? 0 : index + 1)
    }
  const handleGalleryIndexState = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setTimeout(() => {
    }, 500)
    setGalleryIndexOpen(!galleryIndexOpen);
  }
    
    return (
        <>
        <Header />
        {/* Gallery Index */}
        <GalleryIndex gallery={data.allFile.edges} 
          setCurrentImageIndex={setCurrentImageIndex} 
          setGalleryIndexOpen={setGalleryIndexOpen} 
          galleryIndexOpen={galleryIndexOpen} />
        {/* Gallery */}
    
          {/* Gallery Name */}
          <div className='gallery-name text-stone-500'>
            {pageContext?.category.charAt(0).toUpperCase() + pageContext?.category.slice(1)}
          </div>
          <div className="slide-gallery">
            {/* Slide */}
              <div className='slide-container'>
                  <a className="slide-prev hover:animate-pulse" onClick={handlePrevious} href="#">
                    <span className={`absolute inset-x-0 bottom-9
                    ${currentImageIndex === 0 ? "text-transparent" : "text-transparent lg:text-stone-500" }`}>&lt;</span>
                  </a>
                            <GatsbyImage 
                                style={{borderRadius: '2px' }}
                                className='slide' 
                                image = {getImage(currentImage) as IGatsbyImageData}
                                alt={currentImage.name}
                                />

                  <a className="slide-next hover:animate-pulse" onClick={handleNext} href="#">
                    <span className={`absolute inset-x-0 bottom-9
                    ${currentImageIndex === images.length-1 ? "text-transparent" : "text-transparent lg:text-stone-500"}`}>&gt;</span>
                  </a>
                    {/* Slide Info */}
                    <div className='slide-info'>
                        <div className='text-stone-500 p-2'>
                              {currentImageIndex+1} / {images.length}
                        </div>
                        <button className={`h-10 w-10 p-2 z-10 transform transition duration-200 ease-out 
                              ${galleryIndexOpen ? "translate-x-2" : "translate-x-0"}
                                        `} 
                                        onClick={(e)=> {
                                          e.preventDefault(); 
                                          handleGalleryIndexState(e);
                                          }}>
                                    <span className='block h-1.5 w-1.5 m-1 bg-stone-500 transform translate-y-0.5'></span>
                                    <span className='block h-1.5 w-1.5 m-1 bg-stone-500 transform translate-x-2 -translate-y-2'></span>
                                    <span className='block h-1.5 w-1.5 m-1 bg-stone-500 transform translate-x-2 -translate-y-2.5'></span>
                                    <span className='block h-1.5 w-1.5 m-1 bg-stone-500 transform -translate-y-5'></span>
                          </button>
                    </div>
              </div>
          </div>
        </>
    )
};

export const pageQuery = graphql`
  query GalleryQuery($queryPath: String!) {
      allFile(filter: { dir: { regex: $queryPath } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(
                transformOptions: { fit: CONTAIN, cropFocus: CENTER }
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
`; 


export default SlideGalleryTemplate;

export const Head: React.FC<HeaderProps> =({pageContext}) => {
  return (
    <title>{pageContext.category.charAt(0).toUpperCase() + pageContext.category.slice(1)} Photos</title>
  )
}