import React, { useState } from "react";
import { QuestNavItems } from "./NavItems";
import { Link } from "react-router-dom";
import "./Dropdown.css";

export default function Dropdownmenu({ item }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul 
        onClick={handleClick}
        className={click ? 'submenu clicked' : 'submenu'}
      >
        {item.subnav.map((subitem, index) => {
          // Calculate the column index for the current subitem
          const columnIndex = Math.floor(index / 4);

          return (
            <li
              // key={subitem.id}
              style={{ gridColumn: columnIndex + 1 }} // Set the grid column
            >
              <Link
                to={subitem.path}
                className={subitem.cName}
                onClick={() => setClick(false)}
              >
                {subitem.icon}
                {subitem.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

