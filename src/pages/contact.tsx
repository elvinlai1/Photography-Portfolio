import { HeadFC } from 'gatsby';
import * as React from "react"
import Header from '../components/ui/Header';

const contact = () => {

    return (
        <>
        <Header/>

        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold py-4 opacity-80">Contact</h1>
            <p>Have a question or inquiry?</p>
            <p>Feel free to reach out to me!</p>
            <div className="email-btn">
                <a href="mailto:elvin-lai-public@proton.me">Email Me</a>
            </div>
        </div>

        </>
    )
}

export default contact;

export const Head: HeadFC = () => <title>Contact</title>
