import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import './Navbar.css'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Booklist',
    path: '/books',
    icon: <FaIcons.FaBook />,
    cName: 'nav-text'
  },
  {
    title: 'LoanBook',
    path: '/loan',
    icon: <FaIcons.FaHandHolding />,
    cName: 'nav-text'
  },
  {
    title: 'LoanBookList',
    path: '/loanlist',
    icon: <FaIcons.FaBookOpen />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/history',
    icon: <FaIcons.FaHistory />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/',
    icon: <FaIcons.FaSignOutAlt />,
    cName: 'nav-text'
  },
];
