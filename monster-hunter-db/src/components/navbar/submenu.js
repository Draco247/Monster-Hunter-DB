import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setId } from '../../actions';

// const SidebarContainer = styled.div`
//   height: 100%; /* Set the height to occupy the available height */
//   overflow-y: auto; /* Enable vertical scrolling when content overflows */
//   max-height: 100vh; /* Limit the maximum height of the sidebar */
// `;

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #060b26;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 16px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item, showSidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const dispatch = useDispatch();
  
  const showSubnav = () => {
    setSubnav(!subnav)
  }

  const showSidebarandGetID = (id) => {
    showSidebar()
    // console.log(id)
    dispatch(setId(id))
  }

  

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav ? showSubnav  : showSidebar}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} onClick={() => showSidebarandGetID(item.id)}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;