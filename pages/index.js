import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components' // import set of component
import { getPosts } from '../services'  // get post function

// exporting home functional component and the function that comes after header
export default function Home({ posts })  {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col -span-1'>
          {posts.map((post, index) =>(
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>

    </div>
  )
}

// as we can do with use effect and state
export async function getStaticProps(){  
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}
