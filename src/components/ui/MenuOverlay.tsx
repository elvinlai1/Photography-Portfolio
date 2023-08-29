import React from "react";
import { navigate, useStaticQuery,graphql } from "gatsby";
import slugify from "slugify";

interface QueryResult {
  allDirectory: {
    edges: {
      node: {
        id: string;
        name: string;
      };
    }[];
  };
}

interface MenuOverlayProps {
    navbarOpen: boolean;
    setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSmallScreen: boolean;
    }

const MenuOverlay: React.FC<MenuOverlayProps> = ({ navbarOpen, setNavbarOpen, isSmallScreen}) => {

  const categoryQuery = useStaticQuery<QueryResult>(graphql`
    query{
          allDirectory(filter: {relativeDirectory: { eq: "" } }) {
            edges{
              node {
                id
                name
              }
            }
          }
        }
    `);

  const categories = categoryQuery.allDirectory.edges.map((edge) => edge.node);
  
  //added delay to navigation for css animation
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | React.MouseEvent<HTMLSpanElement>, MouseEvent>, to: string) => {
      e.preventDefault()
      setNavbarOpen(false);
      setTimeout(() => {
        navigate("/" + to)
      }, 800)
  }


  return (
    <>
      {/* Overlay */}
     <div className={`fixed flex top-0 left-0 right-0 bottom-0 transform transition duration-1000 ease-in-out z-20
                ${navbarOpen ? "bg-black opacity-80" : "bg-black pointer-events-none opacity-0"}`}
                onClick={() => setNavbarOpen(!navbarOpen)}
                >
      </div>
                
            {/* Menu */}
            <nav className={`menu-overlay-bg flex flex-col
              ${navbarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}
            `}>

              {/* Menu Home Button */}
              {isSmallScreen ? null : 
                  ( <div className="text-end opacity-100  hover:opacity-50">
                       <a href="#" className={`text-end pr-10 my-auto font-bold text-2xl
                               `}
                               onClick={() => {
                                 setNavbarOpen(false);
                                 setTimeout(() => {
                                   navigate("/")
                                  }, 800)}}> 
                            ELVIN
                        </a>
                    </div>
                  )
                }
              
              {/* Generated Menu items */}
              <ul className={`text-end pr-10 text-black text-xl transform delay-200 transition-all ease-in-out ${isSmallScreen ? "pt-12" : "pt-4"}
                    ${navbarOpen ? "duration-500 translate-y-0 opacity-100" : "duration-500 translate-y-96 opacity-0" } `}>
                  {categories.map(({name, id}, index) => (
                    <li className={`pb-4`} key={index}>
                      <a 
                        key={id}
                        href="#"
                        className={` font-semibold text-stone-400 hover:text-black duration-200 ease-in-out `}
                        onClick={(e) => {handleClick(e, slugify(name, { lower: true, trim:true, strict: true, replacement:"-" }))}}
                      >
                        {name.charAt(0).toUpperCase() + name.slice(1).replaceAll("-", " ")}
                      </a>
                    </li>
                  ))}
              </ul>
              {/* Other menu items */}
              <div className="flex flex-col h-screen pb-4 ">
                <ul className="order-last text-end pr-10 mt-auto text-sm pb-16">
                  <li className="pb-4">
                        <a 
                          href="#"
                          className=""
                          onClick={(e) => {handleClick(e, slugify("/about"))}}>
                          About
                        </a>
                      </li>
                      <li className="pb-4">
                        <a 
                          href="#"
                          className=""
                          onClick={(e) => {handleClick(e, slugify("/contact"))}}>
                          Contact
                        </a>
                      </li>
                </ul>
                {/* Footer */}
                  <div className="flex justify-center order-last">
                    <p className="text-xs"> Copyright &copy; 2023 Elvin Lai</p>
                  </div>
              </div>
          </nav>
    </>
    
  );
};


export default MenuOverlay;