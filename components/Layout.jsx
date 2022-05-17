import React from 'react';
import Header from './Header'; //import header component

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
