import React from 'react'   // importing react
import {Header} from './'  // import header from index file

// Layout component created to wrap other component
const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout   // exporting layout component