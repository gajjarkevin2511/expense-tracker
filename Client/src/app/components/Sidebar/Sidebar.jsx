import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/statistics', label: 'Statistics' },
    { path: '/expense', label: 'Expense' },
    { path: '/users', label: 'Users' },
    { path: '/category', label: 'Category' },
  ];

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;