import React, { useEffect, useState } from 'react' // importing react and usestate and use effect
import { Layout } from '../components'  //import the header component to how multiple times

import 'tailwindcss/tailwind.css'  //add tailwind
import '../styles/globals.scss'  //import scss

// function that load all application wrapped in Layout  component
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp   // exporting app
