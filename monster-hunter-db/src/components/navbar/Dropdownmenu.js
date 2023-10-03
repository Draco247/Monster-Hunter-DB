import React, { useState, useEffect, useRef } from "react";
import { QuestNavItems } from "./NavItems";
import { Link } from "react-router-dom";
import "./Dropdown.css";

export default function Dropdownmenu({ navitem, handleClick, fade }) {
  // const [click, setClick] = useState(false);
  // console.log(navitem)

  // const handleClick = () => setClick(!click);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click target is a navbar button
      console.log(event)
      const isNavbarButtonClick = event.target.id === 'navbar-button' || event.target.id === 'navbar-button-img';
  
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isNavbarButtonClick) {
        handleClick(navitem); // Call the parent's handleClick to close the dropdown
      }
    }
  
    // Add an event listener for clicks outside of the dropdown
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClick]);
  

  return (
    <>
      <div className="relative">
        <div id="dropdownNavbar" ref={dropdownRef} class={`z-10 font-normal divide-y divide-gray-100 rounded-lg shadow w-[600px] bg-gray-400/95 dark:divide-gray-600 absolute top-full left-0 mt-2 dark:bg-slate-900/95 dark:border-gray-600 backdrop-blur-sm 
        ${fade === false ? "transition duration-100 ease-in opacity-100" : "opacity-0"}`}>
          <div className="grid gap-4 max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-3 md:px-6 w-full">
                {navitem.subnav.map((subitem, index) => (
                  (index % 2 === 0) ? (
                    <ul key={index} className="w-full h-full p-0"> {/* Adjust padding */}
                      <Link to={subitem.path} onClick={() => handleClick(navitem)}>
                        <li className="flex h-full w-full items-center justify-center text-slate-950 dark:text-slate-50 font-bold text-center block rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex-grow">
                          {subitem.icon}
                          {subitem.title}
                        </li>
                      </Link>
                    </ul>
                  ) : (
                    <ul key={index} className="w-full h-full p-0"> {/* Adjust padding */}
                      <Link to={subitem.path} onClick={() => handleClick(navitem)}>
                        <li className="flex h-full w-full items-center justify-center text-slate-950 dark:text-slate-50 font-bold text-center block rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex-grow">
                          {subitem.icon}
                          {subitem.title}
                        </li>
                      </Link>
                    </ul>
                  )
                ))}
              </div>
          </div>
      </div>
    </>
  );
}

