import React, {useEffect, useState} from 'react' // import react and useeffect
import Link from 'next/link' // import link

import { getCategories } from '../services'  // import get categories from services

// cateories function to get categories
const Categories = () => {
  const [categories, setCategories] = useState([]);  // use state for storing data

  // useeffect for getting dynamic content
  useEffect(()=> {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);

  // return a set of jsx
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className='cursor-pointer block pb-3 mb-3'>
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories  // exporting the categories
