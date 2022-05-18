import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'; // import get recent post and get similar post from a file

// for recent post
const PostWidget = ({ caterories, slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);    // use state hook

  useEffect(() => {
    if(slug){   // conditional statement when slug is availble
      getSimilarPosts(caterories, slug)
        .then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts() // if not get the data
        .then((result) => setRelatedPosts(result))
    }
  }, [])

  // returning the data in JSX and setting the recent post
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Post' : 'Recent post'}
      </h3>
      {relatedPosts.map((post) => {
        <div key={post.title} className = "flex items-center w-full mb-4">
          <div className='w-16 flex-none'>
            <img
              alt= {post.title}
              height="60px"
              width= "60px"
              className = "align-middle rounded-full"
              src = {post.featuredImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 font'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/posts/${post.slug}`} key={post.title} className="text-md">
                  {post.title}
            </Link>
          </div>
        </div>
      })}
    </div>
  )
}

export default PostWidget