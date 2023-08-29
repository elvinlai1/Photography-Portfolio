import { HeadFC } from 'gatsby';
import * as React from "react"
import Header from '../components/ui/Header';
import { StaticImage } from "gatsby-plugin-image"

const about = () => {

    return (
        <>
        <Header/>
        <div className="flex flex-col justify-center h-screen">
                <div className='about-box'>
                        <h1 className="about-box-header">About</h1>
                        <p className='about-box-text'> 
                            Hello! <br />
                            I'm a junior web developer with photography as one of my many hobbies. <br/>
                            These are some of my favorite photos that I can publicly share 😉.
                        </p>
                </div>
        </div>
        </>
    )
}

export default about;

export const Head: HeadFC = () => <title>About</title>
