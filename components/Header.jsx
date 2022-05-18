import React, { useState, useEffect } from 'react' // import react, use state and use effect
import Link from 'next/link' // import link

import { getCategories } from '../services'; // get categories from services
                                                                                            
                                                                                                                            
const Header = () => {
    const [categories, setCategories] = useState([]);    // use state hook

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md:float-left block'>
               <Link href='/'>
                    <span className="cursor-pointer font-bold text-4xl text-white">
                        GraphCMS
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                {categories.map((category)=>(
                    <Link key={category.slug} href={`/category/${category.slug}`} >
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor'>
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Header