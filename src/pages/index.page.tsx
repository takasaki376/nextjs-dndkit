import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <div className='my-4' >
        <Link href='/TodoSample'>
          <a >
          TodoSample
          </a>
        </Link>
      </div>
      <br />
      <div className='my-4' >
        <Link href='/MultipleContainers'>
          <a >
          MultipleContainers
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Home
